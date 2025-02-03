const express = require('express');
const router = express.Router();
const {
    addCharity,
    getAllCharities,
    getCharityById,
    updateCharity,
    deleteCharity,
    updateCharityStatus,
    searchCharities
} = require('../controller/charityController');

// Public routes
router.get('/search', searchCharities);
router.get('/', getAllCharities);
router.get('/:id', getCharityById);

// Create, Update, Delete routes
router.post('/', addCharity);
router.put('/:id', updateCharity);
router.patch('/:id/status', updateCharityStatus);
router.delete('/:id', deleteCharity);

module.exports = router; 