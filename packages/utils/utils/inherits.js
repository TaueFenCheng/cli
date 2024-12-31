function inherits(SuperType, SubType) {
  const pro = Object.create(SuperType.prototype);
  pro.constructor = SubType;
  SubType.prototype = pro;
}


/**
 * event emitter
 */
class Event {
  events = {};

  emit(type, ...args) {
    const listeners = this.events[type];
    for (const listener of listeners) {
      listener(...args);
    }
  }

  on(type, listener) {
    this.events[type] = this.events[type] || [];
    this.events[type].push(listener);
  }

  once(type, listener) {
    const callback = (...args) => {
      this.off(type, callback);
      listener(...args);
    };
    this.on(type, callback);
  }

  off(type, listener) {
    this.events[type] = this.events[type] || [];
    this.events[type] = this.events[type].filter(
      (callback) => callback !== listener,
    );
  }
}
F  