import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import apiUrl from '../apiconfig';
import './ManageLearningModule.css';

const ManageLearningModule = () => {
  const [modules, setModules] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [moduleToDelete, setModuleToDelete] = useState(null);
  const [selectedModule, setSelectedModule] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchModules();
  }, [categoryFilter]);

  const fetchModules = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      const requestData = { userId };
      if (categoryFilter) {
        requestData.category = categoryFilter;
      }

      const response = await axios.post(`${apiUrl}/modules/getModulesByUserId`, requestData, {
        headers: { Authorization: token }
      });
      setModules(response.data);
    } catch (error) {
      if (error.response?.status === 404) {
        setModules([]);
      } else {
        navigate('/error');
      }
    }
  };

  const handleEdit = (moduleId) => {
    localStorage.setItem('editModuleId', moduleId);
    navigate('/createmodule');
  };

  const handleAddModule = () => {
    localStorage.removeItem('editModuleId');
    navigate('/createmodule');
  };

  const handleDelete = (module) => {
    setModuleToDelete(module);
    setShowDeletePopup(true);
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${apiUrl}/modules/deleteModule/${moduleToDelete._id}`, {
        headers: { Authorization: token }
      });
      setShowDeletePopup(false);
      setModuleToDelete(null);
      fetchModules();
    } catch (error) {
      navigate('/error');
    }
  };

  const handleShowMore = (module) => {
    setSelectedModule(module);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <>
      <h1 className="filter-label">Filter:</h1>
      <div className="manage-container">
        <div className="manage-card">
          <div className="manage-header">
            <h2 className="manage-title">Manage Learning Modules</h2>
            <div className="header-controls">
              <button onClick={handleAddModule} className="add-button">
                Add Module
              </button>
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>
          </div>

          <div className="filter-section">
            <select className="filter-select" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              <option value="">All Categories</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="DevOps">DevOps</option>
              <option value="Database">Database</option>
              <option value="Soft Skills">Soft Skills</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {modules.length === 0 ? (
            <div className="no-modules">No modules found</div>
          ) : (
            <table className="modules-table">
              <thead className="table-header">
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Difficulty</th>
                  <th>Duration</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {modules.map(module => (
                  <tr key={module._id} className="table-row">
                    <td>{module.title}</td>
                    <td>{module.category}</td>
                    <td>{module.difficulty}</td>
                    <td>{module.durationInHours} hrs</td>
                    <td>
                      <div className="action-buttons">
                        <button onClick={() => handleEdit(module._id)} className="edit-button">
                          Edit
                        </button>
                        <button onClick={() => handleDelete(module)} className="delete-button">
                          Delete
                        </button>
                        <button onClick={() => handleShowMore(module)} className="details-button">
                          Show More
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {showDeletePopup && (
        <div className="popup-overlay">
          <div className="delete-modal">
            <p className="delete-question">Are you sure you want to delete this module?</p>
            <div className="delete-buttons">
              <button onClick={confirmDelete} className="confirm-delete">Yes, Delete</button>
              <button onClick={() => setShowDeletePopup(false)} className="cancel-delete">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {selectedModule && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="popup-header">
              <h3 className="popup-title">{selectedModule.title}</h3>
              <button className="close-button" onClick={() => setSelectedModule(null)}>×</button>
            </div>
            <div className="detail-item">
              <div className="detail-label">Category:</div>
              <div className="detail-value">{selectedModule.category}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Difficulty:</div>
              <div className="detail-value">{selectedModule.difficulty}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Duration:</div>
              <div className="detail-value">{selectedModule.durationInHours} hours</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Format:</div>
              <div className="detail-value">{selectedModule.format}</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Est. Completion:</div>
              <div className="detail-value">{selectedModule.estimatedCompletionTime || 'N/A'} days</div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Resources:</div>
              <ul className="resource-list">
                {selectedModule.resources?.map((resource, index) => (
                  <li key={index} className="resource-item">
                    <a href={resource} className="resource-link" target="_blank" rel="noopener noreferrer">{resource}</a>
                  </li>
                )) || <div className="detail-value">None</div>}
              </ul>
            </div>
            <div className="detail-item">
              <div className="detail-label">Tags:</div>
              <div className="tag-list">
                {selectedModule.tags?.map((tag, index) => (
                  <span key={index} className="tag-item">{tag}</span>
                )) || <div className="detail-value">None</div>}
              </div>
            </div>
            <div className="detail-item">
              <div className="detail-label">Notes:</div>
              <div className="detail-value">{selectedModule.notes || 'None'}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageLearningModule;