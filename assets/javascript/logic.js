
$(document).ready(function() {


// TICETMASTER API CALL
$("#run-search").on("click", function(event){ 
    event.preventDefault();
    
    var searchTerm = $("#search-term").val().trim();
    var queryURL = "https://app.ticketmaster.com/discovery/v2/events?keyword=" + searchTerm + "&apikey=qDmaWBTfNnhcNqUaYnYfuEl5K1xVPlxR&countryCode=US";
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        if (response.page.totalElements === 0) {
             $("#display").text("No Result");

        } else {
            var data = response._embedded.events;
            eventsResult(data);
            console.log(data);
        }
   
    })
});

var eventObject;
// CALL GETS PASSED INTO THIS SEARCH RESULTS FUNCTION
function eventsResult (results) {
// LOOP RUNS FOR NUMBER OF SEARCH RESULTS
    for (var i = 0; i < results.length; i++) {

// THE OBJECT IS "eventObject" WITH LONGITUDE AND LATITUDE "eventObject.long, eventObject.lang"
// THIS IS THE OBJECT
        eventObject = {
             name: results[i].name,
             date: results[i].dates.start.localDate,
             time: results[i].dates.start.localTime,
             link: results[i].url,
             image: results[i].images[0].url,
             city: results[i]._embedded.venues[0].city.name,
             state: results[i]._embedded.venues[0].state.stateCode,
             zip: results[i]._embedded.venues[0].postalCode,
             long: results[i]._embedded.venues[0].location.longitude,
             lat: results[i]._embedded.venues[0].location.latitude,
             info: results[i].info
        };
        
        // THESES VARIABLE SET SEARCH DATA TO HTML ELEMENTS
        var name = $("<p>").html(eventObject.name);
        var date = $("<p>").html(eventObject.date);
        var city = $("<p>").html(eventObject.city + ", " + eventObject.state);
        var image = $("<img>").attr("src", eventObject.image);
        var info = $("<p>").html(eventObject.info);

        image.attr("style", "width: 300px");

        var eventDiv = $("<div>"); // THIS IS THE DIV FOR EACH EVENT RESULT
        var eventDisplay = $("#display");
            eventDisplay.prepend(eventDiv);
            eventDiv.append(image);
            eventDiv.append(name);
            eventDiv.append(date);
            eventDiv.append(city);
            eventDiv.append(info);
            
      eventInfo(eventDiv, eventObject);      
    }
};

function eventInfo(div, data) {
    div.on("click", function() {
    eventObject = data;
    window.location = "details_page.html";
})
};

// ignore for now....
function detailsPage() {
    console.log(eventObject);
}

// also ignore this... 
function holdThis() {
    $( document ).on( "load", function(){
        console.log(eventObject);

        
        var name = $("<p>").html(event.name);
        var date = $("<p>").html(event.date);
        var city = $("<p>").html(event.city + ", " + event.state);
        var image = $("<img>").attr("src", event.image);
        var info = $("<p>").html(event.info);
        
        var eventDiv = $("<div>");
        var eventDisplay = $("#display");
        eventDisplay.prepend(eventDiv);
        eventDiv.append(image);
        eventDiv.append(name);
        eventDiv.append(date);
        eventDiv.append(city);
        eventDiv.append(info);
        
    });
}

})