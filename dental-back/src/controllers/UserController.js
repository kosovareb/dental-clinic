const UserService = require('../services/UserService');

class UserController {
  async getAllUsers(req, res) {
    try {
      const users = await UserService.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error('Error getting all users:', error.message);
      res.status(500).json({ error: 'Error getting all users' });
    }
  }

  async getUserById(req, res) {
    try {
      const id = req.params.id;
      const user = await UserService.getUserById(id);
      res.json(user);
    } catch (error) {
      console.error('Error getting user by ID:', error.message);
      res.status(500).json({ error: 'Error getting user by ID' });
    }
  }

  // async createUser(req, res) {
  //   try {
  //     const result = await UserService.createUser(req.body);
  //     res.json(result);
  //   } catch (error) {
  //     console.error('Error creating user:', error.message);
  //     res.status(500).json({ error: 'Error creating user' });
  //   }
  // }

  async updateUser(req, res) {
    try {
      const result = await UserService.updateUser(req.body);
      res.json(result);
    } catch (error) {
      console.error('Error updating user:', error.message);
      res.status(500).json({ error: 'Error updating user' });
    }
  }
  
  async deleteUser(req, res) {
    try {
      const id = req.params.id;
      const result = await UserService.deleteUser(id);
      res.json(result);
    } catch (error) {
      console.error('Error deleting user:', error.message);
      res.status(500).json({ error: 'Error deleting user' });
    }
  }

  async createUser(req, res) {
    try {
      const result = await UserService.createUser(req.body);
      res.json(result);
    } catch (error) {
      console.error('Error creating user:', error.message);
      res.status(500).json({ error: 'Error creating user' });
    }
  }

  async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const { token, userRole, userId, name, surname } = await UserService.login(email, password);
      res.json({ name, surname, email, token, userRole, userId });
    } catch (error) {
      console.error('Login failed:', error.message);
      res.status(401).json({ error: 'Login failed' });
    }
  }


  // async loginUser(req, res) {
  //   try {
  //     const { email, password } = req.body;
  //     const { token, userRole, userId, name, surname } = await UserService.login(email, password);
  //     res.json({ name, surname, email, token, userRole, userId }); 
  //   } catch (error) {
  //     console.error('Login failed:', error.message);
  //     res.status(401).json({ error: 'Login failed' });
  //   }
  // }
}

module.exports = new UserController();
