import HeroSection from "../components/landing_page/HeroSection";
import ToolList from "../components/landing_page/ToolList";

const HomePage: React.FC = () => {
  return (
    <>
      <div className="bg-gray-50">
        <section className="pt-44">
          <HeroSection />
        </section>

        <section className="pt-24">
          <ToolList />
        </section>
      </div>
    </>
  );
};

export default HomePage;
