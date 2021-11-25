var express = require('express');
var router = express.Router();
const db = require('../db/db');
var schedule = require("node-schedule");
const moment = require('moment')
    //每一分钟的59秒检查预约会议室是否已完成
schedule.scheduleJob('59 * * * * *', function() {
    let sql = `select rid,end_time,time_quantum_id from reserve where state =1`
    db.query(sql, (err, data) => {
        if (err) {
            console.log(err)
            return
        }
        data.forEach((item) => {
            let now = new Date()
            let endT = new Date(item.end_time)
            let compare = now.getTime() - endT.getTime()
            // console.log(compare)
            if (compare >= 0) {
                let id = item.time_quantum_id.split("-")[0]
                let week = item.time_quantum_id.split("-")[1]
                let sql2 = `UPDATE time_quantum,reserve SET time_quantum.${week}=0,reserve.state=2 WHERE time_quantum.id = ${id} and reserve.rid='${item.rid}'`
                db.query(sql2, (err, row) => {
                    if (err) {
                        console.log(err)
                        return
                    }
                })
            }

        });
    })
})
module.exports = router