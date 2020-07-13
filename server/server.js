const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mysql = require("mysql");
console.log(process.env.CLEARDB_DATABASE_URL);
const myURL = new URL(process.env.CLEARDB_DATABASE_URL);

// const devHost = '5.9.55.116';
// const devUser = 'test';
// const devPassword = 'whigdyetiabEnok8';
// const devName = 'test';

const prodHost = myURL.host;
const prodUser = myURL.username;
const prodPassword = myURL.password;
const prodName = myURL.pathname.substring(1);

app.get("/instagram", function (request, response) {
    const connection = mysql.createConnection({
        host: prodHost,
        user: prodUser,
        password: prodPassword,
        database: prodName
    });
    module.exports = connection;
    connection.connect(function (err) {
        if (err) {
            return (
                response.sendStatus(500)
            )
        }
        connection.query(
            "SELECT message.date, message.source_url, account.name, essence.essence\n" +
            "FROM user\n" +
            "INNER JOIN user_subscription ON user_subscription.user_id = user.id\n" +
            "INNER JOIN account ON account.id = user_subscription.account_id and account.type = 'instagram'\n" +
            "INNER JOIN message on message.account_id = user_subscription.account_id\n" +
            "INNER JOIN essence on essence.message_id = message.id\n" +
            "WHERE user.id = 1",
            function (error, results) {
                if (error) console.log(error);

                const page = request.query.page
                const limit = request.query.limit

                const startIndex = (page - 1) * limit
                const endIndex = page * limit

                const resultResponse = results.slice(startIndex, endIndex)

                console.log(resultResponse, "insta");
                response.send(resultResponse);
            }
        );
    });
});

app.get("/messengers", function (request, response) {
    const connection = mysql.createConnection({
        host: devHost,
        user: devUser,
        password: devPassword,
        database: devName
    });
    module.exports = connection;
    connection.connect(function (err) {
        if (err) {
            return (
                response.sendStatus(500)
            )
        }
        connection.query(
            "SELECT message.date, message.source_url, account.name, essence.essence\n" +
            "FROM user\n" +
            "INNER JOIN group_user ON group_user.user_id = user.id\n" +
            "INNER JOIN message on message.group_id = group_user.group_id\n" +
            "INNER JOIN account ON message.account_id = account.id\n" +
            "INNER JOIN essence on essence.message_id = message.id\n" +
            "WHERE user.id = 1",
            function (error, results) {
                if (error) console.log(error);

                const page = request.query.page
                const limit = request.query.limit

                const startIndex = (page - 1) * limit
                const endIndex = page * limit

                const resultResponse = results.slice(startIndex, endIndex)

                console.log(resultResponse, "telegram & whatsapp");
                response.send(resultResponse);
            }
        );
    });
});

app.listen(port, () =>
    console.log(`Example app listening at http://192.168.0.104:${port}/instagram?page=1&limit=25`)
);
