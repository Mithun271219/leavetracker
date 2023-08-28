// const { users } = require('../shared/mongo');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = {
    async getAllPolices(req, res) {
        try {
            let polices = await this.users.find().toArray();
            res.json(polices)
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "error fetching the users details" });
        }
    },

    async signUp(req, res) {
        try {
            let { name, bklid, password } = req.body
            password = await bcrypt.hash(password, await bcrypt.genSalt(2));
            await this.users.insertOne({ ...req.body, password, isActive: true, createdDate: new Date(), editedDate: new Date() })
            res.json({ message: "user created success" })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "error creating the user" });
        }
    },

    async signIn(req, res) {
        try {
            let { bklid, password } = req.body;
            let isUser = await this.users.findOne({ bklid: bklid });

            //user validation
            if (!isUser) {
                return res.status(401).json({ message: "user not fount", link: "http://localhost:3001/auth/signup" })
            }

            //pass validtion
            let isValid = await bcrypt.compare(password, isUser.password);
            if (!isValid) {
                return res.status(401).json({ message: "password or bklid is incorrect" })
            }

            if (!isUser.isActive) {
                return res.status(401).json({ message: "user is not active" })
            } else {
                let token = await jwt.sign({ bklid: isUser.bklid }, process.env.JWT_KEY, { expiresIn: process.env.JWT_EXPIRY })
                return res.json({ message: "Login Success", token })
            }

            // if (!isUser) {
            //     res.status(401).json({ message: "user not fount", link: "http://localhost:3001/auth/signup" })
            // } else {
            //     //pass validtion
            //     let isValid = await bcrypt.compare(password, isUser.password);
            //     if (!isValid) {
            //         res.status(401).json({ message: "password or bklid is incorrect" })
            //     } else {
            //         if (!isUser.isActive) {
            //             res.status(401).json({ message: "user is not active" })
            //         } else {
            //             res.json(isValid)
            //         }
            //     }
            // }

        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "error while signin" });
        }
    },

    //delete user
    async deleteUser(req, res) {
        try {
            await this.users.deleteOne({ bklid: req.body.bklid })
            res.json({ message: "user deleted" })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "error deleting the user" });
        }
    },

    //deactivate user
    async deActivateUser(req, res) {
        try {
            await this.users.findOneAndUpdate({ bklid: req.body.bklid }, { $set: { isActive: false, editedDate: new Date() } })
            res.json({ message: "user disabled" })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "error deleting the user" });
        }
    },

    // activate user
    async activateUser(req, res) {
        try {
            await this.users.findOneAndUpdate({ bklid: req.body.bklid }, { $set: { isActive: true, editedDate: new Date() } })
            res.json({ message: "user enabled" })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "error deleting the user" });
        }
    }
}