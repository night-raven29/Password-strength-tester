<?php
$password = $_POST['password1'];

$conn = new mysqli('localhost','root','','dbgaurav');
	if($conn->connect_error){
		die("Connection Failed : ". $conn->connect_error);
	} else {
		$stmt = $conn->prepare("insert into output (password) values(?)");
		$stmt->bind_param("s",$password);
		$stmt->execute();
		echo "Registration successfully...";
		$stmt->close();
		$conn->close();
	}