﻿#pragma strict

var object : Transform;
var health : float = 100;
var movespeed : float = 6;
var direction : Vector3;
var dir_time : float = 0.0;

var damage : float = 20;

var search_range : float = 20;
var chase_range : float = 10;
var attack_range : float = 4;

function Update()
{	// Get all objects within this character's search radius
	// attack must finish before character can do anything else (aside from ability activations)
	if (!object.animation["god4"].enabled == true)
	{
		object.animation.CrossFade('god4');
	}
	if (Time.time > dir_time)
	{
		direction = (Random.Range(-1,2)*(transform.right)+Random.Range(-1,2)*(transform.up)).normalized; // make this be any direction, not just 45 degree variances
		dir_time = Time.time + 1.0*Random.Range(1,6); // how long it will travel in this direction
		// make child object face direction of motion
	}
	transform.Translate(direction*Time.deltaTime*movespeed);
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
	if (transform.position.z < -170)
	{
		transform.position.z = -170;
	}
	else if (transform.position.z > -80)
	{
		transform.position.z = -80;
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
	Destroy(gameObject);
}