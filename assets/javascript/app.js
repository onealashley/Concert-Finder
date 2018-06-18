function displayConcert(location) {
    var queryUrl = "https://api.eventful.com/json/events/search?location=" + location + "&cors_filter=1&t=this+month&category=music&app_key=FFR9NRDxgF32bNs5";

    $.ajax({
        url: queryUrl,
        dataType: "jsonp",
        jsonp: "callback",
        method: "GET"
    }).then(function(response) {
        console.log(response.events);
        for (i = 0; i <response.events.event.length; i++) {
            console.log(response.events.event[i]);
            var concertInfo = $("<div>");
            var title = $("<p>").text(response.events.event[i].title);
            var venue = $("<p>").text(response.events.event[i].venue_name);
            var address = $("<p>").text(response.events.event[i].venue_address);
            var startDate = $("<p>").text(response.events.event[i].start_time);
            concertInfo.append(title).append(venue).append(address).append(startDate);
            
            $("#event-view").append(concertInfo);
            
        }
    });
}

$("#search-location").on("click", function(event){
    event.preventDefault();
    var inputLocation = $("#location-input").val().trim();
    displayConcert(inputLocation);
})