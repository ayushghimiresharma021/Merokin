import user from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';




const register = async (req, res) => {
    try {
        const { name, email, password } = req.body ;

        const salt = await bcrypt.genSalt() ;
        const encryptPassword = await bcrypt.hash(password, salt)

        const newUser = await user.create({
            name: name,
            email: email,
            password: encryptPassword
        }) ;

        res.status(200).json({ name, email, password }) ;

    }
    catch (error) {
        res.status('400').json(error)
    }
}
const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const newUser = await user.findOne({ email: email })
        if (!newUser) {

            res.status(402).json({ message: 'Your Email was not found' }) ;
        }
        const isMatch = await bcrypt.compare(password, newUser.password)

        if (!isMatch) {
            res.status(422).json({ message: 'Password does not match' }) ;
        }

        const userdetail = await user.findOne({ email: email }).select('-password') ;

        jwt.sign({ email: newUser.email, id: newUser._id }, process.env.SECRET_KEY, {}, (err, token) => {
            if (err) {
                console.log(err)
            }
            res.status(200).cookie('token', token).json({ user: userdetail, token: token })
        })




    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.log({ errorRequest: error.request });
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
    }
}
const logout = async (req, res) => {
    res.cookie('token', '').json(true)
}


export { register, login, logout };