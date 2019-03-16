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
