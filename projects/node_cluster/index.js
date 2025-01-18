const os = require("os");
const cluster = require("cluster");
const cpuLength = os.cpus().length;
const express = require("express");

const port = 8088
if (cluster.isMaster) {
    console.log('44444444', cpuLength)
    for (let i = 0; i < cpuLength; i++) {
        cluster.fork();
    }
    cluster.on('online', (worker) => {
        console.log(worker, '45454')
    })
    cluster.on("exit", (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        console.log(code, signal)
        // 其中某一个线程挂了  重新开一个线程
        cluster.fork();
    });
} else { // 子线程   开启多个子线程服务
    const app = express();
    console.log('5555555555555', process.pid)
    app.get("/", (req, res) => {
        // console.log(req,'kkkkkk')
        res.send("hello world");
    });
    app.listen(port, () => console.log("server start", port));

}


/**
 * @description 线程池
 */
// let workers = [];

// function masterProcess() {
//     console.log(`Master ${process.pid} is running`);

//     // Fork workers
//     for (let i = 0; i < numCPUs; i++) {
//         console.log(`Forking process number ${i}...`);

//         const worker = cluster.fork();
//         workers.push(worker);

//         // Listen for messages from worker
//         worker.on('message', function (message) {
//             console.log(`Master ${process.pid} recevies message '${JSON.stringify(message)}' from worker ${worker.process.pid}`);
//         });
//     }

//     // Send message to the workers
//     workers.forEach(function (worker) {
//         console.log(`Master ${process.pid} sends message to worker ${worker.process.pid}...`);
//         worker.send({ msg: `Message from master ${process.pid}` });
//     }, this);
// }