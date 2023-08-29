

module.exports = {
    async getAllPoliceMan(req, res) {
        try {
            let data = await this.police.find().toArray();
            res.json(data)
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "error fetching police mans" })
        }
    },

    async createPoliceMan(req, res) {
        try {
            await this.police.insertOne({ ...req.body, createdDate: new Date(), editedDate: new Date() })
            res.json({ message: "police details created" })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "error creating policeman" })
        }
    },

    async deletePoliceMan(req, res) {
        try {
            await this.police.deleteOne({ bklid: req.body.bklid })
            res.json({ message: "police deleted" })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: "error deleting policeman" })
        }
    }
}
