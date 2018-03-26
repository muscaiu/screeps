require('memory.clear')();
require('role.tower')();
// require('creep.roles')();
const protoSpawn = require('prototype.spawn');
// const roleWallRepairer = require('role.wallRepairer');
const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const roleRemoteBuilder = require('role.builder.remote');
const roleMiner = require('role.miner');
const roleRepairer = require('role.repairer');
const roleLongDistanceHarvester = require('role.longDistanceHarvester');
const roleClaimer = require('role.claimer');
const roleHauler = require('role.hauler');
const spawningLog = require('spawning.log');

const HOME =  'W7N27';
const Dion =  'W8N27';
const Giran = 'W6N27';

module.exports.loop = () => {
    for (const creepName in Game.creeps) {
        const creep = Game.creeps[creepName];
        if (creep.memory.role == 'upgrader') {
            roleUpgrader(creep);
        }else if (creep.memory.role == 'builder') {
            roleBuilder(creep);
        }else if (creep.memory.role == 'remoteBuilder') {
            roleRemoteBuilder(creep);
        }else if (creep.memory.role == 'harvester') {
            roleHarvester(creep);
        }else if (creep.memory.role == 'miner') {
            roleMiner(creep);
        }else if (creep.memory.role == 'repairer') {
            roleRepairer(creep);
        }else if (creep.memory.role == 'longDistanceHarvester') {
            roleLongDistanceHarvester(creep);
        }else if (creep.memory.role == 'claimer'){
            roleClaimer(creep);
        }else if (creep.memory.role == 'hauler'){
            roleHauler(creep);
        }
    }
    
    //Spawn Logic

    for(const spawnName in Game.spawns){
        const spawn = Game.spawns[spawnName];
        const myEnergy = spawn.room.energyAvailable;
        const creepsInRoom = spawn.room.find(FIND_MY_CREEPS);
        const sources = spawn.room.find(FIND_SOURCES);
        totalCreeps = creepRole => 
            spawn.room.find(FIND_CREEPS, {
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
        
        const totalLongDistanceHarveseters = _.filter(Game.creeps, (creep) => 
            creep.memory.role == 'longDistanceHarvester').length;
        const minLongDistanceHarvesters = spawn.memory.minLongDistanceHarvesters;
        const totalRemoteBuilders = _.filter(Game.creeps, (creep) => 
            creep.memory.role == 'remoteBuilder').length;
        const minRemoteBuilders = Game.spawns['Aden'].memory.minRemoteBuilders
        
        if(!spawn.spawning){
            //Spawn harvester EMRGENCY only
            if(totalCreeps('miner').length < minMiners){
                if (totalHarvesters < minHarvesters) {
                    protoSpawn.harvester(spawn, 'harvester');
                    spawningLog(spawn, 'harvester', totalHarvesters, minHarvesters, myEnergy)
                }
            }
            //Spwan miner if container ready
            if(myEnergy > 550 &&  totalMiners < minMiners){
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
            }
            //Spawn hauler
            if(myEnergy > 150 && totalHaulers < minHaulers){
                protoSpawn.createHauler(spawn, 'hauler', 150)
                spawningLog(spawn, 'hauler', totalHaulers, minHaulers, myEnergy)
            }
            
            //Spwan upgrader
            if(totalUpgraders < minUpgraders && myEnergy > 550){
                protoSpawn.upgrader(spawn, 'upgrader', myEnergy);
                spawningLog(spawn, 'upgrader', totalUpgraders, minUpgraders, myEnergy)
            }    
            //Spawn repairer
            if(totalRepairers < minRepairers){
                protoSpawn.repairer(spawn, 'repairer', totalRepairers);
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
            if (totalRemoteBuilders < minRemoteBuilders && !Game.spawns['Aden'].spawning) {
                protoSpawn.remoteBuilder(
                        'remoteBuilder',
                        Giran,
                        Game.rooms['W7N27'].energyAvailable
                );
                spawningLog('Aden', 'remoteBuilder', totalRemoteBuilders, minRemoteBuilders, Game.rooms['W7N27'].energyAvailable)
            }
        }
    }
}

// const totalEnergy = Game.rooms[HOME].energyCapacityAvailable;
// const energyPercentage = Math.floor((myEnergy * 100) / totalEnergy);

        //Game.spawns['Aden'].memory.minMiners = 2
        //Game.spawns['Aden'].memory.minRepairers = 2
        //Game.spawns['Aden'].memory.minHarvesters = 1
        //Game.spawns['Aden'].memory.minHaulers = 2
        //Game.spawns['Aden'].memory.minBuilders = 2
        //Game.spawns['Aden'].memory.minUpgraders = 1
        //Game.spawns['Aden'].memory.minLongDistanceHarvesters = 3
        //Game.spawns['Aden'].memory.minRemoteBuilders = 3
        
        //Game.spawns['Giran'].memory.minMiners = 2
        //Game.spawns['Giran'].memory.minRepairers = 2
        //Game.spawns['Giran'].memory.minHarvesters = 3
        //Game.spawns['Giran'].memory.minHaulers = 1
        //Game.spawns['Giran'].memory.minBuilders = 4
        //Game.spawns['Giran'].memory.minUpgraders = 2
        //Game.spawns['Giran'].memory.minLongDistanceHarvesters = 0
        //Game.spawns['Giran'].memory.minRemoteBuilders = 0