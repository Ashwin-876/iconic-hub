// ICONIC HUB - Route Configuration
import { createBrowserRouter, useRouteError } from 'react-router-dom';

// Auth
import Login from './auth/Login';
import CreateAccount from './auth/CreateAccount';
import ForgotPassword from './auth/ForgotPassword';
import OTPVerification from './auth/OTPVerification';

// Onboarding
import WelcomeScreen from './onboarding/WelcomeScreen';
import SelectCareerGoal from './onboarding/SelectCareerGoal';
import SelectSkillLevel from './onboarding/SelectSkillLevel';
import SelectInterests from './onboarding/SelectInterests';
import SelectTechnologies from './onboarding/SelectTechnologies';
import LearningPreferences from './onboarding/LearningPreferences';
import AIRecommendationGeneration from './onboarding/AIRecommendationGeneration';

// Dashboard
import Dashboard from './dashboard/index';

// Courses
import AllCourses from './courses/AllCourses';
import CourseDetails from './courses/course-detail/CourseDetails';
import EnrollCourse from './courses/course-detail/EnrollCourse';

// Community
import DiscussionForums from './community/DiscussionForums';

// AI Tutor
import AskAI from './ai-tutor/AskAI';

// Profile
import PersonalInformation from './profile/PersonalInformation';

// Admin
import AnalyticsDashboard from './admin/AnalyticsDashboard';
import AdminLogin from './admin/AdminLogin';

// Developer Hub
import DeveloperHub from './developer-hub/index';
import ProgramEnroll from './developer-hub/ProgramEnroll';
import JoinProject from './developer-hub/JoinProject';

// Events Hub
import EventsHub from './events/index';
import EventDetails from './events/EventDetails';
import RegisterEvent from './events/RegisterEvent';

// Learning Paths
import LearningPathsDispatcher from './learning-paths/index';

// Landing Page
import LandingPage from './landing/index';

function ErrorBoundary() {
  const error = useRouteError();
  console.error("ErrorBoundary caught error:", error);
  return (
    <div className="p-8 bg-slate-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold text-red-500 mb-4">Application Error</h1>
      <pre className="bg-slate-950 p-4 rounded border border-red-500/20 overflow-auto max-w-full">
        {error?.stack || error?.message || String(error)}
      </pre>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorBoundary />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/login', element: <Login /> },
      { path: '/create-account', element: <CreateAccount /> },
      { path: '/forgot-password', element: <ForgotPassword /> },
      { path: '/otp-verification', element: <OTPVerification /> },
      { path: '/onboarding/welcome', element: <WelcomeScreen /> },
      { path: '/onboarding/career-goal', element: <SelectCareerGoal /> },
      { path: '/onboarding/skill-level', element: <SelectSkillLevel /> },
      { path: '/onboarding/interests', element: <SelectInterests /> },
      { path: '/onboarding/technologies', element: <SelectTechnologies /> },
      { path: '/onboarding/preferences', element: <LearningPreferences /> },
      { path: '/onboarding/generating', element: <AIRecommendationGeneration /> },
      { path: '/dashboard', element: <Dashboard /> },
      { path: '/courses', element: <AllCourses /> },
      { path: '/courses/:id', element: <CourseDetails /> },
      { path: '/enroll/:courseId', element: <EnrollCourse /> },
      { path: '/community', element: <DiscussionForums /> },
      { path: '/ai-tutor', element: <AskAI /> },
      { path: '/profile', element: <PersonalInformation /> },
      { path: '/admin', element: <AnalyticsDashboard /> },
      { path: '/admin/login', element: <AdminLogin /> },
      { path: '/developer-hub', element: <DeveloperHub /> },
      { path: '/developer-hub/program/:programId', element: <ProgramEnroll /> },
      { path: '/developer-hub/join/:id', element: <JoinProject /> },
      { path: '/events', element: <EventsHub /> },
      { path: '/events/:id', element: <EventDetails /> },
      { path: '/events/register/:id', element: <RegisterEvent /> },
      { path: '/learning-paths', element: <LearningPathsDispatcher /> },
    ]
  }
]);
