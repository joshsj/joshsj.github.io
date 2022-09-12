---
title: Formatting Reference
date: 1970
tags:
  - Fluff
---

A reference to check my CSS 😬

<!-- more -->

## Standard Markdown

Mr and Mrs Dursley, of number four, Privet Drive, were proud to say that they
were perfectly normal, thank you very much. They were the last people you'd
expect to be involved in anything strange or mysterious, because they just
didn't hold with such nonsense.

**Bold**

_Italics_

> Some quote

- Why
- must
  - a
  - great
  - author

1. be
2. so
   - nasty

| Column | Column |
| ------ | ------ |
| Cell   | Cell   |

```python
print("hello world")
```

## My HTML

### Inline Header

<span role="heading" aria-level="3">Read</span> this

## Tags

### `my_email`

{% my_email %}

### `repo`

{% repo joshsj.github.io "Look at this" %}

### `math`

{% tex 1+2=3 %}

### `dtex`

{% dtex 1+2=3 %}

### `bigo`

{% bigo \log{N} %}

### `caption`

{% caption caption "#caption" %}

**Markdown Content**

{% endcaption %}

### `caption_img`

{%
  caption_img
  code.jpg
  "Code 😎"
  https://commons.wikimedia.org/wiki/File:Programming_code.jpg
%}

### `quote`

{% quote Royce "#quote" %}

Waterfall is probably shit

{% endquote %}

### `spotify`

{% spotify track/1YrnDTqvcnUKxAIeXyaEmU?si=2cc2b7e8e7834441 %}
