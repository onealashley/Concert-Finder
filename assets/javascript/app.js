var venueId 
var title
var performer = [];
var performers

// transition on page load
document.body.className += ' fade-out';
$(function() {
    $('body').removeClass('fade-out');
});

// this is the function that makes
// the ajax call to the "eventful" api
// to get the listing of local concerts
function displayConcert(location) {
    var queryUrl = "https://api.eventful.com/json/events/search?location=" + location + "&keywords=has_performers:1&tag=music&cors_filter=1&t=this+month&c=music&app_key=FFR9NRDxgF32bNs5";

    $.ajax({
        url: queryUrl,
        dataType: "jsonp",
        jsonp: "callback",
        method: "GET"
    }).then(function(response) {
        console.log(response.events);
        for (i = 0; i < response.events.event.length; i++) {
            updateDomWithEvent(response.events.event[i]);
        }
    });
}

// this is the function that sorts
// thru the JSON and it creates the 
// content on the screen... buttons
// and text
function updateDomWithEvent(event) {
    console.log(event);

    // this is where the concerts information
    // is getting stored and placed into
    // variables to be placed onto the div
    // with the id of "event-view"
    var concertInfo = $("<div class=events>");
    var buttons = $("<div class=buttons>");
    var title = $("<p id = artist>").text(event.title);
    performers = event.performers.performer.name;
    var venue = $("<p id = venue>").text(event.venue_name);
    var address = $("<p>").text(event.venue_address);
    
    // this si getting info and then
    // creating a link to google
    // maps for the concert's venue
    var latitude = event.latitude;
    var longitude = event.longitude;
    var mapButton = $('<button>').text('Map Info')
    var mapLink = $('<a>').attr('href', "http://www.google.com/maps/place/" + latitude + "," + longitude).attr('target','_blank');
    mapLink.append(mapButton);
    mapButton.addClass('btn btn-lg');
    var button = $('<button>').text('Event Info')
    var link = $('<a>').attr('href', event.url).attr('target','_blank');
    link.append(button);
    button.addClass('btn btn-lg');

    // this is parsing the date and time with 
    // moment.js to make the date and time
    // look more pleasing
    var dateAndTime = $("<div class=date>")
    var parsedDate = $("<div>").append(moment(event.start_time).format('Do MMM'));
    var parsedTime = $("<div>").append(moment(event.start_time).format('h A'));
    
    dateAndTime.append(parsedDate).append(parsedTime);
    concertInfo.append(title).append(venue).append(address);
    buttons.append(mapLink).append(link);
   
    iTunes(function(buttonToAppend) {
        buttons.append(buttonToAppend);
    });

    // this is when all of the information is
    // getting appended to the div.
    $("#event-view").append(dateAndTime).append(concertInfo).append(buttons);
}

// this function querys the "itunes"
// api to get the artist information.
// it then uses the returned
// information to create a button on
// the DOM to send the user to itunes
function iTunes(callback){

    console.log(performers);
    performers = performers.replace(/ /g,"+");
    console.log(performers);
    var queryUrl2 = "https://cors-anywhere.herokuapp.com/" + "itunes.apple.com/search?term=" + performers + "&entity=allArtist&attribute=allArtistTerm";
    console.log(queryUrl2);

    $.ajax ({
        url: queryUrl2,
        method: "GET"
    }).then(function(response2) {
        var res = JSON.parse(response2);
        var artistLink = (res["results"][0].artistLinkUrl);

        var button = $('<button>').text('Artist Info')
        var bandLink = $('<a>').attr('href', artistLink).attr('target','_blank');
        bandLink.append(button);
        button.addClass('btn btn-lg');

        callback(bandLink);
    });
}



$("#search-location").on("click", function(event){
    event.preventDefault();
    $("#event-view").empty();
    var inputLocation = $("#location-input").val().trim();
    displayConcert(inputLocation);
});

