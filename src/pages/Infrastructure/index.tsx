import MiddleBlockContent from "../../content/Infrastructure.json"; // Assuming this is an array of course objects
import Container from "../../common/Container";
import ScrollToTop from "../../common/ScrollToTop";
import { Fade } from "react-awesome-reveal";

const Infrastructure = () => {
  return (
    <Container>
      <h2 className="text-3xl text-center mb-1">Infra Structure</h2>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-16 md:grid-cols-2 md:gap-12">
        {MiddleBlockContent.map((course, index) => (
          <Fade key={index}>
            <div className="group relative overflow-hidden rounded-lg shadow-lg bg-[#F5F5DC]">
              <img 
                src={course.imageURL} 
                alt={course.title} 
                className="w-full h-64 object-cover rounded-2xl bg-transparent transform transition-transform duration-300 hover:scale-110"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 text-center">
                  {course.title}
                </h3>
                {course.button && (
                  <button className="mt-4 py-2 px-4 bg-indigo-600 text-white text-sm rounded-full hover:bg-indigo-700 transition duration-300">
                    {course.button}
                  </button>
                )}
              </div>
            </div>
          </Fade>
        ))}
      </div>
      <ScrollToTop />
    </Container>
  );
};

export default Infrastructure;