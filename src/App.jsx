import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Navbar from './components/layout/Navbar';
import LoadingSpinner from './components/common/LoadingSpinner';

const Home = lazy(() => import('./pages/Home'));
const Docs = lazy(() => import('./pages/docs'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Installation = lazy(() => import('./docs/GettingStarted/Installation'));
const Help = lazy(() => import('./docs/GettingStarted/Help'));
const CreatePools = lazy(() => import('./docs/Pools/createPools'));
const Seasons = lazy(() => import('./docs/Pools/seasons'));
const Rate = lazy(() => import('./docs/Rate/CreateRate'));
const SeasonsDashboard = lazy(() => import('./features/seasons/pages/seasons-page').then(m => ({ default: m.SeasonsPage })));
const SeasonLayout = lazy(() => import('./features/seasons/pages/season-layout').then(m => ({ default: m.SeasonLayout })));
const SeasonScoresPage = lazy(() => import('./features/seasons/pages/season-scores-page').then(m => ({ default: m.SeasonScoresPage })));
const EventsPage = lazy(() => import('./features/events/pages/events-page').then(m => ({ default: m.EventsPage })));
const EventDetailPage = lazy(() => import('./features/events/pages/event-detail-page').then(m => ({ default: m.EventDetailPage })));
const WinnersPage = lazy(() => import('./features/events/pages/winners-page').then(m => ({ default: m.WinnersPage })));
const AccuracyPage = lazy(() => import('./features/events/pages/accuracy-page').then(m => ({ default: m.AccuracyPage })));
const UsersDashboard = lazy(() => import('./features/users/pages/users-page').then(m => ({ default: m.UsersPage })));

function App() {
  return (
    <Router>
      <Navbar />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/users" element={<UsersDashboard />} />
          <Route path="/dashboard/:guildId/seasons" element={<SeasonsDashboard />} />
          <Route path="/dashboard/:guildId/seasons/:seasonId" element={<SeasonLayout />}>
            <Route index element={<SeasonScoresPage />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="winners" element={<WinnersPage />} />
            <Route path=":eventId" element={<EventDetailPage />} />
            <Route path=":eventId/accuracy" element={<AccuracyPage />} />
          </Route>
          <Route path="/docs" element={<Docs />}>
            <Route index element={<Installation />} />
            <Route path="installation" element={<Installation />} />
            <Route path="help" element={<Help />} />
            <Route path="create-pools" element={<CreatePools />} />
            <Route path="seasons" element={<Seasons />} />
            <Route path="create-rate" element={<Rate />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;