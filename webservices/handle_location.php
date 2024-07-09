<?php
// Include database connection
require_once 'db_connection.php'; // Adjust the path as needed

// Get latitude and longitude from the POST request
$latitude = $_POST['latitude'];
$longitude = $_POST['longitude'];

// Insert location data into the database
$sql = "INSERT INTO locations (latitude, longitude) VALUES ('$latitude', '$longitude')";

if ($conn->query($sql) === TRUE) {
    echo "Location data inserted successfully!";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Close database connection
$conn->close();
?>
