const MaternityKit = require('../models/maternityKitModel');
const fs = require('fs').promises;
const path = require('path');

// Add Maternity Kit
exports.addMaternityKit = async (req, res) => {
    try {
        const { name, description, originalPrice, discountPrice, discount, type } = req.body;

        // Validate required fields
        if (!name || !description || !originalPrice || !discountPrice || !discount || !type) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
                error: true
            });
        }

        // Check if files were uploaded
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Please upload at least one image',
                error: true
            });
        }

        // Create image paths array
        const images = req.files.map(file => file.filename);

        // Create new maternity kit
        const maternityKit = new MaternityKit({
            name,
            description,
            originalPrice,
            discountPrice,
            discount,
            type,
            images
        });

        await maternityKit.save();

        res.status(201).json({
            success: true,
            message: 'Maternity kit added successfully',
            error: false,
            data: maternityKit
        });

    } catch (error) {
        // Delete uploaded files if there's an error
        if (req.files) {
            for (const file of req.files) {
                await fs.unlink(path.join('uploads', file.filename)).catch(console.error);
            }
        }

        res.status(500).json({
            success: false,
            message: 'Error adding maternity kit',
            error: true,
            errorDetails: error.message
        });
    }
};

// Get All Maternity Kits
exports.getAllMaternityKits = async (req, res) => {
    try {
        const kits = await MaternityKit.find({ status: 'active' });
        
        res.status(200).json({
            success: true,
            count: kits.length,
            error: false,
            data: kits
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching maternity kits',
            error: true,
            errorDetails: error.message
        });
    }
};

// Get Single Maternity Kit
exports.getMaternityKitById = async (req, res) => {
    try {
        const kit = await MaternityKit.findById(req.params.id);

        if (!kit) {
            return res.status(404).json({
                success: false,
                message: 'Maternity kit not found',
                error: true
            });
        }

        res.status(200).json({
            success: true,
            error: false,
            data: kit
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching maternity kit',
            error: true,
            errorDetails: error.message
        });
    }
};

// Update Maternity Kit
exports.updateMaternityKit = async (req, res) => {
    try {
        const { name, description, originalPrice, discountPrice, discount, type, status } = req.body;
        const updateData = { name, description, originalPrice, discountPrice, discount, type, status };

        // If new files are uploaded, add them to update data
        if (req.files && req.files.length > 0) {
            updateData.images = req.files.map(file => file.filename);
        }

        const kit = await MaternityKit.findById(req.params.id);
        if (!kit) {
            return res.status(404).json({
                success: false,
                message: 'Maternity kit not found',
                error: true
            });
        }

        // Delete old images if new ones are uploaded
        if (req.files && req.files.length > 0) {
            for (const oldImage of kit.images) {
                await fs.unlink(path.join('uploads', oldImage)).catch(console.error);
            }
        }

        const updatedKit = await MaternityKit.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: 'Maternity kit updated successfully',
            error: false,
            data: updatedKit
        });

    } catch (error) {
        // Delete uploaded files if there's an error
        if (req.files) {
            for (const file of req.files) {
                await fs.unlink(path.join('uploads', file.filename)).catch(console.error);
            }
        }

        res.status(500).json({
            success: false,
            message: 'Error updating maternity kit',
            error: true,
            errorDetails: error.message
        });
    }
};

// Delete Maternity Kit
exports.deleteMaternityKit = async (req, res) => {
    try {
        const kit = await MaternityKit.findById(req.params.id);

        if (!kit) {
            return res.status(404).json({
                success: false,
                message: 'Maternity kit not found',
                error: true
            });
        }

        // Delete associated image files
        for (const image of kit.images) {
            await fs.unlink(path.join('uploads', image)).catch(console.error);
        }

        await kit.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Maternity kit deleted successfully',
            error: false
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting maternity kit',
            error: true,
            errorDetails: error.message
        });
    }
};

// module.exports = exports; 