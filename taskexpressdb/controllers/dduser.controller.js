let ddUser = require("../models/dduser.model");

let createUser = async (req, res, next) => {
  try {
    let {
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_Gender,
      f_Course,
      f_image,
    } = req.body;
    // console.log(req.body)
    console.log(req.file);
    console.log(req.body);
    let isAvailableUser = await ddUser.findOne({ f_Email });
    if (isAvailableUser) {
      return res
        .status(500)
        .json({ error: true, message: "user Already exist" });
    }

    let port = "http://localhost:7000";
    // let path=req.file.path.replace("public","");
    let pathimg = req.file.path.split("public")[1];

    let imagePath = port + pathimg;

    let user = await ddUser.create({
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_Gender,
      f_Course,
      f_image: imagePath,
    });
    res
      .status(201)
      .json({ error: false, message: "user created successfully", data: user });
  } catch (err) {
    next(err);
  }
};

let getAllUser = async (req, res, next) => {
  try {
    let user = await ddUser.find();
    if (!user) {
      return res.status(500).json({ error: true, message: " no data found" });
    }

    res
      .status(200)
      .json({ error: false, message: "data fetched successfully", user });
  } catch (err) {
    next(err);
  }
};

let updateUser = async (req, res, next) => {
  try {
    let { id } = req.params;
    let {
      f_Name,
      f_Email,
      f_Mobile,
      f_Designation,
      f_Gender,
      f_Course,
      f_image,
    } = req.body;

    console.log(req.file);

    console.log(req.body);

    let existOrNot = await ddUser.findById(id);
    if (!existOrNot) {
      return res
        .status(500)
        .json({ error: true, message: " no data found with given id" });
    }

    if (!req.file) {
      let user = await ddUser.findOneAndUpdate(
        { _id: id },
        { f_Name, f_Email, f_Mobile, f_Designation, f_Gender, f_Course },
        { new: true }
      );
      res
        .status(200)
        .json({ error: false, message: "data fetched successfully", user });
    }
    console.log(req.file.path);
    let port = "http://localhost:7000";
    // let path=req.file.path.replace("public","");
    let pathimg = req.file.path.split("public")[1];

    let imagePath = port + pathimg;
    if (req.file) {
      let user = await ddUser.findOneAndUpdate(
        { _id: id },
        {
          f_Name,
          f_Email,
          f_Mobile,
          f_Designation,
          f_Gender,
          f_Course,
          f_image: imagePath,
        },
        { new: true }
      );
      res
        .status(200)
        .json({ error: false, message: "data fetched successfully", user });
    }
  } catch (err) {
    next(err);
  }
};

let deleteUser = async (req, res, next) => {
  try {
    let { id } = req.params;

    let user = await ddUser.findOneAndDelete({ _id: id });
    if (!user) {
      return res
        .status(500)
        .json({ error: true, message: " no data found with given id" });
    }

    res
      .status(200)
      .json({ error: false, message: "user data deleted successfully", user });
  } catch (error) {
    next(err);
  }
};

let getSingleuser = async (req, res, next) => {
  try {
    let { id } = req.params;
    let user = await ddUser.findById(id);
    if (!user) {
      return res
        .status(500)
        .json({ error: true, message: " no data found with given id" });
    }

    res
      .status(200)
      .json({ error: false, message: "user data deleted successfully", user });
  } catch (err) {
    next(err);
  }
};
module.exports = {
  createUser,
  getAllUser,
  updateUser,
  deleteUser,
  getSingleuser,
};
