import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../App.css';
import { Login } from './pages/auth/Login';
import { Dashboard } from './pages/dashboard/Dashboard';
import { Layout } from './layout/MainLayout';
import { Conversation } from './pages/conversation/Conversation';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route index element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route path='/me' element={<Dashboard />} />
        <Route path="/conversation/:id" element={<Conversation />} />
      </Route>

    </Routes>
  </BrowserRouter>
);

export default App;
