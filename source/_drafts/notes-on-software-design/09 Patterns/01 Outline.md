# Outline

Design patterns are a Reusable solution to a commonly
occurring problem within a given context. They are only a
template, so they cannot be transformed directly into code
and are a starting point: not a final decision.

## Types

**Architectural** patterns provide a fundamental system of
organisation and structure. They define conceptual units and
their relationships:

- N-tier
- Onion
- Model-View-Controller (MVC)
- Command Query Responsibility Segregation (CQRS)
- Inversion of Control (IOC)

**Design** patterns provide a scheme to implement features
of a system, or their relationships:

- Observer
- Builder
- Abstraction

An **idiom** is any low-level pattern in a given programming
language, describing how to approach the implementation of a
feature:

| Approach                | Imperative    | Functional |
| ----------------------- | ------------- | ---------- |
| Mutable objects         | ✔️            | ❌         |
| Default null references | ✔️            | ❌         |
| Operations              | Class methods | Functions  |
