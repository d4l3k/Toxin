var conn = new WebSocket('ws://localhost:38473');
var rubyQueue = [];
function execRuby(msg,callback){
    conn.send(JSON.stringify({op:'exec_ruby',data:msg}));
    rubyQueue.push(callback);
}
conn.onopen = function (e) {
}
conn.onerror = function(e) {
}
conn.onmessage = function(e) {
    var json = JSON.parse(e.data);
    if(json.op=="callback"){
        func = rubyQueue.shift();
        func(json.data);
    }
}
