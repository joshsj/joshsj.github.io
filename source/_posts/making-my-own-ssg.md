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

### Templating languages aren't cutting it either

Out of the box, Hexo offers EJS and Nunjucks which are bad and worse
respectively. I don't care to elaborate; they just aren't satisfying to use.

Creating reusable components to get around the shortcomings of Markdown has
worked fine. Nevertheless I've ended up with lots of .html and .ejs in my .md
files so the goal is to standardise my markup.

### Folder structure is overkill

This blog doesn't necessitate the themes or scaffold features of Hexo and these
create the most additional folders.

### Dates are wrong

To my discontent, I'm based in the UK and my post dates should reflect that.

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

`npm i pug @types/pug`

### Adding configuration

`npm i dotenv` --- I don't expect to need JSON or YAML.

The [preload](https://github.com/motdotla/dotenv#preload) option is so handy so
that goes in the npm scripts too.

We need only two variables

- `CONTENT_DIR`: where the content is
- `BUILD_DIR`: where to put the content once compiled

Both will be resolved relative to the current working directory.
