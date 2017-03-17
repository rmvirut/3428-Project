//on start check for GPS availability
testDevice();
//manually set last lastPos to avoid null value errors
getCurrentLocation();
setInterval(function () {
    main()
}, 5000);
// setTimeout(main(), 30000);