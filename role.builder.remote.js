const roleUpgrader = require('role.upgrader');

module.exports = (creep) => {
    // if in target room
    if (creep.memory.target != undefined && creep.room.name != creep.memory.target) {
        // find exit to target room
        let exit = creep.room.findExitTo(creep.memory.target);
        // move to exit
        creep.moveTo(creep.pos.findClosestByRange(exit));
        // return the function to not do anything else
        return;
    }

    if (creep.memory.working && creep.carry.energy == 0) {
        creep.memory.working = false;
    }
    if (!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
        creep.memory.working = true;
    }

    if (creep.memory.working) {
        //build
        const constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
        if (constructionSite != undefined) {
            if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                  creep.moveTo(constructionSite);
            }
        }else{
            creep.say('B -> U')
            roleUpgrader(creep);
        }
    }
    else {
        // find closest container
        let container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: s => (s.structureType == STRUCTURE_CONTAINER||
                    s.structureType == STRUCTURE_STORAGE)
                    && s.store[RESOURCE_ENERGY] > 500
        });
        // if one was found
        if (container != undefined) {
            // try to withdraw energy, if the container is not in range
            if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                // move towards it
                creep.moveTo(container);
            }
        }
        else {
            // find closest source
            var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            // try to harvest energy, if the source is not in range
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                // move towards it
                creep.moveTo(source);
            }
        }
    }
};

