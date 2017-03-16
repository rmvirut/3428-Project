//on start check for GPS availability
testDevice();
//manually set last lastPos to avoid null value errors
navigator.geolocation.getCurrentPosition(function(data){
    lastPos.lat = data.coords.lat;
    lastPos.lng = data.coords.lng;
}, null, {enableHighAccuracy:true});
getCurrentLocation();
setInterval(function () {
    main()
}, 30000);
// setTimeout(main(), 30000);