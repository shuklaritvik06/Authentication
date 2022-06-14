const express = require("express");
const bodyParser = require("body-parser");
const { checkAuth,checkUser } = require("../middleware/authMiddleware");
const authController = require("../controllers/authController");

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get("*",checkUser);
router.get("/",authController.get_Start);

router.get("/dashboard",checkAuth,authController.set_Dashboard);

router.get("/login",authController.set_Login);

router.get("/register",authController.set_Register);

router.post("/register",authController.post_Register);

router.post("/login",authController.post_Login);

router.get("/logout",authController.get_Logout);

module.exports = router;