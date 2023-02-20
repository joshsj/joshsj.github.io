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