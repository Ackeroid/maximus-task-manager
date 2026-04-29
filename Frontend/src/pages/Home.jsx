function Home({ tasks }) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.filter(task => !task.completed).length;

  return (
    <div className="page">
      <h1>Welcome to Maximus Task Manager</h1>

      <p>
        Manage your tasks and stay creative with a secure modern management system.
      </p>

      <div className="summary-box">
        <div>
          <h2>{totalTasks}</h2>
          <p>Total Tasks</p>
        </div>

        <div>
          <h2>{completedTasks}</h2>
          <p>Completed</p>
        </div>

        <div>
          <h2>{pendingTasks}</h2>
          <p>Pending</p>
        </div>
      </div>
    </div>
  );
}

export default Home;