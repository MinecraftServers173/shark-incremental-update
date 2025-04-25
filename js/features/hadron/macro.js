const macroFunctions = {
  "SINGULARITY": {
    description: "Performs a singularity reset",
    execute: () => { get require() { return player.fish.gte(CURRENCIES['dark-matter'].require) && player.singularity.bh.gte(8) },
        reset(force) {
            if (!force) {
                gainCurrency('dark-matter',tmp.currency_gain['dark-matter'])
                player.singularity.sac_times++
                increaseFeature(19)
            }

            this.doReset()
        },
        doReset() {
            player.singularity.bh = player.research.dm1

            if (!hasSMilestone(10)) resetResearch('s1','s2','s3');

            RESETS["black-hole"].doReset()
        }, }
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
        get require() { return tmp.ss_difficulty == 0 && player.fish.gte(CURRENCIES.hadron.require) },
        reset(force) {
            let not_reset = true

            if (!force && !tmp.bh_pause) {
                if (player.hadron.times < 10) {
                    not_reset = false
                    tmp.bh_pause = true

                    el('hadron-cutscene').style.pointerEvents = 'all'
                    el('hadron-cutscene').style.opacity = 1

                    setTimeout(() => {
                        el('hadron-cutscene-text').style.opacity = 1

                        let t = lang_text('hadron-cutscenes')
                        el('hadron-cutscene-text').innerHTML = Math.random() < .1 ? `<img src='https://preview.redd.it/ki2tlww8buw71.jpg?width=640&crop=smart&auto=webp&s=272422f998facab8af8505fd812eae511fecf2a8'>` : t[Math.floor(Math.random()*t.length)]

                        setTimeout(() => {
                            el('hadron-cutscene-text').style.opacity = 0
        
                            setTimeout(() => {
                                el('hadron-cutscene').style.opacity = 0

                                tmp.bh_pause = false
                                gainCurrency('hadron',tmp.currency_gain.hadron)
                                player.hadron.times++
                                increaseFeature(21)

                                updateTemp()
                                this.doReset()

                                setTimeout(() => {
                                    el('hadron-cutscene').style.pointerEvents = 'none'
                                }, 5000);
                            }, 5000);
                        }, 10000);
                    }, 5000);
                } else {
                    gainCurrency('hadron',tmp.currency_gain.hadron)
                    player.hadron.times++
                    increaseFeature(21)
                }
            }

            if (!tmp.bh_pause && not_reset) this.doReset();
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
    execute: () => { /* game logic to stop the macro */ }
  },
  "END": {
    description: "ends",
    execute: () => { /* game logic to end a block */ }
  }
};
