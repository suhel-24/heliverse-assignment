 const User = require("../models/Usermodel")
 
  const getAllUsers = async (req, res) => {
    // search
    const { name, gender, domain, available } = req.query;
  
    const query = {};
  
    if (name) {
      query.first_name = { $regex: name, $options: "i" };
    }
  
    if (gender) {
      query.gender = gender[0].toUpperCase() + gender.slice(1);
    }
  
    if (domain) {
      query.domain = domain[0].toUpperCase() + domain.slice(1);
    }
  
    if (available) {
      query.available = available;
    }
  
    console.log(query);
  
    // Pagination
    const page = Number(req.query.page) || 1;
    const limit = 20;
    const skip = (page - 1) * limit;
  
    try {
      const allUsers = await User.find(query);
      const users = await User.find(query).skip(skip).limit(limit);
      return res.send({
        users,
        page,
        currLength: users.length,
        totalLength: allUsers.length,
      });
    } catch (err) {
      return res.status(500).json({ msg: err });
    }
  };
  
   const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
      const foundUser = await User.findOne({ id: id });
      if (!foundUser) {
        return res.status(404).json({ msg: `User ${id} not found` });
      }
      const user = await User.findOne({ id: id });
      res.send(user);
    } catch (err) {
      return res.status(500).json({ msg: err });
    }
  };

 const createUser = async (req, res) => {
    const userdata=req.body;
    try {
      const user = await User.create(req.body);
      res.send(user);
    } catch (err) {
      return res.status(500).json({ msg: err });
    }
  };
  
   const updateUser = async (req, res) => {
    const { id } = req.params;
  
    try {
      const foundUser = await User.findOne({ id: id });
      if (!foundUser) {
        return res.status(404).json({ msg: `User ${id} not found` });
      }
      const updatedUser = await User.findOneAndUpdate(
        {
          id: id,
        },
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );
      return res.send(updatedUser);
    } catch (err) {
      return res.status(500).json({ msg: err });
    }
  };
  
   const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
      const findUser = User.findOne({ id: id });
      if (!findUser) {
        return res.status(404).json({ msg: `User ${id} not found` });
      }
      await User.deleteOne({ id: id });
      return res.send({ msg: `User ${id} deleted` });
    } catch (err) {
      return res.status(500).json({ msg: err });
    }
  };

  module.exports = {deleteUser,updateUser,createUser,getAllUsers,getUserById}