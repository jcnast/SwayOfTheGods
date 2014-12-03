#pragma strict

// Teams start with 300 pts, so first to 600 wins
var red_score : float = 300;
var blue_score : float = 300;

// How many gods are on which side, you get a tick over each god u have more than the other team
static var red_gods : int = 0;
static var blue_gods : int = 0;
var tick_time : float = 1.0;

function Start ()
{

}

function Update ()
{
	// Only tick every second
	if (Time.time > tick_time)
	{
		tick_time += 1.0;
		red_score += (red_gods - blue_gods);
		blue_score += (blue_gods - red_gods);
	}
	// First team to 0 loses (first to 600 wins)
	if (blue_score <= 0.0)
	{
		Debug.Log('RED WINS');
	}
	if (red_score <= 0.0)
	{
		Debug.Log('BLUE WINS');
	}
}