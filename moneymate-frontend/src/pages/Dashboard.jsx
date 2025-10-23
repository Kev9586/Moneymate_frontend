import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export default function Dashboard() {
  const { logout, user } = useContext(AuthContext);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Welcome, {user?.username}!</h1>
      <p>This is the dashboard.</p>
      <button
        onClick={logout}
        className="mt-4 bg-primary text-white font-bold py-2 px-4 rounded hover:bg-primary/90 transition-all duration-300"
      >
        Logout
      </button>
    </div>
  );
}