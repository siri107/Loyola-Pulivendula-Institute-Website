import { useState } from "react";
import { Row, Col } from "antd";
import { Slide } from "react-awesome-reveal";
import { Button } from "../../common/Button";
import Input from "../../common/Input";
import { ContactContainer, FormGroup, Span, ButtonContainer } from "../Admin/styles";
import { useNavigate } from "react-router-dom";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { useAuth } from "../../components/AuthContext";

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

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();


  const checkCredentials = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    let userExists = false;

    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      if (userData.username === username && userData.password === password) {
        userExists = true;
        localStorage.setItem("username", userData.username);
        localStorage.setItem("password", userData.password);
        login(userData.username);
        localStorage.removeItem("hasReloadedInHome");
        navigate("/admin");
      }
    });

    if (!userExists) {
      setErrorMessage("Incorrect username or password.");
    }
    else{
      navigate("/admin");
    }
  };

  return (
    <ContactContainer>
      <p className="text-center">For evaluation purposes, please use the username <span className="text-black"><b>admin</b></span> and password <span className="text-black"><b>admin</b></span></p>
      <Row justify="space-between" align="middle" style={{ minHeight: "20vh" }}>
        <Col
          lg={12}
          md={11}
          sm={24}
          xs={24}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          
          <Slide direction="left" triggerOnce>
            <h2>Login</h2>
            <img
              src="img/login.png"
              alt="Admin icon"
              style={{ width: "100px", height: "100px" }}
            />
            
            <p className="p-8">
              Admin can Add a new Event.<br />
              Admin can delete the existing Event. <br />
              Admin can see the responses submitted through the contact form present on the homepage.<br />
            </p>
          </Slide>
        </Col>
        <Col lg={12} md={12} sm={24} xs={24}>
          <Slide direction="right" triggerOnce>
            <FormGroup autoComplete="off" onSubmit={(e) => e.preventDefault()}>
              <Col span={24}>
                <Input
                  type="text"
                  name="UserName"
                  placeholder="Please Enter Your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Col>
              <Col span={24}>
                <Input
                  type="password"
                  name="Password"
                  placeholder="Please Enter your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Col>
              <ButtonContainer>
                <Button name="submit" onClick={checkCredentials}>
                  Login
                </Button>
              </ButtonContainer>
              {errorMessage && <Span style={{ color: "red" }}>{errorMessage}</Span>}
            </FormGroup>
          </Slide>
        </Col>
      </Row>
    </ContactContainer>
  );
};

export default Login;
