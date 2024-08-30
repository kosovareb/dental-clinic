import React from "react";
import Navbar from "../../components/navbar/Navbar";
import CTA from "../../components/cta/CTA";
import Footer from "../footer/Footer";
import Header from "../header/Header";
import { RiPhoneLine, RiCalendarLine, RiAddLine } from "react-icons/ri";
import Services from "../services/Services";
import AboutUs from "../aboutUs/AboutUs";
import Appointment from "../appoinment/Appointment";
import DoctorCard from "../../components/serviceComponents/DoctorCard";
import Feedback from "../../components/aboutUsComponents/Feedback";
import OurServices from "../../components/serviceComponents/OurServices"

const HomePage = ({loggedIn, userRole}) => {
  return (
    <div>
      <Navbar loggedIn={loggedIn} userRole={userRole} />
      <Header />
      <CTA
        card1={{ icon: <RiPhoneLine />, text: "Call for appointment" }}
        card2={{ icon: <RiCalendarLine />, text: "Get a Date & Serial" }}
        card3={{ icon: <RiAddLine />, text: "Consult Your dentist" }}
      />
<OurServices/>
      <Services />
      <AboutUs />
      <DoctorCard />
      <Feedback />
      <Appointment />
      <Footer />
    </div>
  );
};

export default HomePage;
