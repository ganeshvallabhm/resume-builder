import React from 'react';
import InputPanel from './InputPanel';
import PreviewPanel from './PreviewPanel';

/**
 * ResumeBuilder
 * -----------------------------
 * Layout-only component.
 * - NO PDF logic here
 * - NO html2pdf imports
 * - NO scaling or download handlers
 * - Prevents dual PDF generation bugs
 */
const ResumeBuilder: React.FC = () => {
  return (
    <div className="resume-builder">
      <InputPanel />
      <PreviewPanel />
    </div>
  );
};

export default ResumeBuilder;
