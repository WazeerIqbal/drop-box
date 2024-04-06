
//we bring express and router
const express = require('express');

const router = express.Router();
//for validation
const { body, validationResult } = require('express-validator');

//Create a hash of password
const bcrypt = require('bcryptjs');

//JWT Authentication
const jwt = require('jsonwebtoken');
const JWT_SECRET = "Iqbalrasool@1";

//we bring middleware fetch user
var fetchuser = require("../middleware/fetchuser")

//Bring User models here to use
const User = require('../models/User');

//Route-1 Create user using "/api/auth" POST
router.post('/createuser', [
    body('name', 'Enter a Valid name').isLength(3),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid password Least Five Character').isLength({ min: 5 })
], async (req, res) => {

    //If there is error return bad reques
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        //Find a user having same email ID
        let user = await User.findOne({ email: req.body.email })
        
        //if user exist then it will show error
        if (user) {
            return res.status(400).json({ error: " User with same email is alreday exist" })
        }

        //bycrpt the password, creating hash of the password
        const salt = await bcrypt.genSaltSync(10);
        const secPass = await bcrypt.hashSync(req.body.password, salt);

        user = await User.create({                                                                                                                                                                                                                                                                                  
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })
        //we send token to databse next time when the user come it will authoticate through this token
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ authtoken })

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")

    }
})

//Route-2 Login user using "/api/login" POST
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a password').exists()
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    //Now we bring out email and password using destructure
    const { email, password } = req.body;
    try {
        //Find a user havung same email ID
        let user = await User.findOne({ email })

        if (!user) {
            success = false;
            return res.status(400).json({ error: " Credentials are not correct" })
        }

        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
            success = false;
            return res.status(400).json({ success, error: "Please enter correct credentails" })
        }

        //we send token to databse next time when the user come it will authoticate through this token
        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken })


    } catch (error) {
        console.error(error.message);
        res.status(500).send(" Internal Some error occured")

    }

})
//Route-3 Give login user detail. POST Request "/api/auth/getuser". No login required 
//Now we send JWT Token and get all detail of user

router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userId = req.user.id
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error 4")

    }

})





module.exports = router