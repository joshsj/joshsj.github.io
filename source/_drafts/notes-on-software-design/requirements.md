---
title: Defining Requirements
date: 2021-11-06
---

## Considerations

For a software application, its requirements are affected by purpose of a
software application, i.e., to (help) solve a business, scientific, or technical
problem.

From its purpose, the type (or 'focus') of the overall application can be
considered:

- Data
  - Traditional database-oriented systems
  - Normal for business applications
- Engagement
  - Decentralised systems which integrate together
  - Facilitate and orchestrate the user's experience
  - Seamless interaction between each other, e.g., Facebook/Instagram cross-over
  - Social media platforms for example
- Insight
  - Support for customer experience through consumption, collection, and
    analysis of data
  - Gathered from data- and engagement-focused systems

With the type of the application, the required roles within the team can also be
considered:

- Technical
  - System architect
  - Designer
  - Developer
  - Tester;
- Business
  - Business analyst
  - Domain experts
- Management
  - Project managers
  - Programme managers
  - Team leaders

Another factor which could affect requirements is the stakeholders. For example,
an application for which the maintenance team is outsourced, those aspects may
need to be developed to their requirements.

## Sources

The requirements for an application may be a solution; in the business world, it
could be an entire aspect of the system as a whole like data analytics. This
also applies at a lower level, e.g., persisting data could be implemented using
a database or configuration files.

{% caption_img "requirement sources.png" "Requirement Sources Diagram" %}

## Functional Requirements

These describe what is solved by the application , i.e, the fucking point of the
software. Descriptions can be from a number of perspectives, ideally
<a href="{% post_path notes-on-software-design/analysis  %}#Personas">personas</a>,
to address five main aspects...

<span role="heading">How</span> (the business functionality)

- What the system has to do under-the-hood
- Captured directly, e.g., with a use-case model
- Captured indirectly, e.g., with a business process model

<span role="heading">Who</span> (its users)

- How competent are they?
- Do they have accessibility requirements?
- (Personas may also define these requirements)

<span role="heading">Where</span> (its users in a context)

- How do the they access it? Browsers? Mobile app?

<span role="heading">What</span> (the data)

- Does the system store all information itself?
- Is any data resourced from elsewhere?

<span role="heading">With</span> (integrations)

- What the system has to do with other systems
- IT , e.g., a payment gateway for an ATM
- Human, e.g., a user-friendly input device for PINs

## Non-Functional Requirements

Non-function requirements consider everything else; think expectations of usage,
characteristics.

### Constraints

Non-functional requirements which cannot be changed.

_Technical constraints_ are self-explanatory. For example, a project for a large
organisation replacing a legacy system would need to be compatible with their
deployment platform(s); the new system can demand a new deployment mechanism.

- Legacy Integration
- Development Skills
- Existing Infrastructure
- IT Standards
- Implementation Constraints

_Business constraints_ are real-word factors which effect the creation of the
solution. Differences in data protection regulations between countries will
determine how the data must be secured.

- Time
- Resource
- Scope
- Risk Willingness
- Regulatory
- Geographic
- Organizational

## Qualities

Expectations of the application. Quality requirements will be appear similar to
constraints, but they are negotiable by-nature.

Qualities may be drafted from the usage-context of the application (implicit),
like performance. They may also be provided by the customer/stakeholder
(explicit).

_Runtime qualities_ (or _observable qualities_) provide a value to the user,
meaning they can be empirically tested. Is the system **actually** available
24/7? Are page loads quick?

- Performance: without this, users won't be able to use the system
- Capacity
- Availability: without this, users will stop using the system
- Security: without this, 'users' will stop the system being used
- Systems Management
- Usability
- Accessibility

_Non-runtime qualities_ (or _unobservable qualities_) cannot be measured easily.
For example, disaster management: it's quite hard, and fairly immoral, to
simulate an earthquake.

- Portability
- Maintainability
- Manageability
- Scalability
- Data Integrity
- Environmental
- Efficiency
- Reliability

## Documentation

Firstly, some rules of thumb:

- Use complete sentences
- Identify requirements with a unique reference, e.g, ID
- Be clear, concise, and explicit (avoid ambiguity, jargon)
- Do not make false promises, e.g., _"100% reliable"_
- Define success/acceptance criteria
- Ensure they are measurable and testable
- Reference supporting material, instead of duplicating information

### Phrasing

The M.O.S.C.O.W acronym helps with phrasing a requirement. I still don't know
where the first 'O' comes from.

- **Shall**, **Will**, and **Must** indicate mandatory requirements
- **Should** and **Might** indicate optional requirements
- **Could** indicate desirable requirements

### Guideline

The S.M.A.R.T mnemonic helps to ensure all information for a requirement is
provided. Lets start with a basic, undeveloped requirement:

> The system should allow a visually impaired elderly person to upload health
> parameters.

<span role="heading">Specific</span> Unambiguous, consistent and be at the
appropriate level of detail:

> R001: The system should <ins>have a higher font screen in the internet
> application to allow a visually impaired elderly person to upload blood
> pressure and pulse rate</ins>.

<span role="heading">Measurable</span> Possible to verify a requirement has been
met so include success criteria:

> R001: The system should have a higher font screen <ins>compliant to
> Accessibility Requirements for People with Low Vision</ins> in the internet
> application to allow a visually impaired elderly person to upload blood
> pressure and pulse rate.

<span role="heading">Attainable</span> Technically feasible and be within the
art of the possible (also known as achievable):

> R001: The system should have a higher font screen compliant to Accessibility
> Requirements for People with Low Vision in the internet application to allow a
> visually impaired elderly person to upload blood pressure and pulse rate<ins>,
> at least 90% of the time, and assuming all network services and interfacing
> applications are operating as defined in the Project Assumptions &
> Dependencies</ins>.

<span role="heading">Realisable</span> Realistic given all the constraints
defined (also known as repeatable):

> R001: The system should have a higher font screen compliant to Accessibility
> Requirements for People with Low Vision in the internet application to allow a
> visually impaired elderly person to upload blood pressure and pulse rate, at
> least 90% of the time, and assuming all network services and interfacing
> applications are operating as defined in the Project Assumptions &
> Dependencies. <ins>This requirement will be delivered on time provided all
> dependencies on infrastructure and resources are resolved as per the plan
> outlined in the Project Assumptions & Dependencies.</ins>

<span role="heading">Traceable</span> Linked from conception through
specification, design, implementation and test:

> R001: The system should have a higher font screen <ins>no smaller than Arial
> 28,</ins> compliant to Accessibility Requirements for People with Low Vision
> in the internet application to allow a visually impaired elderly person to
> upload blood pressure and pulse rate, at least 90% of the time, and assuming
> all network services and interfacing applications are operating as defined in
> the Project Assumptions & Dependencies. This requirement will be delivered on
> time provided all dependencies on infrastructure and resources are resolved as
> per the plan outlined in the Project Assumptions & Dependencies.

<span role="heading">Testable</span> There must be acceptance criteria that
aligns with expected business value and converted to a specific test condition.

## Representations

Requirement documentation can be very complex and thus difficult to read. By
decomposing requirements and expressing them in human-readable formats, the
subsequent processes (design, development, testing) can be tackled more easily.
It also reduces the likelihood of lost/misinterpreted requirements.

### Use Cases

A _use case_ describes how a system will be used, either though a list of
actions or event steps by considering:

- Actor --- Anyone or anything using the system
- Stakeholder --- Someone or something with vested interests in the behaviour of
  the system
- Primary Actor --- Stakeholder who initiates an interaction with the system to
  achieve a goal
- Preconditions --- What must be true or happen before and after the use case
  runs.
- Triggers --- The event that causes the use case to be initiated.
- Main Scenarios --- Use case in which nothing goes wrong.
- Alternative Paths --- These paths are a variation on the main theme. These
  exceptions are what happen when things go wrong at the system level

### User Stories ❤️

A _user story_ describes a feature from an end-user's perspective. These
features are very small, only further decomposable into
design/development/testing tasks.

They can be grouped together under an Epic, which describes a feature of the
application. Naturally, the feature described in a Epic is large.

<span role="heading">Description</span> Specification of the user, what they
want, and why. This is commonly formatted like 'as [user], I want [a goal], so
that [reasoning]'. It's highly preferable to use a persona as the user, instead
of (re)defining users across stories or referring to 'user' generically.

For example, a user story for 'Sam' (a 21-year-old Instagram user) could look
like 'As Sam, I want to login with my Facebook account, so that I don't need to
remember another password'.

<span role="heading">Acceptance Criteria</span> A description of the expected
functionality of the feature, covering happy and sad paths. These are also
written from a user's perspective, containing what has happened, what is about
to happen, and when should happen.

Using a behavioural format helps to maintain consistency, typically 'Given the
user..., when..., then...'

For example, a happy path could look like 'Given that Sam clicks the 'Sign in'
button, when he first opens the application, then he has the option to use
Facebook to log in'

<span role="heading">Designs</span> Often they are exclusively for UI (sketches,
wireframes, visual prototypes), but new features may also specify the technical
approach (e.g., an ERD).
