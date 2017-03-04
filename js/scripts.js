/*Global variables - ie scope is throughout the code running from this file. Cannot and should not be redeclared anywhere*/

/**
 * "main" method for the java users
 */
$(document).ready(function (){
    if(!testDevice()){
        throw new Error("You device does not support GPS location or the feature has been disabled");

    }else {
        console.log("We're now at " + navigator.geolocation.getCurrentPosition(function(data){
            return data;
        }))
    }

})

navigator.getlocation.getCurrentPosition(alert);