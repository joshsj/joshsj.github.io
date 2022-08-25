---
title: Planning Processes
date: 2021-10-19
---

<!--excerpt-->

Starting an IT project needs a good understanding of the requirements. As
specification documents are produced, they wil become increasingly
specific.<!--excerpt--> For projects with specifications which lack detail:

- Reject the bid
  - Not worth the time/money/effort
- Conduct a thorough risk analysis

  - Assumptions must be documented and agreed with the customer
  - Can be done by the project manager
  - Better option if done by risk manager

## Breaking Down Requirements

_Reductionism_ is the practice of analysing and describing a complex phenomenon
in terms of its simple or fundamental constituents, especially when this is said
to provide a sufficient explanation.

In project management terms, it's the process of decomposing a project into
smaller activities. But when do we stop?

- When activity doesn't readily decompose (you're there!)
- When activities are small enough to estimate with reasonable accuracy
  - Each activity should be 0.5--2 days duration
  - Ensures the creation process does not outweigh the management workload

A _Work Breakdown Structure (WBS)_ is a hierarchical outline of the tasks
required to complete a project.

{% caption_img wbs.png "Work Breakdown Structure diagram" %}

Similarly, a _Product Breakdown Structure (PBS)_ hierarchical structure of
things that the project will make or outcomes that it will deliver.

{% caption_img pbs.png "Product Breakdown Structure diagram" %}

By tackling the end products over the project's activities, a PBS can be much
simpler from a project management perspective:

- Easier to determine products over technical activities
  - PM can focus is on what is to be achieved
  - Individuals responsive for creation can tackle this
  - Estimates can be delegated to them
- Once the products are identified, easier to determine
  - Quality standards
  - Who will review products
  - Organisational structure

A _Product Flow Diagrams (PFD)_ provides the inputs for the planning process,
such as a set of activities which we will need to resource or an understanding
of dependencies between activities.

{% caption_img pfd.png "Product Flow Diagram" %}

## Product Descriptions & Work Packages

Product descriptions are the bottom level of PBS; they clearly specify the
quality and completion criteria for the product by addressing four areas:

- Purpose
  - Why is the product required?
- Composition
  - What makes up the product?
- Derivation
  - Which, if any, previous products is it based upon?
  - Where will information needed to develop it come from?
- Quality
  - What criteria are required to complete the product?

By adding an assignee, due date, and estimated effort, a product description can
be moved into creation; this is a work package.

## Tracking Progress

Using a Linear Responsibility Chart, individuals can be associated to an
activity in a capacity:

- **R**esponsible - for actually creating the work package
- **A**ccountable - manages its creation
- **C**onsultable - provides information
- **I**nformed - must be kept informed about progress

{% caption "Linear Responsibility Chart" %}

|                        | Project<br>Supervisor | Project<br>Manager | Analysis<br>Team Leader | Chief<br>Designer | Development<br>Manager | Team<br>Manager | Super<br>User |
| ---------------------- | --------------------- | ------------------ | ----------------------- | ----------------- | ---------------------- | --------------- | ------------- |
| Interview notes        | I                     | A                  | R                       | I                 |                        |                 | C             |
| Requirements catalogue | I                     | A                  | R                       | I                 |                        |                 | C             |
| Use-case diagram       | I                     | A                  | R                       | I                 | I                      |                 | C             |
| Package review         | I                     | A                  | R                       | I                 | I                      | I               | I             |
| Report text            | I                     | A                  | R                       | I                 |                        |                 | I             |
| Report illustrations   | I                     | A                  | R                       | I                 |                        |                 | I             |
| Report appendices      | I                     | A                  | R                       | I                 |                        |                 | I             |

{% endcaption %}
