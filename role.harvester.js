const upgrade = require('upgrade.source');

//harvest return to extensions, or upgrade(1)
const roleHarvester = (creep) => {
    if(creep.memory.role == 'harvester'){
        
        //harvesting
        if (creep.carry.energy < creep.carryCapacity && creep.memory.harvesting) {
            const sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
        else {
            for (const roomName in Game.rooms) {
              const room = Game.rooms[roomName];
              //if room full energy => upgrade
              if (room.energyAvailable == room.energyCapacityAvailable) { 
                creep.memory.harvesting = false;
                creep.say('harUpgr')
                upgrade(creep, 1)
              } else {
              //if roon NOT full energy => harvest
                creep.memory.harvesting = true;
                creep.say('energyLow')
                const targets = creep.room.find(FIND_STRUCTURES, {
                  filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION
                      || structure.structureType == STRUCTURE_SPAWN
                      || structure.structureType == STRUCTURE_TOWER) &&
                      structure.energy < structure.energyCapacity;
                  }
                });
                if (targets.length > 0) {
                  if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                  }
                }
              }
            }
        }
    }
}
module.exports = roleHarvester;