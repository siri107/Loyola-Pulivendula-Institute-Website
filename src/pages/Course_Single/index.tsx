import { useEffect, useState } from "react";
import Container from "../../common/Container";
import ScrollToTop from "../../common/ScrollToTop";
import courseData from "../../content/SingleCourse.json";
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { Fade } from "react-awesome-reveal";

interface CourseDetails {
  title: string;
  imageURL: string;
  vision: string;
  mission: string[];
  peos: string[];
  labURL: string;
  pdfLocation: {
    C20: string;
    C23: string;
  };
  headOfDepartment: {
    name: string;
    imageURL: string;
  };
  faculty: {
    imageURL: string;
  };
}

const CourseSingle = () => {
  const [courseName, setCourseName] = useState<string | null>(null);
  const [courseDetails, setCourseDetails] = useState<CourseDetails | null>(null);

  useEffect(() => {
    const storedCourseName = localStorage.getItem("course-name");
    if (storedCourseName) {
      setCourseName(storedCourseName);
    }
  }, []);

  useEffect(() => {
    if (courseName) {
      const selectedCourse = courseData.find((course: { name: string }) => course.name === courseName);
      if (selectedCourse) {
        setCourseDetails({
          title: selectedCourse.title,
          imageURL: selectedCourse.imageURL,
          vision: selectedCourse.vision,
          mission: selectedCourse.mission,
          peos: selectedCourse.peos,
          labURL: selectedCourse.labURL,
          pdfLocation: selectedCourse.pdfLocation || { C20: "", C23: "" },
          headOfDepartment: selectedCourse.headOfDepartment,
          faculty: selectedCourse.faculty || { imageURL: "" }
        });
      }
    }
  }, [courseName]);

  return (
    <Container>
      {courseDetails ? (
        <>
          <h1 className="text-4xl font-semibold text-gray-900 mb-6">{courseDetails.title}</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="flex flex-col items-center text-center">
              <h4 className="text-2xl font-medium text-gray-800">{courseDetails.title} Lab</h4>
              <Fade key="1" triggerOnce duration={300}>
              <img
                src={courseDetails.labURL}
                alt={courseDetails.title}
                className="w-auto h-auto rounded-lg mt-4"
              />
              </Fade>
            </div>
            {courseDetails.headOfDepartment.name && (
              <div className="flex flex-col items-center text-center">
                <h4 className="text-2xl font-medium text-gray-800">Head of Department</h4>
                <Fade key="1" triggerOnce duration={300}>
                <img
                  src={courseDetails.headOfDepartment.imageURL || "./img/mining_engineer.jpg"}
                  alt={courseDetails.headOfDepartment.name || "Mining Engineer"}
                  className="w-48 h-48 rounded-full mt-4"
                />
                </Fade>
                <p className="text-lg text-black font-mono mt-2">{courseDetails.headOfDepartment.name || "Mining Engineer"}</p>
              </div>
            )}
            <div className="flex flex-col items-center text-center">
              <h4 className="text-2xl font-medium text-gray-800">Faculty</h4>
              <Fade key="1" triggerOnce duration={300}>
              <img
                src={courseDetails.faculty.imageURL}
                alt="Faculty Member"
                className="w-auto h-60 rounded-lg mt-4"
              />
              </Fade>
            </div>
          </div>

          <div className="mt-8">
            <h4 className="text-2xl font-medium text-gray-800">Vision</h4>
            <p className="text-lg text-black mt-2">{courseDetails.vision}</p>
          </div>

          <div className="mt-8">
            <h4 className="text-2xl font-medium text-gray-800">Mission</h4>
            <ul className="list-inside list-disc pl-6 mt-2 space-y-2">
              {courseDetails.mission.map((item, index) => (
                <li key={index} className="text-lg text-black">{item}</li>
              ))}
            </ul>
          </div>

          <div className="mt-8">
            <h4 className="text-2xl font-medium text-gray-800">Program Educational Objectives (PEOs)</h4>
            <ul className="list-inside list-disc pl-6 mt-2 space-y-2">
              {courseDetails.peos.map((item, index) => (
                <li key={index} className="text-lg text-black">{item}</li>
              ))}
            </ul>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-2xl font-medium text-gray-800 mb-4">C20 Curriculum</h4>
              <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}>
                <div style={{
                  border: '1px solid rgba(0, 0, 0, 0.3)',
                  height: '750px',
                }}>
                  <Viewer fileUrl={courseDetails.pdfLocation.C20} />
                </div>
              </Worker>
            </div>
            <div>
              <h4 className="text-2xl font-medium text-gray-800 mb-4">C23 Curriculum</h4>
              <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}>
                <div style={{
                  border: '1px solid rgba(0, 0, 0, 0.3)',
                  height: '750px',
                }}>
                  <Viewer fileUrl={courseDetails.pdfLocation.C23} />
                </div>
              </Worker>
            </div>
          </div>
        </>
      ) : (
        <p className="text-lg text-gray-500">Loading course details...</p>
      )}

      <ScrollToTop />
    </Container>
  );
};

export default CourseSingle;
