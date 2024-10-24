const mysql = require('mysql2/promise');
const User = require('../../domain/user');
const UserRepository = require('../../interfaces/userRepository');

class MySQLUserRepository extends UserRepository {
  constructor() {
    super();
    this.pool = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'task_management',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }

  async findAll() {
    const [rows] = await this.pool.query('SELECT * FROM users');
    return rows.map(row => new User(row.id, row.name, row.username, row.password, row.status));
  }

  async findById(id) {
    const [rows] = await this.pool.query('SELECT * FROM users WHERE id = ?', [id]);
    if (rows.length === 0) return null;
    const row = rows[0];
    return new User(row.id, row.name, row.username, row.password, row.status);
  }

  async findByUsername(username) {
    const [rows] = await this.pool.query('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length === 0) return null;
    const row = rows[0];
    return new User(row.id, row.name, row.username, row.password, row.status);
  }
  
  async create(user) {
    try {
      console.log('Creating user:', user);
      const [result] = await this.pool.query(
        'INSERT INTO users (name, username, password, status) VALUES (?, ?, ?, ?)',
        [user.name, user.username, user.password, user.status]
      );
      console.log('User created with ID:', result.insertId);
      return result.insertId;
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Error creating user');
    }
  }

  async update(user) {
    await this.pool.query(
      'UPDATE users SET name = ?, username = ?, password = ?, status = ? WHERE id = ?',
      [user.name, user.username, user.password, user.status, user.id]
    );
  }

  async delete(id) {
    await this.pool.query('DELETE FROM users WHERE id = ?', [id]);
  }
}

module.exports = MySQLUserRepository;
