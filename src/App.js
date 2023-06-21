import Navbar from "./components/Navbar";
import InputPage from "./pages/inputPage";
import InputProcessingPage from "./pages/inputProcessingPage";
import GuidePage from "./pages/guidePage";
import OutputPage from "./pages/outputPage";
import "./App.scss";
import { Routes, Route, useNavigate } from 'react-router-dom'
import { createContext, useState } from "react";
import DataContext from "./context/DataContext";
import InsightPage from "./pages/insightPage";
import PopupContext from "./context/PopupContext";
import Popup from './components/Popup'

//TODO: about page
function App() {
  const [data, setData] = useState(null)
  const [guideSectionIndex, setGuideSectionIndex] = useState(0)
  const [popupError, setPopupError] = useState(false)
  const [popupTitle, setPopupTitle] = useState("")
  const [popupMessage, setPopupMessage] = useState("")
  const [showPopup, setShowPopup] = useState(false)
  const [popupOkCallBack, setPopupOkCallBack] = useState()
  const displayPopup = (title, message, error) => {
    setShowPopup(true)
    setPopupTitle(title)
    setPopupMessage(message)
    if (error) {
      setPopupError(error)
    }
  }
  return (
    <DataContext.Provider value={{ data, setData, guideSectionIndex, setGuideSectionIndex }}>
      <PopupContext.Provider value={{ displayPopup }}>

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

        <Popup 
            isShow={showPopup}
            setIsShow={setShowPopup}
            title={popupTitle}
            message={popupMessage}
            error={popupError}
            okCallback={popupOkCallBack}
          />
      </PopupContext.Provider>
    </DataContext.Provider>
  );
}

export default App;
