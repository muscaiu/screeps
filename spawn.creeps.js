const respwanCreeps = (creepType, creepLimit, creepBody) => {
    const totalCreeps = _.filter(Game.creeps, (creep) => creep.memory.role == creepType);
    
    if (totalCreeps.length < creepLimit) {
      const newName = creepType + Game.time;
      console.log('Spawning new '+ creepType + newName);
      Game.spawns['Aden'].spawnCreep(creepBody, newName,
        { memory: { role: creepType } });
    }
}


module.exports = respwanCreeps;