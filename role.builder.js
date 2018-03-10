const findEnergy = require('find.energy');
const roleUpgrader = require('role.upgrader');

module.exports = (creep) => {
    if (creep.memory.building && creep.carry.energy == 0) {
        creep.memory.building = false;
    }
    if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
        creep.memory.building = true;
    }

    if (creep.memory.building) {
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
        findEnergy(creep);
        const sources = creep.room.find(FIND_SOURCES);
        if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[1]);
        }
    }
};

