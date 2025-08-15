import React, { useEffect, useState } from "react";
import axios from "axios";
import '../assets/css/hero.css'

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/auth/me", { withCredentials: true })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <div className="hero-pt relative min-h-screen bg-[#1a132f] flex flex-col items-center">
      <div className="w-full text-white py-4 px-8 flex items-center justify-between">
        <span className="font-bold text-2xl">Server picker</span>
      </div>
    </div>
  );
};

export default Dashboard;
