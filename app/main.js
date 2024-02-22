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
    command, (parsedData = parse(buffer));
    switch (command) {
      case "ping":
        socket.write("+PONG\r\n");
        break;
      case "echo":
        socket.write(parse(parsedData[0]));
        break;
    }
  });
});

server.listen(6379, "127.0.0.1");

function parse(buffer) {
  const data = buffer.toString("utf-8").split("\r\n");
  data.pop();
  const command = data.shift().toLowerCase();
  parsedData = [];
  for (let i = 1; i < data.length; i += 2) {
    parsedData.push(data[i]);
  }
  return { command, parsedData };
}

function unparse(data) {
  for (let i = 0; i < data.length; i++) {
    data[i] = `$${data[i].length}\r\n${data[i]}`;
  }
  return `*${data.length}\r\n${data.join("\r\n")}\r\n`;
}
