import React from "react";
import Hero from "./components/hero/Hero";
import About from "./components/about/About";
import Navbar from "./components/navbar/Navbar";
import Features from "./components/features/Features";

const App = () => {
  return (
    <main className="App relative min-h-screen w-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Features />
    </main>
  );
};

export default App;
