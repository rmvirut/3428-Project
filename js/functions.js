/*This file is intended primarily for the functions that the program may or may not use. It it
 * designed to allow for further extension (see what I did there) and as much code re-use as possible*/
var currentPos = {
    lat: "",
    lng: ""
}; //device's current location as a LatLgn object. Updates every 30secs
var lastPos = {
    lat: "",
    lng: "",
    url: "optional"
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
        lastPos.url = waypointsArr[index].url;

        $(siteLoader).empty(); //remove current content
        var embed = "<object data= " + lastPos.url + " frameborder='0'" +
            " style='overflow: hidden; height: 100%; width: 100%; position: absolute;' height='100%' width='100%'></object>";
        $(siteLoader).html(embed);
    } else {

    }


}

function report() {
    console.log("Current position is lat: " + currentPos.lat + " and " + " lng: " + currentPos.lng + "\n" +
        "Current position is lat: " + lastPos.lat + " and " + " lng: " + lastPos.lng + "\n" +
        "Accuracy is: " + accuracy
    );
}


//deprecated
/**
 * Returns the coordintes of a street address passed to it
 * @param streetAddress: street address of a specified location that is recognized on google maps. Must be in the format
 * /[streetNumber][Street Name],[City],[Region][Postal Code]?/
 * @returns returns the first location object in an array of results. This is often the location closest to the device
 */
function getLocation(streetAddress) {
    var LatLng;
    var geocoderRequest = {
        'address': streetAddress,
    }

    var geocoder = new google.maps.Geocoder();
    geo.geocode(geocoderRequest.address, function (results, status) {
        if (status = 'OK') {
            LatLng = results[0].geometry.location
        }
    })
}


/**
 * Accepts coordinates of a location and places it's marker on the map with name
 * @param LatLng: location coordinates in the form of Longitude and Latitude
 * @param name:  Name of the location marked down
 * @param mapVar: Initialized google maps object
 */
function setMarker(LatLng, name, mapVar) {
    var marker = new google.maps.Marker({
        map: mapVar,
        position: LatLng,
        title: name
    });
}

/**
 * Function places a balloon/marker in the page map.
 * @param address - location address as a street address in String format
 * @param map - the google map object on the page
 */
function placeMarkers(address, map) {
    var geoCode = new google.maps.Geocoder();
    //function incomplete

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