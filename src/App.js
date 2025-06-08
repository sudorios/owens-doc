import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './pages/Home';
import Docs from './pages/docs';
import Installation from './docs/GettingStarted/Installation';
import Help from './docs/GettingStarted/Help';
import CreatePools from './docs/Pools/createPools';
import Seasons from './docs/Pools/seasons';
import Rate from './docs/Rate/CreateRate';


function App() {
  return (
    <Router>
      <Navbar />
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
    </Router>
  );
}

export default App;
