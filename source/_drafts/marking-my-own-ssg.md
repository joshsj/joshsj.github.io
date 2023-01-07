---
title: Making my own SSG
date: 2023-01-06
updated: 2023-01-07
tags:
  - Software Development
  - Projects
---

I recently rewatched The Social Network and I enjoyed the stream of
conciousness-style of blogging. I'm gonna give it a go and hope it reads well at
the end 🤞

<!-- TODO add spoilers component -->
<!-- There won't any crude comparison websites for this project through. -->

---

So I've been in my current role for around two months and I'm pretty much
settled in. Now that I have some energy outside of work, I decided not to
refocus my efforts and do some more programming.

I'm aiming to do more writing on here so creating my own static site generator
(SSG) to create this blog seems like an ideal project; it should be fun,
achievable, and I'll have full creative control over any kind of content I want
to post in the future.

## Current Situation

The blog is hosted on Github Pages and deployed automatically with Github
Actions. I have little to no interest in DevOps and this works flawlessly --- no
changes here.

Building the blog is currently handled by [Hexo](https://github.com/hexojs/hexo)
which I initially chose it for three main reasons:

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
or another; e.g., sanitization, Markdown flavours, line lengths/breaks, or modes
like
[smartypants](https://github.com/xoofx/markdig/blob/master/src/Markdig.Tests/Specs/SmartyPantsSpecs.md).

Falling back to HTML inside Markdown is an option but I think that defeats the
purpose of Markdown in the first place.

I could configure/create another processor in Hexo to consume a different markup
language but I'd rather spend my time on this project.

### Templating languages aren't cutting it either

Out of the box, Hexo offers EJS and Nunjucks which are bad and worse
respectively. I don't care to elaborate; they just aren't satisfying to use.

Creating reusable components to get around the shortcomings of Markdown has
worked fine. Nevertheless I've ended up with lots of `.html` and `.ejs` in my
`.md` files so I'm looking to standardise my markup.

### Folder structure is overkill

More complex blogs can probably utilise the extra features, whereas don't use
themes or scaffolds which add most of the additional directories.

### Dates are wrong

I live in the UK but the site builds on a server wherever Github fancies.
Although Hexo has configuration for date localisation, I just can't get it to
work so all my posts are dated wrong 🤷‍♂️

## System Architecture and Feature Decomposition

Just kidding.

I'm making whatever seems best and refactoring as I go.
