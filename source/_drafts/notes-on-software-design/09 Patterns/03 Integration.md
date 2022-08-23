# Integration

Modern applications are rarely self-contained solutions;
instead they communicate with other applications consuming
and publishing data.

## Aims

- **Integration simplicity** reduces the likelihood of
  needing to update integration processes
- **Open standards** of protocols and data formats
  - Reduces single-use interop code
  - Negates conflicts with changes to standards
- **Non-proprietary technologies** eliminate specialised
  software and hardware
- **(A)synchronicity** simplifies the interop with other
  applications, depending on the implementation
- **Versioning** allows for breaking changes whilst
  integrated systems can work as-is

## Approaches

### File Transfer

Each application produces files containing the information
required across applications. The integrated applications
can interact with files periodically, on-write, or something
else depending on the business needs. Either way, a standard
file format is best practise.

If the applications do not prefer the same file format,
extract-transform-load (ETL) tools manage the interop
between formats, e.g., JSON ↔️ XML

### Data Sharing

Just that, most commonly with a database.

Database replication is used to reduce an applications
access to a dataset by replicating a subset of a database to
another. This accommodates for simple business needs, e.g.,
a parent application updating the dataset for a child
periodically. It's also beneficial for security reasons,
i.e., a product catalogue production system need not know
about personnel.

### Remote Procedure Invocation (RPI)

Applications implementing RPI provide an interface to invoke
functionality remotely, providing each application with
complete control over its exposed data.

The most common example is the REST(ful) protocol for APIs.
The Remote Procedure Call (RPC) protocol is more
function-oriented; web interfaces are defined similar to
functions, from which libraries offer various levels of
abstraction to invoke them in application code.

### Messaging

...sends packets of data to a shared message bus, from which
interested applications read. In this case, applications do
not need information about each other, only the protocol of
the message provider and the message format like JSON.

By nature, messaging is immediate, reliable, and
asynchronous. However, the host application needs to handle
invalid and stale messages, and potentially lots of
subscribers.
