import Navbar from "./components/Navbar";
import InputPage from "./pages/inputPage";
import InputProcessingPage from "./pages/inputProcessingPage";
import OutputPage from "./pages/outputPage";
import "./App.scss";

//TODO: adding the excel button
//TODO: adding the drag and drop
//TODO: user hint for inputs
function App() {
  return (
    <div className="App">
      <Navbar />
      <InputPage />
    </div>
  );
}

export default App;
