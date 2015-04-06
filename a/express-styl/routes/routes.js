
/*
 * GET home page.
 */

exports.index = function(req, res){
    res.render('index', { title: 'Express' });     // index.jade, variable title
};

exports.about = function (req, res) {
    res.render('about');    // about.jade
};

exports.todo = function (req, res) {
    res.render('todo');
};