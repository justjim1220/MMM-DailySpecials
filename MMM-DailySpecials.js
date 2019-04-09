/* global Module */

/* Magic Mirror
 * Module: MMM-DailySpecials
 *
 * By Jim Hallock (justjim1220)
 * based on the default MM2 compliments & MMM-kudos modules
 * By Thomas Mohaupt
 *
 * MIT Licensed.
 */

Module.register("MMM-DailySpecials", {
	defaults: {
		daymap: {
			0: "Sunday",
			1: "Monday",
			2: "Tuesday",
			3: "Wednesday",
			4: "Thursday",
			5: "Friday",
			6: "Saturday"
		},
		shrinkLimit: 35,
		special: {
			Sunday: [
				"$5 Lomg Island Iced Tea"
			],
			Monday: [
				"$1.50 Shots"
			],
			Tuesday: [
				"$2 Jello Shots"
			],
			Wednesday: [
				"Ladies Night - Screaming Orgasm - $3"
			],
			Thursday: [
				"Throwback Thursday - $1 draws!"
			],
			Friday: [
				"Friday Fight Night - $4 Zombie"
			],
			Saturday: [
				"$2 Can Beer"
			]
		},
		updateInterval: 24 * 60 * 60 * 1000,
		remoteFile: null,
		fadeSpeed: 500
	},

	requiresVersion: "2.1.0", // Required version of MagicMirror

	// Define required scripts.
	getScripts: function() {
		return ["moment.js"];
	},

	getStyles: function() {
		return ["MMM-DailySpecials.css"];
	},

	// Define start sequence.
	start: function() {
		Log.info("Starting module: " + this.name);

		this.lastSpecialIndex = -1;

		if (this.config.remoteFile != null) {
			this.specialFile((response) => {
				this.config.specials = JSON.parse(response);
			});
		}

		// set subset at begin of day to same as end of day
		this.config.daymap[0] = this.config.daymap[0] ? this.config.daymap[0] : this.config.daymap[this.dayKey(7)]

		// Schedule update timer.
		var self = this;
		setInterval(function() {
			self.updateDom(self.config.fadeSpeed);
		}, this.config.updateInterval);
	},

	/* randomIndex(specials)
	 * Generate a random index for a list of specials.
	 *
	 * argument specials Array<String> - Array with specials.
	 *
	 * return Number - Random index.
    */
	randomIndex: function(specials) {
		if (specials.length === 1) {
			return 0;
		}

		var generate = function() {
			return Math.floor(Math.random() * specials.length);
		};

		var specialIndex = generate();

		while (specialIndex === this.lastspecialIndex) {
			specialIndex = generate();
		}

		this.lastspecialIndex = specialIndex;

		return specialIndex;
	},

	dayKey: function(day) {
		while (!(day in this.config.daymap) || day < 0){
			day = day - 1;
		}

		return day;
	},

	/* specialArray()
	 * Retrieve an array of specialv for the time of the day.
	 *
	 * return special Array<String> - Array with special for the time of the day.
	 */
	specialArray: function() {
		var day = moment().day();
		var special = new Array();

		var dayKey =  this.dayKey(day);

		if (dayKey > -1) {
			special.push.apply(special, this.config.special[this.config.daymap[dayKey]]);
		}

		special.push.apply(special, this.config.special.anytime);

		return special;
	},

	/* specialFile(callback)
	 * Retrieve a file from the local filesystem
	 */
	specialFile: function(callback) {
		var xobj = new XMLHttpRequest();
		xobj.overrideMimeType("application/json");
		xobj.open("GET", this.file(this.config.remoteFile), true);
		xobj.onreadystatechange = function() {
			if (xobj.readyState == 4 && xobj.status == "200") {
				callback(xobj.responseText);
			}
		};
		xobj.send(null);
	},

	/* specialArray()
	 * Retrieve a random special.
	 *
	 * return special string - A special.
    */
	randomSpecial: function() {
		var special = this.specialArray();
		var index = this.randomIndex(special);

		return special[index];
	},

	// Override dom generator.
	getDom: function() {
		var specialText = this.randomSpecial();

		var special = document.createTextNode(specialText);
		var wrapper = document.createElement("div");
		if (special.length < this.config.shrinkLimit) {
			wrapper.className = this.config.classes ? this.config.classes : "bold xlarge bright";
		} else {
			wrapper.className = this.config.shrinkClasses ? this.config.shrinkClasses : "regular medium bright";
		}
		wrapper.appendChild(special);

		return wrapper;
	},

});
