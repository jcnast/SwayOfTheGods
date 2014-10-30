#pragma strict
var depth = 20;

function Start () {
	animation.Play('Throw');
	Screen.showCursor = true;
}
/*
function Update () {
	//Works except for animation continuity
	if (Input.GetKey(KeyCode.A)) {
		rigidbody.velocity.x = 10;
		rigidbody.rotation = Quaternion.AngleAxis(0, Vector3.up);
		//animation.Play('walk');
	}else if (Input.GetKey(KeyCode.D)) {
		rigidbody.velocity.x = -10;
		rigidbody.rotation = Quaternion.AngleAxis(180, Vector3.up);
		//animation.Play('walk');
	}else{
		rigidbody.velocity.x = 0;
	}
	
	if (Input.GetKey(KeyCode.W)) {
		rigidbody.velocity.z = -10;
		rigidbody.rotation = Quaternion.AngleAxis(90, Vector3.up);
		//animation.Play('walk');
	}else if (Input.GetKey(KeyCode.S)) {
		rigidbody.velocity.z = 10;
		rigidbody.rotation = Quaternion.AngleAxis(270, Vector3.up);
		//animation.Play('walk');
	}else{
		rigidbody.velocity.z = 0;
	}

}
*/

function Update(){
	if (Input.GetKey(KeyCode.W) || Input.GetKey(KeyCode.A) || Input.GetKey(KeyCode.S) || Input.GetKey(KeyCode.D)){
		animation.Play('walk');
	}
	
	if (Input.GetKey(KeyCode.E)){
		animation.Play('Throw');
	}
	if (Input.GetKey(KeyCode.Q)){
		animation.Play('Punch');
	}
}