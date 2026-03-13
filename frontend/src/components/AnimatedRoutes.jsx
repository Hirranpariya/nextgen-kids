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
import NotificationsPage from '../pages/Parent/NotificationsPage';
import ChildProfilesPage from '../pages/Parent/ChildProfilesPage';
import ToddlerDashboard from '../pages/Dashboard/ToddlerDashboard';
import YoungLearnerDashboard from '../pages/Dashboard/YoungLearnerDashboard';
import ExplorerDashboard from '../pages/Dashboard/ExplorerDashboard';
import ReadingStoriesPage from '../pages/Dashboard/YoungLearner/Activities/ReadingStoriesPage';
import FunMathPage from '../pages/Dashboard/YoungLearner/Activities/FunMathPage';
import ThinkLearnPage from '../pages/Dashboard/YoungLearner/Activities/ThinkLearnPage';
import BasicSciencePage from '../pages/Dashboard/YoungLearner/Activities/BasicSciencePage';
import PageTransition from '../components/ui/PageTransition';
import WellnessPage from '../pages/Parent/WellnessPage';
import Community from '../pages/Parent/Community';
import SettingsPage from '../pages/Parent/SettingsPage';
import HelpPage from '../pages/Parent/HelpPage';

// Toddler Activities
import ColorsFun from '../pages/Dashboard/Toddler/Activities/ColorsFun';
import ShapesSort from '../pages/Dashboard/Toddler/Activities/ShapesSort';
import MusicTime from '../pages/Dashboard/Toddler/Activities/MusicTime';
import JumpAndRun from '../pages/Dashboard/Toddler/Activities/JumpAndRun';

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageTransition><LandingPage /></PageTransition>} />
                <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />
                <Route path="/register" element={<PageTransition><RegisterPage /></PageTransition>} />
                <Route path="/parent/dashboard" element={<PageTransition><ParentDashboard /></PageTransition>} />
                <Route path="/parent/profiles" element={<PageTransition><ChildProfilesPage /></PageTransition>} />
                <Route path="/parent/notifications" element={<PageTransition><NotificationsPage /></PageTransition>} />
                <Route path="/dashboard/toddler" element={<PageTransition><ToddlerDashboard /></PageTransition>} />
                <Route path="/dashboard/young-learner" element={<PageTransition><YoungLearnerDashboard /></PageTransition>} />
                <Route path="/dashboard/young-learner/activities/reading-stories" element={<PageTransition><ReadingStoriesPage /></PageTransition>} />
                <Route path="/dashboard/young-learner/activities/reading-stories" element={<PageTransition><ReadingStoriesPage /></PageTransition>} />
                <Route path="/dashboard/young-learner/activities/fun-math" element={<PageTransition><FunMathPage /></PageTransition>} />
                <Route path="/dashboard/young-learner/activities/think-learn" element={<PageTransition><ThinkLearnPage /></PageTransition>} />
                <Route path="/dashboard/young-learner/activities/basic-science" element={<PageTransition><BasicSciencePage /></PageTransition>} />
                <Route path="/dashboard/explorer" element={<PageTransition><ExplorerDashboard /></PageTransition>} />
                <Route path="/parent/child/:id" element={<PageTransition><ChildDetailsPage /></PageTransition>} />
                <Route path="/parent/growth" element={<PageTransition><GrowthTrackerPage /></PageTransition>} />
                <Route path="/parent/learning" element={<PageTransition><LearningZonePage /></PageTransition>} />
                <Route path="/parent/wellness" element={<PageTransition><WellnessPage /></PageTransition>} />
                <Route path="/parent/community" element={<PageTransition><Community /></PageTransition>} />
                <Route path="/parent/settings" element={<PageTransition><SettingsPage /></PageTransition>} />
                <Route path="/parent/help" element={<PageTransition><HelpPage /></PageTransition>} />
                
                {/* Toddler Activity Routes */}
                <Route path="/dashboard/toddler/activities/colors" element={<PageTransition><ColorsFun /></PageTransition>} />
                <Route path="/dashboard/toddler/activities/shapes" element={<PageTransition><ShapesSort /></PageTransition>} />
                <Route path="/dashboard/toddler/activities/music" element={<PageTransition><MusicTime /></PageTransition>} />
                <Route path="/dashboard/toddler/activities/movement" element={<PageTransition><JumpAndRun /></PageTransition>} />
            </Routes>
        </AnimatePresence>
    );
};

export default AnimatedRoutes;
