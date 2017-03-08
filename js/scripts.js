


//on start check for GPS availability
testDevice();

getCurrentLocation();
setInterval(function () {
    main()
}, 30000);
// setTimeout(main(), 30000);