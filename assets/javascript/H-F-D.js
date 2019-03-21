// ROBERT --> see note on line 47  for passing global variable with longitude and latitude variables to my code to bring back results of the foursquare results for hotel, food, and drink

$(document).ready(function(){

    // user inputs a band name - jQuery short version - including preventDefault
    $('#search-band').on('click', function(e){
        e.preventDefault();
        // normalize input - jQuery short version
        var bandName = $('#brand-name').val().toLowerCase().trim();
            // search for venues where band is playing
        searchBand(bandName);
            
    })
    // Passing "bandname" and app_id value
    function searchBand(bandName){
        var queryURL = "https://rest.bandsintown.com/artists/"+bandName+"/events?app_id="+bands.id;
       // jQuery short hand for ajax function  - passes database return to function through "data"
       // returns an array of band tourdates/locations
     $.get(queryURL, function(data){
            // add lat and long as a data attr to the div element
            for(var i = 0; i<data.length; i++){
            
                var wrap = $('<div>').addClass('show-wrap');
                var lat = data[i].venue.latitude;
                var long = data[i].venue.longitude;
                var ll  = lat+","+long;
                wrap.attr('data-ll', ll);

                var date = data[i].datetime;
                // moment.js
                var dateFormat = moment(date).format('MMMM Do YYYY, h:mm:ss a'); 
                var venue = $('<p>').text(data[i].venue.name);
                var showdate = $('<p>').text(dateFormat);
                var cityCountry = $('<p>').text(data[i].venue.city+", "+data[i].venue.country);
                var btn = $('<button>').text('select show').addClass('select');
                $(wrap).append(venue, showdate, cityCountry, btn);
                // fancy schmancy thing tutor showed me -- not necessary - makes the search field dissapear and slide up over it
                $('#band-search-form').slideUp('slow');
                $('#band-results').append(wrap);
            }
        
        })
    }

    // on click of select of a venue 
    $('#band-results').on('click', '.select', function(){
        // ROBERT --> THIS IS WHERE THE LONGITUDE & LATITUDE VALUES ARE PASSED TO THIS FUCNTION TO TRIGGER QUERIES TO HOTEL, FOOD, & DRINK - these values are stored in div here in the test html to display the band tour dates -- so the variable is outside the function -- see line 18, 24, 25, 37.  "selectedShow" grabs them here (line 48) by referring to the "parent" of this div with class of "show-wrap", (line 21) to use it in the following queries.  You can do the same thing with the div to display the band tour dates in your html.

        // get the slected buttons parent div data attr which holds the venues lat and long value
        var selectedShow = $(this).parents('.show-wrap');
        
        // save lat and long to a variable
        var ll = selectedShow.data('ll');
        // hide the button of selected venue
        $(this).hide();

        // highlight the selected venue
        selectedShow.addClass('selected-show');

        // hide the other venue options (to do) hide all the divs with the class show-wrap except the one which is selected selected-show
       
        // search for hotels pass lat and long variable
        searchHotels(ll);
        // serch for food pass lat and long variable
        searchFood(ll);
        // search for drinks pass lat and long variable
        searchDrinks(ll);
    });

    // search foursquare api for hotels - 5 results 
    function searchHotels(ll){
        var queryURL = "https://api.foursquare.com/v2/venues/search?client_id="+foursquare.clientId+"&client_secret="+foursquare.clientSecret +"&ll="+ ll + "&query=hotels&limit=5&v=20180206"

        $.get(queryURL, function(results){
            console.log(results);
            // stingify just for demo of showing json get rid of this when looping over results
            var data = JSON.stringify(results.response);
            $('#hotel-wrap .data-dump').append(data);

            // for(var i = 0; i< data.length;i++){
            //     // look at the structure of the data
            //     // display what u want
            //     // ie address, phone, price range, name ect
            //     // create html
            //     // add it to the page
            // }
        })
    }

    // search foursquare api for restuarnts - 5 results 
    function searchFood(ll){
        
        var queryURL = "https://api.foursquare.com/v2/venues/search?client_id="+foursquare.clientId+"&client_secret="+foursquare.clientSecret +"&ll="+ ll + "&query=restuarant&limit=5&v=20180206"
        $.get(queryURL, function(results){
            var data = JSON.stringify(results.response);
            console.log();
            $('#food-wrap .data-dump').append(data);
        })
    }

    // search foursquare api for bars -  5 results 
    function searchDrinks(ll){
        var queryURL = "https://api.foursquare.com/v2/venues/search?client_id="+foursquare.clientId+"&client_secret="+foursquare.clientSecret +"&ll="+ ll + "&query=bars&limit=5&v=20180206"
        $.get(queryURL, function(results){
            var data = JSON.stringify(results.response);
            console.log();
            $('#drink-wrap .data-dump').append(data);
        })
    }
});


