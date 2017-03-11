// "description": {
//     info: "This file contains the pre-defined waypoint objects are all stored in a waypoints array with the format",
//         name: "given name of the location",
//         url: "predefined webpage for the location" http://[domain][webpage]?
//         coord.latitude: "latitude of the cordinate",
//         coord.longitude: "longitude of the coordinate",
//         zoom: "the google map zoom level as some locations cannot be seen at certain distance"

var waypointsArr = [
    {
        name: "Loyola Tim Hortons",
        url: "http://www.timhortons.com/ca/en/locations/get-directions.php?id=101519&utm_source=Google&utm_medium=Local&utm_term=NS&utm_content=Halifax&utm_campaign=Local_Search",
        coords: {
            lat: 44.6306092,
            lng: -63.5808635
        },
        zoom: 19
    },
    {
        name: "St Mary's University Arena",
        url: "http://www.smuhuskies.ca/sports/mice/index",
        coords: {
            lat: 44.632015,
            lng: -63.580677
        },
        zoom: 17
    },
    {
        name: "Student Union Building",
        url: "https://smusa.ca/",
        coords: {
            lat: 44.6314987,
            lng: -63.5809118
        },
        zoom: 17
    },
    {
        name: "My house",
        url: "http://smu.ca/campus-life/smufit-homburg-centre.html",
        coords: {
            lat: 44.647917299999996,
            lng: -63.6013177
        },
        zoom: 17
    }
];