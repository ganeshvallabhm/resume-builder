import React from 'react';
import { AlignLeft } from 'lucide-react';
import { useResume } from '@/context/ResumeContext';

const SummarySection: React.FC = () => {
  const { state, dispatch } = useResume();

  return (
    <section className="form-section">
      <div className="form-section-header">
        <div className="form-section-title">
          <AlignLeft className="w-4 h-4" />
          <span>Professional Summary</span>
        </div>
      </div>
      <div className="form-section-content">
        <div className="form-group">
          <textarea
            className="form-textarea"
            placeholder="Write a compelling 2-3 sentence summary highlighting your experience, key skills, and career goals..."
            value={state.summary}
            onChange={(e) => dispatch({ type: 'UPDATE_SUMMARY', payload: e.target.value })}
            rows={4}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Tip: Focus on your unique value proposition and quantifiable achievements.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SummarySection;
