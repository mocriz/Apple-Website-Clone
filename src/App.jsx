import { CarouselAppleTV } from "./components/Carousel";
import DisclaimerPopup from "./components/DisclaimerPopup";
import Footer from "./components/Footer";
import {Hero, HeroGrid} from "./components/Hero";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <HeroGrid />
      <CarouselAppleTV/>
      <DisclaimerPopup/>
      <Footer/>
    </>
  );
}

export default App;
