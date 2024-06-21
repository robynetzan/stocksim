<!doctype html>
<html lang="en" data-bs-theme="dark">
<?php
error_reporting(E_ALL);
?>
<head>
	<?php
	include '../resources/html_imports/includes.php';
	include '../resources/html_imports/functions.php';
	
	?>
	<link rel="stylesheet" href="../resources/css/style.css">
</head>
<body>
	<?php
	include '../resources/html_imports/header.php';
	?>
	
	<div id="content"> 
		<div class="container" id="stock-container">
			<?php
			$jsonDir = __DIR__ . '/../resources/stocksdata/json/';
			if (is_dir($jsonDir)) {
				$jsonFiles = glob($jsonDir . '*.json');
				$allJsonData = [];
				foreach ($jsonFiles as $file) {
					$jsonContent = file_get_contents($file);
					$data = json_decode($jsonContent, true);
					
					displayStockCard($data);
				}
			} else {
				echo "Directory not found: $jsonDir";
			}
			?>
		</div>
	</div>

</body>