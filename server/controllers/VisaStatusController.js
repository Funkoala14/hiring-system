
import Document from "../models/Document.js"
import Employee from '../models/Employee.js';
import User from "../models/User.js";
import VisaStatus from "../models/VisaStatus.js";


export const submitDocument = async (req, res) => {
    try {

        const employeeId = req.user.id
        const type = req.body.type

        if (!req.file) {
            return res.status(400).json({ message: "File not uploaded" })
        }
        const { orginalName, buffer } = req.file;

        const newDoc = new Document({
            type,
            file: buffer,
            filename: orginalName
        })

        await newDoc.save()

        const employee = await User.findById(employeeId).lean().exec();

        const updatedStatus = await VisaStatus.findByIdAndUpdate(
            employee.visaStatus,
            { $push: { documents: newDoc._id } },
            { new: true, useFindAndModify: false }
        );

        console.log(updatedStatus);


        return res.status(201).json({ message: 'File submitted successfully!', data: updatedStatus });
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }
};

export const getVisaStatusByEmployeeId = async (req, res) => {
    try {
        const employeeId = req.user.id
        const employee = await User.findById(employeeId)
            .populate({
                path: 'visaStatus',
                populate: { path: 'documents' },
            })
            .lean().exec();

        res.status(200).json({ data: employee.visaStatus?.documents, message: "success" })

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }
}

export const getAllPendingStatuses = async (_req, res) => {
    try {
        let allUsers = await User.find({ visaStatus: { $exists: true, $ne: null } }).populate({
            path: 'visaStatus',
            populate: { path: 'documents' },
        }).lean().exec()

        const pendingStatuses = allUsers.reduce((acc, employee) => {
            const nextStep = getNextStep(employee.visaStatus.documents);


            if (nextStep.documentType === 'I-20' && nextStep.status === 'approved') {
                return acc;
            }

            employee.nextStep = nextStep;
            acc.push(employee);
            return acc;
        }, []);

        res.status(200).json({ data: pendingStatuses, message: "Fetch all pending visa statuses successfully." })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }
}

const getNextStep = (documents) => {

    const sequence = ['I-20', 'I-983', 'OPT EAD', 'OPT Receipt'];

    for (const type of sequence) {
        const document = documents.find(doc => doc.type === type);
        if (document) {
            return { documentType: document.type, status: document.status };
        }
    }
    return { documentType: "OPT Receipt", status: "not-submitted" }

};


export const getAllApprovedStatuses = async (_req, res) => {
    try {
        let allUsers = await User.find({ visaStatus: { $exists: true, $ne: null } }).populate({
            path: 'visaStatus',
            populate: { path: 'documents' },
        }).lean().exec()

        const approvedStatuses = allUsers.reduce((acc, employee) => {
            const nextStep = getNextStep(employee.visaStatus.documents);


            if (nextStep.documentType === 'I-20' && nextStep.status === 'approved') {
                acc.push(employee);
                return acc;
            }

        }, []);

        res.status(200).json({ data: approvedStatuses, message: "Fetch all approved visa statuses successfully." })
    }
    catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }
}