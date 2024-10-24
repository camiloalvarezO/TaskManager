const User = require('../domain/user'); // Agrega esta línea para importar la clase User

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

  async getUserByUsername(username) {
    console.log('Fetching user by username:', username);
    return this.userRepository.findByUsername(username);
  }

  async createUser(userData) {
    console.log('Creating user with data:', userData);
    const user = new User(null, userData.name, userData.username, userData.password, 'activo');
    try {
      const userId = await this.userRepository.create(user);
      console.log('User created with ID:', userId);
      return userId;
    } catch (error) {
      console.error('Error in createUser:', error);
      throw error;
    }
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