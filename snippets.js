//DOCS
'http://docs.screeps.com/global-objects.html#Game-object'
//API
'http://docs.screeps.com/api/#StructureSpawn.spawnCreep'

//spawn creep
'http://docs.screeps.com/api/#StructureSpawn.spawnCreep'
Game.spawns['Aden'].spawnCreep([WORK, CARRY, MOVE], 'Harvester1');

//harvest and return for 1 creep
module.exports.loop = function () {
    var creep = Game.creeps['Harvester1'];

    if (creep.carry.energy < creep.carryCapacity) {
        var sources = creep.room.find(FIND_SOURCES);
        if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0]);
        }
    }
    else {
        if (creep.transfer(Game.spawns['Aden'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(Game.spawns['Aden']);
        }
    }
}

//harvest and return for multiple creeps
module.exports.loop = function () {
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];

        if (creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        else {
            if (creep.transfer(Game.spawns['Aden'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns['Aden']);
            }
        }
    }
}

//role.harvester
var roleHarvester = {
    run: function (creep) {
        if (creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        else {
            if (creep.transfer(Game.spawns['Aden'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(Game.spawns['Aden']);
            }
        }
    }
};
module.exports = roleHarvester;
//loop
var roleHarvester = require('role.harvester');
module.exports.loop = function () {

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        roleHarvester.run(creep);
    }
}

//roles
Game.creeps['Harvester1'].memory.role = 'harvester';
Game.creeps['Upgrader1'].memory.role = 'upgrader';

//role.upgrader
var roleUpgrader = {
    run: function (creep) {
        if (creep.carry.energy == 0) {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0]);
            }
        }
        else {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
    }
};
module.exports = roleUpgrader;
//loop
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
module.exports.loop = function () {

    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
    }
}

//BUILDING
'http://docs.screeps.com/api/#Room.find'
Game.spawns['Aden'].spawnCreep([WORK, CARRY, MOVE], 'Builder1',
    { memory: { role: 'builder' } });

Game.spawns['Aden'].spawnCreep([WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE],
    'HarvesterBig',
    { memory: { role: 'harvester' } });

//role.builder
var roleBuilder = {
    run: function (creep) {
        if (creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
        }
        if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say('🚧 build');
        }

        if (creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
            if (targets.length) {
                if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
    }
};
module.exports = roleBuilder;
//loop
var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
module.exports.loop = function () {
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}
//Harvester also bring to extensions
var roleHarvester = {
    run: function (creep) {
        if (creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) &&
                        structure.energy < structure.energyCapacity;
                }
            });
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }
    }
};
module.exports = roleHarvester;
//loop
var roleHarvester = require('role.harvester');
var roleBuilder = require('role.builder');
module.exports.loop = function () {
    for (var name in Game.rooms) {
        console.log('Room "' + name + '" has ' + Game.rooms[name].energyAvailable + ' energy');
    }
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}
//Building super harvester
Game.spawns['Aden'].spawnCreep([WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE],
    'HarvesterBig',
    { memory: { role: 'harvester' } });


//AUTOSPAWN
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
module.exports.loop = function () {
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);
    if (harvesters.length < 2) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Aden'].spawnCreep([WORK, CARRY, MOVE], newName,
            { memory: { role: 'harvester' } });
    }
    if (Game.spawns['Aden'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Aden'].spawning.name];
        Game.spawns['Aden'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Aden'].pos.x + 1,
            Game.spawns['Aden'].pos.y,
            { align: 'left', opacity: 0.8 });
    }
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
    }
}

//DEFENDING
Game.spawns['Aden'].room.controller.activateSafeMode();
//consgruct tower
Game.spawns['Aden'].room.createConstructionSite(23, 22, STRUCTURE_TOWER);
//role.harvester
var roleHarvester = {
    run: function (creep) {
        if (creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_TOWER) && structure.energy < structure.energyCapacity;
                }
            });
            if (targets.length > 0) {
                if (creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
                }
            }
        }
    }
};
module.exports = roleHarvester;
//loop
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
module.exports.loop = function () {
    var tower = Game.getObjectById('484c7fe19d05bb47c490f2a0');
    if (tower) {
        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile) {
            tower.attack(closestHostile);
        }
    }
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}
//tower repair wall
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
module.exports.loop = function () {
    var tower = Game.getObjectById('484c7fe19d05bb47c490f2a0');
    if (tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if (closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (closestHostile) {
            tower.attack(closestHostile);
        }
    }
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}

//CHAT
if(room.energyAvailable == room.energyCapacityAvailable){
    console.log(creep.memory)
    // if(creep.memory.upgrading && creep.carry.energy == 0) {
    //     creep.memory.upgrading = false;
    // }
}

You can do `let weakest = _.min( structus, s => s.hits / s.hitsMax )` and find the structure that needs it most


//th_pion harvester
if (creep.memory.working == true && creep.carry.energy == 0) {
    creep.memory.working = false;
}
else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
    creep.memory.working = true;
}
if (creep.memory.working == true) {
    var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
        filter: (s) => (s.structureType == STRUCTURE_SPAWN
                     || s.structureType == STRUCTURE_EXTENSION
                     || s.structureType == STRUCTURE_TOWER)
                     && s.energy < s.energyCapacity
    });
    if (structure != undefined) {
        if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(structure);
        }
    }
}
else {
    var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
        creep.moveTo(source);
    }
}

creepRole, creepLimit, myEnergy, workParts, home, target, sourceIndex