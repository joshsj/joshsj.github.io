// Take in a value, return a value wrapped in a Promise
type Step<Current, Next> = (state: Current) => Promise<Next>;

// Store an initial state to kick things off
type PipelineBuilder<Initial, Current> = {
  // Store a handler for the current state and move onto the next state
  add: <Next>(f: Step<Current, Next>) => PipelineBuilder<Initial, Next>;
  
  // Compose the added functions
  build: () => Step<Initial, Current>;
};

type Pipeline = <Initial>() => PipelineBuilder<Initial, Initial>;