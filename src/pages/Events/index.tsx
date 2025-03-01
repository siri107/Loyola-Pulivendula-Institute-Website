import MiddleBlockContent from "../../content/Events.json"; // Assuming this is an array of event objects
import Container from "../../common/Container";
import ScrollToTop from "../../common/ScrollToTop";
import { Fade } from "react-awesome-reveal";
import AchievementsContent from "../../content/Achivements.json";

const Events = () => {
  return (
    <Container>
      <h2 className="text-center text-4xl mb-2">Events</h2>
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 md:gap-10 gap-8 bg-transparent">
        {MiddleBlockContent.map((event, index) => (
          <Fade key={index}>
            <div className="group relative overflow-hidden rounded-lg shadow-lg bg-[#F5F5DC]">
              <img 
                src={event.imageURL} 
                alt={event.title} 
                className="w-full h-64 object-cover rounded-2xl transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
              <div className="p-4 flex justify-center items-center">
                <h3 className="text-xl font-semibold text-gray-800 text-center">
                  {event.title}
                </h3>
              </div>
            </div>
          </Fade>
        ))}
      </div>

      {/* Achievements */}
      <h2 className="text-center text-4xl mb-2 mt-10">Achievements</h2>
      <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 md:gap-10 gap-8 bg-transparent">
        {AchievementsContent.map((event, index) => (
          <Fade key={index}>
            <div className="group relative overflow-hidden rounded-lg shadow-lg">
              <img 
                src={event.imageURL} 
                alt={`Achievement ${index + 1}`} 
                className="w-full h-64 rounded-2xl transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
            </div>
          </Fade>
        ))}
      </div>
      <ScrollToTop />
    </Container>
  );
};

export default Events;
