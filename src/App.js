import React, { useState, useEffect} from 'react'
import axios from 'axios';
import './App.css';


function App() {

  const API_URL = 'http://localhost:5000/articles';
 


  const [data , setData] = useState([])
  const [newItem, setNewItem] = useState({title: "", description: "", body: "", published: false});
  const [editItem, setEditItem] = useState({id: "", title: "", description: "", body: "", published: false});

  useEffect(() => {
    axios.get(API_URL)
      .then(response => {
        setData(response.data)
      })
      .catch(error => {
        console.error("There was an error fetching the data", error)
      });
  }, [])

  const handleCreate = (e) => {
    e.preventDefault();
    axios.post(API_URL, newItem)
      .then(response => {
        setData([...data, response.data]);
        setNewItem({title: "", description: "", body: "", published: false})
      })
      .catch(error => {
        console.error("There was an error fetching the data", error)
      });
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    axios.patch(`${API_URL}/${editItem.id}`, editItem)
      .then(response => {
        const updateData = data.map(item => 
          item.id === editItem.id ? response.data : item
        )
        setData(updateData);
        setEditItem({id: "", title: "", description: "", body: "", published: false})
      })
      .catch(error => {
        console.error("There was an error fetching the data", error)
      });
  }

  const handleDelete = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then( () => {
        setData(data.filter(item => item.id !== id));
      })
      .catch(error => {
        console.error("There was an error fetching the data", error)
      });
  }


  return (
    <div className="App">
        <h1> Articles CURD Example</h1>
      <div>
        <h3>Create New Article</h3>
        <form onSubmit={handleCreate}>
          <input
            type="title"
            value={newItem.title}
            onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
            placeholder="Title"
            required
          />
          <input
            type="description"
            value={newItem.description}
            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
            placeholder="Description"
            required
          />
          <textarea
            value={newItem.body}
            onChange={(e) => setNewItem({ ...newItem, body: e.target.value })}
            placeholder="Body"
            required
          />
          <button type="submit">Create</button>
        </form>
      </div>

      {editItem.id && (
        <div>
          <h3>Update Article</h3>
        <form onSubmit={handleUpdate}>
          <input
            type="title"
            value={editItem.title}
            onChange={(e) => setEditItem({ ...editItem, title: e.target.value })}
            placeholder="Title"
            required
          />
          <input
            type="description"
            value={editItem.description}
            onChange={(e) => setEditItem({ ...editItem, description: e.target.value })}
            placeholder="Description"
            required
          />
          <textarea
            value={editItem.body}
            onChange={(e) => setEditItem({ ...editItem, body: e.target.value })}
            placeholder="Body"
            required
          />
          <button type="submit">Update</button>
        </form>
      </div>
      )}

      <h3>Posts</h3>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Body</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.body}</td>
              <td>{item.published ? "publisehd" : "draft"}</td>
              <td>
                <button onClick={() => setEditItem({ id: item.id, description: item.description, title: item.title, body: item.body })}>
                  Edit
                </button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      

    </div>
  );
}

export default App;
