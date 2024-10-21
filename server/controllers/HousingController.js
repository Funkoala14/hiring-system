import House from "../models/House.js";

export const getHousesList = async(req, res) => {
	try {
		const houses = await House.find().select('-__v').populate({path:"residents", select: "_id username firstName preferedName lastName phone email"}).lean().exec()
		res.status(200).send({data: houses, code: 200, message: "success"})
	} catch (error) {
		
	}
}