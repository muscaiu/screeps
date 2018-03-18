const roleBuilder = require('role.builder');

module.exports =(creep) => {
    if (creep.memory.working && creep.carry.energy == 0) {
        creep.memory.working = false;
        creep.say('LH !work')
    }
    if (!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
        creep.memory.working = true;
        creep.say('LH work')
    }
    if (creep.memory.working == true) {
        if (creep.room.name == creep.memory.home) {
            creep.say('ImHome')
            var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: s => (s.structureType == STRUCTURE_SPAWN
                             || s.structureType == STRUCTURE_EXTENSION
                             || s.structureType == STRUCTURE_TOWER)
                             && s.energy < s.energyCapacity
            });
            if (structure != undefined) {
                if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
            }else{
                creep.say('LD -> B');
                roleBuilder(creep);
            }
        }
        else {
            creep.say('nextroom')
            var exit = creep.room.findExitTo(creep.memory.home);
            creep.moveTo(creep.pos.findClosestByRange(exit));
        }
    }else {
        if (creep.room.name == creep.memory.target) {
            creep.say(creep.memory.target)
            var source = creep.room.find(FIND_SOURCES)[creep.memory.sourceIndex];
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
        else {
            creep.say('GoWork')
            var exit = creep.room.findExitTo(creep.memory.target);
            creep.moveTo(creep.pos.findClosestByRange(exit));
        }
    }
}
