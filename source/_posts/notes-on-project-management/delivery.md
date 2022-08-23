---
title: Project Delivery
date: 2021-11-31
---

The widespread view throughout the 1980s and early 1990s was that the best way
to achieve better software was through careful project planning: formalized
quality assurance; use of analysis and design methods, supported by software
tools; and rigorous, controlled software development processes.

This view spawned from the development of large-scale, long-lived software
systems in industries like government and aerospace.

## Traditional Approaches

The _Waterfall method_ was derived from a 1970 paper published by Winston Royce.
The process is broken down into a number of sequential stages, with each stage
reaching completion before work starts on the following one:

> Requirements → Analysis → Design → Coding → Testing → Operations

Although Royce proposed the model, he warned of the dangers of a single-pass
approach and advocated for iterative methods 🤦‍♂️

{% caption_img waterfall.png "Waterfall model" %}

A failing of the Waterfall model is the treatment of maintenance as a
start-finish stage, as opposed to an ongoing, open-ended process. The _B-model_
addressed enhanced the Waterfall model to address this.

_V-model_ further enhanced waterfall by declaring equatable stages before and
after the Coding stage. For example, a 'Module design' phase has a corresponding
'Debugged modules' phase.

With the _Incremental model_, the project was no longer delivered a whole in the
final phase. Instead, after defining requirements and producing high-level
designs, subsequent increments produce aspects of the project. By introducing
the system to the customer over time, the can familiarise themselves more
easily.

There was also the spiral model; it look dumb and uninspired so I can't be
fucked with notes.

## Changes

Towards the late 90s, a dissatisfaction with heavyweight methodologies lead to
the development of agile. These methods primarily enable the development team to
focus on the software itself, rather than on its design and documentation. By
nature, they suit applications where the requirements change frequently.

## Looking at agile

Reading from
[Agilism versus Traditional Approaches](/.assets/agilism%20versus%20traditional%20approaches.pdf),
the appropriate methodologies for a project can be determined by the clarity and
understanding of the its goal and solution.

One major consideration when working with agile is the availability of the
client; almost all agile approaches include a feedback loop with the client,
meaning there has to be reliable communication to keep the project on schedule.

### eXtreme Programming (XP)

XP is based on incremental development, supported through small, frequent
releases of the system. The client(s) are continually engaged with the
development team, so they are an important aspect of the project's progress.

The focus lies less-so with the development process and more-so with the
people,embracing pair programming and collective ownership of the system code.

Change is embraced through regular system releases to customers, using
test-first development and consistent refactoring to avoid code degeneration.

Lastly, maintainability is key; alongside refactoring, this is also ensures by
using simple designs that do not unnecessarily anticipate future changes to the
system.

In practise, this doesn't work too well, as it doesn't integrate with most
existing business management structures. The primary issue was the inability
track the progress of a project, since teams worked in very short cycles which
deterred proper documentation and organisation practises.

### Scrum

In response to XP's failings, Scrum was developed. It uses a concept of
'sprints', which are short periods of work.

Before each sprint, the project team reviews the work to-do, sourced from new
feature work or the backlog. With the selected items, the team can plan the
sprint, i.e., assign work and estimate.

After each sprint, the sprint is assessed to determine what was done, what went
well, and what needs changing. This may also include the conclusion of a
shippable piece of work.

## Being Pragmatic

{% quote "Kuhrmann et. al, 2019" %}

<!--excerpt-->

There is no one-size-fits-all software development approach, teams and
organisations use different approaches to address the challenges of software
development projects.<!--excerpt--> They rarely follow a pure approach by
implementing a process by the book.

{% endquote %}

Pretty much that: no two Kanban boards looks identical.
