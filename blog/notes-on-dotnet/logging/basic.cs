public class SomeService
{
  public SomeService(ILogger<IndexModel> logger) {...}
  public void SomeMethod()
  {
    logger.LogInformation("something");
    logger.Log(LogLevel.Error, "something else");
  }
}
