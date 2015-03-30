'use strict';

var _ = require('lodash');
var exec = require('exec-sync');

function spawnRedisInstance(name){
  var docker_path = '/usr/bin/';
  var cmd_runRedis = docker_path + 'docker run -d -P --name="' + name + '" memcached';
  var container_id = exec(cmd_runRedis);
  console.log(container_id);
  var cmd_inspect = docker_path + 'docker inspect ' + container_id;
  var json_inspec = exec(cmd_inspect);
  try{
    json_inspec = JSON.parse(json_inspec);
  }catch(err){
    throw err;
  }
  var port = json_inspec["NetworkSettings"]["Ports"]["11211/tcp"][0].HostPort;
  return port;
};

exports.new = function(req, res) {
  console.log(req.body.name);
  var ip = "176.31.119.123";
  // var port = spawnRedisInstance(req.body.name);
  // console.log(port);
  console.log(exec('docker images'));
  res.json({
    ip: ip
    // port: port
  });
};