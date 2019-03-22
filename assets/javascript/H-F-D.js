$(document).ready(function(){
    var hfdData = {
        searchterm:  localStorage.getItem("current-search"),
        lat: localStorage.getItem("event-lat"),
        lng: localStorage.getItem("event-long"),
        ll: null
    }

    // evaluate if lat and long are null
    // if either are null user has not set values by selecting a event
    // redirect user home to select an event
    if(hfdData.lat === null || hfdData.long === null || hfdData.searchterm === null){
        window.location.href = "index.html"
    }else {
        hfdData.ll = hfdData.lat +","+ hfdData.lng; 
    }       
    
    // turnary operator
    // (hfdData.lat === null || hfdData.long === null || hfdData.searchterm === null)? 
    //     window.location.href = "index.html" 
    //  : 
    //      hfdData.ll = hfdData.lat +","+ hfdData.lng
   

    $('#list-hotels').on('click', function(){
        searchHotels(hfdData.ll);
        clearDisplay(); 
        showLoading();
        setTimeout(function(){ 
            $('#loading').empty()
            $('#hotel-display').slideDown("slow");
        }, 1000);
    })
   
    $('#list-restaurants').on('click', function(){
        searchFood(hfdData.ll);
        clearDisplay(); 
        showLoading();
        setTimeout(function(){ 
            $('#loading').empty()
            $('#restaurant-display').slideDown("slow");
        }, 1000);
    })

    $('#list-bars').on('click', function(){
        searchDrinks(hfdData.ll);
        clearDisplay();
        showLoading(); 
        setTimeout(function(){ 
            $('#loading').empty()
            $('#bar-display').slideDown("slow");
        }, 1000);
    })

    function clearDisplay(){
        $('#loading, #hotel-display, #all-display, #restaurant-display, #bar-display').empty();
    }
    
    // create loading image and test
    function showLoading(){
        var wrap = $('<div>').addClass('loading');
        var h2 = $('<h2>').text('Loading....');
        var img = $('<img>').attr('src', 'https://loading.io/spinners/wave/lg.wave-ball-preloader.gif').attr('alt', 'loading...');

        $(wrap).append(h2,img);

        $("#loading").append(wrap)
    }

    // search foursquare api for hotels - 5 results 
    function searchHotels(ll){
        console.log("in",ll)
        // foursquare.clientId & foursquare.clientSecret live in keys.js which is listed about this file so you are able to access the objects
        var queryURL = "https://api.foursquare.com/v2/venues/search?client_id="+foursquare.clientId+"&client_secret="+foursquare.clientSecret +"&ll="+ ll + "&query=hotels&limit=8&v=20180206";
        
        // // .get is short hand for .ajax  see links below
        // // https://stackoverflow.com/questions/3870086/difference-between-ajax-and-get-and-load
        // // http://api.jquery.com/jquery.ajax/
        $.get(queryURL, function(results){
            var data =  results.response.venues;
            for(var i = 0; i < data.length;i++){
               
        
                var wrap = $('<div>').addClass('hotel-card');
                var addr = data[i].location.formattedAddress.join(",")
                var map = "<iframe width='300' height='300' frameborder='0'  scrolling='no' marginheight='0' marginwidth='0' src='https://maps.google.com/maps?&amp;q="+encodeURIComponent( addr ) +  
                "&amp;output=embed'></iframe>";  
                $(wrap).html(map);

                var latlong = data[i].location.lat + "," + data[i].location.lng
                wrap.attr('data-fsqHid', data[i].id).attr('data-fsqHlatlng', latlong)
    
                var name = $('<h5>').text(data[i].name);
                var address = $('<p>').text(addr);
                $(wrap).append(name, address);
                $('#hotel-display').append(wrap)
            }
        })
    }

    // search foursquare api for restuarnts - 5 results 
    function searchFood(ll){
        // foursquare.clientId & foursquare.clientSecret live in keys.js which is listed about this file so you are able to access the objects
        var queryURL = "https://api.foursquare.com/v2/venues/search?client_id="+foursquare.clientId+"&client_secret="+foursquare.clientSecret +"&ll="+ ll + "&query=restuarant&limit=5&v=20180206"
        
        //.get is short hand for .ajax  see links below
        //https://stackoverflow.com/questions/3870086/difference-between-ajax-and-get-and-load
        //http://api.jquery.com/jquery.ajax/
        $.get(queryURL, function(results){
            var data =  results.response.venues;
            for(var i = 0; i < data.length;i++){
                // console.log("food", data[i])
                var wrap = $('<div>').addClass('food-card');

                var addr = data[i].location.formattedAddress.join(",")
                var map = "<iframe width='300' height='300' frameborder='0'  scrolling='no' marginheight='0' marginwidth='0' src='https://maps.google.com/maps?&amp;q="+encodeURIComponent( addr ) +  
                "&amp;output=embed'></iframe>";  
                $(wrap).html(map);

                var latlong = data[i].lat + "," + data[i].lng
                wrap.data('fsqFid', data[i].id).data('fsqFlatlng', latlong)
                var name = $('<h5>').text(data[i].name);
                var cat = $('<p>').text(data[i].categories[0].name);
                var address = $('<p>').text(data[i].location.formattedAddress.join(","));
                $(wrap).append(name, cat, address);
                $('#restaurant-display').append(wrap)
            }
        })
    }

    // search foursquare api for bars -  5 results 
    function searchDrinks(ll){
        // foursquare.clientId & foursquare.clientSecret live in keys.js which is listed about this file so you are able to access the objects
        var queryURL = "https://api.foursquare.com/v2/venues/search?client_id="+foursquare.clientId+"&client_secret="+foursquare.clientSecret +"&ll="+ ll + "&query=bars&limit=5&v=20180206"
        
        // .get is short hand for .ajax  see links below
        // https://stackoverflow.com/questions/3870086/difference-between-ajax-and-get-and-load
        // http://api.jquery.com/jquery.ajax/
        $.get(queryURL, function(results){
            var data =  results.response.venues;
            for(var i = 0; i < data.length;i++){
                // console.log("drink", data[i])
                var wrap = $('<div>').addClass('drink-card');

                var addr = data[i].location.formattedAddress.join(",")
                var map = "<iframe width='300' height='300' frameborder='0'  scrolling='no' marginheight='0' marginwidth='0' src='https://maps.google.com/maps?&amp;q="+encodeURIComponent( addr ) +  
                "&amp;output=embed'></iframe>";  
                $(wrap).html(map);
                
                var latlong = data[i].lat + "," + data[i].lng
                wrap.data('fsqDid', data[i].id).data('fsqDlatlng', latlong)
                var name = $('<h5>').text(data[i].name);
                var cat = $('<p>').text(data[i].categories[0].name);
                var address = $('<p>').text(data[i].location.formattedAddress.join(","));
                $(wrap).append(name, cat, address);
                $(' #bar-display').append(wrap)
            }
        })
    }

    function getVenueImage(id){
        var queryURL = "https://api.foursquare.com/v2/venues/"+id + "/photos?client_id="+foursquare.clientId+"&client_secret="+foursquare.clientSecret + "&v=20180206";
        $.get(queryURL, function(data){
            if(data.response.photos.items.length > 0) {
                var photoPrefix = data.response.photos.items[0].prefix;
                var photoSize = "200x200";
                var photoSuffix = data.response.photos.items[0].suffix;
                var photoURL = photoPrefix + photoSize + photoSuffix;
                // console.log(photoURL)
                return photoURL
            }else {
                return ""
            }
            
        });
    }
});


