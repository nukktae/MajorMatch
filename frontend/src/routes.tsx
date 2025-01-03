import { App } from './App'
import { Home } from './routes/Home'
import { Auth } from './routes/Auth'
import { Profile } from './routes/Profile'
import { Challenges } from './routes/Challenges'
import { ChallengeDetail } from './routes/ChallengeDetail'
import { Assessments } from './routes/Assessments'
import { AssessmentResults } from './routes/AssessmentResults'
import { Mentors } from './routes/Mentors'
import { MentorDetail } from './routes/MentorDetail'
import { ProtectedRoute } from './components/ProtectedRoute'
import { PageLayout } from './components/layout/PageLayout'
import { RouteObject, Outlet } from 'react-router-dom'
import { LearnMore } from './routes/LearnMore'
import { MentorSignup } from './routes/MentorSignup'
import { MentorLayout } from './layouts/MentorLayout'
import { MentorDashboard } from './routes/mentor/MentorDashboard'
import { MentorStudents } from './routes/mentor/MentorStudents'
import { MentorSchedule } from './routes/mentor/MentorSchedule'
import { MentorProfile } from './routes/mentor/MentorProfile'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'auth',
        element: <PageLayout><Auth /></PageLayout>
      },
      {
        path: 'mentor-signup',
        element: <PageLayout><MentorSignup /></PageLayout>
      },
      {
        path: '',
        element: <PageLayout><Home /></PageLayout>
      },
      {
        path: 'profile',
        element: <ProtectedRoute><PageLayout><Profile /></PageLayout></ProtectedRoute>
      },
      {
        path: 'challenges',
        element: <ProtectedRoute><PageLayout><Challenges /></PageLayout></ProtectedRoute>
      },
      {
        path: 'challenges/:id',
        element: <ProtectedRoute><PageLayout><ChallengeDetail /></PageLayout></ProtectedRoute>
      },
      {
        path: 'assessments',
        element: <ProtectedRoute><PageLayout><Assessments /></PageLayout></ProtectedRoute>
      },
      {
        path: 'assessment-results',
        element: <ProtectedRoute><PageLayout><AssessmentResults /></PageLayout></ProtectedRoute>
      },
      {
        path: 'mentors',
        element: <ProtectedRoute><PageLayout><Mentors /></PageLayout></ProtectedRoute>
      },
      {
        path: 'mentors/:id',
        element: <ProtectedRoute><PageLayout><MentorDetail /></PageLayout></ProtectedRoute>
      },
      {
        path: 'learn-more',
        element: <PageLayout><LearnMore /></PageLayout>
      },
      {
        path: '/mentor',
        element: <MentorLayout />,
        children: [
          {
            path: 'dashboard',
            element: <MentorDashboard />
          },
          {
            path: 'schedule',
            element: <MentorSchedule />
          },
          {
            path: 'students',
            element: <MentorStudents />
          },
          {
            path: 'profile',
            element: <MentorProfile />
          }
        ]
      },
      {
        path: '*',
        element: <PageLayout><Home /></PageLayout>
      }
    ]
  }
] 