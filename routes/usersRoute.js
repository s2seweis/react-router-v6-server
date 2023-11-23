const express = require("express")
const router = express.Router();
// const User = require("../models/userModel")

const {
    currentUser,
    login,
    register,
    getallusers,
    deleteuser,
    adduser,
    edituser,
    resetPasswordRequestController,
    resetPasswordController,
    googleLogin,
    facebookLogin
} = require("../controllers/userController");

const validateToken = require("../middleware/validateTokenHandler");

router.post("/login", login);
router.get("/current", validateToken, currentUser);
router.post("/register", register);
router.get("/getallusers", getallusers);
router.post("/deleteuser", deleteuser);
router.post("/adduser", adduser);
router.post("/edituser", edituser);
router.post("/requestResetPassword", resetPasswordRequestController);
router.post("/resetPassword", resetPasswordController);
router.post("/google-login", googleLogin);
router.post("/facebook-login", facebookLogin);

module.exports = router;

