var cities;
var teams;



function onLoad() {
	//alert("In onLoad()");
	getCities(false);
	getTeams(false);
}

function insertTeam() {
	var city,
	    team_name,
	    sport,
	    championship_wins;
	city = JSON.stringify($('#city option:selected').val());
	team_name = JSON.stringify($('#team_name').val());
	sport = JSON.stringify($('#sport').val());
	championship_wins = JSON.stringify($('#championship_wins').val());
	ajax = ajaxinsertTeam("insertTeam", city, team_name, sport, championship_wins);
	ajax.done(insertTeamCallback);
	ajax.fail(function() {
		alert("Failure");
	});
}

function ajaxinsertTeam(method, city, team_name, sport, championship_wins) {
	return $.ajax({
		url : 'dbPHP.php',
		type : 'POST',
		data : {
			method : method,
			city : city,
			team_name : team_name,
			sport : sport,
			championship_wins : championship_wins
		}
	});
}

function insertTeamCallback(response_in) {
	response = JSON.parse(response_in);

	if (!response['success']) {
		$("#results").html("");
		alert("Insert failed on query:" + '\n' + response['querystring']);
		getTeams(false);
		getCities(false);
	} else {
		$("results").html(response['querystring'] + '<br>' + response['success'] + '<br>');
		getTeams(false);
		getCities(false);
	}
}

function showTeams(teams) {
	//alert("In showELements()");
	//alert(teams);
	var teamList = "";
	$.each(teams, function(key, value) {
		var itemString = "";
		$.each(value, function(key, item) {
			itemString += item + "&nbsp; &nbsp;";
		});
		teamList += itemString + '<br>';
	});
	$("#results").html(teamList);
}

function getTeams() {
	//alert("In getTeams()");
	ajax = ajaxgetTeams("getTeams");
	ajax.done(getTeamsCallback);
	ajax.fail(function() {
		alert("Failure");
	});
}

function ajaxgetTeams(method) {
	//alert("In ajaxgetTeams()");
	return $.ajax({
		url : 'dbPHP.php',
		type : 'POST',
		data : {
			method : method
		}
	});
}

function getTeamsCallback(response_in) {
	//alert(response_in);
	var response = JSON.parse(response_in);
	teams = response["teams"];
        //alert(teams);
	if (!response['success']) {
		$("#results").html("getTeams() failed");
	} else {
		showTeams(teams);
	}
}

function getCities() {
	//alert("In getCities()");
	ajax = ajaxgetCities("getCities");
	ajax.done(getCitiesCallback);
	ajax.fail(function() {
		alert("Failure");
	});
}

function ajaxgetCities(method) {
	//alert("In ajaxgetCities()");
	return $.ajax({
		url : 'dbPHP.php',
		type : 'POST',
		data : {
			method : method
		}
	});
}

function getCitiesCallback(response_in) {
	//alert("In getCitiesCallback()");
	//alert(response_in);
	response = JSON.parse(response_in);
	$cities = response["cities"];
	//alert($cities);
	if (!response['success']) {
		alert('Failed in getCityCallback');
		$("#results").html("getCities failed");
	} else {
		$('#city').find('option').remove();
		//alert($cities);
		$.each($cities, function(key, columns) {
			$("#city").append($('<option>', {
				value : columns[0].toString(),
				text : columns[1].toString()
			}));
		});
	}
}
