const roleMiner = (creep) => {
    let source = Game.getObjectById(creep.memory.sourceId);
    let container = source.pos.findInRange(FIND_STRUCTURES, 1, {
        filter: s => s.structureType == STRUCTURE_CONTAINER
    })[0];
    
    if(creep.pos.isEqualTo(container.pos)){
        creep.harvest(source);
    }
    else{
        creep.moveTo(container);
    }
    
    // const targets = creep.room.find(FIND_STRUCTURES, {
    //     filter: (structure) => {
    //         return (structure.structureType == STRUCTURE_CONTAINER) && (structure.store[RESOURCE_ENERGY] < structure.storeCapacity);
    //     }
    // });
   
    // if(targets.length > 0) {
    //     if(creep.carry.energy < creep.carryCapacity){
    //         const source = creep.pos.findClosestByPath(FIND_SOURCES);
    //         if(creep.harvest(source) == ERR_NOT_IN_RANGE){
    //             creep.moveTo(source);
    //         }
    //     } else{
    //         if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
    //             creep.moveTo(targets[0]);
    //         }
    //     }
    // }
};

module.exports = roleMiner;