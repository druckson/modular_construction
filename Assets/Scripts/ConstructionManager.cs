using UnityEngine;
using System.Collections;

public class ConstructionManager : MonoBehaviour {
	public float Distance = 10f;
	
	// Use this for initialization
	void Start () {
	
	}
	
	// Update is called once per frame
	void Update () {
		var hit = new RaycastHit();
		Physics.Raycast (transform.position, transform.forward, out hit, Distance);
		if (hit.transform.gameObject)
			Object.Destroy (hit.transform.gameObject);
	}
}
