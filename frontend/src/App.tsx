import Header from "./components/Header";
import HeroSection from "./components/landing_page/HeroSection";
import ToolList from "./components/landing_page/ToolList";

import "./index.css";

function App() {
  return (
    <>
      <Header />
      <div className="bg-gray-50 min-h-screen">
        <section className="pt-44">
          <HeroSection />
        </section>

        <section className="pt-24">
          <ToolList />
        </section>
      </div>
    </>
  );
}

export default App;
