// src/pages/LandingPage.js
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./LandingPage.css";
import logo from "../assets/logo.png"; // Make sure this path matches your file location

export default function LandingPage() {
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-out-cubic",
      once: true,
      disable: false,
    });
  }, []);

  return (
    <div className="landing-container">
      {/* Header Section */}
      <header className="landing-header" data-aos="fade-down">
        <img src={logo} alt="Rezoomie Logo" className="site-logo" />
        <h1>
          Build Your <span className="highlight">Perfect Resume</span> in Minutes
        </h1>
        <p className="sub-text">
          A free, easy-to-use tool to create professional resumes instantly.
        </p>
        <Link to="/builder" className="cta-button">
          🚀 Create My Resume
        </Link>
      </header>

      {/* Features Section */}
      <section className="features container" data-aos="fade-up">
        <h2 className="features-title">Why Choose Rezoomie?</h2>
        <p className="features-subtitle">
          Everything you need to create a standout resume that gets results
        </p>
        <div className="feature-cards">
          <div className="feature-card" data-aos="zoom-in" data-aos-delay="100">
            <div className="icon">⚡</div>
            <h3>Lightning Fast</h3>
            <p>
              Build your resume in under 10 minutes with our streamlined process.
            </p>
          </div>
          <div className="feature-card" data-aos="zoom-in" data-aos-delay="200">
            <div className="icon">🎯</div>
            <h3>ATS Optimized</h3>
            <p>Ensure your resume passes applicant tracking systems.</p>
          </div>
          <div className="feature-card" data-aos="zoom-in" data-aos-delay="300">
            <div className="icon">✅</div>
            <h3>HR Approved</h3>
            <p>Templates designed by hiring managers and HR professionals.</p>
          </div>
          <div className="feature-card" data-aos="zoom-in" data-aos-delay="400">
            <div className="icon">📄</div>
            <h3>Multiple Formats</h3>
            <p>Export in PDF, Word, or share with a custom link.</p>
          </div>
        </div>
      </section>

      {/* Highlight Section */}
      <section className="highlight-section" data-aos="fade-left">
        <div className="container highlight-content">
          <div className="highlight-text">
            <h2>Land More Interviews</h2>
            <p>
              Our professionally designed templates and expert guidance help you
              create resumes that hiring managers love to read.
            </p>
            <ul>
              <li>Increase interview callbacks by 40%</li>
              <li>Save hours of formatting time</li>
              <li>Get past ATS filters easily</li>
              <li>Professional designs that impress</li>
            </ul>
          </div>
          <div className="highlight-image">
            {/* Optional: Add an SVG or resume preview image here */}
          </div>
        </div>
      </section>

      {/* Final Call-To-Action Section */}
      <section className="final-cta" data-aos="fade-up">
        <div className="container">
          <h2>Ready to Build Your Resume?</h2>
          <p>
            Join thousands of professionals who've landed their dream jobs with
            Rezoomie.
          </p>
          <Link to="/builder" className="btn-primary">
            Start Building Now →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" data-aos="fade-in">
        <div className="container">
          <div className="logo-text">Rezoomie</div>
          <p>© 2025 Rezoomie. Build better resumes, land better jobs.</p>
          <p>Developed by Deepak Kumar</p>
        </div>
      </footer>
    </div>
  );
}
