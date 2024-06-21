var stoch = require('stochastic');
var seedrandom = require('seedrandom');
const fs = require('fs');

const dataLocation = '../resources/stocksdata/json/'

var STEPS = 100;
var stocks = {};
var data = [];

class Stock {
	constructor(name, filename, price, seeds, parameters) {
		this.name = name;
		this.seeds = seeds;
		this.initialPrice = price;
		this.parameters = parameters;
		this.randoms = [
			seedrandom(seeds[0])(),
			seedrandom(seeds[1])()
		];
		
		this.filePath = './output/'+filename+'.json';
		if (!fs.existsSync(this.filePath)) {
			this.initialTime = new Date();
			this.historicalData = [0];
			fs.writeFileSync(this.filePath, JSON.stringify(
				{
					"initialTime": this.initialTime.getTime(),
					"historicalData": this.historicalData
			}));
			
		} else {
			var dataFromFile = JSON.parse(fs.readFileSync(this.filePath));
			this.historicalData = dataFromFile.historicalData;
			this.initialTime = new Date(dataFromFile.initialTime);
		}
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
	
	increment(n) {
		
		if (!n) {
			var n = 1;
		}
		
		for (var i = 0; i < n; i++) {
			var data = ((this.parameters.mu * this.parameters.T) + (this.parameters.sigma * this.norm(0, Math.sqrt(this.parameters.T))));
			this.historicalData.push(data);
		}
	}
	
	save() {
		console.log(this.historicalData);
		fs.writeFileSync(this.filePath, JSON.stringify({
			"historicalData": this.historicalData,
			"initialTime": this.initialTime.getTime()
		}))
	}
}

var run = function() {
	fs.readdirSync(dataLocation).forEach(filename => { 
		var data = JSON.parse(fs.readFileSync(dataLocation+filename));
		stocks[data.filename] = new Stock(data.name, data.filename, data.initialPrice, data.seeds, data.parameters);
		stocks[data.filename].increment(5);
		stocks[data.filename].save();
	});
}

run();