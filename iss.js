const request = require('request');

const fetchMyIP = function(callback) {

  request(`https://api.ipify.org/?format=json`, (error, response, body) => {

    if (error) {

      error = 'Request Failed';

      return callback(error, null);
      
    }
    if (response.statusCode !== 200) {

      callback(Error(`Status Code ${response.statusCode} when fetching IP: ${body}`), null);

      return;

    }

    const data = JSON.parse(body);

    const myIp = data.ip;
          
    callback(null, myIp);
      
  });

};


module.exports = { fetchMyIP };