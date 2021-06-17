const emitter = (() => ({
  events: new Map(),

  on(event, callback) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }

    this.events.get(event).push(callback);
  },

  emit(event, ...args) {
    if (!this.events.has(event)) {
      return;
    }

    this.events.get(event).forEach((callback) => callback(...args));
  },

  off() {
    this.events.clear();
  },
}))();

export { emitter };
