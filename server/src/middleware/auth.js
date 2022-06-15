const jwt = require('jsonwebtoken');

exports.authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!authHeader)
        return res.status(401).json({msg: "No token , authorization denied"});
    jwt.verify(token, process.env.SECRET, (err) => {
        if (err)
            return res.status(401).json({msg: "Token is not valid"});
        next();
    })
}