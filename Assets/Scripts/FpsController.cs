using UnityEngine;
using System.Collections;

public class FpsController : MonoBehaviour
{
    public GameObject Head;
    public float TurnSpeed = 1f;
	public float MoveSpeed = 1f;

	// Use this for initialization
	void Start ()
	{
	}
	
	// Update is called once per frame
	void Update ()
	{
		var dt = Time.deltaTime;
		
		if (Screen.lockCursor) {
	        transform.Rotate(new Vector3(0, 1, 0), Input.GetAxis ("Mouse X")*TurnSpeed*dt);
	        Head.transform.Rotate(new Vector3(-1, 0, 0), Input.GetAxis ("Mouse Y")*TurnSpeed*dt);
	
	        if (Input.GetKey(KeyCode.W))
	            transform.Translate(0, 0, MoveSpeed*dt);
	        if (Input.GetKey(KeyCode.A))
	            transform.Translate(-MoveSpeed*dt, 0, 0);
	        if (Input.GetKey(KeyCode.S))
	            transform.Translate(0, 0, -MoveSpeed*dt);
	        if (Input.GetKey(KeyCode.D))
	            transform.Translate(MoveSpeed*dt, 0, 0);
			
			if (Input.GetKey (KeyCode.Space))
				transform.Translate (0, MoveSpeed*dt, 0);
			if (Input.GetKey (KeyCode.LeftShift))
				transform.Translate (0, -MoveSpeed*dt, 0);
		}
		
		if (Input.GetKeyDown (KeyCode.F)) {
			var fullscreen = !Screen.lockCursor;
			Screen.fullScreen = fullscreen;
			Screen.lockCursor = fullscreen;
		}
	}
}
