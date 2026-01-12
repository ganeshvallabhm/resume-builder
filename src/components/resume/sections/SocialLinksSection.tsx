import React from 'react';
import { Link } from 'lucide-react';
import { useResume } from '@/context/ResumeContext';

const SocialLinksSection: React.FC = () => {
  const { state, dispatch } = useResume();
  const { social } = state;

  const handleChange = (field: keyof typeof social, value: string) => {
    dispatch({ type: 'UPDATE_SOCIAL', payload: { [field]: value } });
  };

  return (
    <section className="form-section">
      <div className="form-section-header">
        <div className="form-section-title">
          <Link className="w-4 h-4" />
          <span>Social Links</span>
        </div>
      </div>
      <div className="form-section-content">
        <div className="space-y-4">
          <div className="form-group">
            <label className="form-label">GitHub</label>
            <input
              type="url"
              className="form-input"
              placeholder="https://github.com/username"
              value={social.github}
              onChange={(e) => handleChange('github', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">LinkedIn</label>
            <input
              type="url"
              className="form-input"
              placeholder="https://linkedin.com/in/username"
              value={social.linkedin}
              onChange={(e) => handleChange('linkedin', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Portfolio Website</label>
            <input
              type="url"
              className="form-input"
              placeholder="https://yourportfolio.com"
              value={social.website}
              onChange={(e) => handleChange('website', e.target.value)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialLinksSection;
