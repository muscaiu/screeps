const upgrade = require('upgrade.source');

//build or upgrade(1)
const roleBuilder = (creep) => {
    const targets = creep.room.find(FIND_CONSTRUCTION_SITES);
    if (creep.memory.building && creep.carry.energy == 0) {
        creep.memory.building = false;
        creep.say('buildUpgr');
    }
    if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
        if(targets.length){
            creep.say('🚧 building');
            creep.memory.building = true;
        }else{
            creep.say('buildMine');
            creep.memory.building = false;
        }
    }
    
    if (creep.memory.building) {
        if (targets.length) {
            if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
            }else{
                if(creep.carry.energy == 0){
                    creep.memory.building = false;    
                }
            }
        }
    } else {
        upgrade(creep, 1)
    }
};
module.exports = roleBuilder;

