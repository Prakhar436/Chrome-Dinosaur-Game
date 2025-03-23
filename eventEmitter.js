class EventEmitter {
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
    once(event, listener) {
        const onceWrapper = (...args) => {
            this.off(event, onceWrapper);  //  Remove listener after first execution
            listener(...args);  //  Call original listener
        };
        this.on(event, onceWrapper);
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

export const eventBus = new EventEmitter();
//eventBus initialied and exported from here (instead of script.js) to avoid circular dependencies (initialization issues)
