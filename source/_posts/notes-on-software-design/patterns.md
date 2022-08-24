---
title: Patterns
date: 2021-11-28
---

_Design patterns_ are <!--excerpt-->a reusable solution to a commonly occurring
problem within a given context. <!--excerpt--> They are only a template, so they
cannot be transformed directly into code and are a starting point: not a final
decision.

Patterns become more and more relevant as applications grow; complex domains
like banking, patient care, shipping, etc. all involve:

- Lot of persistent data
- Concurrent data access
- Varying, complex UIs
- Integrations with other enterprise applications
- Conceptual dissonance (how we expect people to use it)
- Complex business logic

## Common Concerns

At an architecture level, [layering](#Layering) is a big point of discussion.
Traditionally, the approach has been horizontal but trends indicate this is
changing. Naturally, the implementation's context is a factor in this decision,
as the language itself along with its frameworks can make development easier.

Another concern is domain logic and authorization; where does it belong:
database or backend application code? Should the UI apply the same rules to hide
inoperable/unavailable paths? (Yes).

## Trends in Architecture

Traditionally enterprise applications have been developed as monoliths: (very)
large applications which perform related tasks to solve a range of business
needs, hosted in a single location.

However the industry is trending towards distributed systems, which decomposes
the system into subsystems to be developed and hosted independently.

## Types of Patterns

_Architectural_ patterns provide a fundamental system of organisation and
structure. They define conceptual units and their relationships:

- N-tier
- Layered (or onion)
- Model-View-Controller (MVC)
- Command Query Responsibility Segregation (CQRS)
- Inversion of Control (IOC)

_Design_ patterns provide a scheme to implement features of a system, or their
relationships:

- Observer
- Builder
- Abstraction

An _idiom_ is any low-level pattern in a given programming language, describing
how to approach the implementation of a feature:

| Feature                 | Imperative    | Functional     |
| ----------------------- | ------------- | -------------- |
| Mutable objects         | ✔️            | ❌             |
| Default null references | ✔️            | ❌             |
| Operations              | Class methods | Free functions |

## Layering

Enterprise software (almost) always consists of three principle layers, although
different architecture patterns will use different terminology.

### Presentation

How the product is 'exposed'.

For client-facing exposure, i.e., user interfaces, the Model-View-Controller
(MVC) pattern is the most widely used pattern, with Model-View-ViewModel (MVVM)
also proving popular.

For technical exposure, APIs and sockets are very common, implementing
additional protocols such as REST and SOAP for standardisation.

### Business

Application of business logic, also known as _domain_.

It also manages domain models, which represent concepts used in the business
context. These can be data-based, like a `Report`, or technical, like a
`ReportQueue`.

Simple domain models map (pretty much) directly to the database tables, storing
no logic on their instances. Instead, corresponding components will store the
business logic for domain objects, e.g., a `ProductBusiness`.

However, for newer approaches like domain-driven design (DDD) considers these
models 'anaemic', and instead poses...

Rich domain models store complex business logic inside instances. They do not
necessarily map directly to a database object, and as such require an additional
layer is required for persistence.

### Data

Also known as _persistence_, it's the mapping of domain models to persistable
objects like documents or relational tables. It also exposes operations to
access the domain models (e.g., 'find' 'insert', `delete`)

## Concurrency

At a data level, concurrency is the management of resource acquisition from
multiple sources. It uses locks.

An _optimistic lock_ use a timestamp or version field to ensure one session
cannot commit changes to field(s) if another session has updated since. This
allows multiple sessions to update records at the 'same time', however the
integrity of the data can be warped from a business perspective e.g., if a user
updates a field after considering the value other another field which has since
been updated.

Preventing all concurrent access is achieved with a _pessimistic lock_, which
prevents simultaneous. reads and/or writes, usually at a database level. This
however can create deadlocks.

## Integration

Modern applications are rarely self-contained solutions; instead they
communicate with other applications consuming and publishing data.

- Generally simplicity
  - Reduces the likelihood of needing to update integration processes in the
    future
- Usage of open standards
  - Protocols and data formats
  - Reduces single-use interop code
  - Negates conflicts with changes to standards
- Non-proprietary technologies
  - Eliminate specialised software/hardware
- (A)synchronicity s
  - Simplifies the interop with other applications
  - Depending on the implementation
- Versioning
  - Allows for breaking changes whilst integrated systems can work as-is

### File Transfer

Each application produces files containing the information required across
applications. The integrated applications can interact with files periodically,
on-write, or something else depending on the business needs. Either way, a
standard file format is best practise.

If the applications do not prefer the same file format, extract-transform-load
(ETL) tools manage the interop between formats, e.g., JSON ↔️ XML

### Data Sharing

Just that, most commonly with a database.

Database replication is used to reduce an applications access to a dataset by
replicating a subset of a database to another. This accommodates for simple
business needs, e.g., a parent application updating the dataset for a child
periodically. It's also beneficial for security reasons, i.e., a product
catalogue production system need not know about personnel.

### Remote Procedure Invocation (RPI)

Applications implementing RPI provide an interface to invoke functionality
remotely, providing each application with complete control over its exposed
data.

The most common example is the REST(ful) protocol for APIs. The Remote Procedure
Call (RPC) protocol is more function-oriented; web interfaces are defined
similar to functions, from which libraries offer various levels of abstraction
to invoke them in application code.

### Messaging

Using a shared message bus, packets of data are accessible to all subsystem in
the application. The subsystems do not need information about each other, only
the protocol of the message provider and the message format like JSON.

By nature, messaging is immediate, reliable, and asynchronous. However, the host
application needs to handle invalid and stale messages, (potentially) lots of
subscribers, and possibly support serial messages (i.e., multiple, ordered
messages).
