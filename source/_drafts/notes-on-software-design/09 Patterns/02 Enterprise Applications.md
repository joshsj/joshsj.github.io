# Enterprise Applications

Firstly, we're talking business things, such as banking,
patient care, shipping, and insurance. This brings a lot of
complexities:

- Lot of persistent data
- Concurrent data access
- Varying, complex UIs
- Integrations with other enterprise applications
- Conceptual dissonance (how we expect people to use it)
- Complex business logic
- Performance
- Scalability

## Common concerns

At an architecture level, its **layering** can be a big
point of discussion. Traditionally, the approach has been
[horizontal](../05%20Design%20Process/04%20Refinement.md#layering)
but trends indicate this is changing <sup>(for the
better)</sup>. Naturally, the implementation context is a
factor in this decision, as the language itself along with
its frameworks can make development easier.

Another concern is **domain logic** and **authorization**;
where does it belong: database or backend application code?
Should the UI apply the same rules to hide
inoperable/unavailable paths? <sup>(probably)</sup>

## Trends in architecture

Traditionally enterprise applications have been developed as
monoliths: (very) large applications which perform related
tasks to solve a range of business needs, hosted in a single
location.

However the industry is trending towards distributed
systems, which decomposes the system into subsystems to be
developed and hosted independently.

## Layering

Enterprise software (almost) always consists of three
principle layers, although different architecture patterns
will use different terminology.

**Presentation**

The presentation layer defines how the product is 'exposed'.

For client-facing exposure, i.e., user interfaces, the
Model-View-Controller (MVC) pattern is the most widely used
pattern, with Model-View-ViewModel (MVVM) also proving
popular.

For technical exposure, APIs and sockets are very common,
implementing additional protocols such as REST and SOAP for
standardisation.

**Business** (or domain)

The business layer is responsible for applying business
logic. It also manages domain models, which represent
concepts used in the business context. These can be
data-based, like a `Report`, or technical, like a
`ReportQueue`.

Simple domain models map (pretty much) directly to the
database tables, storing no logic on their instances.
Instead, corresponding components will store the business
logic for domain objects, e.g., a `ProductBusiness`.

However, for newer approaches like domain-driven design
(DDD) considers these models 'anaemic', and instead poses...

Rich domain models store complex business logic inside
instances. They do not necessarily map directly to a
database object, and as such require an additional layer is
required for persistence.

**Data** (or data source/persistence)

The data layer maps the domain models to persistable
objects, such as documents or relational tables. It also
exposes operations to access the domain models, i.e., 'find'
or 'insert'.

## Concurrency

...is implemented using locks, which prevent operations on a
record.

An **optimistic lock** use a timestamp or version field to
ensure one session cannot commit changes to field(s) if
another session has updated since. This allows multiple
sessions to update records at the 'same time', however the
integrity of the data can be warped from a business
perspective e.g., if a user updates a field after
considering the value other another field which has since
been updated.

Preventing all concurrent access is achieved with a
**pessimistic lock**, which prevents simultaneous. reads
and/or writes, usually at a database level. This however can
create deadlocks.

## State

...of the application does what it says on the tin, stored
on the client and/or server and/or database.
