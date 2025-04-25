const macroFunctions = {
  "SINGULARITY": {
    description: "Performs a singularity reset",
    execute: () => { /* game logic for singularity reset */ }
  },
  "ENTER-GAL-EXPLORE": {
    description: "Enters a galactic exploration oceans",
    execute: () => { /* game logic for entering galactic exploration */ }
  },
  "UPG-NUCLEOBASES": {
    description: "Auto-upgrade nucleobases",
    execute: () => { /* game logic for auto-upgrading nucleobases */ }
  },
  "HADRONIZE": {
    description: "Performs a Hadronize reset",
    execute: () => { /* game logic for Hadronize reset */ }
  },
  "WAIT": {
    description: "wait [] SECONDS - wait",
    execute: (seconds) => { return new Promise(resolve => setTimeout(resolve, seconds * 1000)) },
    parameters: ["seconds"]
  },
  "REPEAT": {
    description: "REPEAT [] - repeats",
    execute: (times, commands) => {
      for (let i = 0; i < times; i++) {
        commands.forEach(command => command.execute());
      }
    },
    parameters: ["times", "commands"]
  },
  "FOREVER": {
    description: "repeats infinitely",
    execute: (commands) => {
      while (true) {
         commands.forEach(command => command.execute());
      }
    },
    parameters: ["commands"]
  },
  "IF": {
    description: "IF <> THEN - function",
    execute: (condition, thenCommands) => {
      if (condition()) {
        thenCommands.forEach(command => command.execute());
      }
    },
    parameters: ["condition", "thenCommands"]
  },
  "STOP": {
    description: "stops",
    execute: () => { /* game logic to stop the macro */ }
  },
  "END": {
    description: "ends",
    execute: () => { /* game logic to end a block */ }
  }
};
