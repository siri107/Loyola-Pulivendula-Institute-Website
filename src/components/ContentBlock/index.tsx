import { withTranslation } from "react-i18next";
import { ContentBlockProps } from "./types";
import { Button } from "../../common/Button";
import { SvgIcon } from "../../common/SvgIcon";

const ContentBlock = ({
  icon,
  title,
  content,
  section,
  button,
  t,
  id,
  direction,
}: ContentBlockProps) => {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id) as HTMLDivElement;
    element.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div id={id} className="w-full py-10">
      <div className="text-center">
        <h6 className="text-2xl font-bold">{t(title)}</h6>
      </div>
      <div className="flex flex-col lg:flex-row justify-between items-stretch">
        {/* SVG Icon on the left (occupying full left space) */}
        <div className="flex justify-center items-center w-full lg:w-1/2">
          <SvgIcon src={icon} width="100%" height="auto" />
        </div>

        {/* Content on the right */}
        <div className="flex justify-start items-center w-full lg:w-1/2 p-1">
          <div className="text-left">
            <p className="text-lg text-black font-semibold">{t(content)}</p>

            {direction === "right" && button && (
              <div className="mt-4">
                {Array.isArray(button) &&
                  button.map((item, id) => (
                    <button
                      key={id}
                      className={`px-4 py-2 text-white rounded ${
                        item.color ? `bg-${item.color}-500` : "bg-blue-500"
                      }`}
                      onClick={() => scrollTo("about")}
                    >
                      {t(item.title)}
                    </button>
                  ))}
              </div>
            )}

            {direction !== "right" && section && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.isArray(section) &&
                  section.map((item, id) => (
                    <div key={id} className="flex items-center space-x-4">
                      <SvgIcon src={item.icon} width="60px" height="60px" />
                      <div>
                        <p className="font-bold">{t(item.title)}</p>
                        <p className="text-sm text-black font-semibold">{t(item.content)}</p>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withTranslation()(ContentBlock);
