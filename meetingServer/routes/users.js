var express = require('express');
var router = express.Router();
var db = require('../db/db')
const uk = require("unique-keygen") //生成唯一id
const moment = require('moment');
var multer = require('multer');
const fs = require('fs');
/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

/**
 * 前端
 * 
 * **/
//上传图片
router.post('/uploads', function(req, res, next) {
    //上传图片路径配置
    let uploadDir = `./public/users/${moment().format('YYYYMMDD')}`;
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

//注册
router.post('/register', (req, res) => {
    let { account, name, pwd, phone, deparment, gender, post, email } = req.body
    console.log(req.body)
    let sql = `select account,isPasse from users where account=?`,
        sql1 = `insert into users(uid,account,name,pwd,phone,deparment,post,email,gender,registerTime) values(?,?,?,?,?,?,?,?,?,?)`
    db.query(sql, [account], (err, data) => {
        if (err) {
            console.log(err)
            return
        } else if (data.length == 0) {
            let uid = uk(10)
            let time = moment().format("YYYY-MM-DD HH:mm:ss")
            db.query(sql1, [uid, account, name, pwd, phone, deparment, post, email, gender, time], (err, row) => {
                if (err) {
                    console.log(err)
                    return
                } else if (row.affectedRows > 0) {
                    res.send({
                        flag: true,
                        msg: '提交成功！'
                    })
                } else {
                    res.send({
                        flag: false,
                        msg: '提交失败！'
                    })
                }
            })
        } else if (data[0].isPasse == 0) {
            res.send({
                flag: false,
                msg: "你已提交申请,正在审核中"
            })
        } else {
            res.send({
                flag: false,
                msg: "该账号已申请"
            })
        }
    })


})

//登录
router.post('/login', (req, res) => {
    let { account, pwd } = req.body
    let sql = `select uid,account,pwd from users where account=? and isPasse =1`
    console.log(req.body)
    db.query(sql, [account], (err, data) => {
        if (err) {
            console.log(err)
            return
        } else if (data.length > 0) {
            if (pwd === data[0].pwd) {
                res.send({
                    flag: true,
                    msg: "登录成功！",
                    uid: data[0].uid
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

//获取个人信息
router.post('/getMyInfo', (req, res) => {
        let { uid } = req.body
        console.log(req.body)
        let sql = `select *from users where uid = ?`
        db.query(sql, [uid], (err, data) => {
            if (err) {
                console.log(err)
                return
            } else if (data.length > 0) {
                data[0].registerTime = moment(data[0].registerTime).format("YYYY-MM-DD HH:mm:ss")
                data[0].passeTime = moment(data[0].passeTime).format("YYYY-MM-DD HH:mm:ss")
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

    //提交预约
router.post('/submitReserve', (req, res) => {
    let { select_time, num, uid, theme, content, room_name, room_id } = req.body
    console.log(req.body)
    let check = new Promise((resolve, reject) => {
        var isChoose = []
        select_time.forEach((item, i) => {
            let day = item.split(':')[1],
                id = item.split(':')[2]
            let sql = `select room_id from time_quantum where id=${id} and ${day}=1`
            console.log(sql)
            db.query(sql, (err, data) => {
                if (err) {
                    console.log(err)
                    return
                } else if (data.length > 0) {
                    isChoose.push(1)
                    if (i == select_time.length - 1) {
                        resolve(isChoose)
                    }
                } else {
                    if (i == select_time.length - 1) {
                        resolve(isChoose)
                    }
                }
            })
        })
    })
    check.then((value) => {
        if (value.length > 0) {
            res.send({
                flag: false,
                msg: '预约失败！'
            })
        } else {
            let time_quantum = ['09:00:00', '10:00:00', '11:00:00', '12:00:00', '13:00:00', '14:00:00', '15:00:00', '16:00:00', '17:00:00', '18:00:00', '19:00:00', '20:00:00', '21:00:00', '22:00:00']
            let time_quantum_index = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm']
            let obj = { one: 0, two: 1, three: 2, four: 3, five: 4, six: 5, seven: 6 };
            let sql = `insert into reserve(rid,uid,time_quantum_id,num,theme,room_name,content,begin_time,end_time) values(?,?,?,?,?,?,?,?,?)`
            select_time.forEach((item, i) => {
                let rid = uk(8)
                let week = item.split(":")[1]
                let quantum = Number(item.split(":")[0])
                let time_quantum_id = Number(item.split(":")[2]) + "-" + week
                let begin = moment().add(obj[week], "days").format("YYYY-MM-DD") + " " + time_quantum[quantum];
                let end = moment().add(obj[week], "days").format("YYYY-MM-DD") + " " + time_quantum[quantum + 1];
                db.query(sql, [rid, uid, time_quantum_id, num, theme, room_name, content, begin, end], (err, row) => {
                    if (err) {
                        console.log(err)
                        return
                    } else if (row.affectedRows > 0) {
                        let sql = `update rooms_analyze,time_quantum set time_quantum.${week}=1,rooms_analyze.reserve_count=rooms_analyze.reserve_count+1,rooms_analyze.${time_quantum_index[quantum]}=rooms_analyze.${time_quantum_index[quantum]}+1 where time_quantum.id=${time_quantum_id} and rooms_analyze.room_id=${room_id}`
                        console.log(sql)
                        db.query(sql, (err, row) => {
                            if (err) {
                                console.log(err)
                                return
                            } else if (row.affectedRows > 0) {
                                if (select_time.length - 1 == i) {
                                    res.send({
                                        flag: true,
                                        msg: "预约成功！"
                                    })
                                }
                            } else {
                                console.log("插入失败")
                                if (select_time.length - 1 == i) {
                                    res.send({
                                        flag: true,
                                        msg: "预约失败！"
                                    })
                                }
                            }
                        })
                    } else {
                        if (select_time.length - 1 == i) {
                            res.send({
                                flag: true,
                                msg: "预约失败！"
                            })
                        }
                    }
                })
            })
        }
    })

})

router.post('/updateMyinfo', (req, res) => {
    let { uid, account, pwd, phone, gender, post, email, deparment, name,u_img } = req.body.info
    let img = req.body.u_img
    if(img!==''){
        u_img = img
    }
    let sql = `select account,pwd from users where uid = ?`
    db.query(sql, [uid], (err, row) => {
        if (err) {
            console.log(err)
            return
        } else if (row.length != 0) {
            let time = moment().format("YYYY-MM-DD HH:mm:ss")
            let sql1 = `update users set u_img=?,account=?,pwd=?,phone=?,gender=?,post=?,email=?,deparment=?,name=?,updateTime=? where uid = ?`;
            db.query(sql1, [u_img,account, pwd, phone, gender, post, email, deparment, name, time, uid], (err1, row1) => {
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

//获取的预约记录
router.post('/getMyRecord', (req, res) => {
    let { currentPage, pageSize, uid, state } = req.body;
    console.log(req.body)
    var beiginIndex;
    if (currentPage == 1) {
        beiginIndex = 0;
    } else {
        beiginIndex = (currentPage - 1) * pageSize
    }
    let sql = `SELECT reserve.*,users.name,users.phone,users.email,(SELECT COUNT(*) FROM reserve 
      where reserve.state='${state}' and reserve.uid = '${uid}') as totalCount FROM reserve 
      left join users on reserve.uid=users.uid where reserve.state='${state}' and reserve.uid = '${uid}' 
    ORDER BY begin_time DESC limit ${beiginIndex},${pageSize}`
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

//删除预约记录
router.post('/del', (req, res) => {
    let { rid, state, uid } = req.body
    let sql = `delete from reserve where rid = ? and state=? and uid=?`
    db.query(sql, [rid, state, uid], (err, row) => {
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


/**
 * 后台
 * 
 * **/

//获取用户信息列表
router.post('/getUsers', (req, res) => {
    let { currentPage, pageSize } = req.body;
    console.log(req.body)
    var beiginIndex;
    if (currentPage == 1) {
        beiginIndex = 0;
    } else {
        beiginIndex = (currentPage - 1) * pageSize
    }
    console.log(req.body)
    let sql = `select *,(select count(*) from users) as totalCount from users  ORDER BY registerTime desc limit ${beiginIndex},${pageSize}`
    db.query(sql, (err, data) => {
        if (err) {
            return
        } else if (data.length > 0) {
            var arr = []
            new Promise((resolve, reject) => {
                data.forEach(element => {
                    element.registerTime = moment(element.registerTime).format('YYYY-MM-DD HH:mm:ss')
                    arr.push(element)
                });
                resolve()
            }).then(() => {
                res.send({
                    flag: true,
                    data: arr
                })
            })
        }

        // console.log(data)
    })
})

//搜索管
router.post('/search', (req, res) => {
    let { keyWord, currentPage, pageSize, deparment, isPasse } = req.body
    console.log(req.body)
    var beiginIndex;
    if (currentPage == 1) {
        beiginIndex = 0;
    } else {
        beiginIndex = (currentPage - 1) * pageSize
    }
    let sql = `SELECT *,(SELECT COUNT(*) FROM users where isPasse='${isPasse}' or deparment='${deparment}' or post='${keyWord}' or name='${keyWord}' or email='${keyWord}'or account='${keyWord}' or phone ='${keyWord}' or uid='${keyWord}') as totalCount FROM users where isPasse='${isPasse}' or deparment='${deparment}' or post='${keyWord}' or name='${keyWord}' or email='${keyWord}'or account='${keyWord}' or phone ='${keyWord}' or uid='${keyWord}' limit ${beiginIndex},${pageSize}`
    console.log(sql)
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

//通过审核
router.post('/updateState', (req, res) => {
    let { uid, state } = req.body
    console.log(req.body)
    let sql = `UPDATE users SET isPasse=?,passeTime=? WHERE uid = ?`,
        time = moment().format("YYYY-MM-DD HH:mm:ss")
    db.query(sql, [state, time, uid], (err, row) => {
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

//修改信息
router.post('/update', (req, res) => {
    let { uid, account, pwd, phone, gender, post, email, deparment, name } = req.body
    console.log(req.body)
    let sql = `select account,pwd from users where uid = ?`
    db.query(sql, [uid], (err, row) => {
        if (err) {
            console.log(err)
            return
        } else if (row.length != 0) {
            let sql1 = `update users set account=?,pwd=?,phone=?,gender=?,post=?,email=?,deparment=?,name=?,updateTime=now() where uid = ?`;
            db.query(sql1, [account, pwd, phone, gender, post, email, deparment, name, uid], (err1, row1) => {
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
router.post('/delUser', (req, res) => {
    let uid = req.body.uid
    let sql = `delete from users where uid = ?`
    db.query(sql, [uid], (err, row) => {
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


module.exports = router;