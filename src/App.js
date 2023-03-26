import Navbar from "./components/Navbar";
import InputPage from "./pages/inputPage";
import InputProcessingPage from "./pages/inputProcessingPage";
import OutputPage from "./pages/outputPage";
import "./App.scss";

//TODO: guide page
//TODO: routing
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
