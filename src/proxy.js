var net = require('net');
var fs = require('fs');

var config = JSON.parse(fs.readFileSync("config/proxy.json", "utf8"));

net.createServer(function (server) {
  var client = new net.Socket();
  
  server.on("connect", function () {
    server_id = Math.floor(Math.random()*config.servers.length);
    client.connect(config.servers[server_id].port, config.servers[server_id].hostname);
  });
  
  server.on("data", function (data) {
    client.write(data);
  });
  
  client.on("data", function (data) {
    server.write(data);
  });
  
  client.on("end", function () {
    server.end();
  })
}).listen(config.port, config.interface);
