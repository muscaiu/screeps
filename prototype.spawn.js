module.exports = {
    normal: (creepRole, creepLimit, myEnergy, target) => {
        const totalCreeps = _.filter(Game.creeps, (creep) => creep.memory.role == creepRole);
        
        if (totalCreeps.length < creepLimit) {
            const newName = `${creepRole}-${Game.time.toString().substring(4,8)}`;
            let numberOfParts = Math.floor(myEnergy / 200);
            let creepBody = [];
            
            for(let i = 0; i < numberOfParts; i++){
                creepBody.push(WORK);
            }
            for(let i = 0; i < numberOfParts; i++){
                creepBody.push(CARRY);
            }
            for(let i = 0; i < numberOfParts; i++){
                creepBody.push(MOVE);
            }
            
            // Game.spawns['Aden'].spawnCreep(creepBody, newName, {role: creepRole, working : false})
            Game.spawns['Aden'].spawnCreep(
                creepBody,
                newName,
                { memory: {
                    role: creepRole, 
                    target 
                    
                } 
            })
            console.log(`Spawning new  ${creepRole}: ${newName}`);
            console.log(`nr of parts  ${numberOfParts} ${creepBody} myEnergy: ${myEnergy}`);
        }
    },
    longDistance: (
        creepRole, 
        creepLimit, 
        myEnergy, 
        workParts, 
        home, 
        target, 
        sourceIndex
        ) => {
        const totalCreeps = _.filter(Game.creeps, (creep) => creep.memory.role == creepRole);
        
        if (totalCreeps.length < creepLimit) {
            const newName = `${creepRole}-${Game.time.toString().substring(4,8)}`;
            let creepBody = [];
            let numberOfParts = Math.floor((myEnergy -700) / 200)
            
            for(let i = 0; i < numberOfParts; i++){
                creepBody.push(WORK);
            }
            
            console.log(`before Spawning new  ${creepRole}: ${newName} ${myEnergy}`);
            myEnergy -= 250 * workParts;
            console.log(`after Spawning new  ${creepRole}: ${newName} ${myEnergy}`);
            
            for(let i = 0; i < numberOfParts; i++){
                creepBody.push(CARRY);
            }
            for(let i = 0; i < numberOfParts + workParts; i++){
                creepBody.push(MOVE);
            }

            console.log(`nr of parts  ${numberOfParts} ${creepBody} myEnergy: ${myEnergy}`);
            // Game.spawns['Aden'].spawnCreep(creepBody, newName, {role: creepRole, working : false})
            Game.spawns['Aden'].spawnCreep(creepBody, newName, {
                memory: { 
                    role: creepRole ,
                    home,
                    target,
                    sourceIndex
                } 
            })
        }
    }
}

// module.exports = () => {
    // StructureSpawn.prototype.createCustomCreep = (myEnergy, roleName) => {
    //     let numberOfParts = Math.floor(myEnergy / 200);
        
    //     let body = [];
    //     for(let i = 0; i < numberOfParts; i++){
    //         body.push(WORK);
    //     }
    //     for(let i = 0; i < numberOfParts; i++){
    //         body.push(CARRY);
    //     }
    //     for(let i = 0; i < numberOfParts; i++){
    //         body.push(MOVE);
    //     }
        
    //     this.createCreep(body, undefined, {role: roleName, working : false})
    // }
// };
