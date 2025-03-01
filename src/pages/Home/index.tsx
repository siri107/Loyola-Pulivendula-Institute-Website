import { lazy, useEffect } from "react";
import { Fade } from "react-awesome-reveal";
import IntroContent from "../../content/IntroContent.json";
import AboutContent from "../../content/AboutContent.json";
import MissionContent from "../../content/MissionContent.json";
import ProductContent from "../../content/ProductContent.json";
import ContactContent from "../../content/ContactContent.json";

const Contact = lazy(() => import("../../components/ContactForm"));
const MiddleBlock = lazy(() => import("../../components/MiddleBlock"));
const Container = lazy(() => import("../../common/Container"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));
const ContentBlock = lazy(() => import("../../components/ContentBlock"));
const HomePageStartBlock = lazy(() => import("../../components/HomePageStartBlock"));
const EventsLatestStartBlock = lazy(() => import("../../components/Events_Latest"));



const Home = () => {
  useEffect(() => {
    const hasReloaded = localStorage.getItem("hasReloadedInHome");
    
    if (!hasReloaded) {
      localStorage.removeItem("username");
      localStorage.setItem("hasReloadedInHome", "true");
      window.location.reload();
    }
  }, []);
  return (
    <Container>
      <ScrollToTop />
      <HomePageStartBlock
        direction="right"
        title={IntroContent.title}
        content={IntroContent.text}
        button={IntroContent.button}
        videourl={IntroContent.videourl}
        id="intro"
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:mt-20 mt-3">
        <div className="bg-green-200 p-2 rounded-lg">
          <Fade direction="left" triggerOnce fraction={0.3}>
            <ContentBlock
              direction="right"
              title={MissionContent.title}
              content={MissionContent.text}
              icon="product-launch.svg"
              id="mission"
            />
          </Fade>
        </div>
        <div className="bg-[#F5F5DC] p-2 rounded-lg">
          <Fade direction="right" triggerOnce fraction={0.3}>
            <ContentBlock
              direction="left"
              title={AboutContent.title}
              content={AboutContent.text}
              icon="graphs.svg"
              id="about"
            />
          </Fade>
        </div>

      </div>
      <EventsLatestStartBlock
        direction="right"
        title={IntroContent.title}
        content={IntroContent.text}
        button={IntroContent.button}
        videourl={IntroContent.videourl}
        id="intro"
      />
      <h2 className="text-2xl m-2 text-center">Affiliation and Approval</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 text-center">
        {[
          { name: "NBA", img: "img/nba.jpg", text: "ECE and Mechanical Department's Accredited" },
          { name: "AICTE", img: "img/aicte.jpg", text: "Approved by AICTE, New Delhi for quality education" },
          { name: "Govt of Andhra Pradesh", img: "img/goverment.png", text: "Recognized by the Government of Andhra Pradesh" },
          { name: "SBTET", img: "img/sbtet.png", text: "Affiliated to SBTET for technical education" }
        ].map((item, index) => (
          <div key={index} className="p-4 border rounded-lg bg-transparent border-transparent">
            <img src={item.img} alt={item.name} className="w-32 h-32 mx-auto" />
            <p className="mt-2 text-lg font-medium">{item.text}</p>
          </div>
        ))}
      </div>

      <Contact
        title={ContactContent.title}
        content={ContactContent.text}
        id="contact"
      />
    </Container>
  );
};

export default Home;
