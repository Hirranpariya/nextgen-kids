import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LandingPage from '../pages/LandingPage/LandingPage';
import LoginPage from '../pages/Auth/LoginPage';
import RegisterPage from '../pages/Auth/RegisterPage';
import ParentDashboard from '../pages/Parent/ParentDashboard';
import ChildDetailsPage from '../pages/Parent/ChildDetailsPage';
import GrowthTrackerPage from '../pages/Parent/GrowthTrackerPage';
import LearningZonePage from '../pages/Parent/LearningZonePage';
import WellnessPage from '../pages/Parent/WellnessPage';
import CommunityPage from '../pages/Parent/CommunityPage';
import HelpPage from '../pages/Parent/HelpPage';
import PageTransition from '../components/ui/PageTransition';

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageTransition><LandingPage /></PageTransition>} />
                <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />
                <Route path="/register" element={<PageTransition><RegisterPage /></PageTransition>} />
                <Route path="/parent/dashboard" element={<PageTransition><ParentDashboard /></PageTransition>} />
                <Route path="/parent/child/:id" element={<PageTransition><ChildDetailsPage /></PageTransition>} />
                <Route path="/parent/growth" element={<PageTransition><GrowthTrackerPage /></PageTransition>} />
                <Route path="/parent/learning" element={<PageTransition><LearningZonePage /></PageTransition>} />
                <Route path="/parent/wellness" element={<PageTransition><WellnessPage /></PageTransition>} />
                <Route path="/parent/community" element={<PageTransition><CommunityPage /></PageTransition>} />
                <Route path="/parent/help" element={<PageTransition><HelpPage /></PageTransition>} />
            </Routes>
        </AnimatePresence>
    );
};

export default AnimatedRoutes;
