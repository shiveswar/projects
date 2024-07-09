// location_tracker.js

// Function to get the user's current location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(sendLocation);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// Function to send location data to the server
function sendLocation(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    
    // AJAX request to send location data to the server
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "handle_location.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // Handle successful response
                alert("Location sent successfully!");
            } else {
                // Handle error response
                alert("Failed to send location.");
            }
        }
    };
    xhr.send("latitude=" + latitude + "&longitude=" + longitude);
}
