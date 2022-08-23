---
title: Scheduling
date: 2021-11-08
---

Time is money, so scheduling a project accurately is important.

<!-- more -->

## Aspects

_Effort_ is the resource required to complete a task.

_Time_ indicates how long a job will take to be completed.

_Task partitioning_ allocates workloads concurrently; naturally, they cannot be
dependant on each other, so additional prerequisite jobs may be required.

Alongside the jobs which actually produce the product, the time/effort to manage
the project also needs to be scheduled, known as _overhead_. This includes
project artefacts or reports.

{% caption_img "triple constraint model.png" "Triple Constraint Model"  %}

As a guideline, a triangle of time, cost, and scope can be conceptualised, in
which increasing/reducing one aspect will impact the other two.

## Milestones

_Milestones_ are points throughout the project at which progress can be
evaluated and changed; i.e., allocating or removing resources.

Ideally, they also illustrate progress to the customer. As well as confirming
the project is progressing, concrete artefacts can also be delivered, such as
wireframes, prototypes, or reports.

Payments are often tied to milestones. From the customer's perspective, proof of
work is a big incentive to pay up; from a management perspective, releasing an
aspect of the final solution should correspond to payment as well.

## Representations

A good representation of a project schedule should be clear and concise. By
making a scheduling easily readable, those unfamiliar with the project can
immediately understand its intended and current progress.

This is especially important in a business context, as superiors of the PM
may/will want quick and easy updates on projects.

### Gantt

Gantt charts represent scheduling information in horizontal bars.

Each row is labelled with a job title/summary, and additional columns can
provide additional important information, e.g., the job's team, start date, end
date, etc.

Subsequent columns indicate to when the work is allocated with a filled box,
creating the horizontal bars.

## Contingency/Slippage

A project plan needs to account for if/when things go wrong; prudent project
managers will proactively schedule (and possibly resource) an additional margin
for slippage.

Contingency also accounts for unforeseeable delays, such as staff sickness,
redundancies, or hardware failure. As such, a project should **always plan for
slippage**, even if it goes unused. This allows the project to continue while
management resolve the issue.

By contrast, **too much contingency should be avoided**; it extends the length
(and subsequent cost) of the project, which can loose tenders. It also
diminishes confidence in a company if their project's are consistently delivered
early. A typical example of this designers/developers/testers over-estimating
jobs.

How much contingency depend upon:

- How tightly the requirement is defined
- Potential for scope creep
  - A better the initial analysis helps to avoid this
- Confidence of the estimates
  - Sometimes you just gotta guess
- Degree of innovation of the project
  - The newer, the slippier
- Confidence of resources acquisition
  - Consider when, how often, relationship
- Knowledge of customer
  - Might be a changeable dickhead
  - Might lack technical knowledge
- Overall assessment of project risks
