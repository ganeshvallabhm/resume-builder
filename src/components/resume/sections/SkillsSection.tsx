import React from 'react';
import { Plus, X, Code, Users, Star } from 'lucide-react';
import { useResume } from '@/context/ResumeContext';

interface SkillsSectionProps {
  type: 'technicalSkills' | 'softSkills' | 'additionalSkills';
  title: string;
}

const iconMap = {
  technicalSkills: Code,
  softSkills: Users,
  additionalSkills: Star,
};

const SkillsSection: React.FC<SkillsSectionProps> = ({ type, title }) => {
  const { state, dispatch } = useResume();
  const skills = state[type];
  const Icon = iconMap[type];

  const handleAdd = () => {
    dispatch({ type: 'ADD_SKILL', payload: { type } });
  };

  const handleRemove = (index: number) => {
    dispatch({ type: 'REMOVE_SKILL', payload: { type, index } });
  };

  const handleChange = (index: number, value: string) => {
    dispatch({ type: 'UPDATE_SKILL', payload: { type, index, value } });
  };

  return (
    <section className="form-section">
      <div className="form-section-header">
        <div className="form-section-title">
          <Icon className="w-4 h-4" />
          <span>{title}</span>
        </div>
      </div>
      <div className="form-section-content">
        <div className="space-y-2">
          {skills.map((skill, index) => (
            <div key={index} className="flex items-center gap-2">
              <input
                type="text"
                className="form-input flex-1"
                placeholder={`Enter ${title.toLowerCase().slice(0, -1)}...`}
                value={skill}
                onChange={(e) => handleChange(index, e.target.value)}
              />
              <button onClick={() => handleRemove(index)} className="btn-remove" title="Remove">
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
          <button onClick={handleAdd} className="btn-add">
            <Plus className="w-4 h-4" />
            <span>Add Skill</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
