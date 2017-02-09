var express = require('express');
var router = express.Router();
var userDao = require('./Dao/userDao');

/* GET users listing. */
router.get('/test', function(req, res, next) {
    var email = req.query.email;
    var password = req.query.password;
    userDao.findUser({
        email: email,
        password: password
    }, {}, function(result) {
        if(result === false){
            res.json({
                code: 500,
                error_msg : "서버오류"
            });
        }else if(!result){
            res.json({
                code: 200,
                error_msg : "회원 존재 하지 않음"
            });
        }else if(result){
            res.json({
                code: 100
            });
        }
    });
});

module.exports = router;
