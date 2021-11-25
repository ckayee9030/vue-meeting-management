var express = require('express');
var router = express.Router();
var db = require('../db/db')
var moment = require("moment")
    // var nodeExcel = require("excel-export"); //首先，引入excel模块
var fs = require('fs');
const uk = require("unique-keygen") //生成唯一id
    /* GET users listing. */

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});


//获取管理员信息
router.post('/ReserveData', (req, res) => {
    let { state } = req.body;
    console.log(req.body)
    var sql = null
    if (state == 3) {
        sql = `select reserve.*,users.account,users.phone,users.email from reserve left join users on reserve.uid= users.uid ORDER BY begin_time ASC `
    } else {
        sql = `select reserve.*,users.account,users.phone,users.email from reserve left join users on reserve.uid= users.uid where reserve.state=${state}  ORDER BY begin_time ASC `
    }
    db.query(sql, (err, data) => {
        if (err) {
            return
        } else if (data.length > 0) {
            let arr = data
            arr.forEach((item, i) => {
                arr[i].time = moment(item.begin_time).format("YYYY-MM-DD HH:mm") + "-" + moment(item.end_time).format("HH:mm")
                if (item.isPasseTime) {
                    arr[i].isPasseTime = moment(item.isPasseTime).format("YYYY-MM-DD HH:mm:ss")
                }
                if (arr.length - 1 == i) {
                    // console.log(arr)
                    res.send({
                        flag: true,
                        data: arr
                    })
                }
            })
        } else {
            res.send({
                flag: false,
                msg: "没有数据"
            })
        }
    })
})

router.post('/exportData', (req, res) => {
    var conf = {}; //创建一个写入格式map，其中cols(表头)，rows(每一行的数据);
    var cols = ['申请人', '手机号', '邮箱', '申请时段', '会议室名称', '参会人数', '会议室主题', '管理员', '审核时间', '审核状态']; //手动创建表头中的内容
    conf.cols = []; //在conf中添加cols

    for (var i = 0; i < cols.length; i++) {
        var tits = {}; //创建表头数据所对应的类型,其中包括 caption内容 type类型
        tits.caption = cols[i]; //添加内容
        tits.type = 'string'; //添加对应类型，这类型对应数据库中的类型，入number，data但一般导出的都是转换为string类型的
        conf.cols.push(tits); //将每一个表头加入cols中
    }
    let sql = `select reserve.*,users.account,users.phone,users.email from reserve left join users on reserve.uid= users.uid  ORDER BY begin_time ASC`
    db.query(sql, (err, data) => {
        if (err) {
            return
        } else if (data.length > 0) {
            var tows = ['account', 'phone', 'email', 'end_time', 'room_name', 'num', 'theme', 'admin_name', 'isPasseTime', 'state'];
            //创建一个和表头对应且名称与数据库字段对应数据，便于循环取出数据
            var datas = []; //用于承载数据库中的数据
            for (let i = 0; i < data.length; i++) { //循环数据库得到的数据，因为取出的数据格式为
                var tow = []; //用来装载每次得到的数据
                for (let j = 0; j < tows.length; j++) { //内循环取出每个
                    tow.push(data[i].tows[j]);
                    console.log((data[i].tows[j]))
                }

                datas.push(tow); //将每一个{ }中的数据添加到承载中
            }
            conf.tows = datas; //将所有行加入tows中
            var result = nodeExcel.execute(conf); //将所有数据写入nodeExcel中
            res.setHaeder('Conten-Tyep', 'application/vnd.openxmmlformats:charset:s=utf-8'); //设置响应头
            res.setHaeder('Conten-Disposition', 'attachment:filename="+encodeURLComponent("XXXXX")+".xlsx'); //设置下载文件命名
            res.end(result, 'binary'); //将文件内容传入
        } else {
            res.send({
                flag: false,
                msg: "没有数据"
            })
        }
    })

})
module.exports = router;