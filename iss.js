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

const fetchCoordsByIP = function(ip, callback) {
  
  let latlongObj = {};
 
  //request(`https://freegeoip.app/json/invalidIPHere`, (error, response, body) => {

  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {

    if (error) {

      error = 'Request Failed';

      return callback(error, null);

    }
    
    if (response.statusCode !== 200) {

      return callback(`Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`, null);
    }
    // if (response.statusCode !== 200) {
    //   callback(Error(`Status Code ${response.statusCode} when fetching Coordinates for IP: ${body}`), null);
    //   return;
    // }
    // const { latitude, longitude } = JSON.parse(body);
    // callback(null, { latitude, longitude });

    const data = JSON.parse(body);

    const latitude = data.latitude;
    const longitude = data.longitude;

    latlongObj['latitude'] = latitude;
    latlongObj['longitude'] = longitude;
          
    return callback(null, latlongObj);
    
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {

  const url = `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;

  request(url, (error, response, body) => {

    if (error) {
      return callback(error, null);
    }

    if (response.statusCode !== 200) {

      return callback(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`, null);
    }

    // if (response.statusCode !== 200) {
    //   callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
    //   return;
    // }

    const ouput = JSON.parse(body).response;

    callback(null, ouput);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  
  fetchMyIP((error, ip) => {

    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, latlong) => {

      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(latlong, (error, passTimes) => {

        if (error) {
          return callback(error, null);
        }

        callback(null, passTimes);

      });

    });

  });

};


module.exports = {
  fetchMyIP,
  fetchCoordsByIP,
  fetchISSFlyOverTimes,
  nextISSTimesForMyLocation
};