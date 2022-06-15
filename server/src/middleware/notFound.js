var db = require('./../config/db');

exports.not_found = (req, res, next) => {
    let id = req.params.id;
    db.execute('SELECT * FROM todo WHERE id = ?', [id], (err, results) => {
        if (results.length > 0)
            next();
        else
            res.status(404).json({msg: "Not found"});
    });
}