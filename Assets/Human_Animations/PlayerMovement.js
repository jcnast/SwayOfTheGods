#pragma strict

function Update () {
	//Works except for animation continuity
	if (Input.GetKey(KeyCode.A)) {
		Debug.Log('a');
		rigidbody.velocity.x = 100;
		//animation.Play('walk');
	}else{// if (Input.GetKey(KeyCode.D)) {
		Debug.Log('d');
		rigidbody.velocity.x = -100;
		//animation.Play('walk');
	}//else{
	//	rigidbody.velocity.x = 0;
	//}
	
	//if (Input.GetKey(KeyCode.W)) {
	//	Debug.Log('w');
	//	rigidbody.velocity.z = -10;
	//	//animation.Play('walk');
	//}else if (Input.GetKey(KeyCode.S)) {
	//	Debug.Log('s');
	//	rigidbody.velocity.z = 10;
	//	//animation.Play('walk');
	//}else{
	//	rigidbody.velocity.z = 0;
	//}

}