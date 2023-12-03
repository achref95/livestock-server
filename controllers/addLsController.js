const LiveStock = require("../models/LiveStock.model")

const addLs = async (req, res, next) => {
    try {
        const { stockNumber, stockType } = req.body

        if (!stockNumber || !stockType) {
            return res.status(400).message({ message: "stockNumber / stockType not provided." });
        }

        const result = await LiveStock.create({stockNumber, stockType})
        return res.status(201).json({message: "Live stock created successfully", LiveStock: result});

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    addLs,
}