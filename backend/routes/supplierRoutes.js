const express = require('express');
const router = express.Router();
const supplierController = require('../controller/supplierController');
const authToken = require('../middleware/authToken');

// Register new supplier
router.post('/register', supplierController.registerSupplier);

// Get supplier details (protected route)
router.get('/:id', authToken, supplierController.getSupplierDetails);

// Update supplier status (protected route, admin only)
router.put('/:id/status', authToken, supplierController.updateSupplierStatus);

// Get all suppliers (protected route, admin only)
router.get('/', authToken, supplierController.getAllSuppliers);

module.exports = router; 