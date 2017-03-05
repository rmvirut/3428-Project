/*Functions*/

/**
 * Returns the coordintes of a street address passed to it
 * @param address: street address of a specified location that is recognized on google maps
 * @returns returns the first location object in an array of results. This is often the location closest to the device
 */
function getLocation(address){
    var geo = new google.maps.Geocoder();
    geo.geocoder({'address': address}, funtion(results, status){
        if (status == google.maps.GeocoderStatus.OK) {
            return results[0].geometry.location;
        }
    });
}


/**
 * Accepts coordinates of a location and places it's marker on the map with name
 * @param LatLng: location coordinates in the form of Longitude and Latitude
 * @param name:  Name of the location marked down
 * @param mapVar: Initialized google maps object
 */
function setMarker(LatLng, name, mapVar){
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
function placeMarkers(address, map){
    var geoCode = new google.maps.Geocoder();
    //function incomplete

}

/**
 * Tests if the device supports GPS or if it's active
 * @returns True if the device supports
 */
function testDevice(){
    if(navigator.geolocation){
        console.log("Device GPS active. Returned value true");
        return true;
    } else {
        console.log("Device is not supported or GPS feature is disabled\n"
        + "Please enable and refresh the page");
        return false;
    }
}

/**
 * 
 * @param {*} errorMessage the error message you want to print to the screen.
 * 
 */
function errorPrint(errorMessage){
        console.log(errorMessage);
        var main = document.getElementById("errorPar");
        main.innerHTML(errorMessage);
}

/**
 * 
 * @param {*} errorObject 
 */
function errorHandler(errorObject){
    console.log(errorObject.message);
    alert(errorObject.message);
}