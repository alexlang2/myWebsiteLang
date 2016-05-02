<?php

require("myCreds.php");

echo $_POST["method"]();

function sanitize($str, $quotes = ENT_NOQUOTES) {
    $str = htmlspecialchars($str, $quotes);
    return $str;
}

function getTeams() {
    $dbConn = mysqli_connect(server(), username(), password(), db());

    $query = "SELECT * FROM teams";
    $result = $dbConn->query($query);
    if ($dbConn->connect_error) {
        $return->connect_error = "Connection failed: " . $dbConn->connect_error;
        $return->success = false;
        return json_encode($return);
    }

    $teams = array();

    if ($result) {
        while ($row = $result->fetch_array()) {
            $allColumns = array();
            for ($i = 0; $i < 5; $i++) {
                array_push($allColumns, $row[$i]);
            }
            array_push($teams, $allColumns);
        }
    }

    $return = new stdClass();
    $return->success = true;
    $return->teams = $teams;
    $return->querystring = $query;
    return json_encode($return);
}

function getCities() {

    $dbConn = mysqli_connect(server(), username(), password(), db());

    $query = "SELECT * FROM cities";
    $result = $dbConn->query($query);
    if ($dbConn->connect_error) {
        $return->connect_error = "Connection failed: " . $dbConn->connect_error;
        $return->success = false;
        return json_encode($return);
    }

    $cities = array();

    if ($result) {
        while ($row = $result->fetch_array()) {
            $allColumns = array();
            for ($i = 0; $i < 2; $i++) {
                array_push($allColumns, $row[$i]);
            }
            array_push($cities, $allColumns);
        }
    }

    $return = new stdClass();
    $return->success = true;
    $return->cities = $cities;
    $return->querystring = $query;
    return json_encode($return);
}

function insertTeam() {
    if (isset($_POST['city'])) {
        $city = json_decode(sanitize($_POST['city']));
    }

    if (isset($_POST['team_name'])) {
        $team_name = json_decode(sanitize($_POST['team_name']));
    }

    if (isset($_POST['sport'])) {
        $sport = json_decode(sanitize($_POST['sport']));
    }

    if (isset($_POST['championship_wins'])) {
        $championship_wins = json_decode(sanitize($_POST['championship_wins']));
    }

    $dbConn = mysqli_connect(server(), username(), password(), db("Teams"));

    if ($dbConn->connect_error) {
        die("Connection failed: " . $dbConn->connect_error);
    }

    $query = "INSERT INTO teams ( city, team_name, sport, championship_wins ) " .
            "VALUES ( " .
            "" . $city . ", " .
            "'" . $team_name . "', " .
            "'" . $sport . "', " .
            "" . $championship_wins . " );";
    $result = $dbConn->query($query);
    $return = new stdClass;
    $return->querystring = (string) $query;
    if ($result) {
        $return->success = true;
    } else {
        $return->success = false;
    }
    return json_encode($return);
}
