const roleHarvester = require('role.harvester');
const roleUpgrader = require('role.upgrader');
const roleBuilder = require('role.builder');
const roleRemoteBuilder = require('role.builder.remote');
const roleMiner = require('role.miner');
const roleRepairer = require('role.repairer');
const roleLongDistanceHarvester = require('role.longDistanceHarvester');
const roleClaimer = require('role.claimer');
const roleHauler = require('role.hauler');
// const roleWallRepairer = require('role.wallRepairer');

module.exports = () => {
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
}