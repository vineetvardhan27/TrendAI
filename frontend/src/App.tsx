import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import DashboardHome from './pages/DashboardHome';
import ProductExplorer from './pages/ProductExplorer';
import Upload from './pages/Upload';
import Chat from './pages/Chat';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route without Sidebar */}
        <Route path="/" element={<Landing />} />
        
        {/* App Routes wrapped in Layout */}
        <Route path="/*" element={
          <Layout>
            <Routes>
              <Route path="/dashboard" element={<DashboardHome />} />
              <Route path="/explorer" element={<ProductExplorer />} />
              <Route path="/upload" element={<Upload />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/product/:id" element={<ProductDetail />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
