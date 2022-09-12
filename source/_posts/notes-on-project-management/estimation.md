---
title: Estimation
date: 2021-12-11
---

<!--excerpt-->

Estimation is essential to ensure a project is realistically funded and
resourced, meaning they can be delivered on-time, to-budget, and
to-set-quality.<!--excerpt--> In addition, clients want/need to know this to
sign off a project.

Traditional estimations methods align with
<a href="{% post_path notes-on-project-management/delivery %}">traditional
delivery approaches</a>, meaning the project must already be decomposed. The
project is analysed bottom-up; each element is estimated from which a

Agile estimation approaches top-down. The main features of the application are
estimated as a total for its subtasks, encouraging teams to produce gross total
estimations for time and/or effort.

## Rules of Thumb

- Each developer or maintainer can deal with approx. 2000 lines of code (LOC) in
  a given 'task'
- This is one 'headful' of code (on average)
- Productivity averages around 5k LOC per year, but it depends heavily on the
  type of project
- Productivity also varies from person to person, i.e., mutual ability or an
  individual's fluctuations, so these are average figures

## Generic Approaches

### Parkinson Principle

> Work expands to fit the available space

First observed in management studies, it is sometimes referred to as the
'capacity effect'. The principle relies on the idea that the effort applied to a
task is directly affected to the time constraint.

This can be exaggerated to the idea that quality of work is correlated to the
time constraint --- it is a generic approach after all.

{% caption_img "parkinson principle.png" "Graph showing the Parkinson Principle" %}

Alone, it cannot be used to estimate work, but it does guide estimations:

- Estimations should favour less time, to be extended if necessary
- Time is not a trustworthy metric in estimations, effort is also important
- **Work evaluation should be based on objectives over time**

### Price to Win

_Price to Win (PTW)_ is the process of balancing the company and customer
benefits of a contract using estimates.

Underestimating a project appeals to client, as the cost and/or timescales are
reduced. However, the money has to come from somewhere.

Taking the hit internally keeps a good rapport with the customer, as a cheaper
and/or quicker project makes the company look good. The loss isn't good
short-term, but future contracts can reclaim the losses (and more).

Alternatively, the missing costs can be layered onto the client as the project
progresses: this sucks, don't do it.

### Analogy

The _Analogy_ method determines estimations from a similar project. Naturally,
the data from the other project must be trusted, and therefore needs to be
accurate. It's only gives ballpark, similar to [top-down](#Top-down).

A simple example is scaling construction work: one house on a new estate is
gonna be real similar to another.

✔️ Traditional <br> ❔ Agile: the flexibility can easily allow the project to
divert from the comparative project

### Expert Judgement

Exactly as it sounds, _Expert Judgement_ bases estimations upon specific
criteria and or expertise acquired a specific knowledge area, product area,
language, or discipline. It can be provided by a any number of team
members/leaders, but expert knowledge is generally found outside of the
organisation, adding a marginal cost.

Experts can be difficult to find outright, difficult to find with the require
amount of knowledge, and can be expensive.

✔️ Traditional <br> ✔️ Agile

## Work-based Approaches

### Top-down

As described, top-down estimation divides a set budget among
features/stages/tasks of the project to establish that costs are covered and
profit is possible.

It is ultimately based on guesswork, so it's very inaccurate, but it is simple,
quick, and easy so it lends itself to smaller projects/business with few
resources.

❔ Traditional: doesn't account for changes in the project <br> ✔️ Agile: quick,
easy and mutable

### Bottom-up

Similar to top-down but a more thorough approach, using the project tasks as a
starting point. Each is priced individually, the sum of which provide a total
estimate.

This is the most accurate estimation process, as it is the most comprehensive,
meaning tracking progress and expenses is forever easier.

However, it's inherently time and resource intensive, as distant tasks like
integration, deployment, and maintenance need to be fully understood in advance.
The level of detail can easily lead to over-estimations.

✔️ Traditional <br> ❔ Agile: doesn't fit with iterative delivery

## Algorithmic Approaches

First concepts, then models...

### Complexity of Functions

**Note:** this section is unfinished.

Assessing the complexity of a function uses several factors:

- Inputs --- forms, dialogues, messages, JSON data, configuration files, etc.

- Outputs --- web pages, reports, graphs, messages, JSON data, etc.

- Inquiries --- a combination of input and output

  - Logically these should only be considered when both are isolated to a given
    function

- Internal/external files --- tables, views, or stored files

### Basic Cost Model

The _Basic Cost Model_ uses the formula {% tex E =
A\cdot{}M\cdot{}X\cdot{}S^B %} where:

- {% tex A %} applies an organisation-wide constant factor to cost models
- {% tex S %} is software 'size'

  - LOC is the most common metric; varies wildly by languages & patterns
  - Difficult to assess in early phases with external integrations:

    - Existing internal solution
    - Modified internal/open source solution
    - Bought from a 3rd party

- {% tex B %} does something, usually between `1` to `1.5`. I'm guessing it
  accounts for complexity, as the complexity of a solution will grow
  polynomially relative to size, and it's applied as a power of {% tex S %}.

- {% tex M %} is a linear adjustment multiplier, which could also account for
  complexity

- {% tex X %} is vector of cost factors
