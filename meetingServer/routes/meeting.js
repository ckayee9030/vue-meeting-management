var express = require('express');
var router = express.Router();
// const path = require('path');
const db = require('../db/db');
var multer = require('multer');
const moment = require('moment');
const fs = require('fs');
const uk = require("unique-keygen");

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

//上传图片
router.post('/uploads', function(req, res, next) {
    //上传图片路径配置
    let uploadDir = `./public/roomss/${moment().format('YYYYMMDD')}`;
    fs.mkdirSync(uploadDir, {
        recursive: true
    })
    const storage = multer.diskStorage({
        //指定文件存放路径
        destination: function(req, file, cb) {
            cb(null, uploadDir) //是用来确定上传的文件应该存储在哪个文件夹中。
        },
        filename: function(req, file, cb) {
            let exts = file.originalname.split(".")
            let ext = exts[exts.length - 1] //为了防止上传图片时,图片的名称中含多个点,从后面取最后一个解决问题
            let tmpname = Date.now() + parseInt(Math.random() * 9999) //时间戳+随机数生成文件名
            cb(null, `${tmpname}.${ext}`)
                // cb(null,file.originalname)//用于确定文件夹中的文件名的确定
        }
    });
    //前台数据缓存到upload中
    let upload = multer({ storage: storage }).array('pic')
    upload(req, res, function(err) {
        if (err) {
            console.log(err);
            return;
        } else {
            let imgPath = [];
            req.files.forEach(function(i) {
                var url = (i.path).replace('public', '')
                url = url.replace(/\\/g, "/")
                imgPath.push(url)
            })
            res.send({
                flag: true,
                imgUrl: imgPath
            })
        }
    });
});

//添加会议室
router.post('/addMeeting', (req, res) => {
    console.log(req.body)
    let { name, admit, number, equipment, address, img } = req.body
    let time = moment().format("YYYY-MM-DD HH:mm:ss")
    let sql = `insert into rooms(name,admit,number,equipment,address,img,addTime) values('${name}','${admit}','${number}','${equipment}','${address}','${img}','${time}')`
    db.query(sql, (err, row) => {
        if (err) {
            console.log(err)
            return
        } else if (row.affectedRows > 0) {
            let sql1 = `select MAX(rid) as rid from rooms`
            db.query(sql1, (err, data) => {
                if (err) {
                    console.log(err)
                    return
                } else if (data.length > 0) {
                    let sql1 = `insert into rooms_analyze(room_id) values('${[data[0].rid]}')`
                    db.query(sql1, (err, row) => {
                        if (err) {
                            console.log(err)
                            return
                        }
                    })
                    let time_quantum = ['09:00-10:00', '10:00-11:00', '11:00-12:00', '12:00-13:00', '13:00-14:00', '14:00-15:00', '15:00-16:00', '16:00-17:00', '17:00-18:00', '18:00-19:00', '19:00-20:00', '20:00-21:00', '21:00-22:00']
                    let sql2 = `insert into time_quantum(room_id,time_quantum) values(?,?)`
                    time_quantum.forEach((item, i) => {
                        db.query(sql2, [data[0].rid, item], (err, row) => {
                            if (err) {
                                console.log(err)
                                return
                            } else if (row.affectedRows > 0) {
                                if (time_quantum.length - 1 == i) {
                                    res.send({
                                        flag: true,
                                        msg: '添加成功'
                                    })
                                }
                            }
                        })
                    })
                } else {
                    res.send({
                        flag: true,
                        msg: '添加成功,但时间段添加失败'
                    })
                }
            })
        } else {
            res.send({
                flag: false,
                msg: '添加失败'
            })
        }
    })
})


//修改
router.post('/update', (req, res) => {
    let { rid, name, admit, number, equipment, address, img } = req.body
    console.log(req.body)
    let time = moment().format("YYYY-MM-DD HH:mm:ss")
    let sql = `update rooms set name=?,admit=?,number=?,equipment=?,address=?,img=?,updateTime=? where rid = ?`;
    db.query(sql, [name, admit, number, equipment, address, img, time, rid], (err, row) => {
        if (err) {
            console.log(err)
            return
        } else if (row.affectedRows > 0) {
            res.send({
                flag: true,
                msg: '修改文章成功！'
            })
        } else {
            res.send({
                flag: true,
                msg: '修改文章失败！'
            })
        }

    })
})


//获取内容
router.post('/getRooms', (req, res) => {
    let { currentPage, pageSize } = req.body;
    var beiginIndex;
    if (currentPage == 1) {
        beiginIndex = 0;
    } else {
        beiginIndex = (currentPage - 1) * pageSize
    }
    let sql = `SELECT *,(SELECT COUNT(*) FROM rooms) as totalCount FROM rooms  ORDER BY addTime DESC limit ${beiginIndex},${pageSize}`
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

//删除
router.post('/del', (req, res) => {
    let rid = req.body.rid
    let sql = `delete from rooms where rid = ?`
    db.query(sql, [rid], (err, row) => {
        if (err) {
            console.log(err)
            return
        } else if (row.affectedRows > 0) {
            let sql1 = `delete from time_quantum where room_id = '${rid}'`
            db.query(sql1, (err, row) => {
                if (err) {
                    console.log(err)
                    return
                } else if (row.affectedRows > 0) {
                    let sql2 = `delete from rooms_analyze where room_id = '${rid}'`
            db.query(sql2, (err, row) => {
                if (err) {
                    console.log(err)
                    return
                } else if (row.affectedRows > 0) {
                    res.send({
                        flag: true
                    })
                }
            })
                }
            })
        } else {
            res.send({
                flag: false
            })
        }
    })
})

//更新状态
router.post('/updateState', (req, res) => {
    let { rid, state } = req.body
    console.log(req.body)
    let sql = `UPDATE rooms SET isPublish=? WHERE rid = ?`
    db.query(sql, [state, rid], (err, row) => {
        if (err) {
            console.log(err)
            return
        } else if (row.affectedRows > 0) {
            res.send({
                flag: true,
                msg: '修改成功！'
            })
        } else {
            res.send({
                flag: false,
                msg: '修改失败！'
            })
        }



    })
})

//搜索
router.post('/search', (req, res) => {
    let { keyWord, currentPage, pageSize } = req.body
    var beiginIndex;
    if (currentPage == 1) {
        beiginIndex = 0;
    } else {
        beiginIndex = (currentPage - 1) * pageSize
    }
    let sql = `SELECT *,(SELECT COUNT(*) FROM rooms where number='${keyWord}' or name='${keyWord}' or admit='${keyWord}' or rid='${keyWord}') as totalCount FROM rooms where number='${keyWord}' or name='${keyWord}' or admit='${keyWord}' or rid='${keyWord}'  ORDER BY addTime DESC limit ${beiginIndex},${pageSize}`
    db.query(sql, (err, row) => {
        if (err) {
            console.log(err)
            return
        } else if (row.length != 0) {
            res.send({
                flag: true,
                data: row
            })
        } else {
            res.send({
                flag: false,
                msg: "没有搜索到你要的内容"
            })
        }

    })
})


module.exports = router;