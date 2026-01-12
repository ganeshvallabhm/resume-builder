import React from 'react';
import { FolderOpen, Plus, Trash2 } from 'lucide-react';
import { useResume, Project } from '@/context/ResumeContext';

const ProjectsSection: React.FC = () => {
  const { state, dispatch } = useResume();

  const handleAdd = () => {
    dispatch({ type: 'ADD_PROJECT' });
  };

  const handleRemove = (id: string) => {
    dispatch({ type: 'REMOVE_PROJECT', payload: id });
  };

  const handleChange = (id: string, field: keyof Project, value: string | string[]) => {
    dispatch({ type: 'UPDATE_PROJECT', payload: { id, data: { [field]: value } } });
  };

  const handleBulletsChange = (id: string, value: string) => {
    const bullets = value.split('\n').filter((line) => line.trim() !== '');
    handleChange(id, 'bullets', bullets);
  };

  return (
    <section className="form-section">
      <div className="form-section-header">
        <div className="form-section-title">
          <FolderOpen className="w-4 h-4" />
          <span>Projects</span>
        </div>
      </div>
      <div className="form-section-content">
        <div className="space-y-4">
          {state.projects.map((proj, index) => (
            <div key={proj.id} className="entry-card">
              <div className="entry-card-header">
                <span className="entry-number">#{index + 1}</span>
                <button onClick={() => handleRemove(proj.id)} className="btn-remove" title="Remove">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="form-group col-span-2">
                  <label className="form-label">Project Name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="E-Commerce Platform"
                    value={proj.name}
                    onChange={(e) => handleChange(proj.id, 'name', e.target.value)}
                  />
                </div>
                <div className="form-group col-span-2">
                  <label className="form-label">GitHub URL (Optional)</label>
                  <input
                    type="url"
                    className="form-input"
                    placeholder="https://github.com/username/project"
                    value={proj.githubUrl}
                    onChange={(e) => handleChange(proj.id, 'githubUrl', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Start Date</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Mar 2023"
                    value={proj.startDate}
                    onChange={(e) => handleChange(proj.id, 'startDate', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">End Date</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Jun 2023"
                    value={proj.endDate}
                    onChange={(e) => handleChange(proj.id, 'endDate', e.target.value)}
                  />
                </div>
                <div className="form-group col-span-2">
                  <label className="form-label">Description</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="A full-stack application built with React and Node.js"
                    value={proj.description}
                    onChange={(e) => handleChange(proj.id, 'description', e.target.value)}
                  />
                </div>
                <div className="form-group col-span-2">
                  <label className="form-label">Key Features (one per line)</label>
                  <textarea
                    className="form-textarea"
                    placeholder="Implemented user authentication with JWT&#10;Built RESTful API with 15+ endpoints&#10;Achieved 95% test coverage"
                    value={proj.bullets.join('\n')}
                    onChange={(e) => handleBulletsChange(proj.id, e.target.value)}
                    rows={4}
                  />
                </div>
              </div>
            </div>
          ))}
          <button onClick={handleAdd} className="btn-add">
            <Plus className="w-4 h-4" />
            <span>Add Project</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
