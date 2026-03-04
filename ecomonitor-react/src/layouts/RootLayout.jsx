import { Outlet } from 'react-router';
import { Navbar } from '../components/Navbar';

export function RootLayout() {
  return (
    <div className="h-screen flex flex-col ">
      <Navbar /> {/* Висота, наприклад, 64px */}
      <main className="flex-1 relative ">
        <Outlet /> {/* Тепер займає все, що залишилося від екрана */}
      </main>
    </div>
  );
}
