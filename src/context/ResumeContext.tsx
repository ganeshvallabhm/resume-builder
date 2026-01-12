import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';

// Types
export interface Education {
  id: string;
  degree: string;
  institution: string;
  startDate: string;
  endDate: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  description: string;
  bullets: string[];
  startDate: string;
  endDate: string;
}

export interface Project {
  id: string;
  name: string;
  githubUrl: string;
  description: string;
  bullets: string[];
  startDate: string;
  endDate: string;
}

export interface ResumeData {
  personal: {
    fullName: string;
    jobTitle: string;
    phone: string;
    email: string;
    location: string;
  };
  social: {
    github: string;
    linkedin: string;
    website: string;
  };
  summary: string;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  technicalSkills: string[];
  softSkills: string[];
  additionalSkills: string[];
  languages: string[];
  certifications: string[];
}

type Action =
  | { type: 'UPDATE_PERSONAL'; payload: Partial<ResumeData['personal']> }
  | { type: 'UPDATE_SOCIAL'; payload: Partial<ResumeData['social']> }
  | { type: 'UPDATE_SUMMARY'; payload: string }
  | { type: 'ADD_EDUCATION' }
  | { type: 'UPDATE_EDUCATION'; payload: { id: string; data: Partial<Education> } }
  | { type: 'REMOVE_EDUCATION'; payload: string }
  | { type: 'ADD_EXPERIENCE' }
  | { type: 'UPDATE_EXPERIENCE'; payload: { id: string; data: Partial<Experience> } }
  | { type: 'REMOVE_EXPERIENCE'; payload: string }
  | { type: 'ADD_PROJECT' }
  | { type: 'UPDATE_PROJECT'; payload: { id: string; data: Partial<Project> } }
  | { type: 'REMOVE_PROJECT'; payload: string }
  | { type: 'ADD_SKILL'; payload: { type: 'technicalSkills' | 'softSkills' | 'additionalSkills' } }
  | { type: 'UPDATE_SKILL'; payload: { type: 'technicalSkills' | 'softSkills' | 'additionalSkills'; index: number; value: string } }
  | { type: 'REMOVE_SKILL'; payload: { type: 'technicalSkills' | 'softSkills' | 'additionalSkills'; index: number } }
  | { type: 'ADD_LANGUAGE' }
  | { type: 'UPDATE_LANGUAGE'; payload: { index: number; value: string } }
  | { type: 'REMOVE_LANGUAGE'; payload: number }
  | { type: 'ADD_CERTIFICATION' }
  | { type: 'UPDATE_CERTIFICATION'; payload: { index: number; value: string } }
  | { type: 'REMOVE_CERTIFICATION'; payload: number }
  | { type: 'LOAD_DATA'; payload: ResumeData }
  | { type: 'LOAD_EXAMPLE' };

const generateId = () => Math.random().toString(36).substring(2, 9);

// Example data based on placeholder content
export const exampleData: ResumeData = {
  personal: {
    fullName: 'GANESH VALLABH',
    jobTitle: 'FULL STACK DEVELOPER',
    phone: '+1 (555) 123-4567',
    email: 'gvallabhm@gmail.com',
    location: 'BENGALURU, INDIA',
  },
  social: {
    github: 'https://github.com/ganeshvallabh',
    linkedin: 'https://linkedin.com/in/ganeshvallabh',
    website: 'https://ganeshvallabh.dev',
  },
  summary: 'Experienced Full Stack Developer with 4+ years of expertise in building scalable web applications. Proficient in React, Node.js, and cloud technologies. Passionate about creating efficient solutions and mentoring junior developers.',
  education: [
    {
      id: generateId(),
      degree: 'Bachelor of Science in Computer Science',
      institution: 'MVJ COLLEGE OF ENGINEERING AND TECHNOLOGY',
      startDate: 'Sep 2018',
      endDate: 'May 2022',
    },
  ],
  experience: [
    {
      id: generateId(),
      company: 'Google',
      role: 'Senior Software Engineer',
      description: 'Leading technology company specializing in internet services and products',
      bullets: [
        'Led a team of 5 engineers to deliver a project 2 weeks ahead of schedule',
        'Improved application performance by 40% through code optimization',
        'Mentored 3 junior developers',
      ],
      startDate: 'Jan 2020',
      endDate: 'Present',
    },
  ],
  projects: [
    {
      id: generateId(),
      name: 'E-Commerce Platform',
      githubUrl: 'https://github.com/ganeshvallabh/ecommerce',
      description: 'Full-stack e-commerce solution with payment integration',
      bullets: [
        'Built using React, Node.js, and MongoDB',
        'Integrated Stripe payment gateway',
        'Implemented real-time inventory management',
      ],
      startDate: 'Mar 2023',
      endDate: 'Aug 2023',
    },
  ],
  technicalSkills: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker', 'MongoDB'],
  softSkills: ['Leadership', 'Communication', 'Problem Solving', 'Team Collaboration'],
  additionalSkills: ['Agile Methodologies', 'CI/CD', 'Git', 'REST APIs'],
  languages: ['English', 'Hindi', 'Kannada'],
  certifications: ['AWS Certified Solutions Architect', 'Google Cloud Professional Developer'],
};

const initialState: ResumeData = {
  personal: {
    fullName: '',
    jobTitle: '',
    phone: '',
    email: '',
    location: '',
  },
  social: {
    github: '',
    linkedin: '',
    website: '',
  },
  summary: '',
  education: [],
  experience: [],
  projects: [],
  technicalSkills: [],
  softSkills: [],
  additionalSkills: [],
  languages: [],
  certifications: [],
};

function resumeReducer(state: ResumeData, action: Action): ResumeData {
  switch (action.type) {
    case 'UPDATE_PERSONAL':
      return { ...state, personal: { ...state.personal, ...action.payload } };
    case 'UPDATE_SOCIAL':
      return { ...state, social: { ...state.social, ...action.payload } };
    case 'UPDATE_SUMMARY':
      return { ...state, summary: action.payload };
    case 'ADD_EDUCATION':
      return {
        ...state,
        education: [...state.education, { id: generateId(), degree: '', institution: '', startDate: '', endDate: '' }],
      };
    case 'UPDATE_EDUCATION':
      return {
        ...state,
        education: state.education.map((edu) =>
          edu.id === action.payload.id ? { ...edu, ...action.payload.data } : edu
        ),
      };
    case 'REMOVE_EDUCATION':
      return { ...state, education: state.education.filter((edu) => edu.id !== action.payload) };
    case 'ADD_EXPERIENCE':
      return {
        ...state,
        experience: [
          ...state.experience,
          { id: generateId(), company: '', role: '', description: '', bullets: [], startDate: '', endDate: '' },
        ],
      };
    case 'UPDATE_EXPERIENCE':
      return {
        ...state,
        experience: state.experience.map((exp) =>
          exp.id === action.payload.id ? { ...exp, ...action.payload.data } : exp
        ),
      };
    case 'REMOVE_EXPERIENCE':
      return { ...state, experience: state.experience.filter((exp) => exp.id !== action.payload) };
    case 'ADD_PROJECT':
      return {
        ...state,
        projects: [
          ...state.projects,
          { id: generateId(), name: '', githubUrl: '', description: '', bullets: [], startDate: '', endDate: '' },
        ],
      };
    case 'UPDATE_PROJECT':
      return {
        ...state,
        projects: state.projects.map((proj) =>
          proj.id === action.payload.id ? { ...proj, ...action.payload.data } : proj
        ),
      };
    case 'REMOVE_PROJECT':
      return { ...state, projects: state.projects.filter((proj) => proj.id !== action.payload) };
    case 'ADD_SKILL':
      return { ...state, [action.payload.type]: [...state[action.payload.type], ''] };
    case 'UPDATE_SKILL':
      return {
        ...state,
        [action.payload.type]: state[action.payload.type].map((skill, i) =>
          i === action.payload.index ? action.payload.value : skill
        ),
      };
    case 'REMOVE_SKILL':
      return {
        ...state,
        [action.payload.type]: state[action.payload.type].filter((_, i) => i !== action.payload.index),
      };
    case 'ADD_LANGUAGE':
      return { ...state, languages: [...state.languages, ''] };
    case 'UPDATE_LANGUAGE':
      return {
        ...state,
        languages: state.languages.map((lang, i) => (i === action.payload.index ? action.payload.value : lang)),
      };
    case 'REMOVE_LANGUAGE':
      return { ...state, languages: state.languages.filter((_, i) => i !== action.payload) };
    case 'ADD_CERTIFICATION':
      return { ...state, certifications: [...state.certifications, ''] };
    case 'UPDATE_CERTIFICATION':
      return {
        ...state,
        certifications: state.certifications.map((cert, i) =>
          i === action.payload.index ? action.payload.value : cert
        ),
      };
    case 'REMOVE_CERTIFICATION':
      return { ...state, certifications: state.certifications.filter((_, i) => i !== action.payload) };
    case 'LOAD_DATA':
      return action.payload;
    case 'LOAD_EXAMPLE':
      return exampleData;
    default:
      return state;
  }
}

interface ResumeContextType {
  state: ResumeData;
  dispatch: React.Dispatch<Action>;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

const STORAGE_KEY = 'resume-builder-data';
const VERSION_KEY = 'resume-builder-version';
const CURRENT_VERSION = '2.0'; // Increment this to clear old data

export function ResumeProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(resumeReducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    const savedVersion = localStorage.getItem(VERSION_KEY);

    // Clear old data if version doesn't match (forces fresh start)
    if (savedVersion !== CURRENT_VERSION) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.setItem(VERSION_KEY, CURRENT_VERSION);
      return; // Start with empty initialState
    }

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        dispatch({ type: 'LOAD_DATA', payload: parsed });
      } catch (e) {
        console.error('Failed to parse saved resume data:', e);
      }
    }
  }, []);

  // Save to localStorage on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  return <ResumeContext.Provider value={{ state, dispatch }}>{children}</ResumeContext.Provider>;
}

export function useResume() {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
}
