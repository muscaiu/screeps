const roleBuilder = require('role.builder');
const findEnergy = require('find.energy');

module.exports = (creep) => {
    if (creep.memory.working && creep.carry.energy == 0) {
        creep.memory.working = false;
    }
    if (!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
        creep.memory.working = true;
    }
    if (creep.memory.working == true) {
        //return
        var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
            filter: (s) => (s.structureType == STRUCTURE_SPAWN
                            || s.structureType == STRUCTURE_EXTENSION
                            || s.structureType == STRUCTURE_TOWER)
                            && s.energy < s.energyCapacity
        });
        if (structure != undefined) {
            if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(structure);
            }
        }else{
            creep.say('H->B');
            roleBuilder(creep);
        }
    }
    else {
        //harvest
        const sources = creep.room.find(FIND_SOURCES);
        findEnergy(creep);
        if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[1]);
        }
    }
}