var express = require('express');
var router = express.Router();
var userDao = require('./Dao/userDao');
/* GET home page. */
router.get('/test', function(req, res, next) {
    var email = req.query.email;
    var password = req.query.password;
    var nickname = req.query.nickname;
    if (!(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/).test(email)) {
        res.json({
            code: 400,
            err_msg: "잘못된 email 형식입니다"
        });
    } else if (!(/^[A-Za-z0-9!@#$%]{6,20}$/).test(password)) {
        res.json({
            code: 400,
            err_msg: "잘못된 password 형식입니다"
        });
    } else if (!(/^[A-Za-z0-9가-힣_]{2,16}$/).test(nickname)) {
        res.json({
            code: 400,
            err_msg: "잘못된 nickname 형식입니다"
        });
    }
    userDao.findUser({
        email: email
    }, {}, function(result) {
        if (result === false) {
            console.log("여기가문제인가");
            res.json({
                code: 500,
                error_msg : "서버오류"
            });
        } else if (result) {
            res.json({
                code: 200
            });
        } else if (!result) {
            userDao.findUser({
                nickname: nickname
            }, {}, function(result) {
                if (result === false) {
                    console.log("아님 여긴가");
                    res.json({
                        code: 500,
                        error_msg : "서버오류"
                    });
                } else if (result) {
                    res.json({
                        code: 300
                    });
                } else if (!result) {
                    userDao.insertUser({
                        email: email,
                        password: password,
                        nickname: nickname
                    }, function(result) {
                        if (result) {
                            res.json({
                                code: 100
                            });
                        }
                    });
                }
            });
        }
    });

});

module.exports = router;
