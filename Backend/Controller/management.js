const { errorHandler } = require("../helpers/dbErrorCode");

const Managment = require("../Model/Managment");

exports.createManagment = async (req, res) => {
  try {
    const management = await Managment.create(req.body);
    res.status(200).json({
      success: true,
      data: management,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getMangement = (req, res) => {
  return res.json(req.management);
};

exports.getAllManagment = async (req, res) => {
  try {
    const management = await Managment.find();
    if (!management) {
      res.status(400).json({
        success: false,
        Message: "No management Found",
      });
    }
    res.status(200).json({
      data: management,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteManagement = async (req, res) => {
  try {
    const managment = await Managment.findById(req.params.id);
    if (!managment) {
      return res.status(400).json({
        Error: "Managment Not Found",
      });
    }
    managment.remove();
    res.status(200).json({
      Message: "Successfully Deleted",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.updateManagement = async (req, res) => {
  try {
    const managment = await Managment.findById(req.params.id);
    if (!managment) {
      return res.status(400).json({
        error: "Managment Not Found",
      });
    }

    const managment2 = await Managment.findOneAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({
      success: true,
      data: managment,
    });

    console.log(`Update Managment ${managment}`);
  } catch (err) {
    console.log(err);
  }
};
