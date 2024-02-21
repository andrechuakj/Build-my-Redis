const net = require("net");

const server = net.createServer((socket) => {
  console.log(
    "Connection from",
    socket.remoteAddress,
    "port",
    socket.remotePort
  );

  socket.on("data", (buffer) => {
    console.log(
      "Request from",
      socket.remoteAddress,
      "port",
      socket.remotePort
    );
    if (buffer.toString("utf-8") === "*1\r\n$4\r\nping\r\n") {
      socket.write("+PONG\r\n");
    }
  });
});

server.listen(6379, "127.0.0.1");
