var cardBox = document.getElementById("card-box");
var searchBtn = document.getElementById("search-button");
var artistInputEl = document.getElementById("artist-name");
var locationinputEl = document.getElementById("location-dropdown");

// spotify developer credentials

var client_id = "a43d54d7a7d344feb4f19b7be7c700c1";
var client_secret = "c018f8890f564297ae26c852bb7ee4cd";

// this button calls the clear cards function
// after inputs are implemented we can add the search functions from the landing page API to this API where necessary
// these this function could be called from the clear cards function
// OR we could implement a go back button
searchBtn.addEventListener("click", clearCards);

// The comment below shows how you can get the ticketmaster API to return only events from Australia (countryCode=AU), NSW (locale=*&marketId=302), rock music (classificationName = rock)
// https://app.ticketmaster.com/discovery/v2/events?apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0&locale=*&marketId=302&countryCode=AU&classificationName=rock

//this is the base url for the tickiteck API and the APIkey we are using
var queryURL = "https://app.ticketmaster.com/discovery/v2/events?apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0"

// this function has the genre and location passed to it from the function that interacts with the spotify API AND a html <select> element for the location
// the select <element> should have a value for each option that holds the marketID for that location
// e.g. <select> <option value="302">NSW</option>

// when index html uses the path passed to it by a function to location.assign()
// a function takes that path and split()s it where necessary to create the JSON request.
// e.g. C:/Users/exmaple/bootcamp/test/search-results.html/events?apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0&locale=*&marketId=302&countryCode=AU&classificationName=rock

function grabParams() {
// .search only grabs the text after the .html part of the url
// so this variable contains the who string we need to search the ticketmasterAPI
    // var params = document.location.search.split("?");
    //(this is an example URL -> the real URL would be built by another function that grabbed the genre from spotify and a dropdown select for location)
    var params = document.location.search;
// .pop() returns the last element of an array (which we made by splitting document.location)
    var selectedTerm = params.split('?').pop();
// this recombines the url into something we can make the request with
    var searchTerm = "https://app.ticketmaster.com/discovery/v2/events?" + selectedTerm;
// this ends the function if searchTerm is not truthy
    if (!searchTerm) {
        return;
    }
        searchAPI(searchTerm);

}

function searchAPI(searchTerm) {
    fetch(searchTerm)

        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
            return response.json();
        })
        .then(function (locResults) {
            
    // Validation Check
            if (!locResults._embedded.events.length) {
                console.log("No Results Found!");
            } else {
                cardBox.innerHTML = " ";
    // passes information grabbed from the API to the printResults function
                for (var i = 0; i < locResults._embedded.events.length; i++) {
                    printResults(locResults._embedded.events[i]);
                }
            }
        })
        // above there was a throw exception, here is the catch
        // should an error be encountered (and the promise unable to be fuilfilled) the code will resume from this block
        .catch(function (error) {
            console.error(error);
            cardBox.innerHTML = "No Results Found!";
        });



    function printResults(resultObj) {
        var eventCard = document.createElement("div");
            eventCard.classList.add("card");

        var imageDiv = document.createElement("div");
            imageDiv.classList.add("image");

        var cardImage = document.createElement("img");
            cardImage.src = resultObj.images[0].url;
            cardImage.alt = resultObj.name;

        var cardContent= document.createElement("div");
            cardContent.className += "content";

        var cardHeader = document.createElement("div");
            cardHeader.className += "header";
            cardHeader.textContent = resultObj.name;


        var metaDiv = document.createElement("div");
            metaDiv.className += "meta";
            metaLink = document.createElement("a");

        var descriptionDiv = document.createElement("div");
            descriptionDiv.className += "description hidden";
            descriptionDiv.textContent = resultObj.info;
            if(!resultObj.info) {
                descriptionDiv.textContent = "Information Unavailable";
                descriptionDiv.style.display = "block";
            }

        var excontentDiv = document.createElement("div");
            excontentDiv.className += "extra content";

        var spanThree = document.createElement("span");
            spanThree.className +=  "date";
            spanThree.textContent = resultObj.dates.start.localDate;

        var spanOne = document.createElement("span");
            spanOne.className += "right floated";

        var eventPrice;
        if (!resultObj.priceRanges) {   
            eventPrice = "No Pricing Available";
        } else if (resultObj.priceRanges[0].min === 0) {
            eventPrice = "$" + resultObj.priceRanges[0].max;
        } else {
            eventPrice = "$" + resultObj.priceRanges[0].min;
        }
            spanOne.textContent = resultObj._embedded.venues[0].name;
        var spanTwo = document.createElement("span");
            spanTwo.textContent = eventPrice;
        var infoBtn = document.createElement('div');
            infoBtn.classList.add("ui", "bottom", "attached", "button"); 
            infoBtn.innerHTML = '<i class="angle down icon"></i>More Information';
            
        var ticketBtn = document.createElement('div');
            ticketBtn.setAttribute('id', "ticketBtn");
            ticketBtn.classList.add("ui", "bottom", "attached", "button"); 
            ticketBtn.innerHTML = 'Tickets';
            ticketBtn.addEventListener('click', function(){
                window.location.href = resultObj.url;
            });
        
            //Appends dynamically created elements 
            imageDiv.append(cardImage);
            cardContent.append(cardHeader);
            metaDiv.append(metaLink);
            cardContent.append(metaDiv);
            cardContent.append(descriptionDiv);
            excontentDiv.append(spanOne);
            excontentDiv.append(spanTwo);
            cardContent.append(spanThree);
            eventCard.append(imageDiv);
            eventCard.append(cardContent);
            eventCard.append(excontentDiv);
            cardBox.append(eventCard);
            eventCard.append(ticketBtn);
            eventCard.append(infoBtn);
            

// function to hid description information on pageload
            function toggleVisInfo() {
            
                if (descriptionDiv.style.display == "block") {
                    descriptionDiv.style.display = "none";
                } else {
                    descriptionDiv.style.display = "block";
                }
            }
            infoBtn.addEventListener('click', toggleVisInfo); 
    }
}

grabParams();

// this function clears the cards from the card box element
function clearCards () {
    while (cardBox.firstChild) {
       cardBox.removeChild(cardBox.lastChild);
    }
    formSubmitHandler();
}

// These run the search function and are identical to the functions in the landing page script
function formSubmitHandler() {
  
  // the below line replaces any space with a hyphen
  var artist = artistInputEl.value.replace(" ", "-").trim();
  var location = locationinputEl.options[locationinputEl.selectedIndex].value;
  // this line combines the two variables, because we can only effectively pass one variable to the next function
  var searchVariables = artist + " " + location;
  // var artist = artistInputEl.value.trim();
  if (searchVariables) {
    getToken(searchVariables);
  }
};

function getToken(searchVariables) {
    var token = "";
    fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: "Basic " + btoa(`${client_id}:${client_secret}`),
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
      },
      body: "grant_type=client_credentials",
    })
      .then(function (response) {
        if (!response.ok) {
          throw response.json();
        }
        return response.json();
      })
      .then(function (Results) {
  // this line adds the token to the front of the variable that we now pass to the next function
        var token = Results.access_token + " " + searchVariables;
        getGenre(token);
      });
  }

  function getGenre(token) {
    // url will be updated with dynamic element, this is to test that genre is logging to the console in the interim
    // this line splits the big old passed variable into 3 at every space
    var holderArray = token.split(" ");
    // these variables are made from the split pieces of the array created by splitting the big old variable 
    var token = holderArray[0];
    var artist = holderArray[1];
    var location = holderArray[2];
    var apiUrl =
      "https://api.spotify.com/v1/search?q=" +
      artist +
      "&type=artist&limit=1";
    fetch(apiUrl, {
      headers: { Authorization: "Bearer " + token },
    })
      .then(function (response) {
        if (!response.ok) {
          throw response.json();
        }
        return response.json();
      })
      .then(function (Results) {
        // this grabs the genre from the spotify API
      var genre = Results.artists.items[0].genres;
      // this generates the new URL
      var queryString = "./eventindex.html?events?apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0&locale=*&marketId=" + location + "&countryCode=AU&classificationName=" + genre;
      // this passes the URL to the next function q: don't know why I couldn't do it in this function, but it didn't like it.
        documentAssign(queryString);
      });
  }  

  function documentAssign (queryString) {
    location.assign(queryString);
  }