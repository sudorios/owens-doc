import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Navbar from './components/navbar';
import LoadingSpinner from './components/loadingSpinner';

const Home = lazy(() => import('./pages/Home'));
const Docs = lazy(() => import('./pages/docs'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Installation = lazy(() => import('./docs/GettingStarted/Installation'));
const Help = lazy(() => import('./docs/GettingStarted/Help'));
const CreatePools = lazy(() => import('./docs/Pools/createPools'));
const Seasons = lazy(() => import('./docs/Pools/seasons'));
const Rate = lazy(() => import('./docs/Rate/CreateRate'));
const SeasonsDashboard = lazy(() => import('./pages/SeasonsDashboard'));
const SeasonDetail = lazy(() => import('./pages/SeasonDetail'));

function App() {
  return (
    <Router>
      <Navbar />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/:guildId/seasons" element={<SeasonsDashboard />} />
          <Route path="/dashboard/:guildId/seasons/:seasonId" element={<SeasonDetail />} />
          <Route path="/dashboard/:guildId/seasons/:seasonId/:eventId" element={<SeasonDetail />} />
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