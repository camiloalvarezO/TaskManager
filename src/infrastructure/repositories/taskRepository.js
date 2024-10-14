const mysql = require('mysql2/promise');
const Task = require('../../domain/task');
const TaskRepository = require('../../interfaces/taskRepository');

class MySQLTaskRepository extends TaskRepository {
  constructor() {
    super();
    this.pool = mysql.createPool({
      host: 'localhost',
      user: 'db_user',
      password: 'Eme2002hw',
      database: 'task_management',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }

  async findAll() {
    const [rows] = await this.pool.query('SELECT * FROM tasks');
    return rows.map(row => new Task(row.id, row.title, row.description, row.status));
  }

  async findById(id) {
    const [rows] = await this.pool.query('SELECT * FROM tasks WHERE id = ?', [id]);
    if (rows.length === 0) return null;
    const row = rows[0];
    return new Task(row.id, row.title, row.description, row.status);
  }

  async create(task) {
    const [result] = await this.pool.query(
      'INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)',
      [task.title, task.description, task.status]
    );
    return result.insertId;
  }

  async update(task) {
    await this.pool.query(
      'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?',
      [task.title, task.description, task.status, task.id]
    );
  }

  async delete(id) {
    await this.pool.query('DELETE FROM tasks WHERE id = ?', [id]);
  }
}

module.exports = MySQLTaskRepository;