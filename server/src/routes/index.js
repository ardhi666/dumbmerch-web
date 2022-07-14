const express = require('express')
const router = express.Router()

// MIDDLEWARES

const {uploadFile} = require("../middlewares/uploadFile")
const { auth } = require('../middlewares/auth')

// CONTROLLERS

const { getUsers, getUser } = require('../controllers/user')
const { register, login, checkAuth } = require('../controllers/auth')
const { getProducts, addProduct, updateProduct, getProduct, deleteProduct } = require('../controllers/product')
const { addCategory, getCategorys, getCategory, updateCategory, deleteCategory } = require('../controllers/category')
const {addTransaction, getTransactions} = require('../controllers/transaction')

// ROUTE

router.get('/users', getUsers)
router.get('/user/:id', getUser)

router.post('/register', register)
router.post('/login', login)
router.get("/check-auth", auth, checkAuth);

router.get('/products', getProducts)
router.post('/product', auth, uploadFile("image"), addProduct)
router.patch('/product/:id', auth, updateProduct)
router.get('/product/:id', auth, getProduct)
router.delete('/product/:id', auth, deleteProduct)

router.post("/category", auth, addCategory)
router.get("/categorys", auth, getCategorys)
router.get("/category/:id", auth, getCategory)
router.patch("/category/:id", auth, updateCategory)
router.delete("/category/:id", auth, deleteCategory)

router.post("/transaction", auth, addTransaction)
router.get("/transactions", auth, getTransactions)

module.exports = router