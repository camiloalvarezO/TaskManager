class Task {
  constructor(id, title, description, status, userId) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.userId = userId; // Agregar el campo userId
  }
}

module.exports = Task;