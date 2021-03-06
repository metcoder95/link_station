/**
 * Steps to complete the task:
 * 1. Receive an array of coordinates and a reach [x, y, reach].
 * 2. Iterate over the array of coordinates
 * 3. Calculate the distance between the coordinates.
 * 4. Calculate the power between the coordinates (if distance > reach, return 0).
 * 5. Find the maximum power among all the coordinates.
 * 5. If there's a maxium power
 *      return the coordinates in a format "Best link station for point x,y is ".
 * 6. If there's no maxium power return the string "No link station within reach for point x,y”".
 */

/**
 * Calculates the distance between two points in a bidimensional space.
 * @param {Array[number, number]} point1
 * @param {Array[number, number]} point2
 * @returns number
 */
function getDistanceBetweenPoints(point1, point2) {
  return Math.sqrt(point1[0] - point2[0] ** 2 + (point1[1] - point2[1] ** 2));
}

/**
 * Calculates the Link Station power based on reach and distance.
 * @param {number} reach
 * @param {number} distance
 * @returns number
 */
function getLinkStationPower(reach, distance) {
  return distance > reach ? 0 : (reach - distance) ** 2;
}

/**
 * Returns the required string based on the power and coordinates
 * @param {number} power
 * @param {Array[number, number]} coordinates
 * @param {Array[number, number]} device
 * @returns string
 */
function parseMessage(power, coordinates, device) {
  const [deviceX, deviceY] = device;
  if (power === 0 || coordinates == null) {
    return `No link station within reach for point ${deviceX},${deviceY}”`;
  }

  return `Best link station for point ${deviceX},${deviceY} is ${coordinates[0]},${coordinates[1]} with power ${power}`;
}

/**
 * Get's the best station for a given device based on power.
 * @param {Array{number, number}} device
 * @param {Array[[number, number, number]]} stations
 * @returns string
 */
function getBestLinkStation(device, stations) {
  let bestPower = 0;
  let bestStation = null;
  // eslint-disable-next-line no-restricted-syntax
  for (const station of stations) {
    const [, , reach] = station;
    const distance = getDistanceBetweenPoints(device, station);
    const power = getLinkStationPower(reach, distance);
    if (power > bestPower) {
      bestPower = power;
      bestStation = station;
    }
  }

  return parseMessage(bestPower, bestStation, device);
}

module.exports = getBestLinkStation;
