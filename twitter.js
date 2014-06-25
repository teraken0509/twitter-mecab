var http = require('http');
var request = require('request');
var url = require('url');
var Mecab = new require('mecab-async')
,mecab = new Mecab();

var wport = 3000;

var checkList = require('./conf/warnning_word.json');


var conf = require('./conf/twit.json');
var config = conf[0];
var Twit = require('twit');
var T = new Twit({
  consumer_key: config['api-key'],
  consumer_secret: config['api-secret'],
  access_token: config['accessToken'],
  access_token_secret: config['accessSecret']
});

//var io = require('socket.io').listen(wport);

var stream = T.stream('statuses/filter',{track: ['#ntv','#nhk','#tbs']});

//io.sockets.on('connection', function(socket){
	stream.on('tweet', function(tweet) {
		//socket.emit('twitter',tweet);
		parse = term_parse(tweet);
		console.log(parse);
		//socket.emit('mecab1',parse);
	/*	if(checkText(parse)){
			console.log('禁止文字なし');
		}else{
			console.log('禁止文字あり');
		}
*/
		wakachi = term_wakachi(tweet);
		//socket.emit('mecab2',wakachi);
		console.log(tweet);
	});
//});

function term_parse(tweet){
	var result = null;
	mecab.parse(tweet['text'],function(err, result){
		if(err){throw err;}
		console.log(result);
		//io.sockets.emit('mecab1',result);
		return result;
	});
}

function checkText(parseList){
	for(var j=0; j< size(parseList); j++){
		for(var i=0; i<size(checkList); i++){
			parseList[j].contains(checkList[i], function(found){
                		if(found){
					return false;
				}else{
					console.log('Not Found ... '+ checkList[i] + 'in ' + parseList[j]);
				}
			});
        	}
	}
	return true;
}

function term_wakachi(tweet){
	var result = null;
	mecab.wakachi(tweet['text'], function(err, result){
		if(err){throw err;}
		console.log(result);
		//io.sockets.emit('mecab2',result);
	});

}
