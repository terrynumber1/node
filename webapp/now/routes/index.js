
/*
 * GET home page.
 */

var flight = require('../flight');
var data = require('../data');

for (var i in data) {
//    console.log('++++++++++++++');
//    console.log(data[i]);
//    console.log('---------------');
     data[i] = flight(data[i]);

//    console.log('YYYEYYYYY');
//    console.log(data[i]);
//    console.log('YYYEYYYYY');
}

//exports.index = function(req, res){
//  res.render('index', { title: 'Express' });
//};

exports.flight = function(req, res) {
    var num = req.param('number');

    if (typeof data[num] === 'undefined') {
        res.status(404).json({status: 'error'});
    } else {
//        console.log( data[number].getInformation() );
        res.json( data[num].getInformation() ) ;
    }
};

exports.arrived = function(req, res) {
    var num = req.param('number');

    if (typeof num === 'undefined') {
        res.status(404).json({status: error});
    } else {
        data[num].triggerArrive();
        res.json({status: 'done'});
    }
};

exports.list = function(req, res) {
    res.render('list', {title: 'All Flights', flights: data});
};
