import Navbar from "./components/Navbar";
import InputPage from "./pages/inputPage";
import InputProcessingPage from "./pages/inputProcessingPage";
import GuidePage from "./pages/guidePage";
import OutputPage from "./pages/outputPage";
import "./App.scss";
import {Routes, Route, useNavigate} from 'react-router-dom'
import { createContext, useState } from "react";
import DataContext from "./context/DataContext";
import InsightPage from "./pages/insightPage";
//TODO: guide page
//TODO: style the pages
function App() {
  const [data, setData] = useState(null)
  const [guideSectionIndex, setGuideSectionIndex] = useState(0)
  return (
    <DataContext.Provider value={{data, setData, guideSectionIndex, setGuideSectionIndex}}>
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<InputPage />} />
        <Route path="/input" element={<InputPage />} />
        <Route path="/guide" element={<GuidePage />} />
        <Route path="/input-processing" element={<InputProcessingPage />} />
        <Route path="/result" element={<OutputPage />} />
        <Route path='/insights' element={<InsightPage />} />
        <Route path="*" element={<InputPage />} />
      </Routes>
    </div>
    </DataContext.Provider>
  );
}

export default App;
