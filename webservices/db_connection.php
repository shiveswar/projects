<?php
// Database connection parameters
$host = 'localhost';
$dbname = 'emergency_alert';
$username = 'root'; // Default username for XAMPP MySQL
$password = ''; // Default password for XAMPP MySQL

// Attempt to connect to the database
$conn = new mysqli($host, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
