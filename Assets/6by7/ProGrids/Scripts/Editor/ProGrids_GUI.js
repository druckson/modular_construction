import System.Reflection;

class ProGrids_GUI extends ProGrids_Base 
{
    @MenuItem("Window/6by7/ProGrids (v1.3.5)")
    static function Initialize()
	{
        var window = GetWindow(ProGrids_GUI, false, "Grid");
        window.Show();
    }

    function OnEnable()
    {
    	InitProGrids();
    	OnSelectionChange();
    }

    function OnDisable()
    {
    	pb_ToggleSnapToGrid(false);
    }

    function InitProGrids()
    {
		if(GameObject.Find("_grid")) //if a scene manager is present, connect to it and Rebuild()
		{
			proGrids = GameObject.Find("_grid").GetComponent(ProGrids);
		}
		else //if no scene manager was fount, create a new scene manager
		{
			var proGridsObject = Instantiate((Resources.LoadAssetAtPath("Assets/6by7/ProGrids/_grid.prefab", typeof(GameObject))), Vector3(-1,0,0), Quaternion.identity);
			proGridsObject.name = "_grid";
			proGrids = proGridsObject.GetComponent(ProGrids);
		}

		pb_ToggleSnapToGrid(proGrids.snapToGrid);

		toggleSnapGraphic = snapOnGraphic;
		toggleVisGraphic = visOnGraphic;
		toggleAnglesGraphic = anglesOnGraphic;
	}
	
	function OnGUI()
	{
		//pull in correct skin for Unity version...must be a better way, but this is it for now!	
		#if UNITY_3_5
			mySkin = (Resources.LoadAssetAtPath("Assets/6by7/Shared/GUI/CustomSkin_Unity3.guiskin", typeof(Object)));
		#endif
		//
		
		var window = this;
		window.minSize = Vector2(46,205);
		window.maxSize = Vector2(46,205);
		snapSizeGraphic = (Resources.LoadAssetAtPath("Assets/6by7/Shared/GUI/icon_GridSize.tga", typeof(Texture2D)));
		
		if(!proGrids)
		{
			InitProGrids();
		}
		
		if(proGrids)
		{
			var stg : boolean = proGrids.snapToGrid;
			var sgl : boolean = proGrids.showGrid;
			
			GUI.skin = mySkin;
			EditorGUI.BeginChangeCheck();
				
			EditorGUILayout.BeginVertical();	
			GUILayout.Space(4);
			
			//snap on/off toggle
			if(GUILayout.Button(GUIContent(toggleSnapGraphic, "Toggle Snapping On/Off")))
			{
				proGrids.snapToGrid = !proGrids.snapToGrid;
				if(proGrids.snapToGrid)
					toggleSnapGraphic = snapOnGraphic;
				else
					toggleSnapGraphic = snapOffGraphic;
				
				SceneView.RepaintAll();
			}

			//snap selected button
			GUI.enabled = false;
			if(GUILayout.Button(GUIContent(snapSelectedGraphic, "Snap All Selected items to Nearest Grid Point")))
			{
				//no sir!
			}
			GUI.enabled = true;

			//show grids on/off toggle
			if(GUILayout.Button(GUIContent(toggleVisGraphic, "Toggle Grid Visibility On/Off")))
			{
				proGrids.showGrid = !proGrids.showGrid;
				if(proGrids.showGrid)
					toggleVisGraphic = visOnGraphic;
				else
					toggleVisGraphic = visOffGraphic;
				
				SceneView.RepaintAll();
			}
			
			//snap size
			GUI.enabled = false;
			GUILayout.Label(GUIContent(snapSizeGraphic));
			//EditorGUILayout.LabelField("grrrr");
			
			//show the cm/m/etc selection based on Unity version, else goes whacky
			#if UNITY_3_5
			EditorGUI.Popup(Rect(-7,140,48,16), proGrids.gridUnitsIndex, gridUnitsOptions);
			EditorGUI.FloatField(Rect(-11,160,50,16), proGrids.gridSnapSize_Base, mySkin.customStyles[0]);
			#endif
			
			#if UNITY_4_0
			EditorGUI.Popup(Rect(2,140,42,22), proGrids.gridUnitsIndex, gridUnitsOptions);
			EditorGUI.FloatField(Rect(-3,160,50,16), proGrids.gridSnapSize_Base, mySkin.customStyles[0]);
			#endif
			//
			
			//proGrids.showAngles = GUILayout.Toggle(proGrids.showAngles, "Ang");
			//show angles on/off toggle
			if(GUILayout.Button(GUIContent(toggleAnglesGraphic, "Toggle Angles Visibility On/Off")))
			{
				//no ma'am!
			}
			GUI.enabled = true;
			
			EditorGUILayout.EndVertical();

			//check for changes and apply as needed
			if(EditorGUI.EndChangeCheck ()) 
			{	
				if(Selection.transforms.Length > 0)
					FindNearestSnapPos(Selection.transforms[0].position);
				else
					FindNearestSnapPos(Vector3(0,0,0));

				proGrids.gridCenterPos = nearestSnapPos;
				
				pb_ToggleSnapToGrid(proGrids.snapToGrid);

				SceneView.RepaintAll();
			}
			
			//check if snap has been turned on/off
			if(stg != proGrids.snapToGrid)
			{
				SetupSelectionForSnap();

				pb_ToggleSnapToGrid(proGrids.snapToGrid);
			}
		}
	}

	function OnSelectionChange()
	{
		pb_ToggleSnapToGrid(proGrids.snapToGrid);
	}
}