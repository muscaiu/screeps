require('memory.clear')
require('tower');
const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const roleMiner = require('role.miner');
const roleRepairer = require('role.repairer');
const respwanCreeps = require('spawn.creeps');

module.exports.loop = () => {
    for (const name in Game.creeps) {
        const creep = Game.creeps[name];
        if (creep.memory.role == 'upgrader') {
            roleUpgrader(creep);
        }else if (creep.memory.role == 'builder') {
            roleBuilder(creep);
        }else if (creep.memory.role == 'harvester') {
            roleHarvester(creep);
        }else if (creep.memory.role == 'miner') {
            roleMiner(creep);
        }else if (creep.memory.role == 'repairer') {
            roleRepairer(creep);
        }
    }
    
    for (const name in Game.rooms) {
        const harvesters = _.filter(Game.creeps, c => c.memory.role == 'harvester');
        const myEnergy = Game.rooms[name].energyAvailable

        const minHarvesters = 2;
        const minRepairers = 1;
        const minBuilders = 1;
        const minUpgraders = 1;
        
        if(myEnergy > 400){
            respwanCreeps('harvester', minHarvesters, [WORK, WORK, WORK, CARRY, MOVE]);
        }
        // if(myEnergy > 500){
        //     respwanCreeps('repairer', minRepairers, [WORK, WORK, CARRY, MOVE]);   
        // }
        if(myEnergy > 500){
            respwanCreeps('upgrader', minUpgraders, [WORK, WORK, WORK, WORK, CARRY, MOVE]);
        }
        if(myEnergy > 500){
            respwanCreeps('builder', minBuilders, [WORK, WORK, WORK, WORK, CARRY, MOVE]);
        }
        // if(myEnergy > 400){
        //     respwanCreeps('miner', 1, [WORK, WORK, WORK, WORK, MOVE])
        // }
    }
}