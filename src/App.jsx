import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main from "./components/Main";
import About from "./components/About";
import Highlight from "./components/Highlight";
import Contact from "./components/Contact";
import Navigation from "./components/Navigation";

function App() {
  return (
    <section class="relative w-full min-h-screen flex justify-center py-10 px-4 bg-[#99CAFF]">
      <div class="w-full max-w-7xl lg:w-11/12 md:pt-20 bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 p-6 md:p-10 overflow-hidden">
        <BrowserRouter>
          <Navigation></Navigation>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/highlight" element={<Highlight />} />
          </Routes>
        </BrowserRouter>
      </div>
    </section>
  )
}

export default App