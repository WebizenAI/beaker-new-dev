import React, { useState } from 'react';

const Work = () => {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');

  const handleCreateProject = () => {
    const newProject = {
      id: `project_${Date.now()}`,
      name: projectName,
      description: projectDescription,
      tasks: [],
    };
    setProjects([...projects, newProject]);
    setProjectName('');
    setProjectDescription('');
  };

  return (
    <div role="main" aria-labelledby="work-section" className="p-4 border rounded">
      <h1 id="work-section" className="text-2xl font-bold mb-4">Work Management</h1>

      {/* Project Creation Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Create Project</h2>
        <input
          type="text"
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <textarea
          placeholder="Project Description"
          value={projectDescription}
          onChange={(e) => setProjectDescription(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        ></textarea>
        <button
          onClick={handleCreateProject}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Create Project
        </button>
      </div>

      {/* Project List Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Projects</h2>
        {projects.length === 0 ? (
          <p>No projects created yet.</p>
        ) : (
          <ul>
            {projects.map((project) => (
              <li key={project.id} className="mb-2">
                <strong>{project.name}</strong>: {project.description}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Work;
