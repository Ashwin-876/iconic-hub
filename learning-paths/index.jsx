import React, { useEffect, useState } from 'react';
import AIEngineerPath from './AIEngineerPath';
import BackendDeveloperPath from './BackendDeveloperPath';
import DataScientistPath from './DataScientistPath';
import DevOpsEngineerPath from './DevOpsEngineerPath';
import FrontendDeveloperPath from './FrontendDeveloperPath';
import FullStackDeveloperPath from './FullStackDeveloperPath';
import ProductDesignerPath from './ProductDesignerPath';

export default function LearningPathsDispatcher() {
  const [goal, setGoal] = useState('AI & ML Engineer');

  useEffect(() => {
    const savedGoal = localStorage.getItem('onboarding_career_goal');
    if (savedGoal) {
      setGoal(savedGoal);
    }
  }, []);

  switch (goal) {
    case 'Full-Stack Developer':
      return <FullStackDeveloperPath />;
    case 'AI & ML Engineer':
      return <AIEngineerPath />;
    case 'DevOps & SRE':
      return <DevOpsEngineerPath />;
    case 'Frontend Specialist':
      return <FrontendDeveloperPath />;
    case 'Backend Architect':
      return <BackendDeveloperPath />;
    case 'Data Scientist':
      return <DataScientistPath />;
    case 'Product Designer':
      return <ProductDesignerPath />;
    default:
      return <AIEngineerPath />;
  }
}
