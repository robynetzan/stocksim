const ChartJSImage = require('chart.js-image');
const { exec } = require('child_process');
const pythonScriptPath = 'show_graph.py';
var stoch = require('stochastic');
var seedrandom = require('seedrandom');
const fs = require('fs');

const STEPS = 365*24*4;
var stocks = [];

var randomColor = function() {
	const randomBetween = (min, max) => min + Math.floor(Math.random() * (max - min + 1));
	const r = randomBetween(0, 255);
	const g = randomBetween(0, 255);
	const b = randomBetween(0, 255);
	const rgb = `rgb(${r},${g},${b})`; // Collect all to a css color string
	return rgb;
}

class Stock {
	constructor(name, price, seeds, parameters) {
		this.name = name;
		this.seeds = seeds;
		this.initialPrice = price;
		this.parameters = parameters;
		this.randoms = [
			seedrandom(seeds[0])(),
			seedrandom(seeds[1])()
		];
		stocks.push(this);
	}
	
	updateRandoms() {
		this.randoms[0] = seedrandom(this.randoms[0])();
		this.randoms[1] = seedrandom(this.randoms[1])();
		//console.log(this.randoms);
	}
	
	getName() {
		return this.name;
	}
	
	brown() {
		var mu = this.parameters.mu;
		var sigma = this.parameters.sigma;
		var T = this.parameters.T;
		var path = true;
		
		var B_t = [0];
		var B = 0;
		var dt = T / STEPS;
		var dB;

		if (!(T > 0) || !(STEPS > 0)){
			return B_t;
		};

		if (path == false){
			return ((mu * T) + (sigma * this.norm(0, Math.sqrt(T))));
		}
		else{
			for (var i = 0; i < STEPS; i++){
				dB = (mu * dt) + (sigma * this.norm(0, Math.sqrt(dt)));
				B += dB;
				B_t.push(B);
			};
			return B_t;
		};
	}
	
	norm(mu, sigma, random1, random2) {
		
		var U1, U2, x, y, z1, z2;

		this.updateRandoms();
		U1 = this.randoms[0];
		U2 = this.randoms[1];
		
		z1 = Math.sqrt(-2 * Math.log(U1)) * Math.cos(2 * U2 * Math.PI);
		z2 = Math.sqrt(-2 * Math.log(U1)) * Math.sin(2 * U2 * Math.PI);
		x = mu + (sigma * z1);
		y = mu + (sigma * z2);
		return Math.round(x);
	}
	
	getStockData() {
		return this.brown().map(num => Math.abs(num + this.initialPrice));
	}
}

const stock1 = new Stock("Lemon Man's Lemons", 60, [ "I'm stock 1", "Here's my seeds" ], { "mu": 0, "sigma": 0.2, "T": 10000 } );
const stock2 = new Stock("Ziggy's Restaurant", 80, [ "I'm stock 2", "Eating sweetly" ], { "mu": 0, "sigma": 0.5, "T": 10000 } );
const stock3 = new Stock("Gman's Gold Mine", 10, [ "I'm made of gold!", "Stable and slowly growing" ], { "mu": 0.01, "sigma": 0.05, "T": 10000 } );
const stock4 = new Stock("Adam's Stock", 10, [ "poland", "adam poland" ], { "mu": 0.01, "sigma": 0.2, "T": 10000 } );

var datasets = [];
for (var i = 0; i < stocks.length; i++) {
	datasets.push({
		"name": stocks[i].getName(),
		"data": stocks[i].getStockData()
	});
}

fs.writeFileSync("out.json", JSON.stringify(datasets));

exec(`python ${pythonScriptPath}`, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error executing Python script: ${error}`);
        return;
    }
    if (stderr) {
        console.error(`Python script encountered an error: ${stderr}`);
        return;
    }
    console.log(`Python script output:\n${stdout}`);
});