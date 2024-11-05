const express = require('express')

const router = express.Router()

const userSignUpController = require("../controller/userSignUp")
const userSignInController = require("../controller/userSignIn")
const authToken = require('../middleware/authToken')
const userLogout = require('../controller/userLogout')
const userController = require("../controller/userController"); // Import the new controller
const categoryRoutes = require('./categoryRoutes');
const productRoutes = require('./productRoutes');
const SearchProduct = require('../controller/searchProduct')
const { getProductDetails } = require('../controller/getProductDetails')
const filterProductController = require('../controller/filterProduct')
// const { addToCartController } = require('../controller/addToCartController')
const cartRoutes = require('./cartRoutes');

router.post("/signup",userSignUpController)
router.post("/signin",userSignInController)
router.get("/userLogout",userLogout)
router.get("/profile", authToken, userController.getUserProfile);
router.use('/categories', categoryRoutes); // Use category routes
router.use('/products', productRoutes); // Use product routes
router.get("/search",SearchProduct)
router.post("products/${productId}",getProductDetails)
router.post("/filter",filterProductController)
router.use('/cart', cartRoutes); 

// router.post("/addtocart",authToken,addToCartController)


module.exports = router 