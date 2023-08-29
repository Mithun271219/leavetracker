const { MongoClient } = require('mongodb');

module.exports = {
    db: null,

    users: null,
    police: null,
    approvedLeaves: null,
    appliedLeaves: null,
    rejectedLeaves: null,

    async connect() {
        try {
            // db connection
            let client = new MongoClient(process.env.MONGO_URL);
            await client.connect();
            console.log('data base connection success');

            //db initilization 
            this.db = await client.db(process.env.MONGO_NAME)
            console.log('connected to ' + process.env.MONGO_NAME);

            //paths initilization
            this.users = await this.db.collection('users');
            this.police = await this.db.collection('policeman');
            this.approvedLeaves = await this.db.collection('approvedLeaves');
            this.appliedLeaves = await this.db.collection('appliedLeaves');
            this.rejectedLeaves = await this.db.collection('rejectedLeaves');

            console.log('paths initilized')
        } catch (error) {
            console.log(error)
            throw new Error(error);
        }
    }
}