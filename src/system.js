import * as PIXI from "pixi.js";
import Charmap from "./charmap";
import Utils from "./utils";
import LFO from "./lfo";


export default class System {

	palette = {
		black: 0x000000,
		grey: 0x7c7c7c,
		white: 0xe1e1e1,
		red: 0xff2b10,
		orange: 0xff9322,
		yellow: 0xffff2c,
		green: 0x79ff7d,
		blue: 0x44daff,
		purple: 0xa26cff,
		fuschia: 0xff45b4,
	}

	elem;
	focused = true;

	constructor(args) {
		this.elem = args.elem;
		this.init();
	}

	async init() {
		Utils.init('random_seed');
		window.addEventListener('blur', this.onBlur.bind(this));
		window.addEventListener('focus', this.onFocus.bind(this));

		this.renderer = await PIXI.autoDetectRenderer({
			width: window.innerHeight,
			height: window.innerHeight,
			backgroundColor: 0x103020,
			antialias: true,
			transparent: false,
			autoDensity: true,
			resolution: window.devicePixelRatio,
		});
		this.elem.appendChild(this.renderer.view.canvas);
		this.renderer.view.canvas.style.imageRendering = 'pixelated';
		
		this.stage = new PIXI.Container();
		this.stage.eventMode = 'passive';
		this.stage.pivot.set(0,0);
		this.stage.position.set(this.renderer.screen.width/2, this.renderer.screen.height/2);

		this.charmap = new Charmap({
			system: this,
			stage: this.stage,
			screen: this.renderer.screen,
		});

		this.lfo = new LFO(0.1, 3, Math.PI/2);

		this.loop();
	}

	onBlur() {
		this.focused = false;
	}

	onFocus() {
		this.focused = true;
	}

	loop() {
		if(this.focused) {
			this.lfo.update(16);
			this.stage.scale.set(4 + this.lfo.value);
			this.charmap.update();
			this.render();
		}
		requestAnimationFrame(this.loop.bind(this));
	}

	render() {
		this.renderer.render(this.stage);
	}
}