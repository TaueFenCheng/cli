// subscriber.js

const Redis = require("ioredis");
// const redis = new Redis();
const redis = new Redis(6379,'127.0.0.1');


redis.subscribe("my-channel-1", "my-channel-2", (err, count) => {
    if (err) {
        // Just like other commands, subscribe() can fail for some reasons,
        // ex network issues.
        console.error("Failed to subscribe: %s", err.message);
    } else {
        // `count` represents the number of channels this client are currently subscribed to.
        console.log(
            `Subscribed successfully! This client is currently subscribed to ${count} channels.`
        );
    }
});

redis.on("message", (channel, message) => {
    console.log(`Received ${message} from ${channel}`);
});

// There's also an event called 'messageBuffer', which is the same as 'message' except
// it returns buffers instead of strings.
// It's useful when the messages are binary data.
redis.on("messageBuffer", (channel, message) => {
    // Both `channel` and `message` are buffers.
    console.log(channel, message);
});