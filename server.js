var express = require('express')
var app = express()

app.get('/temp', function (req, res) {
 
   var s = req.query.s;


   var fs = require('fs');
   var index = fs.readFileSync('/sys/bus/w1/devices/28-000005009908/w1_slave');
   var pos = index.toString('ascii').indexOf('t=');
   var rawtemp = index.toString('ascii').substring(pos+2)
   
   var temp = (rawtemp/1000.0);

   if (s == 'f')
      temp = temp * 9.0 / 5.0 + 32.0;

   res.contentType('text');
   res.send(temp.toFixed(2));
})


app.get('/', function (req, res)
{
     res.sendFile(__dirname + '/index.html');
})






var server = app.listen(80, function () {

  console.log('Example app listening on port 80')

})
