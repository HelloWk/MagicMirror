var temperature = '0';
var humidity = '0';
var heatIndex = '0';

var temhum = {
  mqttServer      : config.tem_hum.mqttServer       || 'mqtt.hellowk.cc',
  mqttServerPort  : config.tem_hum.mqttServerPort   || 9001,
  mqttclientName  : config.tem_hum.mqttclientName   || "magic_mirror_tem_hum",
  temperatureTopic: config.tem_hum.temperatureTopic || 'homekit/himitsu/temperature',
  humidityTopic   : config.tem_hum.humidityTopic    || 'homekit/himitsu/humidity',
  heatIndexTopic  : config.tem_hum.heatIndexTopic   || 'homekit/himitsu/heatIndex',
};

console.log("Connecting to MQTT broker...");
// Create a client instance
client = new Paho.MQTT.Client(temhum.mqttServer, Number(temhum.mqttServerPort), temhum.mqttclientName);
client.connect({onSuccess:function() {
  // Once a connection has been made, make a subscription and send a message.
  console.log("MQTT onConnect");
  client.subscribe(temhum.temperatureTopic);
  client.subscribe(temhum.humidityTopic);
  client.subscribe(temhum.heatIndexTopic);
}});

client.onConnectionLost = function(responseObject) {
  if (responseObject.errorCode !== 0) {
    console.log("onConnectionLost:"+responseObject.errorMessage);
  }
};

client.onMessageArrived = function(message) {
  console.log("onMessageArrived:"+message.payloadString);
  var topic = message.destinationName;
  if (topic == 'homekit/himitsu/temperature') {
    temperature = Number(message.payloadString).toFixed(0);
    localStorage.setItem('temperature',temperature);
  } else if (topic == 'homekit/himitsu/humidity') {
    humidity = Number(message.payloadString).toFixed(0);
    localStorage.setItem('humidity',humidity);
  } else if (topic == 'homekit/himitsu/heatIndex') {
    heatIndex = Number(message.payloadString).toFixed(0);
    localStorage.setItem('heatIndex',heatIndex);
  }
};

var tem_hum = {
  temperatureLocation: '.temhum',
  updateInterval: 10000,

}

tem_hum.updateTemHum = function () {
  var thtext2 = '<div>' + temperature + '°</div><div class="xxsmall">室温</div>'
  var thtext3 = '<div>' + humidity    + '%</div><div class="xxsmall">湿度</div>'
  var thtext1 = '<div>' + heatIndex       + '°</div><div class="xxsmall">体感</div>'
  var thtext  = '<div><span class="th">'+thtext1+'</span> <span class="th" style="width: 20;"></span> <span class="th">'+thtext2+'</span> <span class="th" style="width: 20;"></span> <span class="th">'+thtext3+'</span></div>'
  $(this.temperatureLocation).updateWithText(thtext, this.fadeInterval);

  // $.ajax({
  //   type: 'GET',
  //   datatype:'jsonp',
  //   url: 'controllers/thsensor.php',
  //   success: function (data) {
  //     // console.info(data);
  //     var ths = JSON.parse(data);

  //     if (1) {
  //       // var thtext = '室内温湿 ' + ths.temperature + '°, ' + ths.humidity + '%';
  //       var thtext1 = '<div>' + ths.temperature + '°</div><div class="xxsmall">室温</div>'
  //       var thtext2 = '<div>' + ths.humidity    + '%</div><div class="xxsmall">湿度</div>'
  //       var thtext  = '<div><span class="th">'+thtext1+'</span> <span class="th" style="width: 20;"></span> <span class="th">'+thtext2+'</span></div>'
  //     } else {
  //       var thtext = 'Interior, ' + ths.temperature + '°, ' + ths.humidity + '%';
  //     }

  //     $(this.temperatureLocation).updateWithText(thtext, this.fadeInterval);
  //   }.bind(this),
  //   error: function () {
  //     // non-specific error message that should be updated
  //     console.error('No thsensor results');
  //   }
  // });

}

tem_hum.init = function () {
  temperature = localStorage.getItem('temperature');
  humidity    = localStorage.getItem('humidity');
  heatIndex   = localStorage.getItem('heatIndex');

	this.updateTemHum();

	this.intervalId = setInterval(function () {
		this.updateTemHum();
	}.bind(this), this.updateInterval)

}
