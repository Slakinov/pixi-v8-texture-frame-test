import * as PIXI from "pixi.js";
import Chartile from "./chartile";
import Utils from "./utils";


export default class Charmap {

	constructor(args) {
		this.system = args.system;
		this.stage = args.stage;
		this.screen = args.screen;
		this.init();
	}

	size = 32;
	grid = [];

	async init() {
		const image = await PIXI.Assets.load('tiles.png');
		
		// fill grid
		let gw = Math.ceil((this.screen.width/2)/this.size);
		let gh = Math.ceil((this.screen.height/2)/this.size);
		for (let y = -gh; y <= gh; y++) {
			this.grid.push([]);
			for (let x = -gw; x <= gw; x++) {
				let ch = new Chartile({
					ox: Utils.randomIntSeeded(0, 7),
					oy: Utils.randomIntSeeded(0, 7),
				});
				ch.init(this.stage, x, y, this.size, image);
				this.grid[this.grid.length-1].push(ch);
			}
		}
	}

	update() {
		for (let y = 0; y < this.grid.length; y++) {
			for (let x = 0; x < this.grid[y].length; x++) {
				let ch = this.grid[y][x];
				ch.setTile({
					ox: Utils.randomIntSeeded(0, 3),
					oy: Utils.randomIntSeeded(0, 3),
					fc: Utils.randomProperty(this.system.palette),
					bc: Utils.randomProperty(this.system.palette),
				});
			}
		}
	}

}