const EventEmitter = require('events')

// Példányosítás
const eventEmitter = new EventEmitter()

const scream = () => console.log('I hear a scream')

const tooLateToHelp = () => console.log('Too late, she is dead')

const describeTheMurderer = ({ height, hairColor }) => {
  console.log(`Height: ${height}, Hair color: ${hairColor}`)
}

// Feliratkozás az eseményekre
eventEmitter.on('scream', scream)
eventEmitter.on('scream', tooLateToHelp)
// .once csak egyszer szeretném, hogy lefusson
eventEmitter.once('witness', describeTheMurderer)

eventEmitter.emit('scream')
eventEmitter.emit('scream')
eventEmitter.emit('witness', { height: '180cm', hairColor: 'black' })
eventEmitter.emit('witness', { height: '180cm', hairColor: 'black' })
eventEmitter.off('scream', tooLateToHelp)
eventEmitter.emit('scream')
