import { useState } from "react";
import { Row, Col, Drawer } from "antd";
import { withTranslation, TFunction } from "react-i18next";
import Container from "../../common/Container";
import { SvgIcon } from "../../common/SvgIcon";
import { Button } from "../../common/Button";
import { Link } from "react-router-dom";
import {
  HeaderSection,
  LogoContainer,
  Burger,
  NotHidden,
  Menu,
  CustomNavLinkSmall,
  Label,
  Outline,
  Span,
} from "./styles";
import { useAuth } from "../AuthContext";

const Header = ({ t }: { t: TFunction }) => {
  const [visible, setVisibility] = useState(false);
  const { user, logout } = useAuth(); // Get username and logout from context

  const toggleButton = () => {
    setVisibility(!visible);
  };

  const MenuItem = () => {
    return (
      <>
        <div>
          <CustomNavLinkSmall>
            <Link to="/">
              <Span>{t("Home")}</Span>
            </Link>
          </CustomNavLinkSmall>
          <CustomNavLinkSmall>
            <Link to="/about">
              <Span>{t("About")}</Span>
            </Link>
          </CustomNavLinkSmall>
          <CustomNavLinkSmall>
            <Link to="/courses">
              <Span>{t("Courses")}</Span>
            </Link>
          </CustomNavLinkSmall>
          <CustomNavLinkSmall>
            <Link to="/admissions">
              <Span>{t("Admissions")}</Span>
            </Link>
          </CustomNavLinkSmall>
          <CustomNavLinkSmall>
            <Link to="/events">
              <Span>{t("Gallery")}</Span>
            </Link>
          </CustomNavLinkSmall>
          <CustomNavLinkSmall style={{ width: "130px" }}>
            {user ? (
              <Button onClick={logout}>{t("Logout")}</Button>
            ) : (
              <Link to="/login">
                <Button>{t("Admin Login")}</Button>
              </Link>
            )}
          </CustomNavLinkSmall>
        </div>
      </>
    );
  };

  return (
    <HeaderSection>
      <Container>
        <Row justify="space-between">
          <LogoContainer to="/" aria-label="homepage">
            <SvgIcon src="logo.png" width="256px" height="64px" />
          </LogoContainer>
          <NotHidden>
            <MenuItem />
          </NotHidden>
          <Burger onClick={toggleButton}>
            <Outline />
          </Burger>
        </Row>
        <Drawer closable={false} open={visible} onClose={toggleButton}>
          <Col style={{ marginBottom: "2.5rem" }}>
            <Label onClick={toggleButton}>
              <Col span={12}>
                <Menu>Menu</Menu>
              </Col>
              <Col span={12}>
                <Outline />
              </Col>
            </Label>
          </Col>
          <MenuItem />
        </Drawer>
      </Container>
    </HeaderSection>
  );
};

export default withTranslation()(Header);
