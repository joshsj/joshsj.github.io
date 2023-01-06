---
title: Making my own SSG
date: 2023-01-06
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

I'm aiming to do more writing on here so making my own static site generator
(SSG) to host this blog seems like an ideal project; it should be fun,
achievable, and I'll have full creative control over any kind of content I want
to post in the future.

## The current situation

The blog is hosted on Github Pages and deployed automatically with Github
Actions. I have little to no interest in DevOps and this works just fine --- no
changes here.

Building the blog is handled by [Hexo](https://github.com/hexojs/hexo) which I
initially chose it for three main reasons:

1. It uses Node, which I always have installed
2. It has a simple API to get things going, while offering a reasonable amount
   of configuration and extensibility
3. It sticks to templating languages and Markdown (by default), instead of
   delving into React/Vue etc.

It nails a lot of the functionality expected in a blogging framework and I would
recommend to a friend but I do have some complaints...

<span role="heading" aria-level="3">Markdown just isn't cutting it</span> Not a
Hexo-specific issue but not having complete control over the HTML is proving to
be annoying when you want to level up your website.

Look at tables. Markdown syntax is much more approachable than HTML but you
can't have a `<th>` at the start of each row. You could wrap the table in a
class to style the first cells like a header headers but accessibility goes out
the window and HTML inside Markdown isn't a proper solution.

I've also found issue with Markdown converters as all seem to lack in one area
or another; e.g., sanitization, Markdown flavours, line lengths/breaks, or modes
like
[smartypants](https://github.com/xoofx/markdig/blob/master/src/Markdig.Tests/Specs/SmartyPantsSpecs.md).

<span role="heading" aria-level="3">The templating languages aren't
either</span> Out of the box, it uses EJS and Nunjucks which are bad and worse
respectively. I don't care to elaborate but they just don't tickle my brain.

You can use other processors but I'd rather spend my time on this project than
configuring Hexo, plus mixing their syntax with Markdown leads to more
inelegance.

<span role="heading" aria-level="3">Folder structure is overkill</span> More
complex blogs can probably utilise the extra features but I don't use themes or
scaffolds which add most of the extra folders.

<span role="heading" aria-level="3">Dates are wrong</span> I live in the UK but
Github has servers somewhere else. Hexo has configuration for date localisation
but I just can't get it to work so all my posts are dated one day early 🤷‍♂️
