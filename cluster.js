const cluster = require('cluster');
const os = require('os');
const pid = process.pid;

if (cluster.isMaster) {
  const cpusConut = os.cpus().length;
  console.log(`CPUs: ${cpusConut}`);
  console.log(`Master started pid ${pid}`);
  for (i = 0; i < cpusConut - 1; i++) {
    cluster.fork();

    cluster.on(`exit`, (worker, code) => {
      console.log(`worker died! Pid: ${worker.process.pid}. Code ${code}`);
      if (code === 1) {
        cluster.fork();
      }
    });
  }
}

if (cluster.isWorker) {
  require(`./worker.js`);
}
