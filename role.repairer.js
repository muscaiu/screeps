const roleBuilder = require('role.builder');
const findEnergy = require('find.energy');

module.exports = (creep) => {
    if (creep.memory.working && creep.carry.energy == 0) {
        creep.memory.working = false;
    }
    if (!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
        creep.memory.working = true;
    }

    if (creep.memory.working) {
        //repairing
        const damagedStructure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
        });
        if (damagedStructure != undefined) {
            if (creep.repair(damagedStructure) == ERR_NOT_IN_RANGE) {
                creep.moveTo(damagedStructure);
            }
        }
        else {
            creep.say('R -> B');
            roleBuilder(creep);
        }
    }
    else {
        //harvesting
        findEnergy(creep);
        const sources = creep.room.find(FIND_SOURCES);
        if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[1]);
        }
    }
};
