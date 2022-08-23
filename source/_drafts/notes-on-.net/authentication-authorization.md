---
title: Authentication & Authorization
date: 2022-08-23
tags:
  - C#
  - .NET
---

ASP.NET uses 'authentication schemes' like cookies or HTTP basic to authenticate
users. The `ClaimsPrinciple` class represents the user which accepts
`ClaimsIdentity` objects for each authentication scheme. This class collects
`Claim`s, created when authenticated, that describe the identity, e.g.,
usernames and passwords.

'Scheme actions' indicate which scheme to use when:

- Authenticate, responsible for constructing the users' identity based on the
  request context (e.g., from a cookie)
- Challenge, responsible for handling unauthenticated requests (usually a prompt
  to log in)
- Forbid, responsible for handing authenticated requests from an authenticated
  user (403)

It is added to MVC through dependency injection, set-up with
`AddAuthentication()`, in which the default scheme can be specified. Scheme
names serve as the lookup string for the authentication method, specified when
adding the scheme. Authentication is added as middleware before authorization
and endpoints.

```c#
services.AddAuthentication(
  // set cookies as default scheme
  CookieAuthenticationDefaults.AuthenticationScheme)
  .addCookie(
    // scheme name or default
  );

app.UseAuthentication();
```

To use authentication by default, add it as a filter to MVC:

```c#
services.AddControllersWithViews(options =>
  options.Filters.Add(new AuthorizeFilter()));
```

Per-controller or per-action authentication can be enabled/disabled with the
`[Authorize]` and `[AllowAnonymous]` attributes respectively.

## Login

Paths to login and logout pages can be specified as options on the dependency,
with a default 'account/login'. The action receives a return URL to go-to once
authenticated.

Login pages need the `[AllowAnonymous]` attribute.

```c#
public class AccountController : Controller
{
  [HttpGet]
  [AllowAnonymous]
  // login page
  public async Task<IActionResult> Login(string returnUrl = "/") // with default
    => View(...);

  [HttpPost]
  [AllowAnonymous]
  // authentication from page
  public async Task<IActionResult> Login(LoginModel model) {} // scheme dependant
```

Once authenticated in POST, **always redirect locally** to prevent redirect
attacks.

## Logout

Logging out species the auth scheme;

```c#
public async Task<IActionResult> Logout()
{
  await HttpContext.SignOutAsync(
    // scheme name
  );

  return Redirect("/");
}
```

## Cookie authentication

Authentication with cookies uses an identity cookie used to associate requests
with a user. They are encrypted symmetrically using a key only known to the
server.

ASP.NET reconstructs the `ClaimPrinciple` using the cookie data, and is secured
by ASP.NET Core Data Protection which periodically changes its encryption key.

```c#
[HttpPost]
[AllowAnonymous]
public async Task<IActionResult> Login(LoginModel model) // with default
{
  var user = // get user from repo

  // create the user claims
  var claims = new List<Claim>
  {
    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
    new Claim(ClaimTypes.Name, user.Name),
    new Claim(ClaimTypes.Role, user.Role),
  };

  // create an identity and principle
  var identity = new ClaimsIdentity(claims,
  CookieAuthenticationDefaults.AuthenticationScheme);
  var principle = new ClaimsPrinciple(identity);

  // sign the user in
  await HttpContext.SignInAsync(
    CookieAuthenticationDefaults.AuthenticationScheme,
    principle,
    new AuthenticationProperties { IsPersistent = model.StaySignedIn }
  );

  // redirect somewhere locally
}
```

One downside to cookies is their lifetime; if an employee is fired but their
cookie is still live, they can still sign in. This can be surpassed using
additional events.

## External authentication providers

Instead of developing new authentication systems, popular companies allow sites
to user theirs instead. Microsoft has NuGet packages for Google, Facebook,
Microsoft, and Twitter.

For example, using Google authentication requires the
`Microsoft.AspNetCore.Authentication.Google` package. Google provides a
'ClientId' and 'ClientSecret' when you create a project with them; store 'em in
user secrets and provide them when adding the service:

```c#
services.AddAuthentication().AddGoogle( options => {
  options.ClientId = Configuration.Get<String>("Google:ClientId");
  options.ClientSecret = Configuration.Get<String>("Google:ClientSecret");
});
```

Now Google can authenticate users by handle challenge actions, and cookies can
handle authenticate actions. This is configured via `AddAuthentication`:

```c#
services.AddAuthentication(options => {
  // configure as default
  options.DefaultScheme
    = CookieAuthenticationDefaults.AuthenticationScheme;

  // provide google auth as challenge scheme
  options.DefaultChallengeScheme
    = GoogleDefaults.AuthenticationScheme;
});
```
