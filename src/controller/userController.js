const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { isValid, isValidRequestBody } = require('../utils/validator');
const saltRounds = 10;
const emailRegex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/

const userRegistration = async (req, res) => {
    try {
        const requestBody = req.body;
        if (!isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: "Invalid request parameters. Please provide User details" })
        }

        const { name, age, email, password } = requestBody;
        if (!isValid(name)) {
            return res.status(400).send({ status: false, message: "name is required" });
        }

        if (!isValid(age)) {
            return res.status(400).send({ status: false, message: "User age is required" });
        }
        if (!isValid(email)) {
            return res.status(400).send({ status: false, message: "Email is required" });
        }
        if (!emailRegex.test(email)) {
            return res.status(400).send({ status: false, message: "Email should be a valid email" });
        }
        const isEmailExist = await userModel.findOne({ email });
        if (isEmailExist) {
            return res.status(400).send({ status: false, message: "Email already registered" });
        }
        if (!isValid(password)) {
            return res.status(400).send({ status: false, message: 'password is required' })
        }

        if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(password))) {
            return res.status(400).send({ status: false, message: 'password should be valid password' })
        }
        const hashPassword = bcrypt.hashSync(password, saltRounds);

        const userData = {
            name: name, age: age, email: email, password: hashPassword
        }
        const userCreated = await userModel.create(userData);
        return res.status(201).send({ status: true, message: 'User created successfully', data: userCreated })

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
};

const userLogin = async (req, res) => {
    try {
        const requestBody = req.body;
        if (!isValidRequestBody(requestBody)) {
            return res.status(400).send({ status: false, message: "Invalid request parameters. Please provide User details" })
        }
        const { email, password } = requestBody;
        if (!isValid(email)) {
            return res.status(400).send({ status: false, message: "Email is required" });
        }
        if (!emailRegex.test(email)) {
            return res.status(400).send({ status: false, message: "Email should be a valid email" });
        }

        if (!isValid(password)) {
            return res.status(400).send({ status: false, message: 'password is required' });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({ status: false, message: "User doesn't exists. Please register first" })
        }

        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) {
            return res.status(401).send({ status: false, message: "Password not matched" });
        }
        const token = jwt.sign({
            userId: user._id
        }, 'abc123', { expiresIn: '1h' });
        return res.status(200).send({ status: true, message: "Success", data: token });

    } catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

module.exports = { userRegistration, userLogin };