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
    }else {
        const sources = creep.room.find(FIND_SOURCES);
        if (creep.harvest(sources[energySource]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[energySource]);
        }
    }
}