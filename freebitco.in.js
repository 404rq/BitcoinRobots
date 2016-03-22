/* Settings for the robot
 * This script can be used on the following website: http://freebitco.in/?r=2275365
*/
var start_value = '0.00000001',
	stop_percentage = 0.001,        //Percentual value indicating when it's time to stop
	stop_at_value = 0.004096,       //A value in BTC indicating when to reset after increase on each loss
	max_wait = 2000,                //Max time in ms to wait between each round
	multiplicator = 2,              //How much to multiplicate the bet for each round
	stop_before = 1;                //Amount in Satoshis when to stop

//The High and Low buttons to trigger the click
var $loButton = $('#double_your_btc_bet_lo_button'),
	$hiButton = $('#double_your_btc_bet_hi_button');

//Do the multiplication process in the right input field
function multiply() { 
	var current = $('#double_your_btc_stake').val();
	var multiply = (current * multiplicator).toFixed(8);
	$('#double_your_btc_stake').val(multiply);
}

//Generate a random wait time
function get_random_wait() {
	var wait = Math.floor(Math.random() * max_wait ) + 100;
	console.log('Waiting for ' + wait + 'ms before next bet.');
	return wait;
}

//Trigger game start
function start_game() {
	console.log('Game started...');
	reset();
	$loButton.trigger('click');
}

//Trigger game stop
function stop_game(){
	console.log('Page will reload soon, stopping...');
}

//Reset bet value to initial value
function reset() {
	$('#double_your_btc_stake').val(start_value);
}

//Hack for smaller amounts of BTC
function de_exponentize(number) {
	return number * 10000000;
}

//Verify balance
function check_balance() {
	var balance = de_exponentize(parseFloat($('#balance').text()));
	var current = de_exponentize($('#double_your_btc_stake').val());

	return ((balance)*multiplicator/100) * (current*multiplicator) > stop_percentage/100;
}

function stop_before_redirect() {
	var minutes = parseInt($('title').text());
	if (minutes < stop_before) {
		console.log('Approaching redirect! Stop the game so we don\'t get redirected while loosing.');
		stop_game();
		return true;
	}
	return false;
}

//Unbind old unused variables
$('#double_your_btc_bet_lose').unbind();
$('#double_your_btc_bet_win').unbind();

//Event: on loose
$('#double_your_btc_bet_lose').bind("DOMSubtreeModified", function(event) {
	if ($(event.currentTarget).is(':contains("lose")')) {
		var current = $('#double_your_btc_stake').val();
		if (current < stop_at_value) {
			console.log('Looser: multiplying your bet and try again');
			multiply();
		}
		else {
			console.log('Looser: reset to be safe');
			reset();
		}

                //Hit a random button up/down
		setTimeout(function(){
			if( Math.random() < 0.5 )
				$loButton.trigger('click');
			else
				$hiButton.trigger('click');
		}, get_random_wait());
	}
});

//Event: on win
$('#double_your_btc_bet_win').bind("DOMSubtreeModified", function(event) {
	if ($(event.currentTarget).is(':contains("win")')) {
		if (stop_before_redirect()) {
                        return;
                }

		if (check_balance()) {
			console.log('Winner: reset to be safe');
			reset();
		}
		else {
			console.log('Winner: betting again');
		}

		setTimeout(function(){
			if( Math.random() < 0.5 )
				$loButton.trigger('click');
			else
				$hiButton.trigger('click');
		}, get_random_wait());
	}
});
start_game();
