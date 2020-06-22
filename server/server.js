const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mysql = require("mysql");
console.log(process.env.CLEARDB_DATABASE_URL);
const myURL = new URL(process.env.CLEARDB_DATABASE_URL);

app.get("/message", function(request, response) {
  const connection = mysql.createConnection({
    host: myURL.host,
    user: myURL.username,
    password: myURL.password,
    database: myURL.pathname
  });
  module.exports = connection;
  connection.connect(function(err) {
    if (err) {
      return (
          response.send(500, { error: "connection.error" + " env:" + process.env.CLEARDB_DATABASE_URL})
      )
    }
    connection.query(
      "SELECT message.date, message.source_url, account.name, essence.essence\n" +
        "FROM user\n" +
        "INNER JOIN user_subscription ON user_subscription.user_id = user.id\n" +
        "INNER JOIN account ON account.id = user_subscription.account_id\n" +
        "INNER JOIN message on message.account_id = user_subscription.account_id\n" +
        "INNER JOIN essence on essence.message_id = message.id\n" +
        "WHERE user.id = 1",
      function(error, results, fields) {
        if (error) console.log(error);

        console.log(results, "results");
        response.send(results);
      }
    );
  });
});

app.get("/test", function(request, response) {
  response.send("Hello Pavel!");
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}/message`)
);
