/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



$(function() {
    $.ajaxSetup({cache: false});

    hostname = location.hostname;
    var socket = io.connect('http://' + hostname + ':3000/');

    /* websocket接続時処理 */
    socket.on('connect', function() {
        $('#connection').html('<b>接続</b>');
    });
    socket.on('disconnect', function() {
        $('#connection').html('<b>切断</b>');
    });
    socket.on('twitter', function(data) {
        $('#log').append(data.text);
    });


    socket.on('mecab1', function(data) {
        for (var i = 0; i < data.length; i++) {
            $('#term1').append(data[i]);
            $('#term1').append('<br>');
        }
    });

    socket.on('mecab2', function(data) {
        for (var i = 0; i < data.length; i++) {
            $('#term2').append(data[i]);
            $('#term2').append('<br>');
        }
    });


});
