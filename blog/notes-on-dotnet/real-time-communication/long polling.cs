OrderUpdate? result;

while (true)
{
  result = await orderChecker.GetUpdate(orderId);

  if (result.HasValue) { return result; }

  await Task.Delay(3000); // polling interval
}