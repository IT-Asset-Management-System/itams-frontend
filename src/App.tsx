import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import { Layout, Homepage } from './pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
