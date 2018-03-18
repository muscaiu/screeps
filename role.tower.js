module.exports = () => {
    
    const towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);

    for(let tower of towers){
        //repair
        let closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: s => s.hits < s.hitsMax,
            filter: {structureType: STRUCTURE_CONTAINER}
        });
        if (closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }
        //attack
        let closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS)
        if (closestHostile) {
            tower.attack(closestHostile);
        }
    }
}
