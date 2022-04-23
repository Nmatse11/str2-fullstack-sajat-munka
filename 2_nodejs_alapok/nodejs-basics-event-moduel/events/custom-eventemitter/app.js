const EventEmitter = require('./EventEmitter')

// Példányosítás
const eventEmitter = new EventEmitter()
// A speak az esemény neve. Console.log le fog futni, ha meghívódik a speak esemény
eventEmitter.on('speak', () => console.log('Zombie says "Grrrrr"'))
eventEmitter.on('speak', () => console.log('Hungry zombie says "Harr harr"'))
eventEmitter.on('walk', () => console.log('Deads are walking'))

// Az események kibocsátása
eventEmitter.emit('speak')
eventEmitter.emit('walk')
eventEmitter.emit('eat')
