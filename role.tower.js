const towerScript = (() => {
  const tower1 = Game.getObjectById('5aa23224235f615d916107de');

  if (tower1) {
      let closestDamagedStructure = tower1.pos.findClosestByRange(FIND_STRUCTURES, {
          filter: structure => structure.hits < structure.hitsMax,
          filter: {structureType: STRUCTURE_CONTAINER}
      });
      if (closestDamagedStructure) {
          tower1.repair(closestDamagedStructure);
      }

      let closestHostile = tower1.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
      if (closestHostile) {
          tower1.attack(closestHostile);
      }
  }
})()

module.exports = towerScript;