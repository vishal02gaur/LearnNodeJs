var express = require('express');
const uuidv1 = require('uuid/v1');
var jwt = require('jsonwebtoken');
var env = process.env.NODE_ENV || 'development';
var config = require(__dirname + '/../config/config.json')[env];
var models = require('../models');
var router = express.Router();

var authentication = (req, res, next) => {
    const bareHeader = req.headers['auth'];
    if (typeof bareHeader != 'undefined') {
        jwt.verify(bareHeader, config.jwt_key, (err, data) => {
            if (err)
                res.sendStatus(403);
            else
                next();
        });
    } else
        res.sendStatus(403);

};

router.get('/', (req, res, next) => {
    res.send('respond with a resource');
});

router.post('/login', (req, res, next) => {
    var body = req.body;
    var username = body.username;
    var password = body.password;

    if (typeof username == 'undefined' || typeof password == 'undefined') {
        res.sendStatus(400);
        return;
    }

    models.users
        .findOne({where: {username: username}})
        .then(user => {

            if (user) {
                const token = jwt.sign({
                    id: user.id,
                    username: user.username
                }, config.jwt_key, {expiresIn: 60 * 60 * 24 * 30});
                res.json({token: token, profile: user});
            }
        })
});


router.get('/profile', authentication, (req, res, next) => {

    res.send(`respond with a resource.`);
});

router.post('/signup', (req, res, next) => {
    var body = req.body;
    var username = body.username;
    var password = body.password;
    var fname = body.fname;
    var lname = body.lname;
    var dob = body.dob;
    var uid = uuidv1();

    if (typeof username == 'undefined' ||
        typeof password == 'undefined' ||
        typeof fname == 'undefined') {
        res.status(400);
        res.json({error: 'bad payload'});
        return;
    }


    models.users.create({
        id: uid,
        username: username,
        password: password,
        fname: fname,
        lname: lname,
        dob: dob
    }).then(() => {
        const token = jwt.sign({id: uid, username: username}, config.jwt_key, {expiresIn: 60 * 60 * 24 * 30});
        res.json({token: token});
    }).catch(err => {
        console.log(err);
        if (err.original.code == "ER_DUP_ENTRY") {
            res.status(409);
            res.json({error: 'username already exists'});
        }
        else
            res.sendStatus(500);
    });
});


module.exports = router;
