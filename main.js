const protoSpawn = require('prototype.spawn');
const spawningLog = require('spawning.log');
const tower = require('role.tower');

const HOME    = 'W7N27';
const Dion    = 'W8N27';
const Giran   = 'W6N27';
const Goddard = 'W7N26';

module.exports.loop = () => {
    require('memory.clear')();
    require('role.manager')();

    //Spawn Logic
    for(const spawnName in Game.spawns){
        const spawn = Game.spawns[spawnName];
        const myEnergy = spawn.room.energyAvailable;
        const creepsInRoom = spawn.room.find(FIND_MY_CREEPS);
        const sources = spawn.room.find(FIND_SOURCES);
        tower(spawn);
        totalCreeps = creepRole => 
            spawn.room.find(FIND_MY_CREEPS, {
                filter: c => c.memory.role == creepRole
            });
            
        const totalMiners = totalCreeps('miner').length;
        const minMiners = spawn.memory.minMiners;
        const totalHaulers = totalCreeps('hauler').length;
        const minHaulers = spawn.memory.minHaulers;
        const totalHarvesters = totalCreeps('harvester').length;
        const minHarvesters = spawn.memory.minHarvesters;
        const totalRepairers = totalCreeps('repairer').length;
        const minRepairers = spawn.memory.minRepairers;
        const totalBuilders = totalCreeps('builder').length;
        const minBuilders = spawn.memory.minBuilders;
        const totalUpgraders = totalCreeps('upgrader').length;
        const minUpgraders = spawn.memory.minUpgraders;
        
        const totalRemoteBuilders = _.filter(Game.creeps, (creep) => 
            creep.memory.role == 'remoteBuilder' 
            && creep.memory.madeIn == spawn.name).length;
        const minRemoteBuilders = spawn.memory.minRemoteBuilders;
        
        const totalLongDistanceHarveseters = _.filter(Game.creeps, (creep) => 
            creep.memory.role == 'longDistanceHarvester').length;
        const minLongDistanceHarvesters = spawn.memory.minLongDistanceHarvesters;


        if(!spawn.spawning){
            //Spwan miner if less then 2 and energy > 550
            // console.log(spawn.name,'totalMiners', totalMiners, myEnergy)
            if(totalMiners < minMiners){
                if(myEnergy >= 550 ){
                    for(let source of sources) {
                        if(!_.some(creepsInRoom, c => c.memory.role == 'miner' && c.memory.sourceId == source.id)){
                            let containers = source.pos.findInRange(FIND_STRUCTURES, 1, {
                                filter: s => s.structureType == STRUCTURE_CONTAINER
                            });
                            if(containers.length > 0){
                                protoSpawn.createMiner(spawn, source.id, myEnergy);
                                spawningLog(spawn, 'miner', totalMiners, minMiners, myEnergy)
                                break;
                            }
                        }
                    }
                //Spawn harvester EMRGENCY only
                }else if(totalHarvesters < minHarvesters && myEnergy > 199){
                    protoSpawn.harvester(spawn, 'harvester');
                    spawningLog(spawn, 'harvester', totalHarvesters, minHarvesters, myEnergy)
                }
                //Spawn haulers when we have at last 1 miner
                if(totalMiners > 0 && myEnergy > 150 && totalHaulers < minHaulers){
                    protoSpawn.createHauler(spawn, 'hauler', myEnergy > 500 ? 500 : 150 )
                    spawningLog(spawn, 'hauler', totalHaulers, minHaulers, myEnergy)
                }
            }else if(totalMiners > 0){
                //Spawn haulers when we have at last 1 miner
                if(myEnergy > 150 && totalHaulers < minHaulers){
                    protoSpawn.createHauler(spawn, 'hauler', myEnergy > 500 ? 500 : 150)
                    spawningLog(spawn, 'hauler', totalHaulers, minHaulers, myEnergy)
                }else if(totalHaulers > 0){
                    //Spwan upgrader
                    if(totalUpgraders < minUpgraders && myEnergy > 550){
                        protoSpawn.upgrader(spawn, 'upgrader', myEnergy);
                        spawningLog(spawn, 'upgrader', totalUpgraders, minUpgraders, myEnergy)
                    } 
                    //Spawn repairer
                    if(totalRepairers < minRepairers && myEnergy > 550){
                        protoSpawn.repairer(spawn, 'repairer', 500);
                        spawningLog(spawn, 'repairer', totalRepairers, minRepairers, myEnergy)
                    }
                    //Spwan builder 
                    if(totalBuilders < minBuilders && myEnergy > 550){
                        protoSpawn.builder(spawn, 'builder', myEnergy);
                        spawningLog(spawn, 'builder', totalBuilders, minBuilders, myEnergy)
                    }  
                    //Spwan longDistanceHarveseter
                    if(totalLongDistanceHarveseters < minLongDistanceHarvesters && myEnergy > 550){
                        protoSpawn.longDistance(
                                spawn, 
                                'longDistanceHarvester', 
                                myEnergy,
                                HOME,
                                Dion,
                                0
                        );
                        spawningLog(spawn, 'longDistanceHarvester', totalLongDistanceHarveseters, minLongDistanceHarvesters, myEnergy)
                    }
                    //Spwan remoteBuilder
                    if (totalRemoteBuilders < minRemoteBuilders && myEnergy > 550) {
                        protoSpawn.remoteBuilder(
                                spawn,
                                'remoteBuilder',
                                Goddard,
                                myEnergy
                        );
                        spawningLog(spawn, 'remoteBuilder', totalRemoteBuilders, minRemoteBuilders, myEnergy)
                    }
                }
            }
        }

    }
}

// const totalEnergy = Game.rooms[HOME].energyCapacityAvailable;
// const energyPercentage = Math.floor((myEnergy * 100) / totalEnergy);

        //Game.spawns['Aden'].memory.minMiners = 2
        //Game.spawns['Aden'].memory.minRepairers = 1
        //Game.spawns['Aden'].memory.minHarvesters = 2
        //Game.spawns['Aden'].memory.minHaulers = 2
        //Game.spawns['Aden'].memory.minBuilders = 2
        //Game.spawns['Aden'].memory.minUpgraders = 2
        //Game.spawns['Aden'].memory.minLongDistanceHarvesters = 1
        //Game.spawns['Aden'].memory.minRemoteBuilders = 1
        
        //Game.spawns['Giran'].memory.minMiners = 2
        //Game.spawns['Giran'].memory.minRepairers = 1
        //Game.spawns['Giran'].memory.minHarvesters = 2
        //Game.spawns['Giran'].memory.minHaulers = 3
        //Game.spawns['Giran'].memory.minBuilders = 2
        //Game.spawns['Giran'].memory.minUpgraders = 1
        //Game.spawns['Giran'].memory.minLongDistanceHarvesters = 0
        //Game.spawns['Giran'].memory.minRemoteBuilders = 0
        
        //Game.spawns['Goddard'].memory.minMiners = 2     MUST ADD @ START
        //Game.spawns['Goddard'].memory.minHarvesters = 2  MUST ADD @ START
        //Game.spawns['Goddard'].memory.minRepairers = 1
        //Game.spawns['Goddard'].memory.minBuilders = 2
        //Game.spawns['Goddard'].memory.minUpgraders = 2
        //Game.spawns['Goddard'].memory.minHaulers = 1