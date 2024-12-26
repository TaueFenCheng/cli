class EventBus {
  constructor() {
    this.events = {};
  }

  // 订阅事件
  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  // 取消订阅事件
  off(event, listener) {
    if (!this.events[event]) return;

    this.events[event] = this.events[event].filter((l) => l !== listener);
  }

  // 发布事件
  emit(event, ...args) {
    if (!this.events[event]) return;

    this.events[event].forEach((listener) => {
      listener(...args);
    });
  }

  // 订阅一次事件
  once(event, listener) {
    const wrapper = (...args) => {
      listener(...args);
      this.off(event, wrapper); // 取消订阅
    };
    this.on(event, wrapper);
  }
}

// 使用示例
const eventBus = new EventBus();

export default eventBus;

// 订阅事件
const onMessage = (msg) => {
  console.log("Received:", msg);
};

eventBus.on("message", onMessage);

// 发布事件
eventBus.emit("message", "Hello, Event Bus!");

// 取消订阅
eventBus.off("message", onMessage);

// 再次发布事件，不会触发
eventBus.emit("message", "This will not be logged.");

// 订阅一次事件
eventBus.once("onceMessage", (msg) => {
  console.log("This will be logged only once:", msg);
});

// 发布事件
eventBus.emit("onceMessage", "Hello, once!");
eventBus.emit("onceMessage", "This will not be logged.");
