import { App } from './App'
import { Home } from './routes/Home'
import { Auth } from './routes/Auth'
import { Profile } from './routes/Profile'
import { Challenges } from './routes/Challenges'
import { ChallengeDetail } from './routes/ChallengeDetail'
import { Assessments } from './routes/Assessments'
import { AssessmentResults } from './routes/AssessmentResults'
import { Mentors } from './routes/Mentors'
import { ProtectedRoute } from './components/ProtectedRoute'
import { PageLayout } from './components/layout/PageLayout'
import { RouteObject } from 'react-router-dom'

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
      }
    ]
  }
]; 