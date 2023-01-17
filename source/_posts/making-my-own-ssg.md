---
title: Making my own SSG
date: 2023-01-06
updated: 2023-01-08
tags:
  - Software Development
  - Projects
---

I recently rewatched The Social Network and I enjoyed the stream of
conciousness-style of blogging. I'm gonna try it and see how it turns out 🤞

<!-- TODO add spoilers component -->
<!-- There won't any crude comparison websites for this project through. -->

---

I've been in my current role for around two months and I'm pretty much settled
in. Now that I have some energy outside of work, I decided not to refocus my
efforts and do some programming for myself.

Despite the abundance of [abundance](https://jamstack.org/generators/) of great
site generators, I want to make my own. It _should_ be a fun and achievable
project, plus I'll have full creative control over any kind of content I want to
post in the future.

## Current Situation

The blog is currently hosted on Github Pages and deployed automatically with
Github Actions. I have little to no interest in DevOps and this works flawlessly
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

We need only two settings for now:

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
Stack Overflow, async generators make this a doddle:

{% caption "Walking directories with fs" %}

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

{% endcaption %}

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
type is completely inextensible and would become a mess --- we have design
patterns for a reason.

Typescript allows us to take an object-oriented or functional approach. Of
course, both will be used eventually but I want to lean on FP because I've never
work on a sizeable application with it.

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

Looking at object-oriented design, my understanding (see
[GoF](https://martinfowler.com/bliki/GangOfFour.html) and
[DDD](https://martinfowler.com/bliki/DomainDrivenDesign.html)) reveals none are
quite right:

- Mediator could construct a pipeline but:
  - abstracting the communication between functions is the opposite of
    composition and
  - sending requests/notifications is a wasted mechanism for this system: the
    only request is 'build'.
- Chain of Responsibility exists to allow multiple handler to try and complete a
  single request. It could be modified to create a pipeline, whereby the `next`
  handler accepts the result of the current handler; however:
  - handlers invoking the next handler only makes sense with the pattern's
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

type Pipeline = <Initial = void>() => PipelineBuilder<Initial, Initial>;
```

The implementation but simple: `add` stores the step `f` in an array; `build`
reduces the array and composes the result. This requires some type assertions
and `any` so you can't see the ugly.

We can now decompose the current process into `Step`s and separate some
behaviours into their own functions:

```typescript
const run = pipeline()
  .add(setDefaultConfig) // In case .env is missing
  .add(loadConfig) // Load from .env
  .add(readSource) // Read in the source files
  .add(categoriseFiles) // Asset or page?
  .add(transformFiles) // If you know, you know
  .add(writeBuild) // Write the build files
  .build(); // Compose the added functions
```
