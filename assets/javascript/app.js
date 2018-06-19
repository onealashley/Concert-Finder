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
            // $("#artist").click(function());
            var venue = $("<p id = venue>").text(response.events.event[i].venue_name);
            // $("#venue").click(funtcion());
            var address = $("<p>").text(response.events.event[i].venue_address);
            var parsedDate = $("<div class=date>").append(moment(response.events.event[i].start_time).format('Do MMM'));
            concertInfo.append(title).append(venue).append(address);
            
            $("#event-view").append(parsedDate).append(concertInfo);
            
        }
    });
}

$("#search-location").on("click", function(event){
    event.preventDefault();
    var inputLocation = $("#location-input").val().trim();
    displayConcert(inputLocation);
})