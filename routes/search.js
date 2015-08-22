var connection = require('model').connection;
module.exports = function(req, res, next) {
  console.log(req.body);
  var expression = req.body.expression;
  console.log(expression);
  var query = "SELECT * FROM word WHERE word LIKE '%" + expression + "%'";
  console.log(query);
  connection.query(query, function(err, rows) {
    if (err) {
      console.log(err);
      res.send(new Error("error"));
      return;
    }
    console.log(rows);
    res.send(rows);
  });
};