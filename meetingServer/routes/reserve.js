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
    let uploadDir = `./public/reserves/${moment().format('YYYYMMDD')}`;
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
router.post('/addreserve', (req, res) => {
    console.log(req.body)
    let { name, admit, number, equipment, address, img } = req.body
    let time = moment().format("YYYY-MM-DD HH:mm:ss")
    let sql = `insert into reserve(name,admit,number,equipment,address,img,addTime) values('${name}','${admit}','${number}','${equipment}','${address}','${img}','${time}')`
    db.query(sql, (err, row) => {
        if (err) {
            console.log(err)
            return
        } else if (row.affectedRows > 0) {
            res.send({
                flag: true,
                msg: '添加文章成功'
            })
        } else {
            res.send({
                flag: false,
                msg: '添加文章失败'
            })
        }
    })
})


//修改
router.post('/update', (req, res) => {
    let { rid, name, admit, number, equipment, address, img } = req.body
    console.log(req.body)
    let time = moment().format("YYYY-MM-DD HH:mm:ss")
    let sql = `update reserve set name=?,admit=?,number=?,equipment=?,address=?,img=?,updateTime=? where rid = ?`;
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
router.post('/getReserve', (req, res) => {
    let { currentPage, pageSize } = req.body;
    var beiginIndex;
    if (currentPage == 1) {
        beiginIndex = 0;
    } else {
        beiginIndex = (currentPage - 1) * pageSize
    }
    let sql = `SELECT *,(SELECT COUNT(*) FROM reserve) as totalCount FROM reserve  ORDER BY begin_time DESC limit ${beiginIndex},${pageSize}`
    db.query(sql, (err, data) => {
        if (err) {
            console.log(err)
            return
        } else if (data.length > 0) {
            let arr = data
            arr.forEach((item, i) => {
                arr[i].time = moment(item.begin_time).format("YYYY-MM-DD HH:mm") + "-" + moment(item.end_time).format("HH:mm")
                if (arr.length - 1 == i) {
                    console.log(arr)
                    res.send({
                        flag: true,
                        data: arr
                    })
                }
            })
        } else {
            res.send({
                flag: false,
                msg: '获取数据失败'
            })
        }

    })
})

//获取会议室详情
router.post('/getRecordDetail', (req, res) => {
        let { currentPage, pageSize, uid, rid } = req.body;
        console.log(req.body)
        var beiginIndex;
        if (currentPage == 1) {
            beiginIndex = 0;
        } else {
            beiginIndex = (currentPage - 1) * pageSize
        }
        let sql = `SELECT reserve.*,users.name,users.phone,users.email FROM reserve 
      left join users on reserve.uid=users.uid where reserve.uid = '${uid}' and reserve.rid = '${rid}'`
        db.query(sql, (err, data) => {
            if (err) {
                console.log(err)
                return
            } else if (data.length > 0) {
                let arr = data
                arr.forEach((item, i) => {
                    arr[i].time = moment(item.begin_time).format("YYYY-MM-DD HH:mm") + "-" + moment(item.end_time).format("HH:mm")
                    if (arr.length - 1 == i) {
                        console.log(arr)
                        res.send({
                            flag: true,
                            data: arr
                        })
                    }
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
    let sql = `delete from reserve where rid = ?`
    db.query(sql, [rid], (err, row) => {
        if (err) {
            console.log(err)
            return
        } else if (row.affectedRows > 0) {
            res.send({
                flag: true
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
    let { rid, state, reason, uid, admin_name } = req.body
    console.log(req.body)
    let time = moment().format("YYYY-MM-DD HH:mm:ss")
    let sql = `UPDATE reserve SET state=?,reason=?,isPasseTime=?,admin_name=? WHERE rid = ?`
    db.query(sql, [state, reason, time, admin_name, rid], (err, row) => {
        if (err) {
            console.log(err)
            return
        } else if (row.affectedRows > 0) {
            let sql1 = `select time_quantum_id from reserve where rid=?`
            db.query(sql1, [rid], (err, data) => {
                if (err) {
                    console.log(err)
                    return
                }
                let id = data[0].time_quantum_id.split("-")[0]
                let week = data[0].time_quantum_id.split("-")[1]
                let sql2 = `UPDATE time_quantum SET ${week}=0 WHERE id = ${id}`
                console.log(sql2)
                db.query(sql2, (err, row) => {
                    if (err) {
                        console.log(err)
                        return
                    }
                    res.send({
                        flag: true,
                        msg: '提交成功！'
                    })
                })
            })

        } else {
            res.send({
                flag: false,
                msg: '提交失败！'
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
    let sql = `SELECT *,(SELECT COUNT(*) FROM reserve where theme='${keyWord}' or state='${keyWord}') as totalCount FROM reserve where theme='${keyWord}' or state='${keyWord}'  ORDER BY submitTime DESC limit ${beiginIndex},${pageSize}`
    db.query(sql, (err, data) => {
        if (err) {
            console.log(err)
            return
        } else if (data.length != 0) {
            let arr = data
            arr.forEach((item, i) => {
                arr[i].time = moment(item.begin_time).format("YYYY-MM-DD HH:mm") + "-" + moment(item.end_time).format("HH:mm")
                if (arr.length - 1 == i) {
                    console.log(arr)
                    res.send({
                        flag: true,
                        data: arr
                    })
                }
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