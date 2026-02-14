import Navbar from "./components/Navbar";
import AllRoutes from "./routes/AllRoutes";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Navbar />
      <AllRoutes />
      <Footer />
      <ScrollToTop />
    </div>
  );
}

export default App;
