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

Some of my CSS components need a rethink, so they can stay behind, as well as
the lib-specific CSS. I can reintroduce those styles again later.

Unlike the .pug files, static assets need not be compiled, only copied to the
build folder; they also keep their file extension. I can copy the pug processing
logic in to a new method, make these changes, and add a check to determine the
right method for the file.

With that, the site looks like mine again:

{% caption_img "with css.png" "Looking good"  %}

<!-- TODO caption -->

## Introducing processors

We need a refactor. Adding an `elif` for every filetype is completely
inextensible and ignores SRP, plus it doesn't allow other mechanisms to
determine how a file should be processed.

A 'processor' should look something like this:

```typescript
interface IProcessor {
  /** Indicates if the file can be processed based on its path */
  processes(location: ILocation): boolean;

  /** Processes the file returning the new content */
  process(location: ILocation, source: string): Promise<IContent>;
}
```

The config also needs some more values, so the processors know where they're
reading from:

- `ASSET_DIR` --- folder name for static assets
- `PAGE_DIR` --- folder name for pages

And that's it! The pipeline is orchestrated as follows:

1. Scan the source directory
2. Read in each file and resolve its processor
3. Invoke the processor
4. Use the result to write its content at its location
