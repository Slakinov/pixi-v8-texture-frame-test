import * as PIXI from "pixi.js";

export default class Chartile {

	sp; // foreground sprite
	tx; // texture
	fc; // foreground tint colour (0x000000)
	ox; // tile texture offset X (0-7)
	oy; // tile texture offset Y (0-7)
	bg; // background rect
	bc; // background colour (0x000000)

	constructor(args) {
		Object.assign(this, args);
	}

	init(stage, x, y, size, image) {
		this.bg = new PIXI.Graphics();
		this.bg
			.clear()
			.setStrokeStyle(0)
			.rect(0, 0, size, size)
			.fill({color:0xffffff, alpha:0.5});
		this.bg.position.set(x*size - size/2, y*size - size/2);
		stage.addChild(this.bg);

		this.tx = new PIXI.Texture({
			source: image,
			frame: new PIXI.Rectangle(0, 0, 255.5, 255.5)
		});
		this.sp = new PIXI.Sprite(this.tx);
		this.sp.position.set(x*size - size/2, y*size - size/2);
		this.sp.width = size+0.25;
		this.sp.height = size+0.25;
		this.sp.cullable = true;
		this.sc = this.sp.width;
		stage.addChild(this.sp);
		this.setTile();
	}
	
	setTile(args) {
		Object.assign(this, args);
		this.tx.frame.x = (this.ox*256) + 0.25;
		this.tx.frame.y = (this.oy*256) + 0.25;
		this.tx.updateUvs();
		// this.sp.width = this.sc + (Math.random()*0.00000001);
		// this.sp.height = this.sc + (Math.random()*0.00000001);
		// this.sp.tint = this.fc;
		// this.bg.tint = this.bc;
	}
}