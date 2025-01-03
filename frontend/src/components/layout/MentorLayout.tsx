import { MentorNavbar } from './MentorNavbar';

export function MentorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-50 to-white">
      <MentorNavbar />
      <main>{children}</main>
    </div>
  );
} 