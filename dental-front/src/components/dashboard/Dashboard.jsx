import React, { useState } from "react";
import "./style/mainDashboard.css"; 
import UserDashboardCard from "./UserDashboardCard";
import AppointmentDashboardCard from "./AppoinmentDashboardCard";
import DoctorDashboardCard from "./DoctorDashboardCard";
import ServiceDashboardCard from "./ServiceDashboardCard";

const Dashboard = () => {
  const [selectedDashboard, setSelectedDashboard] = useState(null);

  const handleMenuClick = (dashboard) => {
    setSelectedDashboard(dashboard);
  };

  const renderDashboard = () => {
    switch (selectedDashboard) {
      case "users":
        return <UserDashboardCard />;
      case "appoinments":
        return <AppointmentDashboardCard />;
      case "doctors":
        return <DoctorDashboardCard />;
        case "services":
          return <ServiceDashboardCard />;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <button onClick={() => handleMenuClick("users")}>Users</button>
        <button onClick={() => handleMenuClick("appoinments")}>Appointments</button>
        <button onClick={() => handleMenuClick("doctors")}>Doctors</button>
        <button onClick={() => handleMenuClick("services")}>Services</button>
      </div>
      {selectedDashboard && renderDashboard()}
    </div>
  );
};

export default Dashboard;
