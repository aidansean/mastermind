<?php
include_once($_SERVER['FILE_PREFIX']."/project_list/project_object.php") ;
$github_uri   = "https://github.com/aidansean/mastermind" ;
$blogpost_uri = "http://aidansean.com/projects/?tag=mastermind" ;
$project = new project_object("mastermind", "Generic code guessing game", "https://github.com/aidansean/mastermind", "http://aidansean.com/projects/?tag=mastermind", "mastermind/images/project.jpg", "mastermind/images/project_bw.jpg", "This project was made as an exercise in dynamic HTML manipulation.  It's a clone of a classic code guessing game where the player plays against the computer.", "Games", "CSS,HTML,JavaScript") ;
?>