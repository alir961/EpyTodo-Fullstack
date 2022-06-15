var db = require('./../../config/db');

exports.get_todos_id = (res, id, userEmail) => {
    db.execute('SELECT * FROM user WHERE email = ?', [userEmail], (err, results) => {
        let actualId = results[0].id;
        db.execute('SELECT * FROM todo WHERE id = ?', [id], (err, results) => {
            let todoId = results[0].id;
            let title = results[0].title;
            let description = results[0].description;
            let created_at = results[0].created_at;
            let due_time = results[0].due_time;
            let todoUserId = results[0].user_id;
            let status = results[0].status;
            if (todoUserId !== actualId)
                return res.status(404).json({msg: "Not found"});
            return res.status(200).json({
                "id": todoId,
                "title": title,
                "description": description,
                "created_at": created_at,
                "due_time": due_time,
                "user_id": todoUserId,
                "status": status
            });
        });
    });
}

exports.get_all_todos = (res) => {
    db.execute('SELECT * FROM todo', (err, results) => {
        if (results.length === 0)
            res.status(404).json({msg: "Not found"});
        else
            res.status(200).json(results);
    });
}

exports.create_todo = (res, title, description, due_time, user_id, status) => {
    db.execute('INSERT INTO todo (title, description, due_time, user_id, status) VALUES (?, ?, ?, ?, ?)', [title, description, due_time, user_id, status], (err, results) => {
        let todo_id = results["insertId"];
        db.execute('SELECT * FROM todo WHERE id = ?', [todo_id], (err, results) => {
            res.status(200).json({
                "id": results[0].id,
                "title": results[0].title,
                "description": results[0].description,
                "created_at": results[0].created_at,
                "due_time": results[0].due_time,
                "user_id": results[0].user_id,
                "status": results[0].status
            })
        });
    });
};

exports.update_todo = (res, id, title, description, due_time, user_id, status) => {
    db.execute('SELECT * FROM todo WHERE id = ?', [id], (err, results) => {
        if (results.length === 0)
            return res.status(404).json({msg: "Not found"});
        const todoUserId = results[0].user_id;
        if (todoUserId != user_id)
            return res.status(404).json({msg: "Not found"});
        db.execute('UPDATE todo SET title = ?, description = ?, due_time = ?, user_id = ?, status = ? WHERE id = ?', [title, description, due_time, user_id, status, id], (err, results) => {
            db.execute('SELECT title, description, due_time, user_id, status FROM todo WHERE id = ?', [id], (err, results) => {
                res.json({
                    "title": results[0].title,
                    "description": results[0].description,
                    "due_time": results[0].due_time,
                    "user_id": results[0].user_id,
                    "status": results[0].status
                });
            });
        });
    });
}

exports.delete_todo = (res, id, userMail) => {
    db.execute('SELECT * FROM user WHERE email = ?', [userMail], (err, results) => {
        if (results.length === 0)
            return res.status(404).json({msg: "Not found"});
        let tokenId = results[0].id;
        db.execute('SELECT * FROM todo WHERE id = ?', [id], (err, results) => {
            if (results.length === 0)
                return res.status(404).json({msg: "Not found"});
            let tableUserId = results[0].user_id;
            if (tableUserId != tokenId)
                return res.status(404).json({msg: "Not found"});
            db.execute('DELETE FROM todo WHERE id = ?', [id], () => {
                res.status(200).json({msg: `Successfully deleted record number: ${id}`});
            });
        });
    });
}