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

      if (!name || !email || !password) {
        return res
          .status(400)
          .json({ message: "Todos los campos son obligatorios" });
      }
      if (!email.includes("@") || !email.includes(".")) {
        return res.status(400).json({ message: "El email no es válido" });
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const user = await usersService.createUser({
        name,
        email,
        password: hashedPassword,
        creation_date: new Date(),
      });

      res.status(201).json(user);
    } catch (error) {
      if (error.message === "El usuario con este email ya existe") {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ message: error.message });
      }
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

  authenticateUser: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res
          .status(400)
          .json({ error: "Email y contraseña son obligatorios" });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: "Correo no registrado" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Contraseña incorrecta" });
      }

      const userObj = user.toObject();
      delete userObj.password;

      res.status(200).json(userObj); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error del servidor" });
    }
  },
};

module.exports = usersController;
