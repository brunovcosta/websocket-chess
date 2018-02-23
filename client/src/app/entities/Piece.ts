import * as THREE from 'three';
import DraggableEntity from '../../lib/DraggableEntity';
import GameContext from '../../lib/GameContext';

export default class Piece extends DraggableEntity{
	public width = 25;
	private selectedMaterial: THREE.Material;
	private unselectedMaterial: THREE.Material;

	constructor(context: GameContext){
		super(context);
		let geometry = new THREE.BoxBufferGeometry(this.width*.8,this.width*.8,this.width);
		this.selectedMaterial = new THREE.MeshPhysicalMaterial( { color: 0xffffff } );
		this.unselectedMaterial = new THREE.MeshPhysicalMaterial( { color: 0xababab } );
		this.mesh = new THREE.Mesh( geometry, this.unselectedMaterial );
		this.mesh.position.z = 20;
	}

	protected mouseDown(evt: MouseEvent){
		super.mouseDown(evt);

		let pos = this.context.getMouse3D(evt);

		if(evt.which === 1 && this.contains(pos))
			this.context.control.enableRotate=false;
	}

	protected mouseMove(evt: MouseEvent){
		let pos = this.context.getMouse3D(evt);
		if(this.contains(pos))
			this.mesh.material = this.selectedMaterial;
		else
			this.mesh.material = this.unselectedMaterial;
		super.mouseMove(evt);

	}

	protected mouseUp(evt: MouseEvent){
		super.mouseUp(evt);
		this.context.control.enableRotate=true;
		this.snapToGrid(this.width);
	}
}

