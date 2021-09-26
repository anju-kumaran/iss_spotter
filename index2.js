// const { fetchMyIP } = require('./iss_promised');
// const { fetchCoordsByIP } = require('./iss_promised');
// const { fetchISSFlyOverTimes } = require('./iss_promised');
const { nextISSTimesForMyLocation } = require('./iss_promised');

// fetchMyIP()
//   .then(fetchCoordsByIP)
//   .then(fetchISSFlyOverTimes)
//   .then(body => console.log(body));

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printPassTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });

  const printPassTimes = function(passTimes) {

    for (const passtime of passTimes) {
  
      const datetime = new Date(0);
      datetime.setUTCSeconds(passtime.risetime);
      const duration = passtime.duration;
      console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  
    }
  };