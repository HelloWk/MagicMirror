var compliments = {
	dl: config.displayLanguage || 'en',
	complimentLocation: '.compliment',
	currentCompliment: '',
	complimentList: {
		'morning': config.compliments.morning,
		'afternoon': config.compliments.afternoon,
		'evening': config.compliments.evening
	},
	complimentListCn: {
		'morning': config.complimentscn.morning,
		'afternoon': config.complimentscn.afternoon,
		'evening': config.complimentscn.evening
	},
	updateInterval: config.compliments.interval || 30000,
	fadeInterval: config.compliments.fadeInterval || 4000,
	intervalId: null
};

/**
 * Changes the compliment visible on the screen
 */
compliments.updateCompliment = function () {

	if (compliments.dl == 'cn') {
		var _comp = compliments.complimentListCn;
		$('.compliment').attr('class', 'compliment ultLight');
	} else {
		var _comp = compliments.complimentList;
		$('.compliment').attr('class', 'compliment light');
	}

	var _list = [];

	var hour = moment().hour();

	// In the followign if statement we use .slice() on the
	// compliments array to make a copy by value.
	// This way the original array of compliments stays in tact.

	if (hour >= 3 && hour < 12) {
		// Morning compliments
		_list = _comp['morning'].slice();
	} else if (hour >= 12 && hour < 17) {
		// Afternoon compliments
		_list = _comp['afternoon'].slice();
	} else if (hour >= 17 || hour < 3) {
		// Evening compliments
		_list = _comp['evening'].slice();
	} else {
		// Edge case in case something weird happens
		// This will select a compliment from all times of day
		Object.keys(_comp).forEach(function (_curr) {
			_list = _list.concat(_comp[_curr]).slice();
		});
	}

	// Search for the location of the current compliment in the list
	var _spliceIndex = _list.indexOf(compliments.currentCompliment);

	// If it exists, remove it so we don't see it again
	if (_spliceIndex !== -1) {
		_list.splice(_spliceIndex, 1);
	}

	// Randomly select a location
	var _randomIndex = Math.floor(Math.random() * _list.length);
	compliments.currentCompliment = _list[_randomIndex];

	$('.compliment').updateWithText(compliments.currentCompliment, compliments.fadeInterval);

}

compliments.init = function () {

	this.updateCompliment();

	this.intervalId = setInterval(function () {
		this.updateCompliment();
	}.bind(this), this.updateInterval)

}
