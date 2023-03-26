import Navbar from "./components/Navbar";
import InputPage from "./pages/inputPage";
import InputProcessingPage from "./pages/inputProcessingPage";
import OutputPage from "./pages/outputPage";
import "./App.scss";

//TODO: díplay filename for the drag and drop
//TODO: validate inpút
//TODO: user hint for inputs
//TODO: define excel tamplate
function App() {
  return (
    <div className="App">
      <Navbar />
      <InputPage />
    </div>
  );
}

export default App;
