public class AuthOptions
{
  public TimeSpan CookieLifeTime { get; set; }
}

services.Configure<AuthOptions>(configuration.GetSection("Auth"));