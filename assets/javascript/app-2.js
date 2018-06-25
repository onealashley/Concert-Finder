function displayConcert(location) {
    var queryUrl = "https://api.eventful.com/json/events/search?location=" + location + "&tag=music&cors_filter=1&t=this+month&c=music&app_key=FFR9NRDxgF32bNs5";

    $.ajax({
        url: queryUrl,
        dataType: "jsonp",
        jsonp: "callback",
        method: "GET"
    }).then(function(response) {
        console.log(response.events);

        for (i = 0; i < response.events.event.length; i++) {
            console.log(response.events.event[i]);
            var concertInfo = $("<div class=events>");
            var title = $("<p id = artist>").text(response.events.event[i].title);
            var venue = $("<p id = venue>").text(response.events.event[i].venue_name);
            var address = $("<p>").text(response.events.event[i].venue_address);
            var latitude = response.events.event[i].latitude;
            var longitude = response.events.event[i].longitude;

            console.log(latitude + "," + longitude);
            

            console.log(myMap());
            
            var parsedDate = 
                $("<div class=date>").append(
                    moment(response.events.event[i].start_time).format('Do MMM')
                );

            var parsedTime = 
                $("<div class=date>").append(
                    moment(response.events.event[i].start_time).format('h A')
                );

            concertInfo.append(title).append(venue).append(address);
            
            var mapId = `map-${i}`;
            var mapDiv = $("<div>")
                .attr("id", `map-${i}`)
                .attr("class", "map");

            $("#event-view")
                .append(parsedDate)
                .append(parsedTime)
                .append(concertInfo)
                .append(mapDiv);
            
            console.log("calling");
            myMap(latitude, longitude, mapId);
            console.log("called");
        }
    });
}

function myMap(latitude, longitude, mapId) {
    var mapProp = {
        center: new google.maps.LatLng(latitude, longitude),
        zoom: 20,
    };
        new google.maps.Map(document.getElementById(mapId), mapProp);
    // } catch (e) {
        // console.log("oh shit");
    // }
}

$("#search-location").on("click", function(event){
    event.preventDefault();
    var inputLocation = $("#location-input").val().trim();
    displayConcert(inputLocation);
})