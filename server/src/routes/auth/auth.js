const {register, existing_mail, login} = require('./../user/user.query');
const bcrypt = require('bcryptjs');

function auth(app) {
    app.post("/register", async (req, res) => {
        var mail = req.body['email'];
        var name = req.body['name'];
        var fname = req.body['firstname'];
        var psw = req.body['password'];

        if (mail === "" || name === "" || fname === "" || psw === "")
            return res.status(400).json({msg: "Bad parameter"});
        if (mail === undefined || name === undefined || fname === undefined || psw === undefined)
            return res.status(500).send({msg: "Internal server error"});
        var hash = await bcrypt.hash(psw, 10);
        existing_mail(res, mail, (nb) => {
            if (nb === 1) {
                return res.status(409).json({msg :"Account already exist"});
            } else {
                register(res, mail, hash, name, fname);
            }
        })
    });
    
    app.post("/login", async (req, res) => {
        var mail = req.body['email'];
        var psw = req.body['password'];

        if (mail === "" || psw === "")
            return res.status(400).send({msg: "Bad parameter"});
        if (mail === undefined || psw === undefined)
            return res.status(500).send({msg: "Internal server error"});
        login(res, mail, psw, bcrypt, (nb) => {
            if (nb === 1)
                return res.status(401).send({msg: "Invalid Credentials"});
        });
    })
};

module.exports = auth;