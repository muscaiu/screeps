module.exports = (creep) =>{
  const droppedEnergy = creep.pos.findInRange(
      FIND_DROPPED_RESOURCES,
      1
  );

  if (droppedEnergy[0] > 20) {
      console.log(creep.name + ' found ' + droppedEnergy[0].energy + ' energy');
      creep.pickup(droppedEnergy[0]);
  }
}