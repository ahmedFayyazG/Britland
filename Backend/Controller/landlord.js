const { errorHandler } = require("../helpers/dbErrorCode");
const Landlord = require("../Model/Landlord");

exports.createLandlord = async (req, res) => {
  try {
    const landlord = await Landlord.create(req.body);
    res.status(200).json({
      success: true,
      data: landlord,
    });
  } catch (error) {
    return error;
  }
};

exports.getLandlord = (req, res) => {
  return res.json(req.landlord);
};

exports.getAllLandlord = async (req, res) => {
  try {
    const landlords = await Landlord.find();
    if (!landlords) {
      res.status(400).json({
        success: false,
        Message: "No Landlord Found",
      });
    }
    res.status(200).json({
      landlords,
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteLandlord = async (req, res) => {
  try {
    const landlord = await Landlord.findById(req.params.id);
    if (!landlord) {
      return res.status(400).json({
        Error: "Catagory Not Found",
      });
    }
    landlord.remove();
    res.status(200).json({
      Message: "Successfully Deleted",
    });
  } catch (err) {
    console.log(err);
  }
};

exports.updateLandlord = async (req, res) => {
  try {
    const landlord = await Landlord.findById(req.params.id);
    if (!landlord) {
      return res.status(400).json({
        error: "Landlord Not Found",
      });
    }

    const landlord2 = await Landlord.findOneAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      data: landlord2,
    });

    console.log(`Update Catagory ${catagory}`);
  } catch (err) {
    console.log(err);
  }
};
