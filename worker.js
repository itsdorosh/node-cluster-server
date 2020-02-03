const http = require('http');
const pid = process.pid;

const server = http
  .createServer((_, response) => {
    for (let i = 0; i < 1e7; i++) { }
    response.end(`Hello from Node.js! \n`);
  })
  .listen(8800, () => {
    console.log(`Worker started. Pid: ${pid}`);
  });

process.on(`SIGNINT`, () => {
  server.close(() => {
    process.exit(0);
  });
});

process.on(`SIGNTERM`, () => {
  server.close(() => {
    process.exit(0);
  });
});

process.on(`SIGNUSR2`, () => {
  server.close(() => {
    process.exit(1);
  });
});
