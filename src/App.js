import Navbar from './components/Navbar'
import InputPage from './pages/inputPage';
import InputProcessingPage from './pages/inputProcessingPage';
import OutputPage from './pages/outputPage';
import './App.scss';


function App() {
  return (
    <div className="App">
      <Navbar />
      <OutputPage />
    </div>

  );
}

export default App;
