const express = require("express")
const router = express.Router();
const Setting = require("../models/settingModel")

router.get("/getallsettings", async (req, res) => {
    try {
      const settings = await Setting.find();
      res.send(settings);
    } catch (error) {
      return res.status(400).json(error);
    }
  });
  
  router.post("/editsetting", async (req, res) => {
    try {
      const setting = await Setting.findOne({ _id: req.body._id });
      setting.username = req.body.username;
      setting.password = req.body.password;
      setting.role = req.body.role;
      setting.fuelType = req.body.fuelType;
      setting.rentPerHour = req.body.rentPerHour;
      setting.capacity = req.body.capacity;
  
      await setting.save();
  
      res.send("Setting details updated successfully");
    } catch (error) {
      return res.status(400).json(error);
    }
  });

module.exports = router

