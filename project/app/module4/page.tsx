'use client';

import { useState } from 'react';
import UsersList from './components/UsersList';
import PredictionDashboard from './components/PredictionDashboard';

export default function Home() {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  return (
    <main>
      {selectedUserId ? (
        <>
          <button
            onClick={() => setSelectedUserId(null)}
            className="fixed top-4 left-4 px-4 py-2 bg-white text-blue-600 rounded-lg shadow-md hover:bg-blue-50 transition-colors z-50"
          >
            ← Back to Users
          </button>
          <PredictionDashboard userId={selectedUserId} />
        </>
      ) : (
        <UsersList onSelectUser={setSelectedUserId} />
      )}
    </main>
  );
}