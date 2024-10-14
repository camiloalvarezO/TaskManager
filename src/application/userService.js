const User = require('../domain/user');

class UserService {
    constructor(userRepository) {
      this.userRepository = userRepository;
    }
  
    async getAllUsers() {
      return this.userRepository.findAll();
    }
  
    async getUserById(id) {
      return this.userRepository.findById(id);
    }
  
    async createUser(userData) {
      const user = new User(null, userData.title, userData.description, 'pendiente');
      return this.userRepository.create(user);
    }
  
    async updateUser(id, userData) {
      const user = await this.userRepository.findById(id);
      if (!user) throw new Error('Tarea no encontrada');
  
      user.title = userData.title || user.title;
      user.description = userData.description || user.description;
      user.status = userData.status || user.status;
  
      await this.userRepository.update(user);
      return user;
    }
  
    async deleteUser(id) {
      await this.userRepository.delete(id);
    }
  }
  
  module.exports = UserService;