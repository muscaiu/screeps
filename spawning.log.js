module.exports = (
    spawn,
    creepRole, 
    creepLimit, 
    creepBody,
    target
    ) => {
const totalCreeps = _.filter(Game.creeps, (creep) => creep.memory.role == creepRole);

if (totalCreeps.length < creepLimit) {
  const newName = `${creepRole}-${Game.time.toString().substring(4,8)}`;
  
  console.log(`${spawn} new  mini-${creepRole}: ${newName}`);
  
  spawn.spawnCreep(
      creepBody, 
      newName, 
      { 
          memory: {
              role: creepRole ,
              target
          } 
          
      });
}
}
