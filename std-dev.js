var w, h, g, my = {}

function stddevMain() {
    this.version = '0.754'
    w = 560;
    h = 460;
    var s = '';
	s += '<div class="su-box su-box-style-default" style="border-color:#c7c7c7;border-radius:3px">';
	s += '<div class="su-box-title" style="background-color:#f9f9f9;color:#000;border-top-left-radius:1px;border-top-right-radius:1px; padding:10px 20px 10px 20px;">';
    s += '<div style="font: bold 16px Arial; color: blue; line-height: 30px;">';
    s += '<div style="line-height: 6px;">&nbsp;</div>';
    s += '<div style="">';
    s += '<div style="display: inline-block; vertical-align:top;">';
    s += '<span style="font: bold 16px Arial; color: #000;">Insert Numbers:</span>';
    s += '</div>';
    s += '<div style="width: 98%; text-align: left; display: inline-block;">';
    s += '<textarea id="numbers" style="width:100%; height:55px; background-color: #eeffee; text-align:center; font: 18px Arial; border-radius: 10px; color:blue;" value="" onKeyUp="go(0)"></textarea>';
    s += '</div>';
    s += '<br/>';
    s += '</div>';
    my.sdTypes = ["Population", "Sample"];
    my.sdType = my.sdTypes[0]
    s += '<div id="options" style="font: 15px Arial; z-index:100; width: 90%; text-align: right; display: block;">';
    s += getRadioHTML('Select', 'sdType', my.sdTypes, 'chgSD');
    s += '</div>';
    s += '<div style="line-height: 20px;">&nbsp;</div>';
    s += '</div>';
    s += '<div style="background-color: #f1f1f1; padding: 8px 0 15px 0;">';
    s += '<div style="padding: 0 0 8px 3px; font: bold 16px Arial;">First, work out the average, or arithmetic mean, of the numbers:</div>';
    s += fmtDivs('Count:', 80, 'count', 150, 'div', '(How many numbers)', 200);
    s += fmtDivs('Sum:', 80, 'sum', 150, 'div', '(All the numbers added up)', 200);
    s += fmtDivs('Mean:', 80, 'mean', 150, 'div', '(Arithmetic mean = Sum / Count)', 200);
    s += '</div>';
    s += '<div style="background-color: #f9f9f9;  padding: 8px 0 15px 0;"">';
    s += '<div style="padding: 0 0 8px 3px; font: bold 16px Arial;">Then, take each number, subtract the mean and square the result:</div>';
    s += fmtDivs('Differences:', 100, 'diffs', 250, 'ta', '(Every Number minus Mean)', 180);
    s += fmtDivs('Differences<sup>2</sup>:', 100, 'diff2s', 250, 'ta', '(Square of each difference)', 170);
    s += '</div>';
    s += '<div style="background-color: #f1f1f1;  padding: 8px 0 15px 0;"">';
    s += '<div style="padding: 0 0 8px 3px; font: bold 16px Arial;">Now calculate the Variance:</div>';
    s += fmtDivs('Sum of Differences<sup>2</sup>:', 160, 'sumdiff2s', 160, 'div', '(Add up the Squared Differences)', 200);
    s += fmtDivs('Variance:', 160, 'var', 160, 'div', '(Sum of Differences<sup>2</sup>  / Count)', 200);
    s += '</div>';
    s += '<div style="background-color: lightgrey;  padding: 8px 0 15px 0;"">';
    s += '<div style="padding: 0 0 8px 3px; font: bold 16px Arial;">Lastly, take the square root of the Variance:</div>';
    s += fmtDivs('Standard Deviation:', 160, 'stddev', 160, 'div', '(The square root of the Variance)', 220);
    s += '</div>';
    s += '<div style="width:' + w + 'px; height: 100px; padding: 0;">';
    s += '<canvas id="canvasId" style="width:' + w + 'px; height: 100px; left: 0px; top: 0px; border: none;"></canvas>';
    s += '</div>';
    s += '</div>';
    document.write(s);
    h = 100;
    var el = document.getElementById('canvasId');
    var ratio = 2;
    el.width = w * ratio;
    el.height = h * ratio;
    el.style.width = w + "px";
    el.style.height = "px";
    g = el.getContext("2d");
    g.setTransform(ratio, 0, 0, ratio, 0, 0);
    this.enterKey = String.fromCharCode(13);
    var div = document.getElementById('numbers');
    div.value = '-3, 4, 2, 6, 5';
    go(0);
}

function fmtDivs(title, titleWd, id, idWd, idType, descr, descrWd) {
    var s = '';
    s += '<div style="padding: 0 0 2px 0;">';
    s += '<div style="display: inline-block; padding: 0 4px 0 0; font-size: 14px; width:' + titleWd + 'px; z-index:2; color: black; text-align: right; vertical-align:top;">' + title + '</div>';
    s += '<div style="display: inline-block;">';
    if (idType == 'div') {
        s += '<div id="' + id + '" style="display: inline-block; font-size: 17px; width:' + idWd + 'px; z-index:2; color: #0000ff; background-color: #f0f8ff; text-align:center; border-radius: 10px;"></div>';
    } else {
        s += '<textarea id="' + id + '" style="display: inline-block; font: 17px Arial; width:' + idWd + 'px; height: 50px; color: #0000ff; background-color: #f0f8ff; text-align:center; border-radius: 10px;"></textarea>';
    }
    s += '<div id="' + id + 'descr" style="display: inline-block; padding: 0 0 0 6px; font: italic 13px Arial; color: black; width:' + descrWd + 'px; vertical-align:top;">' + descr + '</div>';
    s += '</div>';
    s += '</div>';
    s += '<div style="clear:both"></div>'
    return s;
}

function go() {
    var div = document.getElementById('numbers');
    var nStr = div.value;
    nStr = nStr.replace(/[^0-9, e\-\.]+/g, '');
    div.value = nStr;
    var nSplit = nStr.split(',');
    var ns = [];
    for (var i = 0, len = nSplit.length; i < len; i++) {
        if (isNumeric(nSplit[i])) {
            ns.push(+nSplit[i]);
        }
    }
    var sum = 0;
    for (i = 0, len = ns.length; i < len; i++) {
        sum += ns[i];
    }
    var count = ns.length;
    document.getElementById('count').innerHTML = count.toString();
    document.getElementById('sum').innerHTML = fmtNum(sum);
    var mean = sum / count;
    document.getElementById('mean').innerHTML = fmtNum(mean);
    var diffs = [];
    var diff2s = [];
    var sumdiff2s = 0;
    for (i = 0, len = ns.length; i < len; i++) {
        diffs[i] = fmtNum(+ns[i] - mean);
        diff2s[i] = fmtNum(diffs[i] * diffs[i]);
        sumdiff2s += +diff2s[i];
    }
    document.getElementById('diffs').value = diffs.join(', ');
    document.getElementById('diff2s').value = diff2s.join(', ');
    console.log("my.sdType", my.sdType);
    var variance = 0
    if (my.sdType == 'Population') {
        variance = sumdiff2s / count;
        document.getElementById('vardescr').innerHTML = '(Sum of Differences<sup>2</sup>  / Count)';
    } else {
        variance = sumdiff2s / (count - 1);
        document.getElementById('vardescr').innerHTML = '(Sum of Differences<sup>2</sup>  / (Count&minus;1))';
    }
    document.getElementById('sumdiff2s').innerHTML = fmtNum(sumdiff2s);
    document.getElementById('var').innerHTML = fmtNum(variance);
    var stddev = Math.sqrt(variance);
    document.getElementById('stddev').innerHTML = fmtNum(stddev);
    drawVals(ns, mean, stddev);
}

function drawVals(ns, mean, stddev) {
    var wd = Math.min(w, window.innerWidth)
    g.clearRect(0, 0, g.canvas.width, g.canvas.height)
    var min = mean - stddev;
    var max = mean + stddev;
    for (var i = 0, len = ns.length; i < len; i++) {
        if (ns[i] < min) min = ns[i];
        if (ns[i] > max) max = ns[i];
    }
    var range = (max - min) * 1.2;
    var mid = (+max + min) / 2;
    max = mid + range / 2;
    min = mid - range / 2;
    g.beginPath();
    g.moveTo(0, 50);
    g.lineTo(wd, 50);
    g.stroke();
    g.textAlign = 'center';
    g.font = '14px Arial';
    var v, x;
    v = mean;
    x = (v - min) / (max - min) * wd;
    g.beginPath();
    g.arc(x, 50, 8, 0, 2 * Math.PI);
    g.stroke();
    g.fillStyle = 'yellow';
    g.fill();
    g.fillStyle = 'black';
    g.fillText('Mean=' + fmtNum(v), x, 35);
    v = mean - stddev;
    x = (v - min) / (max - min) * wd;
    g.beginPath();
    g.arc(x, 50, 6, 0, 2 * Math.PI);
    g.stroke();
    g.fillStyle = 'lightblue';
    g.fill();
    g.fillStyle = 'black';
    g.fillText('-1SD', x, 35);
    v = mean + stddev;
    x = (v - min) / (max - min) * wd;
    g.beginPath();
    g.arc(x, 50, 6, 0, 2 * Math.PI);
    g.stroke();
    g.fillStyle = 'lightblue';
    g.fill();
    g.fillStyle = 'black';
    g.fillText('+1SD', x, 35);
    for (i = 0, len = ns.length; i < len; i++) {
        v = ns[i];
        x = (v - min) / (max - min) * wd;
        g.beginPath();
        g.arc(x, 50, 3, 0, 2 * Math.PI);
        g.fill();
        g.fillText(v, x, 67);
        g.stroke();
    }
}

function getRadioHTML(prompt, id, lbls, func) {
    var s = '';
    s += '<div style="display:inline-block; border: 1px solid white; border-radius:5px; padding:3px; margin:3px; background-color:rgba(255,255,255,0.5);">';
    s += prompt + ':';
    for (var i = 0; i < lbls.length; i++) {
        var idi = id + i;
        var lbl = lbls[i];
        var chkStr = i == 0 ? 'checked' : '';
        s += '<input id="' + idi + '" type="radio" name="' + id + '" value="' + lbl + '" onchange="' + func + '(' + i + ');"  autocomplete="off" ' + chkStr + ' >';
        s += '<label for="' + idi + '">' + lbl + ' </label>';
    }
    s += '</div>';
    return s;
}

function chgSD(n) {
    my.sdType = my.sdTypes[n];
    console.log('chgSD', n, my.sdType)
    go();
}

function fmtNum(v) {
    var s = (+v).toPrecision(10);
    if (s.indexOf(".") > 0 && s.indexOf('e') < 0) {
        s = s.replace(/0+$/, '');
    }
    if (s.charAt(s.length - 1) == '.') {
        s = s.substr(0, s.length - 1);
    }
    return s;
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}