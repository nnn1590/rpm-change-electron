/**
 *
 * @licstart  The following is the entire license notice for the 
 *  JavaScript code in this page.
 *
 * Copyright (C) 2019  NNN1590
 *
 *
 * The JavaScript code in this page is free software: you can
 * redistribute it and/or modify it under the terms of the GNU
 * General Public License (GNU GPL) as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option)
 * any later version.  The code is distributed WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.
 *
 * As additional permission under GNU GPL version 3 section 7, you
 * may distribute non-source (e.g., minimized or compacted) forms of
 * that code without the copy of the GNU GPL normally required by
 * section 4, provided you include this license notice and a URL
 * through which recipients can access the Corresponding Source.
 *
 * @licend  The above is the entire license notice
 * for the JavaScript code in this page.
 *
 */

'use strict';

const exec = require('child_process').exec;

function execute(command, callback) {
	exec(command, (error, stdout, stderr) => { 
		callback(stdout); 
		if (stderr != "") {console.log(stderr);};
	});
};

var currentVals = document.getElementById('current_vals');

function updateStatus() {
	execute(`echo -n "pwm1: "
echo -n $(cat /sys/class/hwmon/hwmon2/device/pwm1_enable)
echo -n ", "
echo -n $(cat /sys/class/hwmon/hwmon2/device/pwm1)
echo -n ", "
echo -n $(cat /sys/class/hwmon/hwmon2/device/fan1_input)
echo -n "rpm"
echo "<br>"
echo -n "		pwm2: "
echo -n $(cat /sys/class/hwmon/hwmon2/device/pwm2_enable)
echo -n ", "
echo -n $(cat /sys/class/hwmon/hwmon2/device/pwm2)
echo -n ", "
echo -n $(cat /sys/class/hwmon/hwmon2/device/fan2_input)
echo -n "rpm"`, output => {
		currentVals.innerHTML = output;
	});
}

function initStatus() {
	execute('echo -n $(cat /sys/class/hwmon/hwmon2/device/pwm1_enable)', output => {
		if (output == 2) {
			check1.checked = true;
		}
	});
	execute('echo -n $(cat /sys/class/hwmon/hwmon2/device/pwm1)', output => {
		range1.value = output;
		field1.value = output;
	});
	execute('echo -n $(cat /sys/class/hwmon/hwmon2/device/pwm2_enable)', output => {
		if (output == 2) {
			check2.checked = true;
		}
	});
	execute('echo -n $(cat /sys/class/hwmon/hwmon2/device/pwm2)', output => {
		range2.value = output;
		field2.value = output;
	});
	
}


setInterval(updateStatus, 1000);

// Control fan

var check1 = document.getElementById('check1');
var range1 = document.getElementById('range1');
var field1 = document.getElementById('num1');

check1.addEventListener('input', function (e) {
	execute('echo ' + (e.target.checked + 1) + ' | tee /sys/class/hwmon/hwmon2/device/pwm1_enable', output => {});
});
range1.addEventListener('input', function (e) {
	field1.value = e.target.value;
	execute('echo ' + e.target.value + ' | tee /sys/class/hwmon/hwmon2/device/pwm1', output => {});
});
field1.addEventListener('input', function (e) {
	range1.value = e.target.value;
	execute('echo ' + e.target.value + ' | tee /sys/class/hwmon/hwmon2/device/pwm1', output => {});
});

var check2 = document.getElementById('check2');
var range2 = document.getElementById('range2');
var field2 = document.getElementById('num2');

check2.addEventListener('input', function (e) {
	execute('echo ' + (e.target.checked + 1) + ' | tee /sys/class/hwmon/hwmon2/device/pwm2_enable', output => {});
});
range2.addEventListener('input', function (e) {
	field2.value = e.target.value;
	execute('echo ' + e.target.value + ' | tee /sys/class/hwmon/hwmon2/device/pwm2', output => {});
});
field2.addEventListener('input', function (e) {
	range2.value = e.target.value;
	execute('echo ' + e.target.value + ' | tee /sys/class/hwmon/hwmon2/device/pwm2', output => {});
});

updateStatus();
initStatus();
