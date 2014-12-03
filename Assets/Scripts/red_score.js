#pragma strict

// How many gods are on which side, you get a tick over each god u have more than the other team
static var red_gods : int = 0;
static var blue_gods : int = 0;
static var tick_time : float = 1.0;

function Start ()
{

}

function Update ()
{
	// tick every second
	if (Time.time > tick_time)
	{
		tick_time += 1.0;
		// alter score appearance
		transform.localScale.x += (red_gods - blue_gods)/600.0; // Teams start with 300 pts each, so it is out of 600 total
		transform.localPosition.x -= (red_gods - blue_gods)/600.0; // Teams start with 300 pts each, so it is out of 600 total
		// Winning and losing animations
		if (transform.localScale.x <= 0.0)
		{
			Destroy(particleSystem);
		}
		if (transform.localScale.x >= 1.0)
		{
			animation.CrossFade('red_win');
		}
	}
}