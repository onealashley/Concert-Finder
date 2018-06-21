var title;

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
            title = $("<p id = artist>").text(response.events.event[i].title);
            // $("#artist").click(function());
            var venue = $("<p id = venue>").text(response.events.event[i].venue_name);
            // $("#venue").click(funtcion());
            var address = $("<p>").text(response.events.event[i].venue_address);
            var parsedDate = $("<div class=date>").append(moment(response.events.event[i].start_time).format('Do MMM'));
            concertInfo.append(title).append(venue).append(address);
            var button = $('<button>').text('More Info')
            var link = $('<a>').attr('href', response.events.event[i].url)
            link.append(button);
            button.addClass('btn btn-lg');
            $("#event-view").append(parsedDate).append(concertInfo);
            concertInfo.append(link);
             
            //googleSearch();
            
        }
    });
}

// function googleSearch(){
//     $.ajax({
//         url:'https://www.googleapis.com/customsearch/v1?key=AIzaSyDWeL-Vl1ixwYme3CsCloG4KGPbod3Yx_c&cx=002724992046672505104:qt0x3gyeaes&q='+title.text(),
//         method:'GET'
//     }).then(function(response){
//         console.log(title.text());
//         console.log(response.items[0].formattedUrl);
//         for (i = 0; i < $('.events'); i++){
//         var button = $('<button>').text($('More Info').text);
//         $('.events').append(button); 
//     }            
//     })
// }

    //AIzaSyDWeL-Vl1ixwYme3CsCloG4KGPbod3Yx_c




$("#search-location").on("click", function(event){
    event.preventDefault();
    var inputLocation = $("#location-input").val().trim();
    displayConcert(inputLocation);
})