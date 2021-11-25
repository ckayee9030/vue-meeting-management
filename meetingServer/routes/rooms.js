var express = require('express');
var router = express.Router();
var db = require('../db/db')
const uk = require("unique-keygen") //生成唯一id
var schedule = require("node-schedule");
/* GET users listing. */

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
//每天00点更新时间段状态，明天的变为今天00 00 08表示08点
schedule.scheduleJob('00 40 18 * * *', function() {
    let sql = `select *from time_quantum`
    db.query(sql, (err, data) => {
        if (err) {
            console.log(err)
            return
        }
        data.forEach((item) => {
            let sql1 = `update time_quantum set one=${item.two},two=${item.three},three=${item.four},four=${item.five},five=${item.six},six=${item.seven},seven=0 where id=${item.id}`
            console.log(sql1)
            db.query(sql1, (err, row) => {
                if (err) {
                    console.log(err)
                    return
                }
                console.log(row.affectedRows)
            })
        });
    })
})

//获取内容
router.post('/getRooms', (req, res) => {
    let sql = `SELECT *FROM rooms  ORDER BY rid ASC`
    db.query(sql, (err, data) => {
        if (err) {
            console.log(err)
            return
        } else if (data.length > 0) {
            res.send({
                flag: true,
                data: data
            })
        } else {
            res.send({
                flag: false,
                msg: '获取数据失败'
            })
        }

    })
})

//获取会议室时间段
router.post('/getTimeQuantum', (req, res) => {
    let { rid } = req.body
    let sql = `select *from time_quantum where room_id = ? ORDER BY time_quantum ASC`
    db.query(sql, [rid], (err, data) => {
        if (err) {
            console.log(err)
            return
        } else if (data.length > 0) {
            res.send({
                flag: true,
                data: data
            })
        } else {
            res.send({
                flag: false
            })
        }
    })
})

//数据分析
router.post('/room_data', (req, res) => {
    let sql = `select rooms.name,rooms_analyze.* from rooms_analyze left join rooms on rooms_analyze.room_id=rooms.rid`
    db.query(sql, (err, data) => {
        if (err) {
            console.log(err)
            return
        }
        res.send({
            flag: true,
            data: data
        })
    })
})

module.exports = router;