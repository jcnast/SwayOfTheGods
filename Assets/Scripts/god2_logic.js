﻿#pragma strict

var object : Transform;
static var cur_team : String;
static var prev_team : String;
var respawn_time : float;
var is_dead : boolean = false;
var health : float = 100;
var movespeed : float = 10;
var direction : Vector3;
var dir_time : float = 0.0;

var damage : float = 20;

var search_range : float = 20;
var chase_range : float = 10;
var attack_range : float = 4;

function Update()
{	
	// Respawning
	if (!is_dead)
	{
		// Get all objects within this character's search radius
		// attack must finish before character can do anything else (aside from ability activations)
		if (!object.animation["god2"].enabled == true)
		{
			object.animation.CrossFade('god2');
		}
		if (Time.time > dir_time)
		{
			direction = (Random.Range(-1,2)*(transform.right)+Random.Range(-1,2)*(transform.forward)).normalized; // make this be any direction, not just 45 degree variances
			dir_time = Time.time + 1.0*Random.Range(1,6); // how long it will travel in this direction
			// make child object face direction of motion
		}
		transform.Translate(direction*Time.deltaTime*movespeed);
		// Limit x movement within box
		if (transform.position.x < -170)
		{
			transform.position.x = -170;
		}
		else if (transform.position.x > -80)
		{
			transform.position.x = -80;
		}
		// Limit z movement to within box
		if (transform.position.z > 170)
		{
			transform.position.z = 170;
		}
		else if (transform.position.z < 80)
		{
			transform.position.z = 80;
		}
	}
	else
	{
		if (Time.time > respawn_time)
		{
			for (var child : Transform in transform)
			{
				child.renderer.enabled = true;
			}
			is_dead = false;
			health = 100;
			transform.position = Vector3(-125, 4.1, 125);
		}
	}
}

function ApplyDamage(damage : float)
{
	health -= damage;
	if (health <= 0)
	{
		Dead();
	}
}

function Dead()
{
	// object is dead and not shown;
	for (var child : Transform in transform)
	{
		child.renderer.enabled = false;
	}
	respawn_time = Time.time + 5.0;
	is_dead = true;

	// add a god to the designated team
	if (cur_team == 'red')
	{
		blue_score.red_gods += 1;
		red_score.red_gods += 1;
		Game_control.red_gods += 1;
	}
	else
	{
		blue_score.blue_gods += 1;
		red_score.blue_gods += 1;
		Game_control.blue_gods += 1;
	}
	// if it was on the other team before, remove it
	if (prev_team == 'red')
	{
		blue_score.red_gods -= 1;
		red_score.red_gods -= 1;
		Game_control.red_gods -= 1;
	}
	else
	{
		blue_score.blue_gods -= 1;
		red_score.blue_gods -= 1;
		Game_control.blue_gods -= 1;
	}
	// set the prev_team to cur_team
	prev_team = cur_team;
}