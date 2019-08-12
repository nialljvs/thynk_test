<?php
error_reporting(1);
$db_name = 'thynk_test';
$db_host = '127.0.0.1:3306';
$db_user = 'root';
$db_password =  'password';
extract($_POST);
if($dbh = mysqli_connect( $db_host, $db_user, $db_password, $db_name)){				
	if( isset($action) ):
			switch($action):
				case 'add_employee':
					$sql = "INSERT INTO employees (name, role, hobbies, motto, blog, hometown, avatar) VALUES (?,?,?,?,?,?,?)";
					if($stmt = mysqli_prepare($dbh, $sql)){
					    // Bind variables to the prepared statement as parameters
					    $var = base64_decode($avatar);
					    $null = NULL;
					    mysqli_stmt_bind_param($stmt, "ssssssb", $name, $role, $hobbies, $motto, $blog, $hometown, $null);
					    mysqli_stmt_send_long_data($stmt, 6, $var);
					    $stmt->execute();
					    echo json_encode(array("result"=>"Record inserted successfully.")) ;
					} else{
					    echo json_encode(array("result"=>"ERROR: Could not prepare query: $sql. " . mysqli_error($dbh)));
					}
					break;
				case 'update_employee':
					$sql = "UPDATE employees SET name=?, role=?, hobbies=?, motto=?, blog=?, hometown=?, avatar=? WHERE ID = ?";
					if($stmt = mysqli_prepare($dbh, $sql)){
					    // Bind variables to the prepared statement as parameters
					    $var = base64_decode($avatar);
					    $null = NULL;
					    mysqli_stmt_bind_param($stmt, "ssssssbi", $name, $role, $hobbies, $motto, $blog, $hometown, $null, $employee_id);
					    mysqli_stmt_send_long_data($stmt, 6, $var);
					    $stmt->execute();
					    echo json_encode(array("result"=>"Record updated successfully."));
					} else{
					    echo json_encode(array("result"=>"ERROR: Could not prepare query: $sql. " . mysqli_error($dbh)));
					}
					break;
				case 'delete_employee':
					$sql = "DELETE FROM employees WHERE ID = ?";
					if($stmt = mysqli_prepare($dbh, $sql)){
						mysqli_stmt_bind_param($stmt,"i",$employee_id);
						$stmt->execute();
					    echo json_encode(array("result"=>"Record deleted successfully."));
					}else{
						echo json_encode(array("result"=>"ERROR: Could not prepare query: $sql. " . mysqli_error($dbh)));
					}
					break;
				case 'get_employees':
					$sql = "SELECT * FROM employees";
					$result = mysqli_query($dbh,$sql);
					if ($result->num_rows > 0) {
				    // output data of each row
						$results = [];
				    while($row = $result->fetch_assoc()) {
						$row['avatar'] = base64_encode(($row['avatar']));
						$results[]=$row;
					}
					echo json_encode(array("employees"=>$results));
					}else{
						echo json_encode(array("result"=>"No employees"));
					}
					break;

			endswitch;
	endif;
		
}else{
	echo json_encode(array("result"=>"Cannot connect to database"));
}
?>
