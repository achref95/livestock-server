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
};

const getLs = async (req, res, next) => {
    try {
        const result = await LiveStock.find()

        if (!result || result.length === 0) {
            return res.status(400).json({message: "No live stock were found in the database"})
        }

        return res.status(200).json({LiveStock: result})
    } catch (error) {
        console.log(error)
    }
};

const getOne = async (req, res, next) => {
    try {
        const { stockNumber } = req.body

        if (!stockNumber) {
            return res.status(400).json({ message: "stockNumber not provided." });
        }

        const result = await LiveStock.find({stockNumber})
        
        if (!result || result.length === 0) {
            return res.status(400).json({message: "Unable to find any cattle with that number"})
        }

        return res.status(201).json({ls: result})
    } catch (error) {
        console.log(error)
    }
 };

module.exports = {
    addLs,
    getLs,
    getOne,
}