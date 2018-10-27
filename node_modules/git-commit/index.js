#!/usr/bin/env node
var exec = require('child_process').exec;

exec('git remote -v',function(error,stdout,stderr){
  var parse = /origin.*?git@(.*?):(.*?)\/(.*?)\s/
  if(parse.test(stdout)){
    var regList = parse.exec(stdout);
    var httpUrl = 'https://' + regList[1] + '/' + regList[2] + '/' + regList[3];
    exec('git remote set-url origin ' + httpUrl,function(error,stdout,stderr){
        console.log(httpUrl);
    });
  }else{
    parse = /origin.*?https:\/\/(.*?)\/(.*?)\/(.*?)\s/;
    var regList = parse.exec(stdout);
    var gitUrl = 'git@' + regList[1] + ':' + regList[2] + '/' + regList[3];
    exec('git remote set-url origin ' + gitUrl,function(error,stdout,stderr){
        console.log(gitUrl);
    });

  }

});
