/*This file is intended primarily for the functions that the program may or may not use. It it
 * designed to allow for further extension (see what I did there) and as much code re-use as possible*/
var currentPos = {
    lat: "",
    lng: ""
}; //device's current location as a LatLgn object. Updates every 30secs
var lastPos = {
    lat: "",
    lng: ""
}; //last know coordinates
var accuracy;
var WAYPOINT_RADIUS = 60;
//var map = new google.map();
var SITE_LOADER = document.getElementById("siteLoader");
var countTime = 0;
var distance = getDistance(currentPos, lastPos);

/**
 * Java still lives!!! say hello to the main method
 */
function main() {
    //get and set the current location
    getCurrentLocation();
    //during program startup i.e @ countTime = 0, set the last position to current
    if (countTime == 0) {
        lastPos.lat = currentPos.lat;
        lastPos.lng = currentPos.lng;
    }

    console.log(countTime + "s");
    report();
    countTime += 5;

    //wait two seconds before checking due to asynchronous processing
    var index = isPredefined();
    console.log("Index: " + index);
    if (index >= 0) { //if true then current position is a waypoint

        lastPos.lat = waypointsArr[index].coords.lat;
        lastPos.lng = waypointsArr[index].coords.lng;

        $(SITE_LOADER).empty(); //remove current content of siteloader

        //create a new embed object with the location's url
        var embed = "<object data= " + waypointsArr[index].url + " frameborder='0'" +
            " style='overflow: hidden; height: 100%; width: 100%; position: absolute;' height='100%' width='100%'></object>";
        //insert into the page
        $(SITE_LOADER).html(embed);
    } else {

        //if the program is just starting (last position is unknown) or the new position is +60m from the last, update the program
        if (Math.round(getDistance(lastPos, currentPos)) > 60) {
            //update the current location to the current
            lastPos.lat = currentPos.lat;
            lastPos.lng = currentPos.lng;
            //clear the siteloader and load the new google maps object
            $(SITE_LOADER).empty();
            initMap();
        }

    }

}

/**
 * Reports the current state of global variables and other system runtime values. Can be modified to report
 * more
 */
function report() {
    console.log("Current position is lat: " + currentPos.lat + " and " + " lng: " + currentPos.lng + "\n" +
        "Last position is lat: " + lastPos.lat + " and " + " lng: " + lastPos.lng + "\n" +
        "Accuracy is: " + accuracy + "\n" + "Distance: " + distance
    );
}

/**
 * create new google maps object and inserts into the page. Centered on the last known position
 */
function initMap() {
    $(SITE_LOADER).html("<div id='mapBox'></div>");//create map container
    var mapBox = document.getElementById("mapBox");
    //mapBox.setAttribute("id", "googleMap");

    var mapOptions = {
        zoom: 17,
        center: {lat: lastPos.lat, lng: lastPos.lng}
    };

    //now insert the map
    var map = new google.maps.Map(mapBox, mapOptions);

    //create a marker for the object
    var marker = new google.maps.Marker({
        position: lastPos,
        map: map
    });

    var mark;

    //Show markers for each waypoint using custom markers
    for (i = 0; i < waypointsArr.length; i++) {
        var pos = new google.maps.LatLng(waypointsArr[i].coords.lat, waypointsArr[i].coords.lng);
        mark = new google.maps.Marker({
            position: pos,
            map: map,
            title: waypointsArr[i].name,
            icon: "./icon.png"
        });
    }
}

/**
 * Tests if the device supports GPS or if it's active and also tests for an active connection
 * @returns True if the device supports
 */
function testDevice() {
    if (navigator.geolocation && navigator.onLine) {
        console.log("Device GPS active and connected to a network");
    } else {
        /*Throws error on fail no GPS device available*/
        console.log("Device is not supported or GPS feature is disabled\n" +
            "Please enable and refresh the page");
        var error = new Error("Device is not supported or GPS feature is disabled\n" +
            "Please enable and refresh the page");
        error.name = "connectivity";
        errorHandler(error);
    }

}

/**
 *
 * @param {*} errorObject
 */
function errorHandler(errorObject) {
    console.log(errorObject.message);
    /**
     *code to create and active modal with the error message
     */
    alert(errorObject.name + "\n\n" +
        errorObject.message);
}

/**
 *
 * @returns return >= 0 if current location is a waypoint, -1 otherwise
 */
function isPredefined() {
    var shortestDistance = WAYPOINT_RADIUS;
    var index = -1;

    for (var i = 0; i < waypointsArr.length; i++) {

        //if the current position and waypoint are within range
        if (withingRange(currentPos, waypointsArr[i].coords)) {
            //if the wapoint is closer that a previous waypoing within range
            if (Math.min(getDistance(waypointsArr[i].coords, currentPos), shortestDistance) < shortestDistance) {
                shortestDistance = getDistance(waypointsArr[i].coords, currentPos);
                index = i;
            }
        }

        return index;
    }
}

/**
 * Function creates a navigator.geolocation object and obtains the devices location using getCurrentPosition
 * @returns returns the latitude and longitude positions of an object as an array
 */
function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(function (data) {
        currentPos.lat = data.coords.latitude;
        currentPos.lng = data.coords.longitude;
        accuracy = data.coords.accuracy;
    });
}

/**
 Finds distance between two points, using the google geometry library
 If lPos is not initialized, cPos will be used in its place.

 Params:
 cPos - an object with lat and lng fields
 lPos - an object with lat and lng fields

 Pre-conditions: cPos and lPos must be objects with lat and lng fields.
 These fields must be valid latitude and longitude values.

 Post-conditions: the distance between cPos and lPos is returned

 Returns: the distance, in metres, between cPos and lPos
 */
function getDistance(cPos, lPos) {
    //Convert cPos to a LatLng object
    cur = new google.maps.LatLng(cPos.lat, cPos.lng);
    //if lPos does not exist, use cPos to convert to a LatLng object
    if (lPos.lat || lPos.lng) {
        last = new google.maps.LatLng(lPos.lat, lPos.lng);
    }
    else {
        last = new google.maps.LatLng(cPos.lat, cPos.lng);
    }
    return google.maps.geometry.spherical.computeDistanceBetween(last, cur);
}

/**
 *
 */
function withingRange(pos1, pos2) {
    return Math.round(getDistance(pos1, pos2)) <= WAYPOINT_RADIUS;
}
