/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('prototype.spawn.retry');
 * mod.thing == 'a thing'; // true
 */

module.exports = () => {
  Structure.prototype.createClaimer = (target) => {
      return this.createCreep([CLAIM, MOVE], undefined, {role: 'claimer', target : target})
  }
}