var request = require('request');
module.exports =function(req, res, next) {
    var qu = 'A';
    if (req.query && req.query.query) {
        qu = req.query.query; //by default show for 'A'
    }
    var request_options = {
        method: "GET",
        url: "https://letsventure.0x10.info/api/dictionary.php?type=json&query=" + qu,
    };
    request(request_options, function(err, response) {
        if (err || response.statusCode !== 200) {
            console.log(err || body);
            res.send(err);
            return ;
        }
        res.send(response.body);
    });
};