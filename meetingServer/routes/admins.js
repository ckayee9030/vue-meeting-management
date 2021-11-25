var express = require('express');
var router = express.Router();
var db = require('../db/db')
const moment = require('moment');
const fs = require('fs');
const uk = require("unique-keygen") //生成唯一id
    /* GET users listing. */

router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

// req为请求的数据
// res.send()，内部参数为发送的数据
router.post('/updateMyinfo', (req, res) => {
    var { aid, account, pwd, phone, gender,u_img } = req.body.info
    let img = req.body.u_img
    if(img!==''){
        u_img = img
    }
    console.log(req.body)
    let sql = `select account from admins where aid = ?`
    db.query(sql, [aid], (err, row) => {
        if (err) {
            console.log(err)
            return
        } else if (row.length != 0) {
            let time = moment().format("YYYY-MM-DD HH:mm:ss")
            let sql1 = `update admins set u_img=?,account=?,pwd=?,phone=?,gender=?,updateTime=? where aid = ?`;
            db.query(sql1, [u_img,account, pwd, phone, gender, time, aid], (err1, row1) => {
                if (err1) {
                    console.log(err1)
                    return
                }
                res.send({
                    flag: true,
                    msg: '修改成功！'
                })
            })
        } else {
            res.send({
                flag: false,
                msg: '修改失败！'
            })
        }
    })
})

//获取个人信息
router.post('/getMyInfo', (req, res) => {
    let { aid } = req.body  // let aid = req.body.aid;
    console.log(req.body)
    let sql = `select *from admins where aid = ?`
    db.query(sql, [aid], (err, data) => {
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


// 上一级app.js用的路径是/admins，总的路由：localhost:8080/admins/getAmins
//获取管理员信息
router.post('/getAdmins', (req, res) => {
    let { currentPage, pageSize } = req.body;
    var beiginIndex;
    if (currentPage == 1) {
        beiginIndex = 0;
    } else {
        beiginIndex = (currentPage - 1) * pageSize
    }

    console.log(req.body)
    let sql = `select *,(select count(*) from admins) as totalCount from admins  ORDER BY addTime desc limit ${beiginIndex},${pageSize}`
    db.query(sql, (err, data) => {
        if (err) {
            return
        }
        res.send({
                flag: true,
                data: data
            })
            // console.log(data)
    })
})


//添加管理员
router.post('/addAdmin', (req, res) => {
    let { account, pwd, phone, gender } = req.body
    console.log(req.body)
    let sql = `select account from admins where account = ?`
    db.query(sql, [account], (err, row) => {
        if (err) {
            console.log(err)
            return
        } else if (row.length == 0) {
            let aid = uk('8');
            let sql1 = `insert into admins(aid,account,pwd,phone,gender,addTime) values(?,?,?,?,?,now())`;
            db.query(sql1, [aid, account, pwd, phone, gender], (err1, row1) => {
                if (err1) {
                    console.log(err1)
                    return
                }
                res.send({
                    flag: true,
                    msg: '添加管理员成功！'
                })
            })
        } else {
            res.send({
                flag: false,
                msg: '该账号已存在！'
            })
        }
    })
})

//修改管理员信息
router.post('/update', (req, res) => {
    let { aid, account, pwd, phone, gender } = req.body
    console.log(req.body)
    let sql = `select account,pwd from admins where aid = ?`
    db.query(sql, [aid], (err, row) => {
        if (err) {
            console.log(err)
            return
        } else if (row.length != 0) {
            let sql1 = `update admins set account=?,pwd=?,phone=?,gender=?,updateTime=now() where aid = ?`;
            db.query(sql1, [account, pwd, phone, gender, aid], (err1, row1) => {
                if (err1) {
                    console.log(err1)
                    return
                }
                res.send({
                    flag: true,
                    msg: '修改管理员成功！'
                })
            })
        } else {
            res.send({
                flag: false,
                msg: '修改管理员失败！'
            })
        }
    })
})


//删除管理员
router.post('/del', (req, res) => {
    let aid = req.body.aid
    console.log(aid)
    let sql = `delete from admins where aid = ?`
    db.query(sql, [aid], (err, row) => {
        if (err) {
            console.log(err)
            return
        }
        console.log("row:" + row)
        res.send({
            flag: true
        })
    })
})

//搜索管理员
router.post('/search', (req, res) => {
        let keyWord = req.body.keyWord
        console.log(keyWord)
        let sql = `select *from admins where account =? or aid=?`
        console.log(sql)
        db.query(sql, [keyWord, keyWord], (err, row) => {
            if (err) {
                console.log(err)
                return
            } else if (row.length != 0) {
                console.log("row:" + row)
                res.send({
                    flag: true,
                    data: row
                })
            } else {
                console.log("row:" + row)
                res.send({
                    flag: false,
                    msg: "没有搜索到你要的内容"
                })
            }

        })
    })
    //登录
router.post('/Login', (req, res) => {
    let { account, pwd } = req.body
    let sql = `select aid,account,pwd from admins where account=?`
    console.log(req.body)
    db.query(sql, [account], (err, data) => {
        // console.log(data)
        if (err) {
            console.log(err)
            return
        } else if (data.length > 0) {
            if (pwd === data[0].pwd) {
                res.send({
                    flag: true,
                    msg: "登录成功！",
                    uid: data[0].aid
                })
            } else {
                res.send({
                    flag: false,
                    msg: "密码有误！"
                })
            }
        } else {
            res.send({
                flag: false,
                msg: "该账号有误！"
            })
        }
    })

})
module.exports = router;