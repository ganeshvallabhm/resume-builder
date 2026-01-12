import React from 'react';
import { Award, Plus, X } from 'lucide-react';
import { useResume } from '@/context/ResumeContext';

const CertificationsSection: React.FC = () => {
  const { state, dispatch } = useResume();

  const handleAdd = () => {
    dispatch({ type: 'ADD_CERTIFICATION' });
  };

  const handleRemove = (index: number) => {
    dispatch({ type: 'REMOVE_CERTIFICATION', payload: index });
  };

  const handleChange = (index: number, value: string) => {
    dispatch({ type: 'UPDATE_CERTIFICATION', payload: { index, value } });
  };

  return (
    <section className="form-section">
      <div className="form-section-header">
        <div className="form-section-title">
          <Award className="w-4 h-4" />
          <span>Certifications</span>
        </div>
      </div>
      <div className="form-section-content">
        <div className="space-y-2">
          {state.certifications.map((cert, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                className="form-input flex-1"
                placeholder="AWS Certified Solutions Architect"
                value={cert}
                onChange={(e) => handleChange(index, e.target.value)}
              />
              <button onClick={() => handleRemove(index)} className="btn-remove" title="Remove">
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button onClick={handleAdd} className="btn-add">
            <Plus className="w-4 h-4" />
            <span>Add Certification</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
