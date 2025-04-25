const macroFunctions = {
  "SINGULARITY": {
    description: "Performs a singularity reset",
    execute: () => { RESETS["black-hole"].doReset() }, 
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
    execute: () => { hadron: {
        get require() { if (!tmp.bh_pause && not_reset) this.doReset();
        },
        doReset() {
            const DATA = getPlayerData()

            for (let i = 0; i < 12; i++) player.core.reactor[i] = E(0);

            for (let i = 16; i < 18; i++) player.singularity.upgs[i] = E(0);

            // player.singularity.best_bh = E(0)
            player.singularity.dm = E(0)
            player.singularity.total_dm = E(0)

            player.singularity.bh_tier = E(0)

            player.solar_system.rocket_parts = DATA.solar_system.rocket_parts
            player.solar_system.completion = {}

            for (let x of PRE_HADRON_RESEARCH) player.research[x] = E(0);

            player.humanoid.mining_ascend = E(0)
            for (let x = 0; x < ORE_KEYS.length; x++) player.humanoid.ores[ORE_KEYS[x]] = E(0);
            resetSharkUpgrades('m6','m7','m8','m9')

            if (player.hadron.starter_upgs.includes(6)) {
                player.research.dm1 = E(8)
                player.research.r3 = E(1)
                player.research.t3 = E(1)
            }

            player.shark_tier = E(0)
            player.hadron.gal_explore.best_fish = E(0)

            RESETS.sacrifice.doReset()
        }, }
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
    execute: () => { // wip }
  },
  "END": {
    description: "ends",
    execute: () => { // game logic to end a block }
  }
};
