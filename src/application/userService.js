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
      const user = new User(null, userData.name, userData.username, userData.password, 'activo');
      return this.userRepository.create(user);
    }
  
    async updateUser(id, userData) {
      const user = await this.userRepository.findById(id);
      if (!user) throw new Error('Usuario no encontrado');
  
      user.name = userData.name || user.name;
      user.username = userData.username || user.username;
      user.password = userData.password || user.password;
      user.status = userData.status || user.status;
  
      await this.userRepository.update(user);
      return user;
    }
  
    async deleteUser(id) {
      await this.userRepository.delete(id);
    }
  }
  
  module.exports = UserService;