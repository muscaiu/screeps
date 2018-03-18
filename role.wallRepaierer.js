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
        let walls = creep.room.find(FIND_STRUCTURES, {
            filter: s => s.structureType === STRUCTURE_WALL
        })
        let target = undefined;
        for (let percentage = 0.0001; percentage <= 1; percentage = percentage + 0.0001){
            target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_WALL &&
                               s.hits / s.hitsMax < percentage
            });
            if (target != undefined) {
                break;
            }
        }
        if(target != undefined){
            if(creep.repair(target) == ERR_NOT_IN_RANGE){
                creep.moveTo(target);
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
        if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0]);
        }
    }
};