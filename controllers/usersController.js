const bcrypt = require("bcrypt");
const usersService = require("../services/usersService");
const User = require("../models/userModel");

const usersController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await usersService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  createUser: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      if (!password) {
        return res
          .status(400)
          .json({ message: "La contraseña no puede estar vacía" });
      }
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ error: "El usuario con este email ya existe" });
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const user = new User({
        name,
        email,
        password: hashedPassword,
        creation_date: new Date(),
      });

      await user.save();

      const userObj = user.toObject();
      delete userObj.password;

      res.status(201).json(userObj);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getUser: async (req, res) => {
    try {
      const user = await usersService.getUserById(req.params.id);
      res.json(user);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const updatedUser = await usersService.updateUser(
        req.params.id,
        req.body
      );
      res.json(updatedUser);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      await usersService.deleteUser(req.params.id);
      res.json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },

  /*
  authenticateUser: async (req, res) => {
    try {
      const { email, password_hash } = req.body;
      const user = await usersService.authenticateUser(email, password_hash);
      res.json({ message: 'Autenticación exitosa', user });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  },
  */
};

module.exports = usersController;
