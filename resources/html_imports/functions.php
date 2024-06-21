<?php
function displayStockCard($stock) {
	echo '<div class="card text-center stock-card" style="width: 18rem;">';
	echo '<img src="..." class="card-img-top" alt="...">';
	echo '<div class="card-body">';
	echo '<h5 class="card-title">'.$stock['name'].'</h5>';
	echo '<p class="card-text">'.$stock['flavourtext'].'</p>';
	echo '<a href="#" class="btn btn-primary">Go somewhere</a>';
	echo '</div>';
	echo '</div>';
}
?>