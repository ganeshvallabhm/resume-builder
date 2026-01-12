import React from 'react';
import { FileText, Download } from 'lucide-react';
import PersonalInfoSection from './sections/PersonalInfoSection';
import SocialLinksSection from './sections/SocialLinksSection';
import SummarySection from './sections/SummarySection';
import EducationSection from './sections/EducationSection';
import ExperienceSection from './sections/ExperienceSection';
import ProjectsSection from './sections/ProjectsSection';
import SkillsSection from './sections/SkillsSection';
import LanguagesSection from './sections/LanguagesSection';
import CertificationsSection from './sections/CertificationsSection';

interface InputPanelProps {
  onDownload: () => void;
}

const InputPanel: React.FC<InputPanelProps> = ({ onDownload }) => {
  return (
    <aside className="input-panel">
      <header className="input-panel-header">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary">
              <FileText className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground">Resume Builder</h1>
              <p className="text-xs text-muted-foreground">Create your professional resume</p>
            </div>
          </div>
          <button onClick={onDownload} className="btn-download md:hidden">
            <Download className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="input-panel-content">
        <PersonalInfoSection />
        <SocialLinksSection />
        <SummarySection />
        <EducationSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection type="technicalSkills" title="Technical Skills" />
        <SkillsSection type="softSkills" title="Soft Skills" />
        <SkillsSection type="additionalSkills" title="Additional Skills" />
        <LanguagesSection />
        <CertificationsSection />
      </div>
    </aside>
  );
};

export default InputPanel;
