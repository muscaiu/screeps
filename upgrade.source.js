const upgrade = (creep, source) => {
    if (creep.memory.upgrading && creep.carry.energy == 0) {
      creep.memory.upgrading = false;
      creep.say('mining')
    }
    if (!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
      creep.memory.upgrading = true;
      creep.say('upgrading')
    }

    if (creep.memory.upgrading) {
      if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
        creep.moveTo(creep.room.controller);
      }
    }else {
    //   creep.say('!upgrading')
    const sources = creep.room.find(FIND_SOURCES);
    if (creep.harvest(sources[source]) == ERR_NOT_IN_RANGE) {
        creep.moveTo(sources[source]);
    }
      
      //code to wirk with miner 
    //   const targets = creep.room.find(FIND_STRUCTURES, {
    //       filter: (structure) => {
    //         return (structure.structureType == STRUCTURE_CONTAINER )
    //             && (structure.store[RESOURCE_ENERGY] > 0)
    //       }
    //   })
    //   const source = creep.pos.findClosestByPath(containers);
    //   if(cpree.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
    //       creep.moveTo(source);
    //   }
      
    }
}

module.exports = upgrade;