var express = require('express');
var router = express.Router();
var request = require('request');
var search = require('./search');
var words = require('./words');
var bookmarks = require('./bookmarks');
/* GET home page. */
var paths = require('../path');
var mysql = require('mysql');
var connection = require('model').connection;

router.get('/', function(req, res, next) {
    res.sendFile(paths.home);
});

router.get('/words', words);
router.get('/bookmarks', bookmarks.getall);
router.post('/bookmark',bookmarks.addbookmark);
router.get('/download', function(req, res, next) {
    var query = "select * from word ";
    connection.query(query, function(err, rows) {
        if (err) {
            console.log(err);
            res.send(false);
            return;
        }
        res.set('Content-Disposition', 'attachment; filename="Bookmarked_words' + '.csv"');
        res.write("word,description,audio_url");
        rows.forEach(function(row){
            res.write(row.word+","+row.description+","+row.audio_url);
            res.write("\n");    
        });
        res.write(JSON.stringify(rows));
        res.end();
        connection.end();
    });
});
router.post('/search', search);
module.exports = router;
