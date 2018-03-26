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
        
        if(structure == undefined){
            structure = creep.room.storage;
        }
        
        if (structure != undefined) {
            if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(structure);
            }
        }else{
            creep.say('H->Store');
            roleBuilder(creep);
        }
    }
    else {
        // find closest source
        var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);

        if (source == undefined) {
            source = creep.room.storage;
        }

        // try to harvest energy, if the source is not in range
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
            // move towards the source
            creep.moveTo(source);
        }
    }
}