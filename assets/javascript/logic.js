$("button").on("click", function(event){ // this button function should be changed to an id
    event.preventDefault();
    
    var searchTerm = $("#search").val().trim();
    var queryURL = "https://app.ticketmaster.com/discovery/v2/events?keyword=" + searchTerm + "&apikey=qDmaWBTfNnhcNqUaYnYfuEl5K1xVPlxR&countryCode=US";
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var data = response._embedded.events;
        for (var i = 0; i < data.length; i++) {
            console.log(data[i].name);

      }
    })
})

function eventsResult (results) {
    for (var i = 0; i < results.length; i++) {

        var event = {
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
            
      eventInfo(eventDiv, event);      
    }
}
