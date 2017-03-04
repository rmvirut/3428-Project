$(document).ready(function (){
    if(!testDevice()){
        throw new Error("You device does not support GPS location or the feature has been disabled");
    }
})

navigator.getlocation.getCurrentPosition(alert);