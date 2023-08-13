import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '../App.css';
import { Login } from './pages/auth/Login';
import { Dashboard } from './pages/dashboard/Dashboard';
import { Layout } from './layout/MainLayout';
import { Conversation } from './pages/conversation/Conversation';
import { Translate } from './pages/Translate/Translate';
import { Chats } from './pages/Chats/Chats';
// import DictionaryApp from './pages/Dictionary/Dictionary';
import { TextToSpeech } from './pages/texttospeech/TextToSpeech';
import { VideoTranslator } from './pages/videotranlator/VideoTranslator';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route index element={<Login />} />
      <Route path="/" element={<Layout />}>
        {/* <Route path='/dictionary' element={<DictionaryApp />} /> */}
        <Route path='/tovoice' element={<TextToSpeech />} />
        <Route path='/me' element={<Dashboard />} />
        <Route path='/conversation' element={<Chats />} />
        <Route path="/conversation/:id" element={<Conversation />} />
        <Route path="/sl2text" element={<Translate />} />
        <Route path="/video" element={<VideoTranslator />} />
      </Route>

    </Routes>
  </BrowserRouter>
);

export default App;
