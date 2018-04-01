module.exports =(creep) => {
    // MOVE THIS COMMENTED CODE TO MAIN.JS
    //SPAWNING THE CLAIMER MUST DO MANUALLY
    // DO THIS IN CONSOLE BEFORE RUNING THIS CODE
    
    //Game.spawns.Aden.memory.claimRoom = 'W8N27';
    // if(Game.spawns.Aden.memory.claimRoom != undefined){
    //     const newName = `claimer-${Game.time.toString().substring(4,8)}`;
    //     Game.spawns['Aden'].spawnCreep([CLAIM, MOVE], newName,
    //         { memory: { 
    //             role: 'claimer', 
    //             target: Game.spawns.Aden.memory.claimRoom
    //             }
    //         });
    // }
    // DO THIS IN CONSOLE AFTER SPAWNING THE CLAIMER
    // delete Game.spawns.Aden.memory.claimRoom
    
    
    //THE ROLE (keep code here)
    if (creep.room.name != creep.memory.target) {
        //move to target room
        let exit = creep.room.findExitTo(creep.memory.target);
        creep.moveTo(creep.pos.findClosestByRange(exit));
    }else{
        //claim controller
        if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE){
            creep.moveTo(creep.room.controller);
        }
    }
}

