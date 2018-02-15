/**
 * (c) Copyright 2018 Clause Inc., all rights reserved.
 */
'use strict';

/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-var */

/**
 * Execute the smart clause
 * @param {Context} context - the Accord context
 * @param {io.clause.platoon.ExitPlatoon} context.request - the incoming request
 * @param {io.clause.outbound.physical.Http} context.response - the response
 * @AccordClauseLogic
 */
function ExitPlatoon(context) {
    // logger.info(context);
    var req = context.request;
    var res = context.response;
    var data = context.data;

    let platoonLeader = req.platoonLeader;
    let vehicle = req.vehicle;

    // Find only the vehicle transactions since the vehicle joined the platoon
    // TODO (MR) Note. Currently this calculates the total distance if a truck joins the same platoon multiple times.
    let isInPlatoon = false;
    let totalDistance = platoonLeader.vehicleTransactions.filter((tx) => {
        // Only count the transactions that occured while the truck was in the platoon
        if(tx.getFullyQualifiedType()  === 'io.clause.platoon.JoinPlatoon'){
            isInPlatoon = true;
            return false;
        }
        else if(tx.getFullyQualifiedType()  === 'io.clause.platoon.ExitPlatoon'){
            isInPlatoon = false;
            return false;
        } else {
            // Only match the vehicle that triggered this ExitPlatoon transaction
            return isInPlatoon && tx.vehicle.getIdentifier() === vehicle.getIdentifier();
        }
    })
    // Pull out the location field
    .map((tx) => tx.location)
    // Find the distance between each adjacent location
    .map((location, index, locations) => {
        if(index < locations.length-1){
            return grandCicleDistance(location, locations[index+1]);
        } else {
            return 0;
        }
    })
    // Sum the route steps
    .reduce((prev, current) => prev + current, 0);

    // Build the outbound payload
    res.url = 'https://hooks.zapier.com/hooks/catch/2739350/zk5smc/';
    res.method = 'POST';
    res.body = JSON.stringify({
        description: 'Rider. ' + formatDate(new Date()) + '. Vehicle ' + vehicle.getIdentifier() + '. ' + totalDistance.toFixed(2) + ' km',
        quantity: totalDistance.toFixed(2),
        rate: data.subscriberFee,
    });

}

/**
 *
 * @param {Date} date - the date
 * @returns {string} - formatted date
 */
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) {month = '0' + month;}
    if (day.length < 2) {day = '0' + day;}

    return [year, month, day].join('-');
}

/**
 * Haversine formula to calculate the grand-circle distance between two co-ordinates.
 * Returns a distance in meters.
 * @param {io.clause.platoon.Location} location1 - co-ordinate 1
 * @param {io.clause.platoon.Location} location2 - co-ordinate 2
 * @returns {Double} distance
 */
function grandCicleDistance(location1, location2){
    let R = 6371e3; // Radius of the earth in metres
    let φ1 = toRadians(location1.lat);
    let φ2 = toRadians(location2.lat);
    let Δφ = toRadians(location2.lat-location1.lat);
    let Δλ = toRadians(location2.long-location1.long);

    let a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    let d = R * c;
    return d;
}

/**
 * Converts an angle in degrees to radians
 * @param {Double} Value a value in degress
 * @returns {Double} the value in radians
 */
function toRadians(Value) {
    /** Converts numeric degrees to radians */
    return Value * Math.PI / 180;
}

/* eslint-enable no-unused-vars */
/* eslint-enable no-undef */