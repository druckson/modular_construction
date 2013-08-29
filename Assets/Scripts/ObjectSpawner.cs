using UnityEngine;
using System.Collections;
using System.Collections.Generic;

public class ObjectSpawner : MonoBehaviour {
	
	public List<GameObject> SpawnableObjects;
	private int _selectedIndex = 0;
	public float Distance;
	
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
			Debug.Log ("Spawn Object");
			if (_selectedIndex >= SpawnableObjects.Count)
				_selectedIndex = SpawnableObjects.Count-1;
			if (_selectedIndex >= 0) {
				Instantiate (SpawnableObjects[_selectedIndex], transform.position, Quaternion.identity);
			}
		}
	}
}
