module.exports = (creep, energySource = 0) => {
    if (creep.memory.working && creep.carry.energy == 0) {
        // creep.say('mining')
        creep.memory.working = false;
    }
    if (!creep.memory.working && creep.carry.energy == creep.carryCapacity) {
        // creep.say('working')
        creep.memory.working = true;
    }

    if (creep.memory.working) {
        if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
        }
    }
    // else {
    //     const sources = creep.room.find(FIND_SOURCES);
    //     if (creep.harvest(sources[energySource]) == ERR_NOT_IN_RANGE) {
    //         creep.moveTo(sources[energySource]);
    //     }
    // }
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
}