import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import apiUrl from '../apiconfig';
import './CreateLearningModule.css';

const CreateLearningModule = () => {
  const [moduleData, setModuleData] = useState({
    title: '',
    category: '',
    difficulty: '',
    durationInHours: '',
    format: 'Video',
    estimatedCompletionTime: '',
    notes: ''
  });
  const [resourceInput, setResourceInput] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const editId = localStorage.getItem('editModuleId');

  useEffect(() => {
    if (editId) {
      fetchModuleData();
    }
  }, [editId]);

  const fetchModuleData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${apiUrl}/modules/getModuleById/${editId}`, {
        headers: { Authorization: token }
      });
      const module = response.data;
      setModuleData({
        title: module.title,
        category: module.category,
        difficulty: module.difficulty,
        durationInHours: module.durationInHours,
        format: module.format,
        estimatedCompletionTime: module.estimatedCompletionTime || '',
        notes: module.notes || ''
      });
      setResourceInput(module.resources.join(', '));
      setTagInput(module.tags.join(', '));
    } catch (error) {
      navigate('/error');
    }
  };

  const handleChange = (e) => {
    setModuleData({ ...moduleData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!moduleData.title) newErrors.title = 'Title is required';
    if (!moduleData.category) newErrors.category = 'Category is required';
    if (!moduleData.difficulty) newErrors.difficulty = 'Difficulty is required';
    if (!moduleData.durationInHours || moduleData.durationInHours < 1) {
      newErrors.durationInHours = 'Duration must be at least 1 hour';
    }
    
    const resources = resourceInput.split(',').map(r => r.trim()).filter(r => r);
    for (let resource of resources) {
      if (resource && !resource.startsWith('http')) {
        newErrors.resources = 'Resources must be valid URLs';
        break;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const resources = resourceInput.split(',').map(r => r.trim()).filter(r => r);
    const tags = tagInput.split(',').map(t => t.trim()).filter(t => t);

    const submitData = {
      ...moduleData,
      resources,
      tags,
      userId: localStorage.getItem('userId')
    };

    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: token };

      if (editId) {
        await axios.put(`${apiUrl}/modules/updateModule/${editId}`, submitData, { headers });
        localStorage.removeItem('editModuleId');
      } else {
        await axios.post(`${apiUrl}/modules/addModule`, submitData, { headers });
      }
      navigate('/manage-modules');
    } catch (error) {
      navigate('/error');
    }
  };

  return (
    <>
      <h1 className="page-label">Add Learning Module</h1>
      <button onClick={() => navigate('/manage-modules')} className="back-button">
        Back
      </button>
      <div className="create-module-container">
        <div className="create-module-card">
          <div className="create-module-header">
            <h2 className="create-module-title">{editId ? 'Update Learning Module' : 'Add Learning Module'}</h2>
          </div>

          <form onSubmit={handleSubmit} className="module-form">
            <div className="form-group">
              <label className="form-label">Title <span className="required">*</span></label>
              <input
                type="text"
                name="title"
                className={`form-input ${errors.title ? 'error' : ''}`}
                value={moduleData.title}
                onChange={handleChange}
                maxLength="150"
              />
              {errors.title && <span className="error-message">{errors.title}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Category <span className="required">*</span></label>
              <select name="category" className={`form-select ${errors.category ? 'error' : ''}`} value={moduleData.category} onChange={handleChange}>
                <option value="">Select Category</option>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="DevOps">DevOps</option>
                <option value="Database">Database</option>
                <option value="Soft Skills">Soft Skills</option>
                <option value="Other">Other</option>
              </select>
              {errors.category && <span className="error-message">{errors.category}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Difficulty <span className="required">*</span></label>
              <select name="difficulty" className={`form-select ${errors.difficulty ? 'error' : ''}`} value={moduleData.difficulty} onChange={handleChange}>
                <option value="">Select Difficulty</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
              {errors.difficulty && <span className="error-message">{errors.difficulty}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Duration (Hours) <span className="required">*</span></label>
              <input
                type="number"
                name="durationInHours"
                className={`form-input ${errors.durationInHours ? 'error' : ''}`}
                value={moduleData.durationInHours}
                onChange={handleChange}
                min="1"
              />
              {errors.durationInHours && <span className="error-message">{errors.durationInHours}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Format</label>
              <select name="format" className="form-select" value={moduleData.format} onChange={handleChange}>
                <option value="Video">Video</option>
                <option value="Article">Article</option>
                <option value="Project">Project</option>
                <option value="Interactive">Interactive</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Estimated Completion Time (Days)</label>
              <input
                type="number"
                name="estimatedCompletionTime"
                className="form-input"
                value={moduleData.estimatedCompletionTime}
                onChange={handleChange}
                min="1"
              />
            </div>

            <div className="form-group full-width">
              <label className="form-label">Resources (comma-separated URLs)</label>
              <textarea
                className={`form-textarea ${errors.resources ? 'error' : ''}`}
                value={resourceInput}
                onChange={(e) => setResourceInput(e.target.value)}
                placeholder="https://example.com, https://another-resource.com"
              />
              {errors.resources && <span className="error-message">{errors.resources}</span>}
              <div className="hint-text">Enter URLs separated by commas</div>
            </div>

            <div className="form-group full-width">
              <label className="form-label">Tags (comma-separated)</label>
              <input
                type="text"
                className="form-input"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="React, JavaScript, Frontend"
              />
              <div className="hint-text">Enter tags separated by commas</div>
            </div>

            <div className="form-group full-width">
              <label className="form-label">Notes</label>
              <textarea
                name="notes"
                className="form-textarea"
                value={moduleData.notes}
                onChange={handleChange}
                maxLength="1000"
                placeholder="Additional notes or instructions"
              />
            </div>

            <button type="submit" className="submit-button">
              {editId ? 'Update Module' : 'Add Module'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateLearningModule;