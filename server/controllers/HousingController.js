import { isObjectIdOrHexString, Types } from "mongoose";
import House from "../models/House.js";

export const getHousesList = async (_req, res) => {
    try {
        const houses = await House.find()
            .select("-__v")
            .populate({ path: "residents", select: "_id username firstName preferedName lastName phone email" })
            .populate({ path: "facilityReports" })
            .lean()
            .exec();

        res.status(200).send({ data: houses, code: 200, message: "success" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const postAddHouse = async (req, res) => {
    try {
        const { address, landlord, title } = req.body;

        const newHouse = new House({ title, address, landlord });
        await newHouse.save();

        const houses = await House.find()
            .select("-__v")
            .populate({ path: "residents", select: "_id username firstName preferedName lastName phone email" })
            .populate({ path: "facilityReports", select: "-__v" })
            .lean()
            .exec();

        res.status(201).send({ message: "House added successfully", code: 201, data: houses });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteHouse = async (req, res) => {
    const { houseId } = req.params;
    console.log(houseId);
    if (!isObjectIdOrHexString(houseId)) {
        return res.status(400).json({ message: "Invalid house ID format" });
    }

    const id = new Types.ObjectId(houseId);
    console.log(houseId, id);

    try {
        const house = await House.findById(id).lean().exec();
        if (!house) {
            return res.status(404).json({ message: "House not found" });
        }

        await House.findByIdAndDelete(houseId);

        const houses = await House.find()
            .select("-__v")
            .populate({ path: "residents", select: "_id username firstName preferedName lastName phone email" })
            .populate({ path: "facilityReports", select: "-__v" })
            .lean()
            .exec();
        return res.status(200).json({ message: "House deleted successfully", code: 200, data: houses });
    } catch (error) { }
};
