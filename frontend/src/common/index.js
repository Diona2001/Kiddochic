
const backendDomain = "http://localhost:8080";

const SummaryApi = {
  signUp: {
    url: `${backendDomain}/api/signup`, // Use backticks for template literals
    method: "post"
  },
  signIn:{
    url: `${backendDomain}/api/signin`,
    method: "post"
  },
  logout_user : {
    url : `${backendDomain}/api/userLogout`,
     method : "get"
   },
   current_user :{
    url : `${backendDomain}/api/profile`, // Ensure this matches your backend
    method : "get"
  },
  addProduct: {
    url: `${backendDomain}/api/products`,
    method: "post",
  },
  getAllProducts: {
    url: `${backendDomain}/api/products`,
    method: "get",
  },
  getProductById: (id) => ({
    url: `${backendDomain}/api/products/${id}`,
    method: "get",
  }),
  updateProduct: (id) => ({
    url: `${backendDomain}/api/products/${id}`,
    method: "put",
  }),
  deleteProduct: (id) => ({
    url: `${backendDomain}/api/products/${id}`,
    method: "delete",
  }),
  getAllCategories: { // Added for fetching categories
    url: `${backendDomain}/api/categories`,
    method: "GET",
  },
  getProductsByCategory: (category, subcategory) => ({
    url: `${backendDomain}/api/products/category/${category}/${subcategory}`,
    method: "GET",
  }),
   // Toggle activation
  toggleProductActivation: (id, isActive) => ({
    url: `${backendDomain}/api/products/${id}/${isActive ? 'deactivate' : 'activate'}`,
    method: 'PUT',
  }),
  searchProduct : {
    url : `${backendDomain}/api/search`,
    method : 'get'
  },
  filterProduct :{
    url : `${backendDomain}/api/filter`,
    method : 'post'
  },
  productDetails: (productId) => ({
    url: `${backendDomain}/api/products/${productId}`, 
    method: 'post'
  }),
  addToCartProduct :() =>({
    url : `${backendDomain}/api/cart/addtocart`,
    method : 'post'
  }),
  getCart: {
    url: `${backendDomain}/api/cart`, // Ensure this matches your backend route
    method: 'GET'
  },
  removeFromCart: (productId) => ({
    url: `${backendDomain}/api/cart/remove/${productId}`, // Corrected path
    method: "DELETE",
  }),
};



export default SummaryApi;
