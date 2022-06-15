var db = require('./../../config/db');
const jwt = require('jsonwebtoken');

exports.register = (res, mail, psw, name, fname) => {
    db.execute('INSERT INTO user (email, password, name, firstname) VALUES (?, ?, ?, ?)', [mail, psw, name, fname], () => {
        const token = jwt.sign({mail, psw}, process.env.SECRET);
        res.status(200).json({token});
    });
};

exports.existing_mail = (res, mail, callback) => {
    db.execute('SELECT * FROM user WHERE email = ?', [mail], (err, result) => {
        if (result.length > 0)
            callback(1);
        else
            callback(0);
    });
};

exports.login = (res, mail, psw, bcrypt, callback) => {
    db.execute('SELECT password, id FROM user WHERE email = ?', [mail], (err, results) => {
        if (results.length > 0) {
            let email2 = results[0].email;
            let psw2 = results[0].password;
            if (bcrypt.compareSync(psw, psw2)) {
                const token = jwt.sign( {mail, psw2}, process.env.SECRET);
                res.status(200).json({token});
                callback(0);
            } else
                callback(1);
        } else
            callback(1);
    });
}

exports.get_user_table_all = (res, actual_mail) => {
    db.execute('SELECT * FROM user WHERE email = ?', [actual_mail], (err, results) => {
        if (results.length > 0) {
            return res.status(200).json({
                "id": results[0].id,
                "email": results[0].email,
                "password": results[0].password,
                "created_at": results[0].created_at,
                "firstname": results[0].firstname,
                "name": results[0].name
            });
        }
    });
}

exports.get_user_table = (res, identifiant, actual_mail) => {
    db.execute('SELECT * FROM user WHERE email = ?', [identifiant], (err, results) => {
        if (results.length > 0) {
            if (actual_mail !== results[0].email)
                return res.status(404).json({msg: "Not found"});
            return res.status(200).json({
                "id": results[0].id,
                "email": results[0].email,
                "password": results[0].password,
                "created_at": results[0].created_at,
                "firstname": results[0].firstname,
                "name": results[0].name
            });
        } else {
            db.execute('SELECT * FROM user WHERE id = ?', [identifiant], (err, results) => {
                if (results.length === 0)
                    return res.status(404).json({msg: "Not found"});
                if (results.length > 0) {
                    if (actual_mail !== results[0].email)
                        return res.status(404).json({msg: "Not found"});

                    return res.status(200).json({
                        "id": results[0].id,
                        "email": results[0].email,
                        "password": results[0].password,
                        "created_at": results[0].created_at,
                        "firstname": results[0].firstname,
                        "name": results[0].name
                    });
                }
            });
        }
    });
}

exports.update_user = (res, mail, psw, fname, name, id, userEmail) => {
    db.execute('UPDATE `user` SET email = ?, password = ?, name = ?, firstname = ? WHERE id = ?', [mail, psw, name, fname, id], (err, results) => {
        db.execute('SELECT id, email, password, created_at, firstname, name FROM user WHERE id = ?', [id], (err, results) => {
            if (results.length === 0)
                return res.status(404).json({msg: "Not found"});

            if (userEmail !== results[0].email)
                return res.status(404).json({msg: "Not found"});

            res.status(200).json({
                "id": results[0].id,
                "email": results[0].email,
                "password": results[0].password,
                "created_at": results[0].created_at,
                "firstname": results[0].firstname,
                "name": results[0].name
            });
        });
    });
}

exports.delete_user = (res, id, userEmail) => {
    db.execute('SELECT email FROM user WHERE id = ?', [id], (err, results) => {
        
        if (results.length === 0)
            return res.status(404).json({msg: "Not found"});
            
        if (userEmail !== results[0].email)
            return res.status(404).json({msg: "Not found"});

        db.execute('DELETE FROM user WHERE id = ?', [id], (err, results) => {
            res.status(200).json({msg: `Successfully deleted record number: ${id}`});
        });
    });
}

exports.get_mail = (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
        req.userMail = decodedToken.mail;
    });
}

exports.get_all_todos = (res, userEmail) => {
    db.execute('SELECT * FROM user WHERE email = ?', [userEmail], (err, results) => {
        if (results.length === 0)
            return res.status(404).json({msg: "Not found"});

        let userId = results[0].id;
        db.execute('SELECT * FROM todo WHERE user_id = ?', [userId], (err, results) => {
            if (results.length === 0)
                res.status(404).json({msg: "Not found"});
            else
                res.status(200).json(results);
        });
    });
}

exports.get_id_by_mail = (res, userEmail) => {
    db.execute('SELECT * FROM user WHERE email = ?', [userEmail], (err, results) => {
        if (results.length === 0)
            return res.status(404).json({msg: "Not found"});

        let userId = results[0].id;
        res.status(200).json({msg: userId});
    });
}
