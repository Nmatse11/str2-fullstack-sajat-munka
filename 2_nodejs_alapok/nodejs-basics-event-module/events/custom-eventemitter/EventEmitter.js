class EventEmitter {
  constructor () {
    // Függvények tárolása
    this.events = []
  }

  // Eseményre való feliratkozás
  on (eventType, listener) {
    this.events[eventType] = this.events[eventType] || []
    this.events[eventType] = [...this.events[eventType], listener]
  }

  // Emitálás - esemény kibocsátása
  emit (eventType) {
    // Ha egy esemény bekövetkezik, akkor az összes eseményt meghívjuk
    if (this.events[eventType]) {
      this.events[eventType].forEach(listener => listener())
    }
  }
}

module.exports = EventEmitter
