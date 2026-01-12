import React from 'react';
import { Globe, Plus, X } from 'lucide-react';
import { useResume } from '@/context/ResumeContext';

const LanguagesSection: React.FC = () => {
  const { state, dispatch } = useResume();

  const handleAdd = () => {
    dispatch({ type: 'ADD_LANGUAGE' });
  };

  const handleRemove = (index: number) => {
    dispatch({ type: 'REMOVE_LANGUAGE', payload: index });
  };

  const handleChange = (index: number, value: string) => {
    dispatch({ type: 'UPDATE_LANGUAGE', payload: { index, value } });
  };

  return (
    <section className="form-section">
      <div className="form-section-header">
        <div className="form-section-title">
          <Globe className="w-4 h-4" />
          <span>Languages</span>
        </div>
      </div>
      <div className="form-section-content">
        <div className="space-y-2">
          {state.languages.map((lang, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                className="form-input flex-1"
                placeholder="KANNADA (Native)"
                value={lang}
                onChange={(e) => handleChange(index, e.target.value)}
              />
              <button onClick={() => handleRemove(index)} className="btn-remove" title="Remove">
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button onClick={handleAdd} className="btn-add">
            <Plus className="w-4 h-4" />
            <span>Add Language</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default LanguagesSection;
