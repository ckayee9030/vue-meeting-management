const mysql = require('mysql');
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "123456",
    database: "meeting"
});

function query(sql, params, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            console.log('数据库连接出错：' + err)
            return
        }
        connection.query(sql, params, function(err, result) {
            if (err) {
                console.log('数据库查询出错：' + err)
                return
            }
            callback(err, result);
        })
        connection.release(); //释放
    })
}
exports.query = query;