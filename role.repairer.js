const roleBuilder = require('role.builder');

module.exports = (creep) => {
    if (creep.memory.working == true && creep.carry.energy == 0) {
        creep.memory.working = false;
    }
    else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
        creep.memory.working = true;
    }


    if (creep.memory.working == true) {
        var damagedStructure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
        });

        if (damagedStructure != undefined) {
            creep.say('repairing');
            if (creep.repair(damagedStructure) == ERR_NOT_IN_RANGE) {
                creep.moveTo(damagedStructure);
            }
        }
        else {
            creep.say('RepBiuldMod');
            roleBuilder.run(creep);
        }
    }
    else {
        var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }
    }
};