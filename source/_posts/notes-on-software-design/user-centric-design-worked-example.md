---
title: "User-centric Design: A Worked Example"
date: 2021-10-22
---

Looking at how we create scenarios, storyboards, and wireframes from a persona.

<!-- more -->

{% caption "User persona example, inspired by [Bin collection, BBC](https://www.bbc.co.uk/news/uk-england-47170939)" %}

> James is a 28-year-old man that works as a waste bin collector for the local
> city council. Part of his job is to empty the bins around the city in public
> spaces (parks, high streets, etc). He is generally healthy, lives an active
> lifestyle and doesn't have any health conditions that affect his ability to
> complete his job. He owns a smartphone, which he uses regularly in his
> day-today life. James has a scheduled timetable that he uses for his daily
> routine, however, there are times when the bins in certain areas are empty,
> this means that James ends up not collecting any trash leaving other areas
> with excess trash in the bin. This is quite inefficient and James needs a more
> robust approach in completing his bin route around the city. The local city
> council wants an interconnected sensor network with installed sensors on all
> of the bins around the city, letting James know how full certain bins are and
> whether they need emptying or not, saving him time by skipping out particular
> bins if necessary. Furthermore, the data collected by the sensors is leveraged
> by the council to figure out if more bins are required in particular areas of
> the city.

{% endcaption %}

## Observations

- Discusses the role of an average bin collector in a city
- The current system is inefficient
  - Information on bin capacity is non-existant so all bins must be checked for
    litter
  - Time is wasted on empty bins meaning routes may not be completed
- The council wants to add sensors to bins

  - Only bins that require collection will be scheduled, optimising the
    collection process
  - Workload is reduced for bin men
  - General public will shut the fuck up
  - Local council save money on wages for scheduling roles and
    complaints-handling

## Persona

(I couldn't be bothered to make one 🤷‍♂️)

## Scenario

1. James, a 28-year-old bin man, has gotten ready for work
2. He carries everyday items, such as his phone, and his keys for his work van
3. He checks which bins need collecting and starts his route

## Goals

- Functionality
  - Remotely accessible: it's a job on the move
  - Available without internet connection: may not always have a connection
- Context factors
  - Events around the city: can additional bin-usage be expected/predicted?
- Usability goals
  - Easy to read on the move
- UX goals
  - Reliable

## Storyboard

{% caption_img "james the bin man.png" "Storyboard for 'James the Bin Man'" %}

## Wireframe

(I couldn't be bothered to make this either)

| Component     | Functionalities                                | Used by                 |
| ------------- | ---------------------------------------------- | ----------------------- |
| Text box      | Entering text <br> Censoring letters           | Login fields            |
| Button        | Navigation                                     | Login button            |
| Text          | Rendering text <br> Rendering emojis           | Scheduled bin component |
| Scheduled bin | Displaying bin name <br> Displaying bin status | Route preview           |
