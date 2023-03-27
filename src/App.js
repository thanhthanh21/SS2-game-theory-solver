import Navbar from "./components/Navbar";
import InputPage from "./pages/inputPage";
import InputProcessingPage from "./pages/inputProcessingPage";
import GuidePage from "./pages/guidePage";
import OutputPage from "./pages/outputPage";
import "./App.scss";
import {Routes, Route, useNavigate} from 'react-router-dom'

//TODO: guide page
//TODO: style the pages
function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<InputPage />} />
        <Route path="/input" element={<InputPage />} />
        <Route path="/guide" element={<GuidePage />} />
        <Route path="/input-processing" element={<InputProcessingPage />} />
        <Route path="/result" element={<OutputPage />} />
        <Route path="*" element={<InputPage />} />
      </Routes>
    </div>
  );
}

export default App;
