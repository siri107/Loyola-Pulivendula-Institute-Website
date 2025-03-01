import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import routes from "./config";
import { Styles } from "../styles/styles";
import About from "../pages/About";
import Home from "../pages/Home";
import Courses from "../pages/Courses";
import Infrastructure from "../pages/Infrastructure";
import Admissions from "../pages/Admissions";
import Events from "../pages/Events";
import CourseSingle from "../pages/Course_Single";
import Admin from "../pages/Admin";
import Login from "../pages/Admin/Login";
import { AuthProvider } from "../components/AuthContext";

const Router = () => {
  return (
    <AuthProvider>
    <Suspense fallback={null}>
      <Styles />
      <Header />
      <Routes>
        {routes.map((routeItem) => (
          <Route
            key={routeItem.component}
            path={"/"}
            element={<Home />}
          />
        ))}
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/infrastructure" element={<Infrastructure />} />
        <Route path="/admissions" element={<Admissions />} />
        <Route path="/events" element={<Events />} />
        <Route path="/course" element={<CourseSingle />} />
        
        {/* Wrap Admin and Login with AuthProvider */}
        <Route
          path="/admin"
          element={
            <AuthProvider>
              <Admin />
            </AuthProvider>
          }
        />
        <Route
          path="/login"
          element={
            <AuthProvider>
              <Login />
            </AuthProvider>
          }
        />
      </Routes>
      <Footer />
    </Suspense>
    </AuthProvider>
  );
};

export default Router;
