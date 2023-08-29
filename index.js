const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const { connect } = require('./shared/mongo');
const { logging, jwtTokenValidation } = require('./shared/middleware');
const authUsers = require('./routes/auth.routes');
const usersInfo = require('./routes/userInfo.routes')
const polices = require('./routes/policeman.routes');

const app = express();
dotenv.config();

(async () => {
    try {
        // connection to db
        await connect();

        app.use(cors());
        app.use(express.json());

        //logging middleware
        app.use(logging);

        app.use('/auth', authUsers)

        app.use('/police', polices)

        app.use(jwtTokenValidation)

        app.use('/user', usersInfo)


        app.listen(process.env.port, () => console.log('listing to port-' + process.env.port))
    } catch (error) {
        console.log(error)
        process.exit();
    }
})()