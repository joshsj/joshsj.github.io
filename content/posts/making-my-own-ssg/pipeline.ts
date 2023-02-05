const generate = pipeline()
  .add(setDefaultConfig) // In case .env is missing
  .add(loadConfig)       // Load from .env
  .add(readSource)       // Read in the source files
  .add(categoriseFiles)  // Asset or page?
  .add(transformFiles)   // See above
  .add(writeBuild)       // Write the build files
  .build();              // Compose the functions

await generate();