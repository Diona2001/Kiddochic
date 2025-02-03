const Supplier = require('../models/supplierModel');

// Register a new supplier
exports.registerSupplier = async (req, res) => {
  try {
    const {
      businessName,
      ownerName,
      email,
      mobile,
      aadharNumber,
      panNumber,
      gstNumber,
      bankName,
      accountNumber,
      ifscCode,
      address,
      
    } = req.body;

    // Check if supplier already exists with the same email or mobile
    const existingSupplier = await Supplier.findOne({
      $or: [
        { email: email },
        { mobile: mobile },
        { aadharNumber: aadharNumber },
        { panNumber: panNumber }
      ]
    });

    if (existingSupplier) {
      return res.status(400).json({
        success: false,
        message: 'Supplier already exists with these details'
      });
    }

    // Create new supplier
    const supplier = new Supplier({
      businessName,
      ownerName,
      email,
      mobile,
      aadharNumber,
      panNumber,
      gstNumber,
      bankName,
      accountNumber,
      ifscCode,
      address,
      
    });

    await supplier.save();

    res.status(201).json({
      success: true,
      message: 'Supplier registration successful',
      data: supplier
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error in supplier registration',
      error: error.message
    });
  }
};

// Get supplier details
exports.getSupplierDetails = async (req, res) => {
  try {
    const supplier = await Supplier.findById(req.params.id);
    
    if (!supplier) {
      return res.status(404).json({
        success: false,
        message: 'Supplier not found'
      });
    }

    res.status(200).json({
      success: true,
      data: supplier
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching supplier details',
      error: error.message
    });
  }
};

// Update supplier status
exports.updateSupplierStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    const supplier = await Supplier.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!supplier) {
      return res.status(404).json({
        success: false,
        message: 'Supplier not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Supplier status updated successfully',
      data: supplier
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating supplier status',
      error: error.message
    });
  }
};

// Get all suppliers
exports.getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    
    res.status(200).json({
      success: true,
      data: suppliers
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching suppliers',
      error: error.message
    });
  }
};

// Add this new function to check supplier by mobile number
exports.checkSupplier = async (req, res) => {
  try {
    const { phone } = req.params;
    
    // Check if supplier exists with the given mobile number
    const supplier = await Supplier.findOne({ mobile: phone });
    
    if (supplier) {
      return res.status(200).json({
        exists: true,
        businessName: supplier.businessName
      });
    } 

    return res.status(200).json({
      exists: false
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Error checking supplier status',
      error: error.message
    });
  }
}; 