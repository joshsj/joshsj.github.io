---
title: Configuration & Options
date: 2022-08-22
tags:
  - C#
  - .NET
---

Configuration functionality comes from the `Microsoft.Extensions.Configuration`
package.<!-- more --> Data is accessed using key-value pairs; nested keys are
separated with colons (e.g., `Section1:Key1`).

Simple access to keys and values uses get methods:

{% caption "Basic configuration access" %}

```c#
IConfiguration config = null;

// Value access
config.GetValue<bool>("SomeBool");

// Nested values
config.GetValue<string>("NestedBool:AnotherBool");

// Section scope
var faveDrinks = config.GetSection("Favourites:Drinks");
var faveHotDrink = faveDrinks.GetValue<string>("Hot");
```

{% endcaption %}

Storing connection strings under the `ConnectionStrings` key is a common
pattern; `GetConnectionString(cs)` method automatically checks for a string
under the `ConnectionStrings` key.

## Configuration Sources

`appsettings.json` is the default configuration file used by .NET.
Environment-specific files can override the base config file; e.g.,
`appsettings.Development.json` or `appsettings.Staging.json`.

Similarly, Visual Studio has a `launchSettings.json` which uses `__` for a
hierarchy spacer.

Environment variables can overwrite values further: `$Favourites__Food=Banana`.

Finally, command-line arguments can also be used:
`$ dotnet run --Favourites:Food Banana`

## Security

Storing secure data in files is bad as they either live in source control or on
deployment platforms. Dotnet provides `user-secrets` to store secure data at
development-time instead:
`$ dotnet user-secrets set "Favourites:Food" "Banana"`.

For production, Azure Key Vault can be implemented with the
`Microsoft.Azure.Services.AppAuthentication` and
`Microsoft.Extensions.Configuration.AzureKeyVault` packages.

## Options Pattern

Although `IConfiguration` **can** be injected, using getters with magic
string/static constant strings isn't ideal. The Options pattern is much cleaner
and robust, using models matching the structure of configuration data.

{% caption "Basic Options registration" %}

```c#
public class AuthOptions
{
  public TimeSpan CookieLifeTime { get; set; }
}

services.Configure<AuthOptions>(configuration.GetSection("Auth"));
```

{% endcaption %}

## Live Updates

The standard `Configure` method registers a singleton. Alternatively, the
`IOptionsSnapshot<>` interface registers configs as scoped dependencies which
provides the latest configuration data on construction.

For the latest data every time, use the `CurrentValue` property offered by
`IOptionsMonitor<>`.

## Validation

The extension method `ValidateDataAnnotations()` can validate configuration
files against attributes like `[Required]`.

**Note:** validation is triggered on the first access to the object, not on
creation, so be smart when using this.
