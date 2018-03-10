module.exports = (creep, energySource) => {
  if (creep.memory.upgrading && creep.carry.energy == 0) {
      creep.say('mining')
      creep.memory.upgrading = false;
  }
  if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
      creep.say('upgrading')
      creep.memory.upgrading = true;
  }

  if (creep.memory.upgrading) {
      if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
          creep.moveTo(creep.room.controller);
      }
  }else {
      const sources = creep.room.find(FIND_SOURCES);
      if (creep.harvest(sources[energySource]) == ERR_NOT_IN_RANGE) {
          creep.moveTo(sources[energySource]);
      }
  }
}
