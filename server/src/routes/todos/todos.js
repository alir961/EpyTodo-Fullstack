const { get_todos_id, get_all_todos, create_todo, update_todo, delete_todo } = require('./todos.query');
const { get_mail } = require('./../user/user.query');
const { authenticateToken } = require('./../../middleware/auth');
const { not_found } = require('./../../middleware/notFound');


function todos(app) {
    app.get("/todos", authenticateToken, (req, res) => {
        get_mail(req, res);
        const userEmail = req.userMail;
        get_all_todos(res)
    });
    app.get("/todos/:id", authenticateToken, not_found, (req, res) => {
        const todoId = req.params.id;
        get_mail(req, res);
        const userEmail = req.userMail;
        get_todos_id(res, todoId, userEmail);
    });
    app.post("/todos", authenticateToken, (req, res) => {
        let todoTitle = req.body['title'];
        let description = req.body['description'];
        let due_time = req.body['due_time'];
        let user_id = req.body['user_id'];
        let status = req.body['status'];
        if (todoTitle === "" || description === "" || due_time === "" || user_id === "" || status === "")
            return res.status(400).json({msg: "Bad parameter"});
        if (todoTitle === undefined || description === undefined || due_time === undefined || user_id === undefined || status === undefined)
            return res.status(500).send({msg: "Internal server error"});
        create_todo(res, todoTitle, description, due_time, user_id, status);
    });
    app.put("/todos/:id", authenticateToken, (req, res) => {
        const todoId = req.params.id;
        let title  = req.body['title'];
        let description = req.body['description'];
        let due_time = req.body['due_time'];
        let user_id = req.body['user_id'];
        let status = req.body['status'];
        if (title === "" || description === "" || due_time === "" || user_id === "" || status === "")
            return res.status(400).json({msg: "Bad parameter"});
        if (title === undefined || description === undefined || due_time === undefined || user_id === undefined || status === undefined)
            return res.status(500).send({msg: "Internal server error"});
        update_todo(res, todoId, title, description, due_time, user_id, status);
    });
    app.delete("/todos/:id", authenticateToken, (req, res) => {
        const todoId = req.params.id;
        get_mail(req, res);
        const userEmail = req.userMail;
        delete_todo(res, todoId, userEmail);
    });
}

module.exports = todos;