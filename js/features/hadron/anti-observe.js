const antiObservations = {
  Void: {
    description: "It unlocks 8 new research.",
    unlocks: "newResearch", // Example, replace with actual research IDs/names
    onUnlock: () => {
      // Logic to unlock new research
    }
  },
  Null: {
    description: "x1000 remnants.",
    effect: () => 1000 * remnants, // Assuming 'remnants' is defined elsewhere
    onUnlock: () => {
      // Logic to apply the remnant bonus
    }
  },
  Ancient: {
    description: "Unlocks Simulation Ascension.",
    unlocks: "simulationAscension",
    onUnlock: () => {
      // Logic to unlock Simulation Ascension
    }
  },
  Obelisk: {
    description: "Unlocks Obelisks. There are 3 Obelisks: Solar, Lunar and Twilight.",
    unlocks: "obelisks",
    obelisks: ["Solar", "Lunar", "Twilight"],
    onUnlock: () => {
      // Logic to unlock Obelisks
    }
  },
  Sunset: {
    description: "Galactic Exploration boost.",
    boostType: "galacticExploration",
    onUnlock: () => {
      // Logic to apply the Galactic Exploration boost
    }
  }
};

function unlockAntiObservation(type) {
  if (antiObservations[type]) {
    console.log(`Unlocking Anti-Observation: ${type}`);
    antiObservations[type].onUnlock();
    // Additional logic to mark the Anti-Observation as unlocked
  } else {
    console.warn(`Anti-Observation type "${type}" not found.`);
  }
}

// Example usage:
// unlockAntiObservation("Null");

//After Anti-Observation: Replaced Exploration to Glyphs.
function replaceExplorationWithGlyphs() {
    //Code to replace exploration with glyphs functionality
}
