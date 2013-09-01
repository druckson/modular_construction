using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class ObjectSpawner : MonoBehaviour {
	
	public List<GameObject> SpawnableObjects;
	private int _selectedIndex = 0;
	public float Distance = 10f;
	
	// Use this for initialization
	void Start () {
	}
	
	// Update is called once per frame
	void Update () {
		if (Input.GetButtonDown ("Fire2")) {
			Debug.Log ("Switch Objects");
			_selectedIndex = (_selectedIndex+1) % SpawnableObjects.Count;
		}
		
		if (Input.GetButtonDown ("Fire1")) {
			Debug.Log ("Construction layer:" + LayerMask.NameToLayer ("Construction"));
			if (_selectedIndex >= SpawnableObjects.Count)
				_selectedIndex = SpawnableObjects.Count-1;
			if (_selectedIndex >= 0) {
				var hit = new RaycastHit();
				if (Physics.Raycast (transform.position, transform.forward, out hit, Distance, -8)) {
					Debug.Log ("Spawn Object");
					
					var colliderParent = hit.transform.parent.gameObject;
					var parentTransform = hit.transform.parent.gameObject.transform;
					
					Instantiate (SpawnableObjects[_selectedIndex], hit.point, parentTransform.rotation);
				}
			}
		}
	}
}
