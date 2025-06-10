import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Navbar from './components/navbar';
import LoadingSpinner from './components/loadingSpinner';

const Home = lazy(() => import('./pages/Home'));
const Docs = lazy(() => import('./pages/docs'));
const Installation = lazy(() => import('./docs/GettingStarted/Installation'));
const Help = lazy(() => import('./docs/GettingStarted/Help'));
const CreatePools = lazy(() => import('./docs/Pools/createPools'));
const Seasons = lazy(() => import('./docs/Pools/seasons'));
const Rate = lazy(() => import('./docs/Rate/CreateRate'));

function App() {
  return (
    <Router>
      <Navbar />
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Home />} />
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