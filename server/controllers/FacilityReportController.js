import FacilityReport from '../models/FacilityReport.js';
import House from '../models/House.js';
import User from '../models/User.js';

export const createNewReport = async (req, res) => {
    const { id } = req.user;
    const { houseId, title, description } = req.body;
    try {
        const house = await House.findById(houseId);
        const user = await User.findById(id);
        if (!house) {
            return res.status(404).json({ message: 'House not found', code: 404 });
        }
        if (!user) {
            return res.status(404).json({ message: 'User not found', code: 404 });
        }

        const newReport = new FacilityReport({ title, description, createdBy: user._id });
        await newReport.save();

        // Add the facility report to the house's facilityReports array
        house.facilityReports.push(newReport._id);
        await house.save();

        const newHouse = await House.findById(houseId)
            .populate({ path: 'residents', select: '_id username firstName preferedName lastName phone email' })
            .lean()
            .exec();

        res.status(201).json({
            message: 'Facility report added successfully',
            data: newHouse,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const getReportListByHouse = async (req, res) => {
    const { houseId } = req.params;
    const { page = 1, limit = 5 } = req.query;

    if (!houseId) {
        return res.status(400).json({ message: 'Missing houseId', code: 400 });
    }
	console.log(houseId);
	
    try {
        const house = await House.findById(houseId)
            .select('facilityReports')
            .populate({
                path: 'facilityReports',
                populate: {
                    path: 'createdBy',
                    select: '_id username firstName preferedName lastName email',
                },
            })
            .sort({ createdAt: -1 }) // Sort by creation date (newest first)
            .lean()
            .exec();

        if (!house) {
            return res.status(404).json({ message: 'House not found', code: 404 });
        }
        const paginatedReports = house.facilityReports
            .slice((page - 1) * limit, page * limit) // Paginate the reports
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by date (newest first)

        const totalReports = house.facilityReports.length;

        res.status(201).json({
            message: 'success',
            data: {
                facilityReports: paginatedReports,
                page: page,
                limit,
                totalPages: Math.ceil(totalReports / limit),
                totalReports,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const commentReport = async (req, res) => {
    const { id } = req.user;
    const { reportId, description } = req.body;
    try {
        const report = await FacilityReport.findById(reportId);
        const user = await User.findById(id);
        if (!report) {
            return res.status(404).json({ message: 'Report not found', code: 404 });
        }
        if (!user) {
            return res.status(404).json({ message: 'User not found', code: 404 });
        }

        const newComment = { description, createdBy: user._id };

        // Add the facility report to the house's facilityReports array
        report.comments.push(newComment);
        await report.save();

        const newReport = await FacilityReport.findById(reportId)
            .populate({ path: 'createdBy', select: '_id username firstName preferedName lastName email' })
            .populate({
                path: 'comments',
                populate: {
                    path: 'createdBy',
                    select: '_id username firstName preferedName lastName email',
                },
            })
            .lean()
            .exec();

        res.status(201).json({
            message: 'Comment successfully',
            data: newReport,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};
