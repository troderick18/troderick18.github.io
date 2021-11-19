let url = "https://www.boredapi.com/api/activity";

function getActivity() {

    let thingArea = document.getElementById("thingToDo");

    // Remove any things in the div already
    while (thingArea.firstChild) {
        thingArea.removeChild(thingArea.firstChild);
    }

    // Put our loading spinner on the page
    let loadingSpace = document.getElementById("loading-icon");
    let loader = document.createElement('div');
    loader.className = "loader";
    loadingSpace.appendChild(loader);

    let type = document.querySelector('input[name="radio-type"]:checked').value;
    let accessibility = document.getElementById("accessibility").value;
    let price = document.getElementById("price").value;

    // Set up our HTTP request for the API
    let xhr = new XMLHttpRequest();
    let requestString = url + "?type=" + type + "&minaccessibility=0&maxaccessibility=" + accessibility + "&minprice=0&maxprice=" + price;

    xhr.open("GET", requestString);

    // Callback to display
    xhr.onload = function() {
        let res = JSON.parse(xhr.response);

        // If API sends an error back, display it on the page
        if (res["error"]) {

            let errorText = document.createElement("i");
            errorText.innerHTML = res["error"];

            thingArea.appendChild(errorText);

        } else {

            // Display the activity on the page
            // Activity lives in a div, and the link may
            // or may not be there.
            let activityName = res["activity"];
            let link = res["link"];

            let activity = document.createElement('div');
            let name = document.createElement('b');
            name.innerHTML = activityName;
            activity.appendChild(name);

            if (link) {
                let linkText = document.createElement('p');
                linkText.innerHTML = link;
                activity.appendChild(linkText);
            }

            thingArea.appendChild(activity);
        }

        // Remove loading spinner
        while (loadingSpace.firstChild) {
            loadingSpace.removeChild(loadingSpace.firstChild);
        }

    }

    xhr.send();
}