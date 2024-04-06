//middleware is a function the routes we need this middleware we pass as a second arguments and then then the next function is run

const jwt = require('jsonwebtoken');
const JWT_SECRET = "Iqbalrasool@1";

const fetchuser = (req, res, next) => {
    //get the user from JWT Token and add id to req object
    const token = req.header("auth-token");
    if (!token) {
        res.status(401).send({ error: "Please auth user with valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please auth user with valid token" })

    }

}

module.exports = fetchuser;