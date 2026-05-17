// src/pages/Home.jsx

import About from "./About";
import Hero from "./Hero";


export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      
      <main className="flex-1">
        <Hero/>
        <About/>
      </main>
      
    </div>
  );
}