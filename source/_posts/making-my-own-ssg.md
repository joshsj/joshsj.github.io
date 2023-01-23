---
title: Making an SSG
date: 2023-01-06
updated: 2023-01-08
tags:
  - Software Development
  - Projects
---

Despite the **[abundance](https://jamstack.org/generators/)** of
great site generators, I want to make my own. It _should_ be a fun and
achievable project, plus I'll have full creative control over any kind of
content I want to post in the future.

## Current Situation

The blog is currently hosted on Github Pages and deployed automatically with
Github Actions. I have little to no interest in DevOps and this works just fine
--- no changes here.

Building the blog is handled by [Hexo](https://github.com/hexojs/hexo) which I
initially chose it for three main reasons:

1. It uses Node, which I always have installed
2. It has a simple API to get things going, while offering a reasonable amount
   of configuration and extensibility
3. It sticks to templating languages and Markdown (at least by default), instead
   of delving into React/Vue etc.

It nails a lot of the functionality expected in a blogging framework and I
anticipate to draw heavily from its features. I do however have some
complaints...

### Markdown just isn't cutting it

Not having complete control over the HTML has proven annoying while I'm trying
to up my blogging game.

Look at tables; although Markdown syntax is much cleaner, it's completely
inextensible. Want a `<th>` at the start of each row? Not possible. Want to
include something other than plain text in a cell? Not happening.

I've also found issue with Markdown converters as all seem to lack in one area
or another, be it sanitization, Markdown flavours, line lengths/breaks, or modes
like
[smartypants](https://github.com/xoofx/markdig/blob/master/src/Markdig.Tests/Specs/SmartyPantsSpecs.md).

Falling back to HTML inside Markdown is always an option but then why use
Markdown in the first place?

I could configure/create another file processor in Hexo to use different markup
but I'd rather spend my time on this project.

### Template languages aren't cutting it either

Out of the box, Hexo offers EJS and Nunjucks which are bad and worse
respectively. I don't care to elaborate; they just aren't satisfying to use.

Creating reusable components to get around the shortcomings of Markdown has
worked fine. Nevertheless I've ended up with lots of .html and .ejs in my .md
files so the goal is to standardise my markup.

### Folder structure is overkill

This blog doesn't necessitate the themes or scaffold features of Hexo and these
create the most additional folders.

### Dates are wrong

To my discontent, I'm based in the UK so my post dates should reflect that.

Although Hexo offers date/time localisation, all of my efforts to use it have
failed so (as far as I can tell) posts are currently dated in the time zone of
the build server.

## System Architecture and Feature Decomposition

Just kidding.

I'm making whatever seems best and refactoring as I go.

## Getting something to build

The goal is a HTML file, compiled from a template language, based on file paths
sourced from a config file.

### Choosing a templating language

I need one template language to rule them all, solving the current mishmash.

Drawing from EJS, I need first-hand support for Javascript and a mechanism for
reuse (like components).

Any templating language designed for HTML will work.

Nothing will beat Markdown but the deciding factor will be its syntax: clean and
concise.

Of all the languages that fit the bill, [pug](https://pugjs.org/) looks capable
and easy to write. It's also a classic, so any issues I have should already have
solutions; and it can be used as the template language in Javascript frameworks,
so I could easily migrate to React/Vue/whatever down the line.

### Adding configuration

This project has practically no additional scope but hardcoding paths is for the
weak.

dotenv should be more than adequate, and I like the
[preload](https://github.com/motdotla/dotenv#preload) option so that goes in the
npm scripts too.

We need only two values for now:

- `SOURCE_DIR` --- where the content is
- `BUILD_DIR` --- where to put the content once compiled

### A blog is born

Producing an MVP is now a simple process away:

1. Scan the source directory
2. Read in each file and compile it
3. Write it to build directory while preserving the relative path

{% caption_img "wow.gif" "An MVP"  %}

The only hiccup was with fs module in Node. It doesn't offer a method to
recursively scan directories, but with some inspiration from the nice folks on
Stack Overflow, async generators make this looks easy:

```typescript
async function* walk(
  root: string,
  options: Options,
  walked = ""
): AsyncGenerator<string> {
  const entries = await readdir(root, options);

  for (const entry of entries) {
    const entryPath = path.join(walked, entry.name);

    if (entry.isDirectory()) {
      yield* walk(path.join(root, entry.name), options, entryPath);
    } else {
      yield entryPath;
    }
  }
}
```

## Static Assets

Times New Roman has a certain charm but I want my hard-earned CSS back.

Unlike the .pug files, static assets need not be compiled, only copied to the
build folder; they also keep their file extension. I can copy the pug processing
logic in to a new method, make these changes, and add a check to determine the
right method for the file.

With that, the site looks like mine again:

{% caption_img "with css.png" "Looking good"  %}

## Introducing transformers

Before the system grows, we need a refactor. Adding an `elif` for every file
type is completely inextensible and would become a mess --- we invented design
patterns for a reason.

Typescript allows us to take an object-oriented or functional approach. Of
course, both will be used eventually but I want to lean on FP because I've never
developed a useful application with it.

With that in mind, I only know software design from an OOP perspective so expect
no rules of FP to be followed.

The essential information of a file is its location and content:

```typescript
type File = { path: string; content: string };
```

To transform a file from source to build, we return its new location and content
which can continue to be stored inside the `File` type:

```typescript
type Transformer = (file: File) => Promise<File>;
```

The object-oriented designer in me is screaming
[factory](https://refactoring.guru/design-patterns/factory-method) to allow a
`Transformer` implementation to be provided based on the file's location.

Defining a class would be shameful but I agree with the intention: the function
which handles the transformations shouldn't also determine which transformer to
use.

```typescript
type GetTransformer = (file: File) => Transformer;
```

To allow the system to identify where a file came from, we can add more config
values:

- `ASSET_DIR` --- folder name for static assets
- `PAGE_DIR` --- folder name for pages

And now the application can map the files from source to build:

```typescript
const transformFiles =
  (getTransformer: GetTransformer) => async (sourceFiles: File[]) => {
    const transformations = sourceFiles.map((file) =>
      getTransformer(file)(file)
    );

    const transformResults = await Promise.allSettled(transformations);

    const buildFiles: File[] = transformResults
      .filter((r) => isFulfilled(r) && !!r.value)
      .map((r) => r.value);
  };
```

Adding new kinds of files (like posts) is now much simpler, requiring only a
transformer implementation and a new configuration value if necessary. The
concept of 'transformation' is also formalized and domain is richer 👌

## Creating a pipeline

Even with limited development, it's easy to imagine how the codebase will grow
to add the upcoming features: reading in preamble, building the dataset of
posts, generating TOCs, etc. A few bits of architecture will go a long way to
ensure the application scales with complexity.

### Spitballing

The behaviour to generate a site is a sequence of predetermined procedures where
the output of one feeds into the next. I would call this a pipeline.

Mathematicians and functional programmers can meet this demand with function
composition, which composes a single function of many. However, it seems that FP
nerds still haven't quite achieved this in Typescript, as shown by this thread
on [Hacker News](https://news.ycombinator.com/item?id=32377646).

Looking at object-oriented design, the most common patterns (see
[GoF](https://martinfowler.com/bliki/GangOfFour.html) and
[DDD](https://martinfowler.com/bliki/DomainDrivenDesign.html)) don't seem to
work either:

- Mediator could construct a pipeline but:
  - abstracting the communication between functions is the opposite of
    composition and
  - sending requests/notifications is a wasted mechanism for this system: the
    only request is 'build'.
- Chain of Responsibility exists to allow multiple handler to try and complete a
  single request. It could be modified to create a pipeline, whereby the `next`
  handler accepts the result of the current handler; however:
  - Handlers invoking the next handler only makes sense with the pattern's
    original intention, so it doesn't fit either.

The bottom line is that, in Typescript world, there's no predefined solution
that I know of.

### Meeting in the middle

Inspired by some creations the Hacker News thread from above, I'm using the
Builder pattern to add some fluid semantics to function composition:

```typescript
// Take in a value, return a value wrapped in a Promise
type Step<Current, Next> = (state: Current) => Promise<Next>;

// Store an initial state to kick things off
type PipelineBuilder<Initial, Current> = {
  // Store a handler for the current state and move onto the next state
  add: <Next>(f: Step<Current, Next>) => PipelineBuilder<Initial, Next>;
  // Compose the added functions
  build: () => Step<Initial, Current>;
};

type Pipeline = <Initial>() => PipelineBuilder<Initial, Initial>;
```

The implementation is simple: `add` stores the step `f` in an array; `build`
reduces the array and composes the result. This requires some type assertions
and `any` so you can't see the ugliness.

We can now decompose the current process into `Step`s and separate some
behaviours into their own functions:

```typescript
const generate = pipeline()
  .add(setDefaultConfig) // In case .env is missing
  .add(loadConfig) // Load from .env
  .add(readSource) // Read in the source files
  .add(categoriseFiles) // Asset or page?
  .add(transformFiles) // See above
  .add(writeBuild) // Write the build files
  .build(); // Compose the added functions

await generate();
```

## Forming a context

Some pages inform the site about themselves like the title/created date/tags of
a post, whereas some pages are informed by the site to render a list of posts,
for example.

### Adding posts

Before we can start pulling data out of posts to create the context, we need to
define them as well as the other categories:

```typescript
type PostData = { title: string; created: Date; updated?: Date; tags?: [] };

type Post = PostData & { file: File; category: "post" };
type Asset = { file: File; category: "post" }; // No extra data
type Page = { file: File; category: "post" }; // Also no extra data
```

The combination of mapped types and template literal types really shine here.
With a type to represent the file categories, we can derive new types with a
mapping with keys also derived from the type. Thus we can, for example, ensure a
'categoriser' implementation exists for all categories:

```typescript
// "asset" | "page" | "post";
type Category = (Post | Asset | Page)["category"];

// Produces "assetDir" | "pageDir" | "postDir"
type Key = `${Category}Categoriser`;

type Categorisers = { [K in Key]: (file: File) => Category };
```

This moves a typical runtime error (like missing dependencies) to compile time,
which is awesome and makes me hope languages like C# embrace some type theory in
future.

Preach over, we need a `POST_DIR` config value and to implement a categoriser
and transformer for posts. I'm opting out of the `/year/month/day` format for
post URLs as another quick search shows that there isn't much point and I don't
like it.

Like assets, their relative path will be preserved but they live inside a
`/blog` folder.

### Front matter

A feature I first used with Hexo, front matter stores stateful data at the start
(or front) of a file, which works really well to unify a post's data and
content.

A quick search of NPM shows its most popular package for parsing front matter
([gray-matter](https://www.npmjs.com/package/gray-matter)) is also the most
configurable and has the cleanest interface --- who could have guessed?

With the package installed, a new step to `extractData` goes in the pipeline in
which gray-matter splits the front matter from the rest of the file and parses
it as YAML (by default):

```typescript
const { data, content } = matter(file.contents, { excerpt: false });

return {
  file: file.with({ contents: content }), // Exclude front matter from contents
  data: data as PostData, // Putting trust in myself
};
```

When rendering pug, the context is used for the 'locals' object and now pages &
posts can render site-wide data 🎉


## Watching for changes

Out of the features I use in Hexo, the only major one missing from this generator is a 'watch' mode (where added/changed files automatically build). This is a big help when writing posts, but it will help immensely when the time comes to migrate the existing content.

## It just works?

Turns out this is pretty straight forward. [chokidar](https://www.npmjs.com/package/chokidar) and [node-watch](https://www.npmjs.com/package/node-watch) outline their advantages over `watch` and `watchfile` in the fs module and people on the internet don't lie. I'm using chokiar for the same reasons as grey-matter: configurable and clean.

The pipeline needs a small change: we need to specify which files to build in watch mode without affecting the process for normal builds. 

For the time being, I'm separating the config pipeline from the build pipeline as it doesn't need to be watched and it opens up the entry point. To the steps that use the config, it can be provided like a dependency instead: 

```typescript
const getConfig = pipeline()
  .add(setDefaultConfig)
  .add(loadConfig)
  .build();

const generate = pipeline()
  .add(readSource)
  .add(categoriseFiles)
  .add(extractData)
  .add(transformFiles)
  .add(writeBuild)
  .build();
```

With a small change to the `readSource` step and a little chokidar configuration, we can send  the path of the changed file into the pipeline and it builds: 

```typescript
await generate(); // Initial build

// Watch for changes and send them into the pipeline
watch("**/*", { cwd: config.sourceDir, ignoreInitial: true })
  .on("add", (path) => generate({ sourcePaths: [path] })) 
  .on("change", (path) => generate({ sourcePaths: [path] }));
```

[//]: # (TODO add gif of watched)

[//]: # (Very cool.)

## It doesn't just work

{% caption_img idiot.jpg "What an idiotic boob I was about 10 or 11 seconds ago" %} 

Although the logic is currently correct for posts, it doesn't work for any files that display information about the rest of the system, like a list of all posts; nor does it work for changes to layouts or components.

In the spirit of 'doing what works for now', I'm just gonna rebuild everything when a file changes. The build is almost instant so the additional logic to determine which files need rebuilding isn't worth it --- for now. 



