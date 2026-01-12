import React, { forwardRef } from 'react';
import { useResume } from '@/context/ResumeContext';

const ResumePreview = forwardRef<HTMLDivElement>((_, ref) => {
  const { state } = useResume();
  const { personal, social, summary, education, experience, projects, technicalSkills, softSkills, additionalSkills, languages, certifications } = state;

  const hasContact = personal.phone || personal.email || personal.location || social.github || social.linkedin || social.website;
  const hasLeftContent = summary || technicalSkills.length > 0 || softSkills.length > 0 || additionalSkills.length > 0 || languages.length > 0 || certifications.length > 0 || education.length > 0;
  const hasRightContent = experience.length > 0 || projects.length > 0;

  return (
    <div ref={ref} className="resume-page" id="resume-preview">
      {/* Header */}
      <header className="resume-header">
        {personal.fullName && <h1 className="resume-name">{personal.fullName}</h1>}
        {personal.jobTitle && <p className="resume-title">{personal.jobTitle}</p>}

        {hasContact && (
          <div className="resume-icons">
            {personal.phone && (
              <span className="icon-item">
                <i className="bi bi-telephone-fill"></i>
                <span>{personal.phone}</span>
              </span>
            )}
            {personal.email && (
              <span className="icon-item">
                <i className="bi bi-envelope-fill"></i>
                <span>{personal.email}</span>
              </span>
            )}
            {personal.location && (
              <span className="icon-item">
                <i className="bi bi-geo-alt-fill"></i>
                <span>{personal.location}</span>
              </span>
            )}
            {social.github && (
              <a href={social.github} target="_blank" rel="noopener noreferrer" className="icon-item icon-link">
                <i className="bi bi-github"></i>
                <span>GitHub</span>
              </a>
            )}
            {social.linkedin && (
              <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="icon-item icon-link">
                <i className="bi bi-linkedin"></i>
                <span>LinkedIn</span>
              </a>
            )}
            {social.website && (
              <a href={social.website} target="_blank" rel="noopener noreferrer" className="icon-item icon-link">
                <i className="bi bi-globe"></i>
                <span>Portfolio</span>
              </a>
            )}
          </div>
        )}
      </header>

      {/* Body - Two Column Layout */}
      {(hasLeftContent || hasRightContent) && (
        <div className="resume-body">
          {/* Left Column */}
          <div className="resume-left-column">
            {/* Summary */}
            {summary && (
              <section className="resume-section">
                <h2 className="resume-section-title">Summary</h2>
                <p className="resume-section-content">{summary}</p>
              </section>
            )}

            {/* Education */}
            {education.length > 0 && (
              <section className="resume-section">
                <h2 className="resume-section-title">Education</h2>
                <div className="resume-section-content">
                  {education.map((edu) => (
                    <div key={edu.id} className="resume-entry">
                      <div className="resume-entry-header">
                        {edu.degree && <span className="resume-entry-title">{edu.degree}</span>}
                        {(edu.startDate || edu.endDate) && (
                          <span className="resume-entry-dates">
                            {edu.startDate}{edu.startDate && edu.endDate && ' – '}{edu.endDate}
                          </span>
                        )}
                      </div>
                      {edu.institution && <p className="resume-entry-subtitle">{edu.institution}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Technical Skills */}
            {technicalSkills.filter(s => s.trim()).length > 0 && (
              <section className="resume-section">
                <h2 className="resume-section-title">Technical Skills</h2>
                <div className="resume-skills-list">
                  {technicalSkills.filter(s => s.trim()).map((skill, index) => (
                    <div key={index} className="skill-item">{skill}</div>
                  ))}
                </div>
              </section>
            )}

            {/* Soft Skills */}
            {softSkills.filter(s => s.trim()).length > 0 && (
              <section className="resume-section">
                <h2 className="resume-section-title">Soft Skills</h2>
                <div className="resume-skills-list">
                  {softSkills.filter(s => s.trim()).map((skill, index) => (
                    <div key={index} className="skill-item">{skill}</div>
                  ))}
                </div>
              </section>
            )}

            {/* Additional Skills */}
            {additionalSkills.filter(s => s.trim()).length > 0 && (
              <section className="resume-section">
                <h2 className="resume-section-title">Additional Skills</h2>
                <div className="resume-skills-list">
                  {additionalSkills.filter(s => s.trim()).map((skill, index) => (
                    <div key={index} className="skill-item">{skill}</div>
                  ))}
                </div>
              </section>
            )}

            {/* Languages */}
            {languages.filter(l => l.trim()).length > 0 && (
              <section className="resume-section">
                <h2 className="resume-section-title">Languages</h2>
                <div className="resume-skills-list">
                  {languages.filter(l => l.trim()).map((lang, index) => (
                    <div key={index} className="skill-item">{lang}</div>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications */}
            {certifications.filter(c => c.trim()).length > 0 && (
              <section className="resume-section">
                <h2 className="resume-section-title">Certifications</h2>
                <div className="resume-section-content resume-cert-list">
                  {certifications.filter(c => c.trim()).map((cert, index) => (
                    <p key={index}>{cert}</p>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column */}
          <div className="resume-right-column">
            {/* Work Experience */}
            {experience.length > 0 && (
              <section className="resume-section">
                <h2 className="resume-section-title">Work Experience</h2>
                <div className="resume-section-content">
                  {experience.map((exp) => (
                    <div key={exp.id} className="resume-entry">
                      <div className="resume-entry-header">
                        <span className="resume-entry-title">{exp.company}</span>
                        {(exp.startDate || exp.endDate) && (
                          <span className="resume-entry-dates">
                            {exp.startDate}{exp.startDate && exp.endDate && ' – '}{exp.endDate}
                          </span>
                        )}
                      </div>
                      {exp.role && <p className="resume-entry-subtitle">{exp.role}</p>}
                      {exp.description && <p className="resume-entry-description">{exp.description}</p>}
                      {exp.bullets.filter(b => b.trim()).length > 0 && (
                        <ul className="resume-bullets">
                          {exp.bullets.filter(b => b.trim()).map((bullet, index) => (
                            <li key={index} className="resume-bullet">{bullet}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projects */}
            {projects.length > 0 && (
              <section className="resume-section">
                <h2 className="resume-section-title">Projects</h2>
                <div className="resume-section-content">
                  {projects.map((proj) => (
                    <div key={proj.id} className="resume-entry">
                      <div className="resume-entry-header">
                        <span className="resume-entry-title">
                          {proj.name}
                          {proj.githubUrl && (
                            <>
                              {' '}
                              <a href={proj.githubUrl} target="_blank" rel="noopener noreferrer" className="resume-link font-normal">
                                (GitHub)
                              </a>
                            </>
                          )}
                        </span>
                        {(proj.startDate || proj.endDate) && (
                          <span className="resume-entry-dates">
                            {proj.startDate}{proj.startDate && proj.endDate && ' – '}{proj.endDate}
                          </span>
                        )}
                      </div>
                      {proj.description && <p className="resume-entry-description">{proj.description}</p>}
                      {proj.bullets.filter(b => b.trim()).length > 0 && (
                        <ul className="resume-bullets">
                          {proj.bullets.filter(b => b.trim()).map((bullet, index) => (
                            <li key={index} className="resume-bullet">{bullet}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!hasLeftContent && !hasRightContent && !personal.fullName && !personal.jobTitle && (
        <div className="flex items-center justify-center h-[600px] text-muted-foreground">
          <div className="text-center">
            <p className="text-lg font-medium mb-2">Start filling out your information</p>
            <p className="text-sm">Your resume preview will appear here</p>
          </div>
        </div>
      )}
    </div>
  );
});

ResumePreview.displayName = 'ResumePreview';

export default ResumePreview;
