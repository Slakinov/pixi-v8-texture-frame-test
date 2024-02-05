
export default class LFO {
	
	constructor(freq, amp=1, phase=0) {
		this.setFrequency(freq);
		this.amp = amp;
		this.phase = phase;
		this.value = 0;
	}

	setFrequency(freq) {
		this.freq = freq;
		this.setIncrement();
	}

	setIncrement() {
		this.increment = (this.freq*(Math.PI*2))/1000;
	}

	update(delta) {
		this.phase += this.increment*delta;
		this.value = Math.sin(this.phase)*this.amp;
	}

}