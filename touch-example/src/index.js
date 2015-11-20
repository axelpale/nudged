/*

A demonstration app for nudged

*/
var Hammer = require('hammerjs');
var loadimages = require('loadimages');
var Model = require('./Model');
var toFixed = require('./toFixed');

var codeView = document.getElementById('codeView');
var touchcanvas = document.getElementById('touchcanvas');
var ctx = touchcanvas.getContext('2d');

loadimages('blackletter.jpg', function (err, img) {
  var w = 800;
  var h = 600;
  var iw = w * 0.618;
  var ih = h * 0.618;
  var dx = Math.round((w - iw) / 2);
  var dy = dx;
  ctx.drawImage(img, dx, dy, iw, iw);

  var model = new Model();

  var hammertime = new Hammer(touchcanvas);

  // Improve usability by tweaking the recognizers
  hammertime.get('swipe').set({ enable: false });
  hammertime.get('pan').set({ enable: false });

  (function defineHowToTransform() {
    var prev, domain, range;
    prev = null;
    hammertime.on('hammer.input', function (ev) {
      console.log(ev);
      // Capture to prev so we can track differences.
      if (prev === null) {
        // Initialize
        prev = ev;
      }
      if (ev.isFinal) {
        // Forget to be able to start fresh.
        prev = null;
      } else {
        if (ev.pointerType === 'mouse') {
          domain = [[prev.pointers[0].pageX, prev.pointers[0].pageY]];
          range =  [[ev.pointers[0].pageX  , ev.pointers[0].pageY  ]];
          model.set(domain, range);
          // Move history
          prev = ev;
        }
      }
    });
  }());


  /*(function defineHowToPanRangePoints() {
    var movingPoint = null;
    var x0 = 0;
    var y0 = 0;
    hammerRange.on('panstart', function (ev) {
      if (movingPoint === null) {
        // Transform to canvas coordinates
        var cr = canvasRange.getBoundingClientRect();
        var x = ev.center.x - cr.left;
        var y = ev.center.y - cr.top;

        var np = model.findNearestRangePoint(x, y);
        if (np !== null) {
          // Found
          movingPoint = np;
          x0 = np.x;
          y0 = np.y;
        }
      }
    });

    hammerRange.on('panmove', function (ev) {
      if (movingPoint !== null) {
        movingPoint.moveTo(x0 + ev.deltaX, y0 + ev.deltaY);
      }
    });

    hammerRange.on('panend pancancel', function (ev) {
      movingPoint = null;
    });
  }());*/


  // Output: view update
  model.on('update', function () {
    var dom = model.getDomain();
    var ran = model.getRange();
    var piv = model.getFixedPoint();
    var tra = model.getTransform();
    var invtra = tra.inverse();

    // Clear
    ctx.clearRect(0, 0, touchcanvas.width, touchcanvas.height);

    // Range image: apply transform to it
    ctx.setTransform(tra.s, tra.r, -tra.r, tra.s, tra.tx, tra.ty);
    ctx.drawImage(img, dx, dy, iw, iw);
    ctx.resetTransform();

    // Show how the points and transformation looks in code
    var pointToArray = function (p) {
      return [Math.round(p.x), Math.round(p.y)];
    };
    var domparam = dom.map(pointToArray);
    var ranparam = ran.map(pointToArray);
    var m = toFixed(tra.getMatrix(), 2);
    var html = 'var domain = ' + JSON.stringify(domparam) + ';<br>' +
      'var range = ' + JSON.stringify(ranparam) + ';<br>';
    if (piv !== null) {
      html += 'var pivot = ' + JSON.stringify(pointToArray(piv)) + ';<br>';
      html += 'var trans = nudged.estimateFixed(domain, range, pivot);<br>';
    } else {
      html += 'var trans = nudged.estimate(domain, range);<br>';
    }
    html += 'trans.getMatrix();<br>' +
      '-> [[' + m[0][0] + ', ' + m[0][1] + ', ' + m[0][2] + '],<br>' +
      '    [' + m[1][0] + ', ' + m[1][1] + ', ' + m[1][2] + '],<br>' +
      '    [' + m[2][0] + ', ' + m[2][1] + ', ' + m[2][2] + ']]';
    codeView.innerHTML = html;
  });
});
