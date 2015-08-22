var connection = require('model').connection;
var bookmarks = {
   getall: function(req, res) {

      var query = "select * from word ";
      connection.query(query, function(err, rows) {
        if (err) {
          console.log(err);
          res.send(false);
          return;
        }
        res.send(rows);
      });
    },
    addbookmark: function(req, res, next) {
      /*
       *add the word to sql
       * */
      var word_data = req.body.word;
      var word = word_data.word;
      var description = word_data.description;
      var audio_url = word_data.audio_url;
      var query = "insert into word (word,description,audio_url) values('" + word + "','" + description + "','" + audio_url + "')";
      connection.query(query, function(err, rows) {
        if (err) {
          console.log(err);
          res.send(false);
          return;
        }
        res.send(true);
      });
    }
};
module.exports = bookmarks;