"use client"
import React from "react";
import styled from "styled-components";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";

const AboutContainer = styled.div`
  background-color: #1c1c1c;
  color: #f8f9fa;
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AboutContent = styled.div`
  max-width: 1200px;
  text-align: center;
  background: rgba(28, 28, 28, 0.8);
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 215, 0, 0.3);
  backdrop-filter: blur(10px);
  transition: background 0.3s ease, border 0.3s ease;
`;

const AboutHeading = styled.h1`
  color: #ffd700;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
`;

const AboutParagraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: #f8f9fa;
`;

const Highlight = styled.span`
  color: #ffd700;
  font-weight: bold;
`;

const TeamSection = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 2rem;
`;

const TeamMember = styled.div`
  background: rgba(28, 28, 28, 0.9);
  padding: 1.5rem;
  border-radius: 10px;
  text-align: center;
  width: 250px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center; /* Centra los elementos horizontalmente */
  justify-content: center; /* Centra los elementos verticalmente */

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
  }
`;

const MemberPhoto = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 1rem;
  border: 2px solid #ffd700;
  object-fit: cover;
  display: block;
`;
const MemberName = styled.h3`
  color: #ffd700;
  margin-bottom: 0.5rem;
`;

const MemberRole = styled.p`
  color: #f8f9fa;
  font-size: 1rem;
`;

const AboutPage: React.FC = () => {
  return (
    <div>
      <Navbar />

      <AboutContainer>
        <AboutContent>
          <AboutHeading>About Us</AboutHeading>
          <AboutParagraph>
            Welcome to <Highlight>Mi Empresa</Highlight>, where we provide the
            best services in the industry. Our team is committed to delivering
            high-quality solutions tailored to your needs.
          </AboutParagraph>
          <AboutParagraph>
            At <Highlight>Mi Empresa</Highlight>, our mission is to ensure
            customer satisfaction through innovation, dedication, and expertise.
            We take pride in our ability to tackle complex challenges and turn
            them into opportunities.
          </AboutParagraph>

          <TeamSection>
            <TeamMember>
              <MemberPhoto src="/1a.webp" alt="Team Member 1" />
              <MemberName>John Doe</MemberName>
              <MemberRole>CEO</MemberRole>
            </TeamMember>

            <TeamMember>
              <MemberPhoto src="/2a.webp" alt="Team Member 2" />
              <MemberName>Jane Smith</MemberName>
              <MemberRole>CTO</MemberRole>
            </TeamMember>

            <TeamMember>
              <MemberPhoto src="/3a.webp" alt="Team Member 3" />
              <MemberName>Sam Wilson</MemberName>
              <MemberRole>Lead Developer</MemberRole>
            </TeamMember>
          </TeamSection>
        </AboutContent>
      </AboutContainer>
      <Footer/>
    </div>
  );
};

export default AboutPage;
