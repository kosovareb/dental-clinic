import React from "react";
import Navbar from "../../components/navbar/Navbar";
import CTA from "../../components/cta/CTA";

const HomePage = () => {
  return (
    <div>
      <Navbar />

      <CTA
        card1={{ icon: <RiPhoneLine />, text: "Call for appointment" }}
        card2={{ icon: <RiCalendarLine />, text: "Get a Date & Serial" }}
        card3={{ icon: <RiAddLine />, text: "Consult Your dentist" }}
      />
    </div>
  );
};

export default HomePage;
