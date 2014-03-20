function addScore() {
	var name = $('#id-playerName').val(),
		score = $('#id-playerScore').val();
	
	$.ajax({
		url: 'http://localhost:3000/high-scores?name=' + name + '&score=' + score,
		type: 'PUT',
		error: function() { alert('PUT failed'); },
		success: function() {
			showScores();
		}
	});
}

function showScores() {
	$.ajax({
		url: 'http://localhost:3000/high-scores',
		cache: false,
		type: 'GET',
		error: function() { alert('GET failed'); },
		success: function(data) {
			var list = $('#id-high-scores'),
			value;
			list.empty();
			for (value = 0; value < data.length; value++) {
				var text = (data[value].name + ' : ' + data[value].score);
				list.append($('<li>', { text: text }));
			}
		}
	});
}
