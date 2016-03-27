var time = {
	timeFormat: config.time.timeFormat || 24,
	dateLocation: '.date',
	cnDateLocation: '.cn-date',
	timeLocation: '.time',
	updateInterval: 1000,
	intervalId: null
};

/**
 * Updates the time that is shown on the screen
 */
time.updateTime = function () {

	// var _now = moment(),
	// 	_date = _now.format('dddd, LL');
	var _now = moment();
	var _date = _now.format('MMMM Do YYYY, dddd');

  var _cnd = GetCNDate();
	$(this.dateLocation).html(_date);
	$(this.cnDateLocation).html(_cnd);
	$(this.timeLocation).html(_now.format(this._timeFormat+':mm[<span class="sec">]ss[</span>]'));

}

time.init = function () {

	if (parseInt(time.timeFormat) === 12) {
		time._timeFormat = 'hh'
	} else {
		time._timeFormat = 'HH';
	}

	this.intervalId = setInterval(function () {
		this.updateTime();
	}.bind(this), 1000);

}
