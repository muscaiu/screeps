module.exports = (spawn) => {
    const towers = spawn.room.find(FIND_MY_STRUCTURES, {
        filter: { structureType: STRUCTURE_TOWER }
    });
    const roomName = spawn.room.name;
    const hostiles = Game.rooms[roomName].find(FIND_HOSTILE_CREEPS);

    for(const tower of towers){
        // repair
        const closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: s => s.hits < s.hitsMax,
            filter: {structureType: STRUCTURE_CONTAINER}
        });
        if (closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }
        
        // attack
        if(hostiles.length > 0) {
            const creepOwner = hostiles[0].owner.username;
            Game.notify(`User ${creepOwner} spotted in room ${roomName}`);
            console.log(`User ${creepOwner} spotted in room ${roomName}`)
            tower.attack(hostiles[0])
        }
    }
    
    
    // var hostiles = Game.rooms['W7N27'].find(FIND_HOSTILE_CREEPS);
    // if(hostiles.length > 0) {
    //     var username = hostiles[0].owner.username;
    //     // Game.notify(`User ${username} spotted in room ${roomName}`);
    //     var towers = Game.rooms['W7N27'].find(
    //         FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
    //     towers.forEach(tower => tower.attack(hostiles[0]));
    // }
}
