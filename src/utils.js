import SeedRandom from 'seedrandom';

// https://github.com/Slakinov

export default class Utils {

	static init(seed) {
		window._UID = 0;
		window._RNG = new SeedRandom(seed || this.randomInt(0, Number.MAX_SAFE_INTEGER));
	}

	static getUID() {
		window._UID++;
		return parseInt(window._UID);
	}

	static hexToRgb(hex) {
		if(hex[0] == ' ') hex = hex.substr(1); // remove leading space
		let r = parseInt(hex.slice(1, 3), 16);
		let g = parseInt(hex.slice(3, 5), 16);
		let b = parseInt(hex.slice(5, 7), 16);
		return { r, g, b };
	}

	static thousandCommas(number) {
		return String(number).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	static distance(x1, y1, x2, y2) {
		return Math.hypot(x1-x2, y1-y2);
	}

	static clamp(x, min, max) {
		return Math.min(Math.max(x, min), max);
	}

	static random() {
		return _RNG();
	}

  static randomIntSeeded(min, max) {
		return Math.round(min + (this.random() * (max-min)));
  }

	static randomInt(min, max) {
		return Math.round(min + (Math.random() * (max-min)));
  }

	static fuzzyIntSeeded(int, margin) {
		return int + (-margin + this.randomIntSeeded(0, margin*2));
	}

	static randomFloatSeeded(min, max) {
		return min + (this.random() * (max-min));
  }

	static randomFloat(min, max) {
		return min + (Math.random() * (max-min));
  }

	static randomSign(x) {
		return Math.random() > 0.5 ? -x : x;
	}

	static randomSignSeeded(x) {
		return this.random() > 0.5 ? -x : x;
	}

	static randomVector(mag=1) {
		let a = Math.random()*Math.PI*2;
		return { x:Math.cos(a)*mag, y: Math.sin(a)*mag }
	}

	static fuzzyFloat(float, margin) {
		return float + (-margin + this.randomFloat(0, margin*2));
	}
	
	static fuzzyFloatSeeded(float, margin) {
		return float + (-margin + this.randomFloatSeeded(0, margin*2));
	}

	static randomElement(array) {
		return array[this.randomInt(0, array.length-1)];
	}

	static randomElementSeeded(array) {
		return array[this.randomIntSeeded(0, array.length-1)];
	}

	static randomPropertySeeded(object) {
		let keys = Object.keys(object)
		return object[keys[keys.length * this.random() << 0]];
	}

	static randomProperty(object) {
		let keys = Object.keys(object)
		return object[keys[keys.length * Math.random() << 0]];
	}

	static getRandomChar(chars = `AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890()[]-!_^,$#%"&'`) {
		return chars[this.randomInt(0, chars.length-1)];
	}

	static getRandomColour(colours = ['white', 'grey', 'lightgrey', 'purple', 'fuschia', 'blue', 'green', 'brown', 'greygreen', 'red', 'orange', 'yellow']) {
		return this.randomElement(colours);
	}

	static bresenhamLine(x1, y1, x2, y2) {
		let coords = [];
		let dx = Math.abs(x2 - x1);
		let dy = Math.abs(y2 - y1);
		let sx = (x1 < x2) ? 1 : -1;
		let sy = (y1 < y2) ? 1 : -1;
		let err = dx - dy;
		coords.push({x:x1, y:y1});
		while (!((x1 == x2) && (y1 == y2))) {
			let e2 = err << 1;
			if (e2 > -dy) {
				err -= dy;
				x1 += sx;
			}
			if (e2 < dx) {
				err += dx;
				y1 += sy;
			}
			coords.push({x:x1, y:y1});
		}
		return coords;
	}

	static bresenhamCircle(r) {
		let p = 0;
		let x = 0;
		let y = r;
		let coords = [];
		while(x<y) {
			if(p < 0) {
				p += x;
			} else {
				y--;
				p += x-y;
			}
			coords.push({x:x,y:y});
			coords.push({x:-x,y:y});
			coords.push({x:x,y:-y});
			coords.push({x:-x,y:-y});
			coords.push({x:y,y:x});
			coords.push({x:-y,y:x});
			coords.push({x:y,y:-x});
			coords.push({x:-y,y:-x});
			x++;
		}
		return coords;
	}

	static drift(current, target, delta=0.1, amp=1) {
		return current += (target-current)*delta*amp;
	}

	/**
	 * somewhat finicky SVG path converter
	 * only supports <path> elements
	 * can't handle bezier curves
	 * supports multiple closed paths per <path> element (Z command)
	 * outputs an array of separate single-line path strings as space-separated x,y points
	 * eg. [ '0 0 100 0 100 100 0 100', '0 0 100 0 100 100 0 100' ]
	 * @param {String} svg raw svg file as text
	 */
	static SVGtoPaths(svg) {
		let pathElements = svg.split('<path');
		if(pathElements[0].indexOf('xml') > -1) pathElements.shift();
		let pathData = [];
		for(let e of pathElements) {
			let commands = e.split(' d="')[1];
			commands = commands.split('"')[0];
			let paths = commands.split('Z');
			for(let p of paths) {
				if(p.length > 0) {
					// skip first 'M', split into 'L' lines, convert to string
					pathData.push(p.replaceAll(',',' ').substr(1).split('L').join(' '));
				}
			}
		}
		return pathData;
	}

}