import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import XMLExplorer from './pages/XMLExplorer';
import XPathPage from './pages/XPathPage';
import XSLTPage from './pages/XSLTPage';
import Analytics from './pages/Analytics';
import Learning from './pages/Learning';
import Assessment from './pages/Assessment';
import Results from './pages/Results';
import About from './pages/About';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-indigo-600 font-medium">Loading...</p>
      </div>
    </div>
  );
  return user ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/app/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="learn" element={<Learning />} />
          <Route path="xml-explorer" element={<XMLExplorer />} />
          <Route path="xpath" element={<XPathPage />} />
          <Route path="xslt" element={<XSLTPage />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="assessment" element={<Assessment />} />
          <Route path="results" element={<Results />} />
          <Route path="about" element={<About />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
