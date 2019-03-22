$(document).ready(function() {

//THIS FUNCTIN IS FOR THE DETAILS PAGE BUT A LOG WILL BE IN ANY PAGE'S CONSOLE
    detailsPage();

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

// SET THIS AS GLOBAL BUT NOT SURE WHY
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

        // info line
        var info = $("<p>").html(eventObject.info);
        // change info width
        info.attr("style", "width: 300px"); 

        // possibly change width of images, but may appear too big in details page
        image.attr("style", "width: 600px"); 

        var eventDiv = $("<div>"); // THIS IS THE DIV FOR EACH EVENT RESULT
        var eventDisplay = $("#display");
            eventDisplay.prepend(eventDiv);
            eventDiv.append(image);
            eventDiv.append(name);
            eventDiv.append(date);
            eventDiv.append(city);
            eventDiv.append(info);

// SELECT AN EVENT
      eventInfo(eventDiv, eventObject);      
    }
};

//THIS FUNCTION PASSES THE INFO FROM THE SELECTED EVENT AND PUTS THE INFO INTO LOCAL STORAGE - "INFO" WAS TOO BIG TO STORE
function eventInfo(div, data) {
    div.on("click", function() {
    var eventChoice = data;
    localStorage.setItem("event-name", eventChoice.name);
    localStorage.setItem("event-date", eventChoice.date);
    localStorage.setItem("event-time", eventChoice.time);
    localStorage.setItem("event-image", eventChoice.image);
    localStorage.setItem("event-link", eventChoice.link);
    localStorage.setItem("event-city", eventChoice.city);
    localStorage.setItem("event-state", eventChoice.state);
    localStorage.setItem("event-zip", eventChoice.zip);
    localStorage.setItem("event-lat", eventChoice.lat);
    localStorage.setItem("event-long", eventChoice.long);
    // localStorage.setItem("event-info", eventChoice.info);
    
    window.location = "details_page.html";
})
};

// THIS FUNCTION WAS CALLED ON DOCUMENT READY BUT WILL ONLY SHOW ON "details_page.html"
// THIS WILL GET STORED EVENT DATA AND PUT HTML ONTO "details_page.html" IN A DIV ID "event-display"
function detailsPage() {
    var eventChoice = {
        name: localStorage.getItem("event-name"),
        date: localStorage.getItem("event-date"),
        time: localStorage.getItem("event-time"),
        image: localStorage.getItem("event-image"),
        link: localStorage.getItem("event-link"),
        city: localStorage.getItem("event-city"),
        state: localStorage.getItem("event-state"),
        zip: localStorage.getItem("event-zip"),
        lat: localStorage.getItem("event-lat"),
        long: localStorage.getItem("event-long"),
        // info: localStorage.getItem("event-info"),
    };

    console.log(eventChoice);

    var eventDisplay = $("#event-display");
    var name = $("<p>").html(eventChoice.name);
    var date = $("<p>").html(eventChoice.date);
    var city = $("<p>").html(eventChoice.city + ", " + eventChoice.state);
    var image = $("<img>").attr("src", eventChoice.image);
    // var info = $("<p>").html(eventChoice.info);
    var link = $("<a>").attr("href", eventChoice.link);

    var eventLink = link.text("Get Tickets")

    eventDisplay.append(image);
    eventDisplay.append(name);
    eventDisplay.append(date);
    eventDisplay.append(city);
    // eventDisplay.append(info);
    eventDisplay.append(eventLink);
}

})