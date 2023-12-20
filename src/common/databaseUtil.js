var mysql = require('mysql');
var info = require('dotenv').config();
let connection = null;
function getConnect() {
    const { HOST_IP, MYSQL_PWD, DATABASE_NAME, MYSQL_NAME } = info?.parsed;
    connection = mysql.createConnection({
        host: HOST_IP,
        user: MYSQL_NAME,
        password: MYSQL_PWD,
        protocol: 'tcp',
        database: DATABASE_NAME,
    })

    connection.connect()
    return connection;
}



function getQuery(sql) {
    return new Promise((resolve, reject) => {
        connection.query(sql, (err, results, fields) => {
            if (err) reject(err);
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