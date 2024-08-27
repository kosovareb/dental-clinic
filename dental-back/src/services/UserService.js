const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/UserModel');
// const { use } = require('../routes');


class UserService {
  async getAllUsers() {
    try {
      const users = await User.findAll();
      return users;
    } catch (error) {
      console.error('Error fetching all users:', error);
      throw new Error('Error fetching all users');
    }
  }

  async getUserById(id) {
    try {
      const user = await User.findByPk(id);
      return user;
    } catch (error) {
      console.error('Error fetching user by ID:', error);
      throw new Error('Error fetching user by ID');
    }
  }

  // async createUser(userData) {
  //   try {
  //     userData.password = await bcrypt.hash(userData.password, 10);
  //     const newUser = await User.create(userData);
  //     return newUser;
  //   } catch (error) {
  //     console.error('Error creating user:', error);
  //     throw new Error('Error creating user');
  //   }
  // }

  async updateUser(updateUserData) {
    try {
      const user = await User.findByPk(updateUserData.id);
      if (!user) {
        throw new Error('User not found');
      }
  
      await user.update(updateUserData);
  
      return user;
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error('Error updating user');
    }
  }
  
  async deleteUser(id) {
    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error('User not found');
      }

      await user.destroy();
      return 'User deleted successfully!';
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new Error('Error deleting user');
    }
  }

  // async login(email, password) {
  //   try {
  //     const user = await User.findOne({ where: { email } });
  //     if (!user) {
  //       throw new Error('User not found');
  //     }
  
  //     const isPasswordValid = await bcrypt.compare(password, user.password);
  //     if (!isPasswordValid) {
  //       throw new Error('Invalid password');
  //     }
  
  //     const tokenPayload = { userId: user.id, email: user.email, role: user.role };
  //     const token = jwt.sign(tokenPayload, process.env.APP_SECRET, { expiresIn: '1h' });
  
  //     return { token, userRole: user.role, userId: user.id, name: user.name, surname: user.surname };
  //   } catch (error) {
  //     console.error('Login failed:', error.message);
  //     throw new Error('Login failed');
  //   }
  // }

  async createUser(userData) {
    try {
      userData.password = await bcrypt.hash(userData.password, 10);
      const newUser = await User.create(userData);
      return newUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Error creating user');
    }
  }

// async createToken = (user) => {
//     const tokenPayload = { id: user.id, email: user.email };
//     const token = jwt.sign(tokenPayload, process.env.APP_SECRET, { expiresIn: '1h' });
//     return token;
// };


  async login(email, password) {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new Error('User not found');
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }
  
      const tokenPayload = { userId: user.id, email: user.email, role: user.role };
      const token = jwt.sign(tokenPayload, process.env.APP_SECRET, { expiresIn: '1h' });
  
      return { token, userRole: user.role, userId: user.id, name: user.name, surname: user.surname };
    } catch (error) {
      console.error('Login failed:', error.message);
      throw new Error('Login failed');
    }
  }
}


module.exports = new UserService();
