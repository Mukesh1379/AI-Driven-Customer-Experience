import FraudDashboard from './components/FraudDashboard';
import BiometricVerification from './components/BiometricVerification';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6 md:space-y-8">
        <header className="glass-card rounded-2xl p-6 md:p-8 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-600 mb-3 md:mb-4">
            AI-Powered Fraud Detection System
          </h1>
          <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto">
            Advanced fraud detection and prevention powered by artificial intelligence and real-time biometric verification
          </p>
        </header>
        
        <div className="space-y-6 md:space-y-8">
          <FraudDashboard />
          <BiometricVerification />
        </div>

        <footer className="text-center text-gray-600 text-sm py-4">
          <p>© 2025 AI Fraud Detection System. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}