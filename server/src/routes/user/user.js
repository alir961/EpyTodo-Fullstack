const { get_user_table_all, get_user_table, update_user, delete_user, get_mail, get_all_todos, get_id_by_mail } = require('./user.query');
const { authenticateToken } = require('./../../middleware/auth');
const bcrypt = require('bcryptjs');

function user(app) {
    app.get("/user", authenticateToken, (req, res) => {
        get_mail(req, res);
        const mail = req.userMail;
        get_user_table_all(res, mail);
    });
    app.get("/api/id", authenticateToken, (req, res) => {
        get_mail(req, res);
        const mail = req.userMail;
        get_id_by_mail(res, mail);
    });
    app.get("/user/todos", authenticateToken, (req, res) => {
        get_mail(req, res);
        const userEmail = req.userMail;
        get_all_todos(res, userEmail)
    })
    app.get("/users/:id", authenticateToken, (req, res) => {
        const id = req.params.id;
        get_mail(req, res)
        const mail = req.userMail;
        get_user_table(res, id, mail);
    });
    app.put("/users/:id", authenticateToken, (req, res) => {
        var id = req.params.id;
        var mail = req.body["email"];
        var name = req.body["name"];
        var fname = req.body["firstname"];
        var psw = req.body["password"];
        get_mail(req, res);
        const userEmail = req.userMail;

        if (mail == "" || name == "" || fname == "" || psw == "" )
            return res.status(400).send({msg: "Bad parameter"});
        if (mail == undefined || name == undefined || fname == undefined || psw == undefined)
            return res.status(500).send({msg: "Internal server error"});
        psw = bcrypt.hashSync(psw, 10);
        update_user(res, mail, psw, fname, name, id, userEmail);
    });
    app.delete("/users/:id", authenticateToken, (req, res) => {
        var id = req.params.id;
        get_mail(req, res);
        const userEmail = req.userMail;
        delete_user(res, id, userEmail);
    })
}

module.exports = user;