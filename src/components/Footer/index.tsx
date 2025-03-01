import { Row, Col } from "antd";
import { withTranslation, TFunction } from "react-i18next";
import { SvgIcon } from "../../common/SvgIcon";
import Container from "../../common/Container";
import i18n from "i18next";
import {
  FooterSection,
  Title,
  NavLink,
  Extra,
  LogoContainer,
  Para,
  Large,
  Chat,
  Empty,
  FooterContainer,
  Language,
  Label,
  LanguageSwitch,
  LanguageSwitchContainer,
} from "./styles";

interface SocialLinkProps {
  href: string;
  src: string;
}

const Footer = ({ t }: { t: TFunction }) => {
  return (
    <>
      <FooterSection>
        <Container>
          <Row justify="space-between">
            <Col lg={8} md={8} sm={12} xs={12}>
              <Language>{t("How to Reach us")}</Language>
              <Row align="middle" style={{ gap: '16px', marginTop: '5px'}}>
                <SvgIcon src={"phone.svg"} aria-label="mobile" width="48px" height="48px" />
                <div>
                  <Large to="tel:+91 9912342029">{t("+91 9912342029")}</Large>
                  <Large to="tel:08568-286309">{t("08568 - 286309")}</Large>
                </div>
              </Row>
              <Row align="middle" style={{ marginTop: '8px', gap: '16px' }}>
                <SvgIcon src={"mail.svg"} aria-label="email" width="48px" height="48px" />
                <a href="mailto:loyolapoly.pulivendla@gmail.com">
                  <Chat className="text-base">{t("loyolapoly.pulivendla@gmail.com")}</Chat>
                </a>
              </Row>
            </Col>

            <Col lg={8} md={8} sm={12} xs={12}>
              <Title>{t("Useful Links")}</Title>
              <Large to="https://sbtet.ap.gov.in/APSBTET/results.do" target="_blank" rel="noopener noreferrer">
                {t("Exam Results")}
              </Large>
              <Large to="https://www.aicte-india.org/" target="_blank" rel="noopener noreferrer">
                {t("AICTE India")}
              </Large>
              <Large to="https://sbtet.ap.gov.in/APSBTET/" target="_blank" rel="noopener noreferrer">
                {t("SBTET, AP")}
              </Large>
              <Large to="https://dteap.nic.in/" target="_blank" rel="noopener noreferrer">
                {t("Department of Technical Education")}
              </Large>
            </Col>

            <Col lg={8} md={8} sm={12} xs={12}>
              <Title>{t("Quick Links")}</Title>
              <Large to="Institute_pdfs/BROCHURE.pdf" target="_blank" rel="noopener noreferrer">
                {t("Institute Brochure")}
              </Large>
              <Large to="Institute_pdfs/AICTE_EOA.pdf" target="_blank" rel="noopener noreferrer">
                {t("AICTE Extension of Approval")}
              </Large>
              
            </Col>
          </Row>
          
          <Row justify="space-between">
            <Col lg={10} md={10} sm={12} xs={12}>
              <Empty />
              <Language>{t("Address")}</Language>
              <Row align="middle" style={{ gap: '16px' }}>
                <SvgIcon src={"location.svg"} aria-label="location" width="48px" height="48px" />
                <div className="text-base">
                  <Para>Loyola Polytechnic College (YSRR),</Para>
                  <Para>Pulivendla - 516390, YSR District,</Para>
                  <Para>Andhra Pradesh, India.</Para>
                </div>
              </Row>
            </Col>
            <Col lg={8} md={8} sm={12} xs={12}>
              <Title>{t("Developers")}</Title>
              <Para className="font-semibold">{t(`Sir D.Naresh`)}</Para>
              <Para className="font-semibold">{t(`A. Siri (22029-cm-107)`)}</Para>
              <Para className="font-semibold">{t(`B.Pavithra (22029-cm-093)`)}</Para>
              <Para className="font-semibold">{t(`K.Lavanya (22029-cm-081)`)}</Para>
              <Para className="font-semibold">{t(`K.Sai Sree (22029-cm-103)`)}</Para>
            </Col>
          </Row>
        </Container>
      </FooterSection>

      <Extra>
        <Container border={true}>
          <Row justify="space-between" align="middle" style={{ paddingTop: "1rem" }}>
            <NavLink to="/">
              <LogoContainer>
                <SvgIcon src="logo.png" aria-label="homepage" width="256px" height="64px" />
              </LogoContainer>
            </NavLink>
            <FooterContainer>
              <p>copyright ⓒ 2025, Loyola Polytechnic, Pulivendula. Last updated: 28w/02/2025</p>
            </FooterContainer>
          </Row>
        </Container>
      </Extra>
    </>
  );
};

export default withTranslation()(Footer);