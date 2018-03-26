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
        
        // var hostiles = Game.rooms['W7N27'].find(FIND_HOSTILE_CREEPS);
        // if(hostiles.length > 0) {
        //     var username = hostiles[0].owner.username;
        //     // Game.notify(`User ${username} spotted in room ${roomName}`);
        //     var towers = Game.rooms['W7N27'].find(
        //         FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
        //     towers.forEach(tower => tower.attack(hostiles[0]));
        // }
        
        let closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS)
        if (closestHostile) {
            tower.attack(closestHostile[0]);
        }
    }
}
