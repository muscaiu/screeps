module.exports = {
    harvester: (spawn, creepRole) => {
        const newName = `${creepRole}-${Game.time.toString().substring(4,8)}`;
          
        // console.log(`${spawn.name} new  mini-${creepRole}: ${newName}`);
        
        spawn.spawnCreep(
            [WORK, CARRY, MOVE],
            newName,
            { memory: {
                role: creepRole
                }
            }
        )
    },
    repairer: (spawn, creepRole) => {
        const newName = `${creepRole}-${Game.time.toString().substring(4,8)}`;
        spawn.spawnCreep(
            [WORK, CARRY, MOVE],
            newName,
            { memory: {
                role: creepRole
                }
            }
        )
    },
    upgrader: (spawn, creepRole, myEnergy) => {
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
        
        spawn.spawnCreep(
            creepBody,
            newName,
            { memory: {
                role: creepRole
            } 
        })
    },
    builder: (spawn, creepRole, myEnergy) => {
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
        
        spawn.spawnCreep(
            creepBody,
            newName,
            { memory: {
                role: creepRole
            } 
        })
    },
    longDistance: (
        spawn,
        creepRole,
        myEnergy, 
        home, 
        target, 
        sourceIndex,
        ) => {
        const newName = `${creepRole}-${Game.time.toString().substring(4,8)}`;
        let creepBody = [];
        let numberOfParts = Math.floor((myEnergy -700) / 200)
        
        for(let i = 0; i < numberOfParts; i++){
            creepBody.push(WORK);
        }
        for(let i = 0; i < numberOfParts; i++){
            creepBody.push(CARRY);
        }
        for(let i = 0; i < numberOfParts; i++){
            creepBody.push(MOVE);
        }

        spawn.spawnCreep(creepBody, newName, {
            memory: { 
                role: creepRole ,
                home,
                target,
                sourceIndex
            } 
        })
    },
    createMiner: (spawn, sourceId, myEnergy) => {
        const newName = `miner-${Game.time.toString().substring(4,8)}`;
        spawn.spawnCreep(
            [WORK, WORK, WORK, WORK, WORK, MOVE], 
            newName,
            {
                memory: {
                    role: 'miner', 
                    sourceId
                }
            }
        )
        // console.log(`${spawn.name} Spawning new miner myEnergy ${myEnergy}`);
    },
    createHauler: (spawn, creepRole, myEnergy) => {
        const newName = `hauler-${Game.time.toString().substring(4,8)}`;
        let numberOfParts = Math.floor((myEnergy) / 150)
        let creepBody = [];
        
        for(let i = 0; i < numberOfParts * 2; i++){
            creepBody.push(CARRY);
        }
        for(let i = 0; i < numberOfParts ; i++){
            creepBody.push(MOVE);
        }
        spawn.spawnCreep(
            creepBody,
            newName,
            { memory: {
                role: creepRole,
                working: false
            } 
        })
    },
    remoteBuilder: (creepRole, target, myEnergy) => {
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
        
        Game.spawns['Aden'].spawnCreep(
            creepBody,
            newName,
            { memory: {
                role: creepRole,
                target
            } 
        })
    },
    
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
