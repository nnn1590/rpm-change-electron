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

// Control brightness(actually gamma?)

var range1 = document.getElementById('range1');
var field1 = document.getElementById('num1');

range1.addEventListener('input', function (e) {
	field1.value = e.target.value;
	execute('xrandr --output HDMI-1 --brightness ' + e.target.value/100, output => {});
});
field1.addEventListener('input', function (e) {
	range1.value = e.target.value;
	execute('xrandr --output HDMI-1 --brightness ' + e.target.value/100, output => {});
});
