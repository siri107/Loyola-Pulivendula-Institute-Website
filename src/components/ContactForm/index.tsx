import { Row, Col } from "antd";
import { withTranslation } from "react-i18next";
import { Slide } from "react-awesome-reveal";
import { ContactProps, ValidationTypeProps } from "./types";
import { useForm } from "../../common/utils/useForm";
import { SvgIcon } from "../../common/SvgIcon";
import validate from "../../common/utils/validationRules";
import { Button } from "../../common/Button";
import Block from "../Block";
import Input from "../../common/Input";
import TextArea from "../../common/TextArea";
import { ContactContainer, FormGroup, Span, ButtonContainer } from "./styles";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCYbTOTqUajcIkd8oCvpEadFt7RyvBjfng",
  authDomain: "loyola-institute-website.firebaseapp.com",
  projectId: "loyola-institute-website",
  storageBucket: "loyola-institute-website.firebasestorage.app",
  messagingSenderId: "402915219080",
  appId: "1:402915219080:web:7ea779b21ce69e4829313d",
  measurementId: "G-M5X9CS51T0"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const analytics = getAnalytics(app);

const Contact = ({ title, content, id, t }: ContactProps) => {
  const { values, errors, handleChange, handleSubmit } = useForm(validate);

  const handleReset = () => {
    values.name = "";
    values.email = "";
    values.message = "";
  };

  const ValidationType = ({ type }: ValidationTypeProps) => {
    const ErrorMessage = errors[type as keyof typeof errors];
    return <span className="text-red-500 text-sm">{ErrorMessage}</span>;
  };

  const handleSubmitForm = async (event: React.FormEvent) => {
    if(!values.name){
      alert("Please fill your name");
      return;
    }
    if(!values.email){
      alert("Please fill your email id");
      return;
    }
    if(!values.message){
      alert("Please enter your message");
      return;
    }
    event.preventDefault();
    const isValid = validate(values);
    if (!isValid) return;
    try {
      await addDoc(collection(db, "contact-form"), {
        name: values.name,
        email: values.email,
        message: values.message,
        timestamp: new Date(),
      });
      handleReset();
      alert("Message submitted successfully! Your message has been received! Thanks for contacting us! Our team will respond to you as soon as possible.");
    } catch (error) {
      console.error("Error submitting message: ", error);
      alert("There was an error submitting your message.");
    }
  };

  return (
    <div id={id} className="container mx-auto p-4">
      <h2 className="text-center text-2xl font-bold mb-8">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-stone-300 p-8 rounded-lg flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 flex items-center justify-center hidden md:flex">
            <SvgIcon src={"waving.svg"} width="100%" height="100%" />
          </div>
          <div className="w-full md:w-1/2">
            <Slide direction="right" triggerOnce>
              <div className="mb-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={values.name || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <ValidationType type="name" />
              <div className="mb-4">
                <input
                  type="text"
                  name="email"
                  placeholder="Your Email"
                  value={values.email || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <ValidationType type="email" />
              <div className="mb-4">
                <textarea
                  placeholder="Your Message"
                  name="message"
                  value={values.message || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <ValidationType type="message" />
              <div className="text-center">
                <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition" onClick={handleSubmitForm}>
                  {t("Submit")}
                </button>
              </div>
            </Slide>
          </div>
        </div>
        <div className="w-full h-auto rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3718.311651150329!2d78.2331143104207!3d14.414105381557754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb3ebb20e9d78fd%3A0xc274721f5e7a7a53!2sLoyola%20Polytechnic%20College%2CPulivendula!5e1!3m2!1sen!2sin!4v1740439198497!5m2!1sen!2sin"
            className="w-full h-full border-none"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default withTranslation()(Contact);