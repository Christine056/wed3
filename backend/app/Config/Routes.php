<?php
use CodeIgniter\Router\RouteCollection;
$routes->get("/", function() { return "Wedding API is running!"; });
$routes->get("api/guests/list", "Guests::list");
$routes->get("api/admins/stats", "Admins::stats");
$routes->get("api/photos/list", "Photos::list");
$routes->post("api/guests/login", "Guests::login");
$routes->post("api/guests/rsvp", "Guests::rsvp");
$routes->post("api/guests/add", "Guests::add");
$routes->post("api/guests/update", "Guests::update");
$routes->post("api/guests/delete", "Guests::delete");
$routes->post("api/admins/login", "Admins::login");
$routes->post("api/photos/upload", "Photos::upload");
$routes->post("api/photos/delete", "Photos::delete");
