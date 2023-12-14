var mysql = require('mysql');
let connection = null;

function getConnect() {
    connection = mysql.createConnection({
        host: '127.0.0.1',
        user: 'root',
        password: 'My-World-2020',
        database: 'cool'
    })

    connection.connect()
    return connection;
}



function getQuery(sql) {
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, results, fields) => {
            if (err) reject(err);
            console.log("---------the results-------");
            console.log(results);
            console.log("-----------end------------")
            resolve(results);
        }
        )
    })
}

function endConnection() {
    connection.end()

}
getConnect();


module.exports = {
    getQuery
}