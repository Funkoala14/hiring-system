
import Document from "../models/Document.js"
import VisaStatus from "../models/VisaStatus.js";
import Employee from '../models/Employee.js';

export const submitDocument = async (req, res) => {
    try {

        // const employeeId = req.body.user._id 
        const employeeId = req.body.id
        const { fileType, file } = req.body
        // const file = req.files?.file

        // if (!file) {
        //     return res.status(400).json({ message: "File not uploaded" })
        // }

        const newDoc = new Document({
            type: fileType,
            file
        })

        await newDoc.save()


        const employee = await Employee.findById(employeeId).populate('visaStatus')

        employee.visaStatus.documents.push(newDoc._id)
        await employee.visaStatus.save();

        return res.status(201).send('File submitted successfully!');
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
};

export const getVisaStatusByEmployeeId = async (req, res) => {
    try {
        const employeeId = req.body.user._id
        const visaStatus = VisaStatus.findOne({ employeeId })

        res.status(200).send(visaStatus)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}