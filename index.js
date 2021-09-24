const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');
const { fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');



fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});

let ip = '72.141.6.152';

fetchCoordsByIP(ip, (error, latlong) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log(latlong);
});

const coords = { latitude: '43.6445', longitude: '-79.7755' };

fetchISSFlyOverTimes(coords, (error, passTimes) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned Flyover times:' , passTimes);
});

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  
  printPassTimes(passTimes);
});

const printPassTimes = function(passTimes) {

  for (const passtime of passTimes) {

    const datetime = new Date(0);
    datetime.setUTCSeconds(passtime.risetime);
    const duration = passtime.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);

  }
};
