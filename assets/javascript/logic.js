$("#search-button").on("click", function(event){ 
    event.preventDefault();
    
    var searchTerm = $("#search").val().trim();
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
})

function eventsResult (results) {
    for (var i = 0; i < results.length; i++) {

        var eventObject = {
             name: results[i].name,
             date: results[i].dates.start.localDate,
             time: results[i].dates.start.localTime,
             link: results[i].url,
             image: results[i].images[0].url,
             city: results[i]._embedded.venues[0].city.name,
             state: results[i]._embedded.venues[0].state.stateCode,
             zip: results[i]._embedded.venues[0].postalCode,
             info: results[i].info
        };

        
        var name = $("<p>").html(eventObject.name);
        var date = $("<p>").html(eventObject.date);
        var city = $("<p>").html(eventObject.city + ", " + eventObject.state);
        var image = $("<img>").attr("src", eventObject.image);
        var info = $("<p>").html(eventObject.info);

        var eventDiv = $("<div>");
        var eventDisplay = $("#display");
            eventDisplay.prepend(eventDiv);
            eventDiv.append(image);
            eventDiv.append(name);
            eventDiv.append(date);
            eventDiv.append(city);
            eventDiv.append(info);
            
      eventInfo(eventDiv, eventObject);      
    }
}

function eventInfo(div, info) {
    div.on("click", function() {
        console.log("has been clicked");
        console.log(info);

    });
}