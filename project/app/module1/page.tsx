'use client';

import CustomerProfile from './components/CustomerProfile';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-primary-50 to-purple-50 bg-gradient-mesh bg-fixed bg-[length:30px_30px]">
      <CustomerProfile />
    </main>
  );
}