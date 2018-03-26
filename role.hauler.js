const roleHauler = (creep) => {
  // if creep is bringing energy to a structure but has no energy left
  if (creep.memory.working == true && creep.carry.energy == 0) {
      // switch state
      creep.memory.working = false;
  }
  // if creep is harvesting energy but is full
  else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
      // switch state
      creep.memory.working = true;
  }
  
  // if creep is supposed to transfer energy to a structure
  if (creep.memory.working == true) {
      // find closest spawn, extension or tower which is not full
      let structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
          // the second argument for findClosestByPath is an object which takes
          // a property called filter which can be a function
          // we use the arrow operator to define it
          filter: (s) => (s.structureType == STRUCTURE_SPAWN
                       || s.structureType == STRUCTURE_EXTENSION
                       || s.structureType == STRUCTURE_TOWER)
                       && s.energy < s.energyCapacity
      });
  
      // if we found one
      if(structure == undefined){
          structure = creep.room.storage;
      }
      if (structure != undefined) {
          // try to transfer energy, if it is not in range
          if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
              // move towards it
              creep.moveTo(structure);
          }
      }
  }
  // if creep is supposed to get energy
  else {
      // find closest container
      let container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
          filter: s => s.structureType == 
              STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 300
      });
      let backupContainers = creep.room.find(FIND_STRUCTURES, {
          filter: s => s.structureType == 
              STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 300
      });
      let backupContainer = backupContainers[1];

      if (container != undefined) {
          if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
              creep.moveTo(container);
          }
      }else if(backupContainer){
          creep.say('backup')
          if (creep.withdraw(backupContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
              creep.moveTo(backupContainer);
          }
      }else{
          container = creep.room.storage;
      }
  }
}

module.exports = roleHauler;