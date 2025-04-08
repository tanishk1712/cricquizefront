import React from "react";
import BackGround from "../assets/5205447.jpg";
import Banner1 from "../assets/ChatGPT Image Apr 4, 2025, 01_51_04 PM.png"
import Banner2 from "../assets/ChatGPT Image Apr 4, 2025, 02_03_09 PM.png"
import Banner3 from "../assets/ChatGPT Image Apr 4, 2025, 02_07_26 PM.png"


const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen  bg-blue-900 text-white flex flex-col items-center justify-between px-6">
      {/* Hero Section */}
      <header className="text-center flex flex-col justify-center items-center bg-cover bg-center w-full h-[500px] rounded-md" style={{ backgroundImage: `url(${BackGround})` }}>
      <h1 className="text-5xl sm:text-5xl md:text-8xl font-bold">CricQuiz India</h1>
        <p className="text-xl sm:text-lg md:text-2xl mt-2">Test your cricket knowledge with fun quizzes!</p>
        <button onClick={()=>
            window.location.href = "/auth"
        } className="mt-4 bg-white text-blue-900 px-6 py-2 sm:px-4 sm:py-1 md:px-5 md:py-2 rounded-lg font-semibold hover:bg-gray-200 transition">
          Get Started
        </button>
      </header>

      {/* Features Section */}
      <section className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white text-blue-900 p-4 rounded-lg shadow-lg">
            <img src={Banner1} alt="" className="rounded-md"  />
          <h2 className="font-semibold text-xl">Exciting Quizzes</h2>
          <p className="text-sm">Challenge yourself with cricket trivia from all eras.</p>
        </div>
        <div className="bg-white text-blue-900 p-4 rounded-lg shadow-lg">
        <img src={Banner2} alt="" className="rounded-md"  />
          <h2 className="font-semibold text-xl">Compete with Friends</h2>
          <p className="text-sm">Play with friends and see who scores the highest!</p>
        </div>
        <div className="bg-white text-blue-900 p-4 rounded-lg shadow-lg">
        <img src={Banner3} alt="" className="rounded-md"  />
          <h2 className="font-semibold text-xl">Earn Rewards</h2>
          <p className="text-sm">Win points and unlock achievements.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-12 text-center text-sm opacity-75">
        &copy; {new Date().getFullYear()} CricQuiz India. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
