let tasks = [];
let nextId = 1;


exports.createTask = (req, res) => {
  const { title, description, status } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });

  const task = {
    id: nextId++,
    title,
    description: description || '',
    status: status || 'To Do'
  };
  tasks.push(task);
  res.status(201).json({ message: 'Task created', task });
};


exports.getTasks = (req, res) => {
  res.json(tasks);
};


exports.getTaskById = (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
};


exports.updateTask = (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find(t => t.id === id);
  if (!task) return res.status(404).json({ error: 'Task not found' });

  const { title, description, status } = req.body;
  if (title) task.title = title;
  if (description !== undefined) task.description = description;
  if (status) task.status = status;

  res.json({ message: 'Task updated', task });
};


exports.deleteTask = (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ error: 'Task not found' });

  tasks.splice(index, 1);
  res.json({ message: 'Task deleted' });
};


exports.filterTasks = (req, res) => {
  const { status, keyword } = req.query;
  let filtered = tasks;

  if (status) filtered = filtered.filter(t => t.status.toLowerCase() === status.toLowerCase());
  if (keyword) filtered = filtered.filter(t => t.title.includes(keyword) || t.description.includes(keyword));

  res.json(filtered);
};
