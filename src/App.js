// Import libs to use in project
import React, { useState, useEffect } from 'react';
import api from './services/api';

import './styles.css';

function App() {
  // Define my const to get repositories
  const [repositories, setRepositories] = useState([]);

  // Get my repositories and actualize to view
  useEffect(() => {
    // Route get repositories
    api.get('repositories').then((response) => {
      setRepositories(response.data);
    });
  }, []);

  // Add New Repository
  async function handleAddRepository() {
    // Init new repository
    const response = await api.post('repositories', {
      id: 'f4b64529-6345-4ca9-84b4-4be6a04a4de1',
      title: 'Meu site com ReactJs',
      url: 'https://github.com/HallefHLVieira/goStack_challenge02',
      techs: ['Node.js', '...'],
    });

    const repository = response.data;

    // actualize repositoryes imutable
    setRepositories([...repositories, repository]);
  }

  // Remove repository
  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    // Remove in repositories view
    const newRepositories = repositories.filter(
      (repository) => repository.id !== id
    );
    setRepositories(newRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
