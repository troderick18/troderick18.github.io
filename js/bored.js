let url = "https://www.boredapi.com/api/activity";

// Stretch goal: Display an image of the activity on the page
// let imageURL = "https://imsea.herokuapp.com/api/1?q=";

function getActivity() {

    // Clear todo area and loading icon area
    $("#thingToDo").empty();
    $("#loading-icon").empty();

    // Create loading icon
    $("#loading-icon").append($("<div></div>").addClass("loader"));

    let type = $('input[name="radio-type"]:checked').val();
    let accessibility = $("#accessibility").val();
    let price = $("#price").val();

    // Set up our HTTP request for the API
    let xhr = new XMLHttpRequest();
    let requestString = url + "?type=" + type + "&minaccessibility=0&maxaccessibility=" + accessibility + "&minprice=0&maxprice=" + price;

    xhr.open("GET", requestString);

    // Callback to display
    xhr.onload = function() {
        let res = JSON.parse(xhr.response);

        // If API sends an error back, display it on the page
        if (res["error"]) {

            $("#thingToDo").append($("<i></i>").text(res["error"]));

        } else {

            // Display the activity on the page
            // Activity lives in a div, and the link may
            // or may not be there.
            let link = res["link"];

            let activity = $('<div></div>').append($("<b></b>").text(res["activity"]));

            if (link) {
                activity.append($("<p></p>").text(link));
            }

            $("#thingToDo").append(activity);
        }

        // Remove loading spinner
        $("#loading-icon").empty();
    }

    xhr.send();
}