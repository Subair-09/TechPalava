
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Analytics from './pages/Analytics';
import NewsList from './pages/NewsList';
import ArticleEditor from './pages/ArticleEditor';
import CategoryManagement from './pages/CategoryManagement';
import SpotlightManagement from './pages/SpotlightManagement';
import JobsManagement from './pages/JobsManagement';
import EventsManagement from './pages/EventsManagement';
import SubmissionsInbox from './pages/SubmissionsInbox';
import AdvertiseManagement from './pages/AdvertiseManagement';
import UserManagement from './pages/UserManagement';
import AdminSettings from './pages/AdminSettings';
import HomeAdsManagement from './pages/HomeAdsManagement';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/analytics" element={<Analytics />} />
        <Route path="/admin/articles" element={<NewsList />} />
        <Route path="/admin/articles/new" element={<ArticleEditor />} />
        <Route path="/admin/articles/:id/edit" element={<ArticleEditor />} />
        <Route path="/admin/categories" element={<CategoryManagement />} />
        <Route path="/admin/spotlight" element={<SpotlightManagement />} />
        <Route path="/admin/jobs" element={<JobsManagement />} />
        <Route path="/admin/events" element={<EventsManagement />} />
        <Route path="/admin/submissions" element={<SubmissionsInbox />} />
        <Route path="/admin/advertise" element={<AdvertiseManagement />} />
        <Route path="/admin/home-ads" element={<HomeAdsManagement />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
        
        <Route path="/admin/news" element={<Navigate to="/admin/articles" replace />} />
        <Route path="/admin/analysis" element={<Navigate to="/admin/articles" replace />} />
        
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        <Route path="/" element={<Navigate to="/admin/login" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
