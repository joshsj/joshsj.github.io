---
title: Logging
date: 2022-08-22
tags:
  - C#
  - .NET
---

Logging comes out of the box with ASP using `ILogger<>` from the
`Microsoft.Extensions.Logging` package.

<!-- more -->

The generic parameter specifies a _category_ (the source of the log). Its
arbitrary but the enclosing class is the convention. The log _level_ (how bad it
is) is specified with the `LogLevel` enum or dedicated methods.

```c#
public class SomeService
{
  public SomeService(ILogger<IndexModel> logger) {...}

  public void SomeMethod()
  {
    logger.LogInformation("something");
    logger.Log(LogLevel.Error, "something else");
  }
}
```

We can specify the minimum severity of logs per-assembly using _filters_.

```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft": "Warning"
    }
  }
}
```

## Grouping

Proving an _Event ID_ with the log message allows

For console logging, we can also use a scope.

```c#
using (_logger.BeginScope("using block message")) {...}
```

## Performance

Logging can introduce performance issues in many applications. Unless a
directly-loggable value is provided (basically primitives), the logger needs to
do some conversion/serialisation. Combine that with the fact that console
logging is synchronous and the overhead can be comparatively huge.

By defining a delegate with the `LoggerMessage` class, we can create s
cache-able delegates with strong types, requiring fewer allocations and
eliminating boxing to reduce computational overhead.

{% caption "`LoggerMessage` examples." %}

```c#
// No parameters
LoggerMessage.Define(
  LogLevel.Information,
  0, // ID
  "Gonna do something"
);

// One parameter of int
withParam = LoggerMessage.Define<int>(
  LogLevel.Warning,
  1,
  "User not found: {Id}"
);

// Scoped
LoggerMessage.DefineScope<int>("Scope with an int: {i}");
```

{% endcaption %}

## Custom Exception Handling

In the backend, custom exception handling is implemented via a filter deriving
from `ExceptionFilterAttribute`. .NET also offers an inbuilt exception page for
developers, added with `app.UseDeveloperExceptionPage()`.

In the frontend, `app.UseExceptionHandler("/Error")` specifies a Razor page to
display errors & exceptions to the user.

`UseExceptionHandler` middleware allows exceptions throughout the application to
be captured, and automates page redirects.

## Destinations

Also referred to as _providers_, _sinks_, or _targets_.

Files are the easiest choice but not the best:

- Plain text is hard to query making later analysis tricky
- Aggregating files from different servers/application/deployments is also
  tricky
- No native UI for files to browse them

Cloud-hosting services offer solutions, such as Azure's 'Application Insights'
or 'App Service Diagnostics', integrated into ASP with
`Microsoft.Extensions.Logging.AzureAppServices`

Packages like Serilog can connect to
[many external services](https://github.com/serilog/serilog/wiki/Provided-Sinks#list-of-available-sinks)
to store logs.
