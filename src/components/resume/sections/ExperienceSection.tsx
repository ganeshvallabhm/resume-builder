import React from 'react';
import { Briefcase, Plus, Trash2 } from 'lucide-react';
import { useResume, Experience } from '@/context/ResumeContext';

const ExperienceSection: React.FC = () => {
  const { state, dispatch } = useResume();

  const handleAdd = () => {
    dispatch({ type: 'ADD_EXPERIENCE' });
  };

  const handleRemove = (id: string) => {
    dispatch({ type: 'REMOVE_EXPERIENCE', payload: id });
  };

  const handleChange = (id: string, field: keyof Experience, value: string | string[]) => {
    dispatch({ type: 'UPDATE_EXPERIENCE', payload: { id, data: { [field]: value } } });
  };

  const handleBulletsChange = (id: string, value: string) => {
    const bullets = value.split('\n').filter((line) => line.trim() !== '');
    handleChange(id, 'bullets', bullets);
  };

  return (
    <section className="form-section">
      <div className="form-section-header">
        <div className="form-section-title">
          <Briefcase className="w-4 h-4" />
          <span>Work Experience</span>
        </div>
      </div>
      <div className="form-section-content">
        <div className="space-y-4">
          {state.experience.map((exp, index) => (
            <div key={exp.id} className="entry-card">
              <div className="entry-card-header">
                <span className="entry-number">#{index + 1}</span>
                <button onClick={() => handleRemove(exp.id)} className="btn-remove" title="Remove">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="form-group">
                  <label className="form-label">Company</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Google"
                    value={exp.company}
                    onChange={(e) => handleChange(exp.id, 'company', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Role</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Senior Software Engineer"
                    value={exp.role}
                    onChange={(e) => handleChange(exp.id, 'role', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Start Date</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Jan 2020"
                    value={exp.startDate}
                    onChange={(e) => handleChange(exp.id, 'startDate', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">End Date</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Present"
                    value={exp.endDate}
                    onChange={(e) => handleChange(exp.id, 'endDate', e.target.value)}
                  />
                </div>
                <div className="form-group col-span-2">
                  <label className="form-label">Company Description (Optional)</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Leading technology company specializing in..."
                    value={exp.description}
                    onChange={(e) => handleChange(exp.id, 'description', e.target.value)}
                  />
                </div>
                <div className="form-group col-span-2">
                  <label className="form-label">Key Achievements (one per line)</label>
                  <textarea
                    className="form-textarea"
                    placeholder="Led a team of 5 engineers to deliver a project 2 weeks ahead of schedule&#10;Improved application performance by 40% through code optimization&#10;Mentored 3 junior developers"
                    value={exp.bullets.join('\n')}
                    onChange={(e) => handleBulletsChange(exp.id, e.target.value)}
                    rows={4}
                  />
                </div>
              </div>
            </div>
          ))}
          <button onClick={handleAdd} className="btn-add">
            <Plus className="w-4 h-4" />
            <span>Add Experience</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
