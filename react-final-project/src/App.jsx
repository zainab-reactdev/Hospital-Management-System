import Header from "./components/Header";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";
import './App.css';


function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      {/* Header (logo + nav) */}
      <Header />

      {/* Routes */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <AppRoutes />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
