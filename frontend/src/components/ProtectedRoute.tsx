import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useEffect, useState } from 'react';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const location = useLocation();
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      // Set a small delay before unmounting
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [user, loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!shouldRender || !user) {
    return <Navigate to="/auth" replace state={{ from: location }} />;
  }

  return <>{children}</>;
} 