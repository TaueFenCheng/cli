### nodejs cluster
nodejs 集群

pm2 start app.js -i 0

-i <number of workers> 将告诉 PM2 在 cluster_mode （而不是 fork_mode）下启动应用程序。如果 <number of workers> 设置为 0，PM2 将自动生成与 CPU 核心数量一样多的工作进程。

pm2 ecosystem


通过使用集群值（cluster value）设置 exec_mode，可以指示 PM2 在每个实例之间进行负载平衡。将实例设置为 0，这将产生与 CPU 内核数量一样多的工作进程。
-i 或 instances 选项可以设置为：

0 或 max（已弃用）将应用程序进程分布到所有 CPU 上
-1 将应用程序分布在所有 CPU -1 上
number 将应用程序分布在 CPU number 上



### cluster 集群

https://leanpub.com/thenodejsclustermodule/read#leanpub-auto-understanding-the-nodejs-cluster-module