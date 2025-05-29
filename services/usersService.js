const User = require("../models/userModel");

const usersService = {
  getAllUsers: async () => {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      throw error;
    }
  },

  createUser: async ({ name, email, password, creation_date }) => {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error("El usuario con este email ya existe");
    }
    const user = new User({
      name,
      email,
      password,
      creation_date: creation_date || new Date(),
      verified: false,
    });
    await user.save();
    const userObj = user.toObject();
    delete userObj.password;
    return userObj;
  },

  getUserById: async (id) => {
    try {
      const user = await User.findById(id);
      if (!user) {
        throw new Error("Usuario no encontrado");
      }
      return user;
    } catch (error) {
      throw error;
    }
  },

  updateUser: async (id, updateData) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(id, updateData, {
        new: true,
      });
      if (!updatedUser) {
        throw new Error("Usuario no encontrado");
      }
      return updatedUser;
    } catch (error) {
      throw error;
    }
  },

  deleteUser: async (id) => {
    try {
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) {
        throw new Error("Usuario no encontrado");
      }
      return deletedUser;
    } catch (error) {
      throw error;
    }
  },

  authenticateUser: async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Correo no registrado");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Contraseña incorrecta");
    }
    const { password: pwd, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;
  },
};

module.exports = usersService;
