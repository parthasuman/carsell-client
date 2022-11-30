import React from "react";
import Adversiting from "../../../contexts/Adversiting/Adversiting";
import About from "../../About/About";
import Banner from "../Banner/Banner";

const Home = () => {
  return (
    <div className="mx-5">
      <Banner></Banner>
      <About></About>
      <Adversiting></Adversiting>
    </div>
  );
};

export default Home;
