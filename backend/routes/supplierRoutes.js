const express = require('express');
const router = express.Router();
const supplierController = require('../controller/supplierController');
const authToken = require('../middleware/authToken');

// Register new supplier
router.post('/register', supplierController.registerSupplier);

// Get supplier details (protected route)
router.get('/:id', supplierController.getSupplierDetails);

// Update supplier status (protected route, admin only)
router.put('/:id/status', supplierController.updateSupplierStatus);

// Get all suppliers (protected route, admin only)
router.get('/', authToken, supplierController.getAllSuppliers);

// Check supplier status
router.get('/check/:phone', supplierController.checkSupplier);

module.exports = router; 