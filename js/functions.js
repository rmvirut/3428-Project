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
//var map = new google.map();
var siteLoader = document.getElementById("siteLoader");
var countTime = 0;

/**
 * Java still lives!!! say hello to the main method
 */
function main() {
    getCurrentLocation();
    console.log(countTime + "s");
    report();
    countTime += 30;

    //wait two seconds before checking due to asynchronous processing
    var index = isPredefined();
    console.log(index);

    if (index >= 0) { //if true then it's a waypoint
        console.log(index);

        lastPos.lat = waypointsArr[index].coords.lat;
        lastPos.lng = waypointsArr[index].coords.lng;

        $(siteLoader).empty(); //remove current content

        //create a new embod object with the location's url
        var embed = "<object data= " + waypointsArr[index].url + " frameborder='0'" +
            " style='overflow: hidden; height: 100%; width: 100%; position: absolute;' height='100%' width='100%'></object>";
        //insert into the page
        $(siteLoader).html(embed);
    } else {//if the location is not know
        //not the current location
        lastPos.lat = currentPos.lat;
        lastPos.lng = currentPos.lng;

        initMap();
    }


}

/**
 * Reports the current state of global variables and other system runtime values. Can be modified to report
 * more
 */
function report() {
    console.log("Current position is lat: " + currentPos.lat + " and " + " lng: " + currentPos.lng + "\n" +
        "Current position is lat: " + lastPos.lat + " and " + " lng: " + lastPos.lng + "\n" +
        "Accuracy is: " + accuracy
    );
}

function initMap() {
    $(siteLoader).empty();//clear the site loader if current content
    var mapBox = $(siteLoader).add('div');//create map container
    mapBox.setAttribute("height", "500px");
    mapBox.setAttribute("width", "100%");
    mapBox.setAttribute("id", "googleMap");

    var mapOptions = {
        zoom: 15,
        center: lastPos
    }

    //now insert the map
    var map = new google.maps.Map(mapBox, mapOptions);

    //create a marker for the object (remember to add custom icon later)
    var marker = new google.maps.Marker({
        position: lastPos,
        map: map
    });
}

/**
 * Tests if the device supports GPS or if it's active
 * @returns True if the device supports
 */
function testDevice() {
    if (navigator.geolocation) {
        console.log("Device GPS active.");
        navigator.geolocation.getCurrentPosition(function (data) {
            accuracy = data.coords.accuracy;
        });
        return true;
    } else {
        console.log("Device is not supported or GPS feature is disabled\n" +
            "Please enable and refresh the page");
        return false;
    }
}

/**
 *
 * @param {*} errorMessage the error message you want to print to the screen.
 *
 */
function errorPrint(errorMessage) {
    console.log(errorMessage);
    var main = document.getElementById("errorPar");
    main.innerHTML(errorMessage);
}

/**
 *
 * @param {*} errorObject
 */
function errorHandler(errorObject) {
    console.log(errorObject.message);
    alert(errorObject.message);
}

/**
 *
 * @returns return >= 0 if current location is a waypoint, -1 otherwise
 */
function isPredefined() {
    for (var i = 0; i < waypointsArr.length; i++) {
        if (waypointsArr[i].coords.lat == currentPos.lat && waypointsArr[i].coords.lng == currentPos.lng) {
            return i
        }
    }
    return -1;
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
 * Uses the haversine formula to calculate distance between two points on the earth's surface
 * read more: http://www.movable-type.co.uk/scripts/latlong.html
 */
var distance = function(){
    return google.maps.geometry.spherical.computeDistanceBetween(lastPos, currentPos);
}

function jsonCallback(json){
   var waypoints = json.waypoints;
}

function getWaypoints(my_url){
    $.ajax({
        url: my_url,
        dataType: "jsonp"
    });
}
