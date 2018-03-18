const findEnergy = require('find.energy');
const roleBuilder = require('role.builder');

//harvest return to extensions, or upgrade(1)
module.exports =(creep) => {
    
    if (creep.memory.working && creep.carry.energy == 0) {
        creep.memory.working = false;
    }
    if (!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
        creep.memory.working = true;
    }
    
    if (creep.carry.energy < creep.carryCapacity) {
        //harvest
        findEnergy(creep);
        var sources = creep.room.find(FIND_SOURCES);
        if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[1]);
        }
    }else {
        //return
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: s => {
                return (s.structureType == STRUCTURE_EXTENSION
                    || s.structureType == STRUCTURE_SPAWN
                    || s.structureType == STRUCTURE_TOWER
                ) && s.energy < s.energyCapacity;
            }
        });
        if (targets.length > 0) {
            if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0]);
            }
        }else{
            creep.say('H->B');
            roleBuilder(creep);
        }
    }
}
