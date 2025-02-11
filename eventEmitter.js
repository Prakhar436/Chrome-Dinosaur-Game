export class EventEmitter {
    constructor() {
        this.events = {};
    }

    // Register a listener for a specific event
    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }

    // Remove a listener for a specific event
    off(event, listener) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter((l) => l !== listener);
        }
    }

    // Emit an event, notifying all listeners
    emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach((listener) => listener(data));
        }
    }
}
