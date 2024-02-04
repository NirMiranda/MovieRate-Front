// About.tsx
import React from 'react';
import { BiArrowToTop, BiMovie, BiChat, BiStar } from 'react-icons/bi';
import './About.css';
import Logo from '../../components/Logo/Logo';

function About() {
  return (
    <div className="about-container">
      <div className="left-content">
        <div className="section">
          <h1 className="title">
            <BiMovie /> Our Platform
          </h1>
          <p className="description">
            Welcome to MoView, where movie enthusiasts gather to share their passion for cinema.
          </p>
        </div>

        <div className="section">
          <h1 className="title">
            <BiStar /> Why Choose MoView?
          </h1>
          <p>
            At MoView, we believe in the power of community. Our platform allows users to connect with each other,
            discuss their favorite movies, and discover new cinematic gems.
          </p>
        </div>

        <div className="section">
          <h1 className="title">
            <BiChat /> Key Features:
          </h1>
          <ul>
            <li>
               Post and read reviews about movies.
            </li>
            <li>
               Discover trending movies and hidden gems.
            </li>
            <li>
               Connect with fellow movie lovers.
            </li>
            <li>
               Stay updated on the latest releases and news in the film industry.
            </li>
          </ul>
        </div>

        <div className="section">
          <p className="title">
            Join us at MoView and be part of a vibrant community dedicated to the art of filmmaking.
          </p>
        </div>

        {/* Service Section */}
        <div className="section">
          <div className="service-icons">
            <BiChat className="service-icon" />
            <BiStar className="service-icon" />
            <BiMovie className="service-icon" />
          </div>
        </div>
      </div>
      <Logo />
    </div>
  );
}

export default About;
