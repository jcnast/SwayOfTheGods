// Object
var object : Transform;
var team : String = 'red';
var respawn_time : float;
var is_dead : boolean = false;
var health : float = 100;
var movespeed = 10;

// Basic Attacks
var aa_range : float = 7;
var aa_damage : float = 25;

// AOE ability
var aoe_particles : ParticleSystem;
var aoe_range : float = 4;
var aoe_damage : float = 25;
var aoe_duration : float = 3;
var aoe_start : float;
var aoe_ticks : float;

// Targeted ability
var r_aoe_object : GameObject;
var r_aoe_clone : GameObject;
var r_aoe_exists : boolean = false;
var r_aoe_range : float = 4;
var r_aoe_damage : float = 10;
var r_aoe_duration : float = 3;
var r_aoe_start : float;
var r_aoe_ticks : float;

function Update () {

	// Respawning
	if (!is_dead)
	{
		// Movement

		// Involuntary movement comes first
		if (moving)
		{
			GetMoved();
		}
		else
		{
			// attack must finish before character can do anything else (aside from ability activations)
			if (!object.animation["Attack"].enabled == true)
			{	// turn object to face direction (can't go diagonal);
				// only walk if told to
				var walk = false;
				if (Input.GetKey('w'))
				{
					if (transform.rotation.eulerAngles.y != 0)
					{
						transform.rotation = Quaternion.AngleAxis(0, Vector3.up);
					}
					walk = true;
				}
				else if (Input.GetKey('s'))
				{
					if (transform.rotation.eulerAngles.y != 180)
					{
						transform.rotation = Quaternion.AngleAxis(180, Vector3.up);
					}
					walk = true;
				}

				if (Input.GetKey('a'))
				{
					if (transform.rotation.eulerAngles.y != 270)
					{
						transform.rotation = Quaternion.AngleAxis(270, Vector3.up);
					}
					walk = true;
				}
				else if (Input.GetKey('d'))
				{
					if (transform.rotation.eulerAngles.y != 90)
					{
						transform.rotation = Quaternion.AngleAxis(90, Vector3.up);
					}
					walk = true;
				}
				if (walk == true)
				{
					transform.Translate(Vector3.forward*Time.deltaTime*movespeed);
					object.animation.CrossFade('Walk');
				}
			}

			// Basic Attack

			if (Input.GetButtonDown("Fire1"))
			{	// Auto attack
				auto_attack();		
			}

			// AOE ability

			// Playing the particle system

			if (!aoe_particles.isPlaying)
			{	// If the particles are not playing, play them
				if(Input.GetKeyDown('e'))
				{
					aoe_particles.Play();
					aoe_start = Time.time;
					aoe_ticks = 0.5; // 0.5 to put a slight delay to the initial damage tick
				}
			}
			else
			{	// If it is not already going, continue the aoe attack
				aoe_attack();
			}

			// Ranged AOE attack
			if (!r_aoe_exists)
			{ // if the particles are not in existance, create them at location
				if (Input.GetKeyDown('q'))
				{
					r_aoe_exists = true;
					var ray = Camera.main.ScreenPointToRay (Input.mousePosition);
					var hit : RaycastHit;
					if (Physics.Raycast (ray, hit, 1000)) 
					{
					  r_aoe_clone = Instantiate(r_aoe_object, hit.point, Quaternion.identity);
					}
					r_aoe_start = Time.time;
					r_aoe_ticks = 0.5; // slight delay to damage application
				}
			}
			else
			{	// if they are currently alive, continue the aoe attack
				r_aoe_attack();
			}

			// Default

			// attack must finish before character can do anything else (aside from ability activations)
			if (!object.animation["Attack"].enabled == true)
			{
				if (Input.anyKey == false)
				{
					object.animation.CrossFade('Stand');
				}
			}
		}
	}
	else
	{
		if (Time.time > respawn_time)
		{
			for (var child : Transform in object.transform)
			{
				child.renderer.enabled = true;
			}
			is_dead = false;
			health = 100;
			transform.position = Vector3(0, 0.51, 0);
		}
	}
}

function auto_attack()
{
	// Attack animation
	object.animation.CrossFade("Attack");
	
	// Attack Function		
	var aa_enemy : RaycastHit;
	// Find first enemy infront of character
	if (Physics.Raycast(transform.position, transform.TransformDirection(Vector3.forward), aa_enemy)) {
		
		Distance = aa_enemy.distance;
		//  If the distance is within range, apply the damage
		if (Distance < aa_range){
			var aa_enemy_object = aa_enemy.transform.parent.gameObject;
			aa_enemy_object.SendMessage("ApplyDamage", aa_damage, SendMessageOptions.DontRequireReceiver);
			var script = aa_enemy.GetComponent(aa_enemy.tag+'_logic');
			script.cur_team = team;
		}
	}
}

function aoe_attack()
{
	// If the particles are playing, apply the effects
	if (Time.time < aoe_start + aoe_duration)
	{
		// Causing the effect to take place
		if (Time.time >= aoe_start + aoe_ticks && aoe_ticks < 3) // +0.5 to keep in mind the slight delay and to ensure only 3 ticks go off
		{	// count a tick and apply the effects that occur per tick
			aoe_ticks += 1;
			var allObjects = Physics.OverlapSphere(transform.position, aoe_range);
			for (var i = 0; i < allObjects.Length; i++)
			{
				if (allObjects[i].tag == 'Enemy')
				{
					var aoe_enemy = allObjects[i].transform.parent.gameObject;
					aoe_enemy.SendMessage("ApplyDamage", aoe_damage, SendMessageOptions.DontRequireReceiver);
					var script = aoe_enemy.GetComponent(aoe_enemy.tag+'_logic');
					script.cur_team = team;
				}
			}
		}
	}
	else
	{	// Stop if the time limit has been reached
		aoe_particles.Stop();
	}
}

function r_aoe_attack()
{
	// If the particles are playing, apply the effects
	if (Time.time < r_aoe_start + r_aoe_duration)
	{
		// Causing the effect to take place
		if (Time.time >= r_aoe_start + r_aoe_ticks)
		{	// count a tick and apply the effects that occur per tick		
			r_aoe_ticks += 1;
			var allObjects = Physics.OverlapSphere(r_aoe_clone.transform.position, r_aoe_range);
			for (var i = 0; i < allObjects.Length; i++)
			{
				if (allObjects[i].tag == 'Enemy' || allObjects[i].tag == 'God')
				{
					var r_aoe_enemy = allObjects[i].transform.parent.gameObject;
					r_aoe_enemy.SendMessage("ApplyDamage", r_aoe_damage, SendMessageOptions.DontRequireReceiver);
					var script = r_aoe_enemy.GetComponent(r_aoe_enemy.tag+'_logic');
					script.cur_team = team;
				}
			}
		}
	}
	else
	{	// Stop if the time limit has been reached
		DestroyImmediate(r_aoe_clone.gameObject, true);
		r_aoe_exists = false;
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

// knock-back function and variables
static var move_time : float;
static var moving : boolean = false;
static var move_direction : Vector3;
static var move_duration : float;
static var move_speed : float;
function GetMoved()
{
	if (!moving)
	{
		move_time = Time.time + move_duration;
		moving = true;
		object.animation['knock_away'].speed = object.animation['knock_away'].length/move_duration;
		object.animation.CrossFade('knock_away');
	}
	if (Time.time < move_time)
	{
		transform.Translate(move_direction*Time.deltaTime*move_speed);
	}
	else
	{
		moving = false;
	}
}

function Dead()
{
	for (var child : Transform in object.transform)
	{
		child.renderer.enabled = false;
	}
	respawn_time = Time.time + 5.0;
	is_dead = true;
}