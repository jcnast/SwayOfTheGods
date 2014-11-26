#pragma strict

var object : Transform;
var health : float = 100;
var movespeed : float = 4;
var direction : Vector3;
var dir_time : float = 0.0;

var damage : float = 20;

var search_range : float = 20;
var chase_range : float = 10;
var attack_range : float = 10;

function Update()
{	// Get all objects within this character's search radius
	// attack must finish before character can do anything else (aside from ability activations)
	if (!object.animation["god1"].enabled == true)
	{
		object.animation.CrossFade('god1');
	}
	if (Time.time > dir_time)
	{
		direction = (Random.Range(-1,2)*(transform.right)+Random.Range(-1,2)*(transform.forward)).normalized; // make this be any direction, not just 45 degree variances
		var angle : float;
		// Vector3.Angle return ACUTE angle no matter what.
		if (Vector3.Cross(direction, transform.forward).normalized == transform.up)
		{
			angle = -Vector3.Angle(direction, transform.forward);
		}
		else if (Vector3.Cross(direction, transform.forward).normalized == -transform.up)
		{
			angle = Vector3.Angle(direction, transform.forward);
		}
		else
		{
			angle = 0;
		}
		transform.rotation = Quaternion.AngleAxis(angle, transform.up);
		dir_time = Time.time + 1.0*Random.Range(1,6); // how long it will travel in this direction
		// make child object face direction of motion
	}
	transform.Translate(direction*Time.deltaTime*movespeed);
	// Limit x movement within box
	if (transform.position.x > 170)
	{
		transform.position.x = 170;
	}
	else if (transform.position.x < 80)
	{
		transform.position.x = 80;
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