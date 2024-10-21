import House from "../models/House.js";

export const getHousesList = async (_req, res) => {
    try {
        const houses = await House.find()
            .select("-__v")
            .populate({ path: "residents", select: "_id username firstName preferedName lastName phone email" }, { path: "facilityReports"})
            .lean()
            .exec();

        res.status(200).send({ data: houses, code: 200, message: "success" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};