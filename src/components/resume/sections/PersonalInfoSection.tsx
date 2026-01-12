import React from 'react';
import { User } from 'lucide-react';
import { useResume } from '@/context/ResumeContext';

const PersonalInfoSection: React.FC = () => {
  const { state, dispatch } = useResume();
  const { personal } = state;

  const handleChange = (field: keyof typeof personal, value: string) => {
    dispatch({ type: 'UPDATE_PERSONAL', payload: { [field]: value } });
  };

  return (
    <section className="form-section">
      <div className="form-section-header">
        <div className="form-section-title">
          <User className="w-4 h-4" />
          <span>Personal Information</span>
        </div>
      </div>
      <div className="form-section-content">
        <div className="grid grid-cols-2 gap-4">
          <div className="form-group col-span-2">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="GANESH VALLABH M"
              value={personal.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
            />
          </div>
          <div className="form-group col-span-2">
            <label className="form-label">Job Title</label>
            <input
              type="text"
              className="form-input"
              placeholder="WEB DEVELOPER"
              value={personal.jobTitle}
              onChange={(e) => handleChange('jobTitle', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Phone</label>
            <input
              type="tel"
              className="form-input"
              placeholder="+1 (555) 123-4567"
              value={personal.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              placeholder="gvallabhm@gmail.com"
              value={personal.email}
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </div>
          <div className="form-group col-span-2">
            <label className="form-label">Location</label>
            <input
              type="text"
              className="form-input"
              placeholder="BENGALURU,INDIA"
              value={personal.location}
              onChange={(e) => handleChange('location', e.target.value)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalInfoSection;
