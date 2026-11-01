import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import apiUrl from '../apiconfig';
import './DisplayLearningModules.css';

const DisplayLearningModules = () => {
  const [modules, setModules] = useState([]);
  const [selectedModule, setSelectedModule] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [sortOrder, setSortOrder] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [sortOrder]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: token };

      const [usersResponse, modulesResponse] = await Promise.all([
        axios.get(`${apiUrl}/user/getAllUsers`, { headers }),
        axios.post(`${apiUrl}/modules/getAllModules`, { sortOrder }, { headers })
      ]);

      const users = usersResponse.data.users;
      const modulesWithUsers = modulesResponse.data.map(module => {
        const user = users.find(u => u._id === module.userId);
        return {
          ...module,
          userName: user ? `${user.firstName} ${user.lastName}` : 'Unknown',
          userEmail: user ? user.email : 'Unknown',
          userPhone: user ? user.mobileNumber : 'Unknown'
        };
      });

      setModules(modulesWithUsers);
    } catch (error) {
      navigate('/error');
    }
  };

  const handleViewInfo = (module) => {
    setSelectedModule(module);
    setShowPopup(true);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <>
      <h1 className="page-label">{sortOrder === 1 ? 'Landing screens for role Learner:' : 'Sort option:'}</h1>
      <div className="catalog-container">
        <div className="catalog-card">
          <div className="catalog-header">
            <h2 className="catalog-title">Learning Module Catalog</h2>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </div>

          <div className="sort-section">
            <select className="sort-select" value={sortOrder} onChange={(e) => setSortOrder(parseInt(e.target.value))}>
              <option value={1}>Sort by Est. Completion (ASC)</option>
              <option value={-1}>Sort by Est. Completion (DESC)</option>
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
                  <th>Est. Completion (days)</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {modules.map(module => (
                  <tr key={module._id} className="table-row">
                    <td>{module.title}</td>
                    <td>{module.category}</td>
                    <td>{module.difficulty}</td>
                    <td>{module.estimatedCompletionTime || 'N/A'}</td>
                    <td>
                      <button onClick={() => handleViewInfo(module)} className="view-info-button">
                        View Info
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {showPopup && selectedModule && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h3 className="popup-title">{selectedModule.title} Details</h3>
            <div className="detail-item">
              <span className="detail-label">Category:</span>
              <span className="detail-value">{selectedModule.category}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Difficulty:</span>
              <span className="detail-value">{selectedModule.difficulty}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Duration:</span>
              <span className="detail-value">{selectedModule.durationInHours} hrs</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Est. Completion:</span>
              <span className="detail-value">{selectedModule.estimatedCompletionTime || 'N/A'} days</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Format:</span>
              <span className="detail-value">{selectedModule.format}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Resources:</span>
              <div className="detail-value">
                {selectedModule.resources && selectedModule.resources.length > 0 ? (
                  <ul className="resource-list">
                    {selectedModule.resources.map((resource, index) => (
                      <li key={index} className="resource-item">
                        <a href={resource} className="resource-link" target="_blank" rel="noopener noreferrer">
                          {resource}
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  'None'
                )}
              </div>
            </div>
            <div className="detail-item">
              <span className="detail-label">Tags:</span>
              <div className="detail-value">
                {selectedModule.tags && selectedModule.tags.length > 0 ? (
                  <div className="tag-list">
                    {selectedModule.tags.map((tag, index) => (
                      <span key={index} className="tag-item">{tag}</span>
                    ))}
                  </div>
                ) : (
                  'None'
                )}
              </div>
            </div>
            <div className="detail-item">
              <span className="detail-label">Notes:</span>
              <span className="detail-value">{selectedModule.notes || 'demo'}</span>
            </div>
            <button onClick={() => setShowPopup(false)} className="close-button">Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default DisplayLearningModules;