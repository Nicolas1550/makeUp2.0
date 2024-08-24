"use client";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import Navbar from "../components/navbar/navbar";

const ContactContainer = styled.div`
  background-color: #1c1c1c;
  color: #f8f9fa;
  min-height: 100vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContactContent = styled.div`
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

const ContactHeading = styled.h1`
  color: #ffd700;
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  text-shadow: 0 0 10px rgba(255, 215, 0, 0.5);
`;

const ContactParagraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  color: #f8f9fa;
`;

const Highlight = styled.span`
  color: #ffd700;
  font-weight: bold;
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  margin-top: 2rem;
`;

const FormInput = styled.input`
  width: 100%;
  max-width: 500px;
  padding: 0.75rem;
  background: rgba(28, 28, 28, 0.9);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 5px;
  color: #f8f9fa;
  font-size: 1rem;
  transition: border 0.3s ease, background 0.3s ease;

  &:focus {
    border-color: #ffd700;
    background: rgba(28, 28, 28, 1);
  }
`;

const FormTextArea = styled.textarea`
  width: 100%;
  max-width: 500px;
  padding: 0.75rem;
  background: rgba(28, 28, 28, 0.9);
  border: 1px solid rgba(255, 215, 0, 0.3);
  border-radius: 5px;
  color: #f8f9fa;
  font-size: 1rem;
  resize: none;
  transition: border 0.3s ease, background 0.3s ease;

  &:focus {
    border-color: #ffd700;
    background: rgba(28, 28, 28, 1);
  }
`;

const SubmitButton = styled.button`
  padding: 0.75rem 2rem;
  background-color: #ffd700;
  color: #1c1c1c;
  border: none;
  border-radius: 5px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #1c1c1c;
    color: #ffd700;
  }
`;

const ContactPage: React.FC = () => {
  const form = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(form.current!);
    const data = {
      user_name: formData.get("user_name"),
      user_email: formData.get("user_email"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch("http://localhost:3001/api/email", {
        // Apunta a tu backend en el puerto 3001
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Message sent successfully!");
      } else {
        alert("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Navbar />

      <ContactContainer>
        <ContactContent>
          <ContactHeading>Contact Us</ContactHeading>
          <ContactParagraph>
            We are here to help! Fill out the form below and a member of our team
            will get back to you as soon as possible.
          </ContactParagraph>

          <ContactForm ref={form} onSubmit={sendEmail}>
            <FormInput
              type="text"
              name="user_name"
              placeholder="Your Name"
              required
            />
            <FormInput
              type="email"
              name="user_email"
              placeholder="Your Email"
              required
            />
            <FormTextArea
              name="message"
              placeholder="Your Message"
              rows={6}
              required
            />
            <SubmitButton type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </SubmitButton>
          </ContactForm>
        </ContactContent>
      </ContactContainer>
    </div>
  );
};

export default ContactPage;
