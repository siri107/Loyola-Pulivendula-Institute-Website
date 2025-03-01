import { Fade } from "react-awesome-reveal";
import { withTranslation } from "react-i18next";
import { HomePageStartBlockProps } from "./types";
import { Button } from "../../common/Button";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const images = [
  "img/event1.jpeg",
  "img/event_1.jpeg",
  "img/slide_2.jpeg",
  "img/event_3.jpeg",
  "img/event_2.jpeg",
  "img/slide_1.jpeg"
];

const HomePageStartBlock = ({
  title,
  content,
  button,
  t,
  id,
  direction,
}: HomePageStartBlockProps) => {
  const navigation = useNavigate();

  return (
    <section className="py-12 bg-white">
      <Fade direction={direction} triggerOnce>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8" id={id}>
            {/* First Grid: Welcome content and buttons */}
            <div className="flex flex-col justify-center space-y-6">
              <h6 className="text-5xl font-extrabold font-mono" style={{color: "#414886"}}>{t(title)}</h6>
              <p className="text-1xl text-black font-extrabold">{t(content)}</p>
              {direction === "right" && (
                <div className="flex space-x-4">
                  {Array.isArray(button) &&
                    button.map((item, id) => (
                      <Button
                        key={id}
                        color={item.color}
                        onClick={() => navigation(item.url)}
                      >
                        {t(item.title)}
                      </Button>
                    ))}
                </div>
              )}
            </div>

            {/* Second Grid: Image Carousel */}
            <div className="flex justify-center">
              <Carousel
                showArrows={true}
                autoPlay={true}
                infiniteLoop={true}
                interval={1500}
                showThumbs={false}
                className="w-full sm:h-80 lg:h-96 rounded-md shadow-lg"
              >
                {images.map((img, index) => (
                  <div key={index}>
                    <img src={img} alt={`event_${index + 1}`} className="w-full h-full object-cover rounded-md" />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </Fade>
    </section>
  );
};

export default withTranslation()(HomePageStartBlock);
