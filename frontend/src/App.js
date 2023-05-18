import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import Stack from 'react-bootstrap/Stack';
import MainBody from "./pages/MainBody";

function App() {
  return (
    <div className="app">
      <Stack >
        <NavBar />
        <div className="main_body " >
          <MainBody />
        </div>
        <Footer />
      </Stack>
    </div>
  );
}

export default App;
