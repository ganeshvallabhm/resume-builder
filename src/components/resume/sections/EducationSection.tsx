import React from 'react';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';
import { useResume, Education } from '@/context/ResumeContext';

const EducationSection: React.FC = () => {
  const { state, dispatch } = useResume();

  const handleAdd = () => {
    dispatch({ type: 'ADD_EDUCATION' });
  };

  const handleRemove = (id: string) => {
    dispatch({ type: 'REMOVE_EDUCATION', payload: id });
  };

  const handleChange = (id: string, field: keyof Education, value: string) => {
    dispatch({ type: 'UPDATE_EDUCATION', payload: { id, data: { [field]: value } } });
  };

  return (
    <section className="form-section">
      <div className="form-section-header">
        <div className="form-section-title">
          <GraduationCap className="w-4 h-4" />
          <span>Education</span>
        </div>
      </div>
      <div className="form-section-content">
        <div className="space-y-4">
          {state.education.map((edu, index) => (
            <div key={edu.id} className="entry-card">
              <div className="entry-card-header">
                <span className="entry-number">#{index + 1}</span>
                <button onClick={() => handleRemove(edu.id)} className="btn-remove" title="Remove">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="form-group col-span-2">
                  <label className="form-label">Degree / Certificate</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Bachelor of Science in Computer Science"
                    value={edu.degree}
                    onChange={(e) => handleChange(edu.id, 'degree', e.target.value)}
                  />
                </div>
                <div className="form-group col-span-2">
                  <label className="form-label">Institution</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="MVJ COLLEGE OF ENGINEERING AND TECHNOLOGY"
                    value={edu.institution}
                    onChange={(e) => handleChange(edu.id, 'institution', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Start Date</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Sep 2018"
                    value={edu.startDate}
                    onChange={(e) => handleChange(edu.id, 'startDate', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">End Date</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="May 2022"
                    value={edu.endDate}
                    onChange={(e) => handleChange(edu.id, 'endDate', e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
          <button onClick={handleAdd} className="btn-add">
            <Plus className="w-4 h-4" />
            <span>Add Education</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
