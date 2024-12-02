import React from "react";
import Hero from "./components/hero/Hero";
import About from "./components/about/About";

const App = () => {
  return (
    <main className="App relative min-h-screen w-screen overflow-x-hidden">
      <Hero />
      <About />
    </main>
  );
};

export default App;
