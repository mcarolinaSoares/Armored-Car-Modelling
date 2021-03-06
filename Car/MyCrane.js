class MyCrane extends CGFobject
{
	constructor(scene)
	{
		super(scene);

		this.tampo = new MyDisk(scene, 12);
		this.cyl = new MyCylinder(scene, 12, 3);
		this.manga = new MyUnitCubeQuad(scene);
		this.smallerArm = new MyCraneArm(scene);

   		this.texCrane = new CGFappearance(scene);
		this.texCrane.loadTexture("../resources/images/darkRustedMetal.png");

		this.metal = new CGFappearance(scene);
		this.metal.loadTexture("../resources/images/metal.png");
		
		this.lastUpdatedTurningTime = -1;
		this.turnAngle = 0;
		this.elevationAngle = 0;
		this.state = "D-UP";
    };

    display()
    {
		this.scene.pushMatrix();

			this.scene.rotate(this.turnAngle, 0, 1, 0);
			this.scene.rotate(Math.PI, 0, 1, 0);

			//------------cilindro base-----------------

			//base
			this.scene.pushMatrix();
				this.scene.scale(1, 0.4, 1);
				this.scene.rotate(-Math.PI/2, 1, 0, 0);
				this.metal.apply();
				this.cyl.display();
			this.scene.popMatrix();

			//tampo
			this.scene.pushMatrix();
				this.scene.translate(0,0.8,0);
				this.scene.scale(1, 0.4, 1);
				this.scene.rotate(-Math.PI/2, 1, 0, 0);
				this.metal.apply();
				this.tampo.display();
			this.scene.popMatrix();
			
			//---------------manga maior--------------------
			
			this.scene.pushMatrix();
				this.scene.translate(0,0.6,0);
				this.scene.rotate(Math.PI / 5, 0, 0, 1);
				this.scene.translate(0, 4.5, 0);
				this.scene.scale(0.9, 9, 0.9);
				this.texCrane.apply();
				this.manga.display();
			this.scene.popMatrix();

			this.scene.pushMatrix();
				this.scene.translate(-5.7,-2.2,0);
				this.smallerArm.display();
			this.scene.popMatrix();	

		this.scene.popMatrix();
	};

	turn(currTime, right)
	{
		if(this.lastUpdatedTurningTime != -1)
		{
			var deltaT = ((currTime - this.lastUpdatedTurningTime) / 1000); // Calculate delta time

            if(right) // If turning right
            {
                this.turnAngle -= 2 / Math.PI  * Math.pow(deltaT, 2) + deltaT;
            }
            else //If turning left
            {
                this.turnAngle += 2 / Math.PI  * Math.pow(deltaT, 2) + deltaT;
            }
		}

		this.lastUpdatedTurningTime = currTime;
	};
}
