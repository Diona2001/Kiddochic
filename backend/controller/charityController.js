const Charity = require('../models/charityModel');

// Add a new charity donation
exports.addCharity = async (req, res) => {
    try {
        const { name, description, quality, ageGroup, gender, imageUrl } = req.body;

        // Validate required fields
        if (!name || !description || !quality || !ageGroup || !gender || !imageUrl) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
                error: true
            });
        }

        // Validate gender value
        if (!['boy', 'girl', 'unisex'].includes(gender)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid gender value',
                error: true
            });
        }

        // Create new charity donation
        const charity = new Charity({
            name,
            description,
            quality,
            ageGroup,
            gender,
            imageUrl
        });

        await charity.save();

        res.status(201).json({
            success: true,
            message: 'Charity donation added successfully',
            error: false,
            data: charity
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error adding charity donation',
            error: true,
            errorDetails: error.message
        });
    }
};

// Get all charity donations
exports.getAllCharities = async (req, res) => {
    try {
        const charities = await Charity.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: charities.length,
            error: false,
            data: charities
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching charity donations',
            error: true,
            errorDetails: error.message
        });
    }
};

// Get single charity donation by ID
exports.getCharityById = async (req, res) => {
    try {
        const charity = await Charity.findById(req.params.id);

        if (!charity) {
            return res.status(404).json({
                success: false,
                message: 'Charity donation not found',
                error: true
            });
        }

        res.status(200).json({
            success: true,
            error: false,
            data: charity
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching charity donation',
            error: true,
            errorDetails: error.message
        });
    }
};

// Update charity donation
exports.updateCharity = async (req, res) => {
    try {
        const { name, description, quality, ageGroup, gender, imageUrl, status } = req.body;
        
        // Validate gender if provided
        if (gender && !['boy', 'girl', 'unisex'].includes(gender)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid gender value',
                error: true
            });
        }

        const updatedCharity = await Charity.findByIdAndUpdate(
            req.params.id,
            { name, description, quality, ageGroup, gender, imageUrl, status },
            { new: true, runValidators: true }
        );

        if (!updatedCharity) {
            return res.status(404).json({
                success: false,
                message: 'Charity donation not found',
                error: true
            });
        }

        res.status(200).json({
            success: true,
            message: 'Charity donation updated successfully',
            error: false,
            data: updatedCharity
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating charity donation',
            error: true,
            errorDetails: error.message
        });
    }
};

// Delete charity donation
exports.deleteCharity = async (req, res) => {
    try {
        const charity = await Charity.findByIdAndDelete(req.params.id);

        if (!charity) {
            return res.status(404).json({
                success: false,
                message: 'Charity donation not found',
                error: true
            });
        }

        res.status(200).json({
            success: true,
            message: 'Charity donation deleted successfully',
            error: false
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting charity donation',
            error: true,
            errorDetails: error.message
        });
    }
};

// Update charity status
exports.updateCharityStatus = async (req, res) => {
    try {
        const { status } = req.body;

        if (!['available', 'reserved', 'donated'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status value',
                error: true
            });
        }

        const charity = await Charity.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true, runValidators: true }
        );

        if (!charity) {
            return res.status(404).json({
                success: false,
                message: 'Charity donation not found',
                error: true
            });
        }

        res.status(200).json({
            success: true,
            message: 'Charity status updated successfully',
            error: false,
            data: charity
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating charity status',
            error: true,
            errorDetails: error.message
        });
    }
};

// Search charities
exports.searchCharities = async (req, res) => {
    try {
        const { quality, ageGroup, gender, status } = req.query;
        const searchQuery = {};

        if (quality) searchQuery.quality = quality;
        if (ageGroup) searchQuery.ageGroup = ageGroup;
        if (gender) searchQuery.gender = gender;
        if (status) searchQuery.status = status;

        const charities = await Charity.find(searchQuery).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: charities.length,
            error: false,
            data: charities
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error searching charity donations',
            error: true,
            errorDetails: error.message
        });
    }
}; 