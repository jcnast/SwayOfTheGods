#pragma strict

var target: Transform;
var distance = 20;
var lift = 20;

function Update () {

	transform.position = target.position + Vector3(0, lift, distance);
	
	transform.LookAt(target);

}