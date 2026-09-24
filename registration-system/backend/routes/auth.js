const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { useTransition } = require('react');

Router.post('/api/login' , async(req, res) => {
    try {
        const {email , password } = req.body;

        //basic validation
        if (!email || !password) {
            return res.status(400).json({message: 'Email and password are required'});
        }

        //Find user by email
        const user = await User.findOne({email:email.toLowerCase() });
        if(!user) {
            return res.status(401).json({message: 'Invalid email or password'});
        }

        //Compare entered password with stored hash
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({message:'Invalid email or password'});
        }

        //Generate a JWT
         const token = jwt.sign(
            {id: user._id, email:user.email},
            process.env.JWT_SECRET,
            {expiresIn: '1d'}
         );

         res.status(200).json({
            message: 'Logic successful',
            token,
            user:{
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                gender:user.gender,
            },
         });
    }catch (error){
        console.error('Login error:', error);
        res.status(500).json({message: 'Server error during login'});
    }
});