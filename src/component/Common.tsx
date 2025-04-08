import React, { useState, useEffect } from 'react';
import { Trophy, Ticket as Cricket, ArrowRight, Users, Flag, ArrowLeft, Bath as Bat, Tally1 as Ball, Home, Wallet, User, Terminal } from 'lucide-react';
import LandingPage from './LandingPage';
import Logo from "../assets/Screenshot from 2025-04-04 12-45-01.png"
import ChatSection from './ChatSection';
import WalletScreen from './Wallet';
import Account from './Account';


interface Quiz {
  id: number;
  category: string;
  title: string;
  description: string;
  questions: Question[];
}

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface Match {
  id: number;
  tournament: string;
  team1: string;
  team2: string;
  score1: string;
  score2: string;
  overs1: string;
  overs2: string;
  status: string;
  venue: string;
  date: string;
  // Additional details for the detailed view
  batsmen1: { name: string; runs: number; balls: number; fours: number; sixes: number }[];
  batsmen2: { name: string; runs: number; balls: number; fours: number; sixes: number }[];
  bowlers1: { name: string; overs: string; maidens: number; runs: number; wickets: number }[];
  bowlers2: { name: string; overs: string; maidens: number; runs: number; wickets: number }[];
  recentBalls: string[];
  partnership: string;
  runRate: number;
  reqRunRate?: number;
}

function Common() {
  const [currentQuiz, setCurrentQuiz] = useState<Quiz | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [currentScreen, setCurrentScreen] = useState<'home' | 'scores' | 'match-details' | 'wallet' | 'account'>('home');
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [showQuizPopup, setShowQuizPopup] = useState(false);
  const [quizInterval, setQuizInterval] = useState<number | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  useEffect(() => {
    if (currentScreen === 'scores') {
      const interval = setInterval(() => {
        setShowQuizPopup(true);
        setTimeLeft(60);
        startRandomQuiz();
      }, 5 * 60 * 1000) as unknown as number;
      setQuizInterval(interval);
      return () => clearInterval(interval);
    } else {
      if (quizInterval) {
        clearInterval(quizInterval);
      }
    }
  }, [currentScreen]);

  useEffect(() => {
    if (showQuizPopup && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      handleQuizTimeout();
    }
  }, [showQuizPopup, timeLeft]);

  const handleQuizTimeout = () => {
    setShowQuizPopup(false);
    setCurrentQuiz(null);
    setTimeLeft(60);
    setSelectedAnswer('');
  };

  const startRandomQuiz = () => {
    const randomQuiz = quizzes[Math.floor(Math.random() * quizzes.length)];
    setCurrentQuiz(randomQuiz);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer('');
  };

  const liveMatches: Match[] = [
    {
      id: 1,
      tournament: "IPL 2025",
      team1: "Mumbai Indians",
      team2: "Chennai Super Kings",
      score1: "186/4",
      score2: "142/3",
      overs1: "20.0",
      overs2: "16.2",
      status: "LIVE",
      venue: "Wankhede Stadium, Mumbai",
      date: "April 15, 2025",
      batsmen1: [
        { name: "Rohit Sharma", runs: 78, balls: 52, fours: 8, sixes: 4 },
        { name: "Ishan Kishan", runs: 45, balls: 32, fours: 5, sixes: 2 }
      ],
      batsmen2: [
        { name: "MS Dhoni", runs: 45, balls: 28, fours: 3, sixes: 3 },
        { name: "Ravindra Jadeja", runs: 32, balls: 24, fours: 2, sixes: 1 }
      ],
      bowlers1: [
        { name: "Jasprit Bumrah", overs: "4.0", maidens: 1, runs: 24, wickets: 2 },
        { name: "Trent Boult", overs: "4.0", maidens: 0, runs: 32, wickets: 1 }
      ],
      bowlers2: [
        { name: "Deepak Chahar", overs: "4.0", maidens: 0, runs: 42, wickets: 1 },
        { name: "Ravindra Jadeja", overs: "4.0", maidens: 0, runs: 38, wickets: 2 }
      ],
      recentBalls: ["1", "4", "W", "2", "6", "0"],
      partnership: "45(32)",
      runRate: 8.7,
      reqRunRate: 9.8
    },
    {
      id: 2,
      tournament: "IPL 2025",
      team1: "Royal Challengers Bangalore",
      team2: "Rajasthan Royals",
      score1: "175/6",
      score2: "-",
      overs1: "20.0",
      overs2: "-",
      status: "Innings Break",
      venue: "M.Chinnaswamy Stadium, Bangalore",
      date: "April 15, 2025",
      batsmen1: [
        { name: "Virat Kohli", runs: 82, balls: 54, fours: 9, sixes: 3 },
        { name: "Glenn Maxwell", runs: 45, balls: 28, fours: 4, sixes: 3 }
      ],
      batsmen2: [],
      bowlers1: [],
      bowlers2: [
        { name: "Trent Boult", overs: "4.0", maidens: 1, runs: 32, wickets: 2 },
        { name: "Yuzvendra Chahal", overs: "4.0", maidens: 0, runs: 28, wickets: 3 }
      ],
      recentBalls: ["W", "1", "4", "1", "2", "0"],
      partnership: "",
      runRate: 8.75
    },
    {
      id: 3,
      tournament: "Test Series",
      team1: "India",
      team2: "Australia",
      score1: "328/4",
      score2: "287/10",
      overs1: "87.0",
      overs2: "96.4",
      status: "Day 2: Tea Break",
      venue: "Adelaide Oval",
      date: "April 15-19, 2025",
      batsmen1: [
        { name: "Virat Kohli", runs: 128, balls: 245, fours: 12, sixes: 2 },
        { name: "KL Rahul", runs: 85, balls: 162, fours: 8, sixes: 1 }
      ],
      batsmen2: [
        { name: "Steve Smith", runs: 145, balls: 272, fours: 14, sixes: 1 },
        { name: "Marnus Labuschagne", runs: 74, balls: 156, fours: 7, sixes: 0 }
      ],
      bowlers1: [
        { name: "Mohammed Shami", overs: "24.0", maidens: 5, runs: 67, wickets: 4 },
        { name: "R Ashwin", overs: "28.0", maidens: 8, runs: 85, wickets: 3 }
      ],
      bowlers2: [
        { name: "Mitchell Starc", overs: "22.0", maidens: 4, runs: 78, wickets: 2 },
        { name: "Nathan Lyon", overs: "25.0", maidens: 6, runs: 92, wickets: 1 }
      ],
      recentBalls: ["0", "0", "1", "0", "4", "0"],
      partnership: "156(312)",
      runRate: 3.77
    }
  ];

  const quizzes: Quiz[] = [
    {
      id: 1,
      category: "IPL History",
      title: "IPL Legends Quiz",
      description: "Test your knowledge about IPL's greatest moments and players",
      questions: [
        {
          id: 1,
          text: "Which team won the first-ever IPL in 2008?",
          options: ["Chennai Super Kings", "Rajasthan Royals", "Mumbai Indians", "Delhi Daredevils"],
          correctAnswer: "Rajasthan Royals",
          explanation: "Under Shane Warne's leadership, Rajasthan Royals defeated Chennai Super Kings in the final."
        },
        {
          id: 2,
          text: "Who holds the record for most runs in IPL history?",
          options: ["Virat Kohli", "Rohit Sharma", "MS Dhoni", "Chris Gayle"],
          correctAnswer: "Virat Kohli",
          explanation: "Virat Kohli leads the all-time run-scoring charts in IPL history."
        }
      ]
    },
    {
      id: 2,
      category: "Team India",
      title: "Indian Cricket Legacy",
      description: "Explore the rich history of Indian cricket",
      questions: [
        {
          id: 1,
          text: "When did India win its first World Cup?",
          options: ["1975", "1983", "1987", "2011"],
          correctAnswer: "1983",
          explanation: "India won its first World Cup in 1983 under Kapil Dev's captaincy."
        },
        {
          id: 2,
          text: "Who was India's first Test cricket captain?",
          options: ["CK Nayudu", "Lala Amarnath", "Vijay Hazare", "Vinoo Mankad"],
          correctAnswer: "CK Nayudu",
          explanation: "CK Nayudu led India in its first-ever Test match against England in 1932."
        }
      ]
    }
  ];

  const handleMatchClick = (match: Match) => {
    setSelectedMatch(match);
    setCurrentScreen('match-details');
  };

  const handleAnswerSubmit = () => {
    if (!currentQuiz) return;
    
    if (selectedAnswer === currentQuiz.questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }
    
    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
    } else {
      setShowResult(true);
    }

    if (showQuizPopup) {
      setTimeout(() => {
        handleQuizTimeout();
      }, 2000);
    }
  };

  const resetQuiz = () => {
    setCurrentQuiz(null);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer('');
    if (showQuizPopup) {
      handleQuizTimeout();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-900">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-sm p-4 sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img alt='' src={Logo} className='h-[4rem] w-auto rounded-[50%] ' />
            <div className="text-2xl font-bold text-white  "> <h1>CricQuiz</h1> <h1>India</h1> </div>
          </div>
          <nav className="hidden md:flex items-center space-x-6 text-white">
            <button 
              onClick={() => {
                setCurrentScreen('home');
                setSelectedMatch(null);
              }}
              className={`flex items-center space-x-1 hover:text-yellow-400 transition-colors ${currentScreen === 'home' ? 'text-yellow-400' : ''}`}
            >
              <Home className="h-5 w-5" />
              <span style={{marginTop:"1px"}}>Home</span>
            </button>
            <button 
              onClick={() => {
                setCurrentScreen('scores');
                setSelectedMatch(null);
              }}
              className={`flex items-center space-x-1 hover:text-yellow-400 transition-colors ${currentScreen === 'scores' ? 'text-yellow-400' : ''}`}
            >
              <Cricket className="h-5 w-5" />
              <span>Live Scores</span>
            </button>
            <button 
              onClick={() => {
                setCurrentScreen('wallet');
                setSelectedMatch(null);
              }}
              className={`flex items-center space-x-1 hover:text-yellow-400 transition-colors ${currentScreen === 'wallet' ? 'text-yellow-400' : ''}`}
            >
              <Wallet className="h-5 w-5" />
              <span>Wallet</span>
            </button>
            <button 
              onClick={() => {
                setCurrentScreen('account');
                setSelectedMatch(null);
              }}
              className={`flex items-center space-x-1 hover:text-yellow-400 transition-colors ${currentScreen === 'account' ? 'text-yellow-400' : ''}`}
            >
              <User className="h-5 w-5" />
              <span>My Account</span>
            </button>
            <button 
              onClick={() => {
                window.location.href = "/terms"
                setSelectedMatch(null);
              }}
              className={`flex items-center space-x-1 hover:text-yellow-400 transition-colors `}
            >
              <Terminal className="h-5 w-5" />
              <span>Terms and Conditions</span>
            </button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 ">
        {currentScreen === 'match-details' && selectedMatch ? (
          <div className="space-y-6">
            <button
              onClick={() => {
                setCurrentScreen('scores');
                setSelectedMatch(null);
              }}
              className="flex items-center space-x-2 text-white hover:text-yellow-400 transition-colors mb-6"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Scores</span>
            </button>

            <div className="bg-white rounded-xl p-6 shadow-xl" style={{marginBottom:"50px"}}>
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <div className="flex items-center space-x-2 text-blue-600 font-medium mb-2 md:mb-0">
                  <Trophy className="h-5 w-5" />
                  <span>{selectedMatch.tournament}</span>
                </div>
                <div className="flex items-center space-x-2 text-red-500 font-medium">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                  <span>{selectedMatch.status}</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Team 1 */}
                <div>
                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-2">{selectedMatch.team1}</h3>
                    <div className="text-3xl font-bold text-blue-600">{selectedMatch.score1}</div>
                    <div className="text-gray-500">Overs: {selectedMatch.overs1}</div>
                  </div>

                  {selectedMatch.batsmen1.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3 flex items-center">
                        <Bat className="h-4 w-4 mr-2" />
                        Batting
                      </h4>
                      <div className="overflow-x-auto">
                        <table className="min-w-full">
                          <thead>
                            <tr className="text-sm text-gray-600">
                              <th className="text-left py-2">Batsman</th>
                              <th className="text-right py-2">R</th>
                              <th className="text-right py-2">B</th>
                              <th className="text-right py-2">4s</th>
                              <th className="text-right py-2">6s</th>
                              <th className="text-right py-2">SR</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedMatch.batsmen1.map((batsman) => (
                              <tr key={batsman.name} className="border-t">
                                <td className="py-2">{batsman.name}</td>
                                <td className="text-right py-2">{batsman.runs}</td>
                                <td className="text-right py-2">{batsman.balls}</td>
                                <td className="text-right py-2">{batsman.fours}</td>
                                <td className="text-right py-2">{batsman.sixes}</td>
                                <td className="text-right py-2">
                                  {((batsman.runs / batsman.balls) * 100).toFixed(1)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {selectedMatch.bowlers1.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center">
                        <Ball className="h-4 w-4 mr-2" />
                        Bowling
                      </h4>
                      <div className="overflow-x-auto">
                        <table className="min-w-full">
                          <thead>
                            <tr className="text-sm text-gray-600">
                              <th className="text-left py-2">Bowler</th>
                              <th className="text-right py-2">O</th>
                              <th className="text-right py-2">M</th>
                              <th className="text-right py-2">R</th>
                              <th className="text-right py-2">W</th>
                              <th className="text-right py-2">Econ</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedMatch.bowlers1.map((bowler) => (
                              <tr key={bowler.name} className="border-t">
                                <td className="py-2">{bowler.name}</td>
                                <td className="text-right py-2">{bowler.overs}</td>
                                <td className="text-right py-2">{bowler.maidens}</td>
                                <td className="text-right py-2">{bowler.runs}</td>
                                <td className="text-right py-2">{bowler.wickets}</td>
                                <td className="text-right py-2">
                                  {(bowler.runs / parseFloat(bowler.overs)).toFixed(1)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>

                {/* Team 2 */}
                <div>
                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-2">{selectedMatch.team2}</h3>
                    <div className="text-3xl font-bold text-blue-600">{selectedMatch.score2}</div>
                    <div className="text-gray-500">Overs: {selectedMatch.overs2}</div>
                  </div>

                  {selectedMatch.batsmen2.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3 flex items-center">
                        <Bat className="h-4 w-4 mr-2" />
                        Batting
                      </h4>
                      <div className="overflow-x-auto">
                        <table className="min-w-full">
                          <thead>
                            <tr className="text-sm text-gray-600">
                              <th className="text-left py-2">Batsman</th>
                              <th className="text-right py-2">R</th>
                              <th className="text-right py-2">B</th>
                              <th className="text-right py-2">4s</th>
                              <th className="text-right py-2">6s</th>
                              <th className="text-right py-2">SR</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedMatch.batsmen2.map((batsman) => (
                              <tr key={batsman.name} className="border-t">
                                <td className="py-2">{batsman.name}</td>
                                <td className="text-right py-2">{batsman.runs}</td>
                                <td className="text-right py-2">{batsman.balls}</td>
                                <td className="text-right py-2">{batsman.fours}</td>
                                <td className="text-right py-2">{batsman.sixes}</td>
                                <td className="text-right py-2">
                                  {((batsman.runs / batsman.balls) * 100).toFixed(1)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {selectedMatch.bowlers2.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center">
                        <Ball className="h-4 w-4 mr-2" />
                        Bowling
                      </h4>
                      <div className="overflow-x-auto">
                        <table className="min-w-full">
                          <thead>
                            <tr className="text-sm text-gray-600">
                              <th className="text-left py-2">Bowler</th>
                              <th className="text-right py-2">O</th>
                              <th className="text-right py-2">M</th>
                              <th className="text-right py-2">R</th>
                              <th className="text-right py-2">W</th>
                              <th className="text-right py-2">Econ</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedMatch.bowlers2.map((bowler) => (
                              <tr key={bowler.name} className="border-t">
                                <td className="py-2">{bowler.name}</td>
                                <td className="text-right py-2">{bowler.overs}</td>
                                <td className="text-right py-2">{bowler.maidens}</td>
                                <td className="text-right py-2">{bowler.runs}</td>
                                <td className="text-right py-2">{bowler.wickets}</td>
                                <td className="text-right py-2">
                                  {(bowler.runs / parseFloat(bowler.overs)).toFixed(1)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Match Stats */}
              <div className="mt-8 pt-6 border-t">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">Current Run Rate</div>
                    <div className="text-xl font-bold text-blue-600">{selectedMatch.runRate.toFixed(2)}</div>
                  </div>
                  {selectedMatch.reqRunRate && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600">Required Run Rate</div>
                      <div className="text-xl font-bold text-blue-600">{selectedMatch.reqRunRate.toFixed(2)}</div>
                    </div>
                  )}
                  {selectedMatch.partnership && (
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="text-sm text-gray-600">Partnership</div>
                      <div className="text-xl font-bold text-blue-600">{selectedMatch.partnership}</div>
                    </div>
                  )}
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-sm text-gray-600">Last 6 Balls</div>
                    <div className="flex space-x-1 mt-1">
                      {selectedMatch.recentBalls.map((ball, index) => (
                        <span
                          key={index}
                          className={`w-6 h-6 flex items-center justify-center rounded-full text-sm font-medium ${
                            ball === 'W'
                              ? 'bg-red-100 text-red-600'
                              : ball === '4' || ball === '6'
                              ? 'bg-green-100 text-green-600'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {ball}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <ChatSection/>
            </div>
          </div>
        ) : currentScreen === 'scores' ? (
          <>
            <div className="space-y-6" style={{marginBottom:"50px"}}>
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-white mb-4">Live Cricket Scores</h2>
                <p className="text-blue-200 text-lg">Stay updated with live matches from around the world</p>
              </div>
              
              <div className="grid gap-6">
                {liveMatches.map((match) => (
                  <div
                    key={match.id}
                    className="bg-white rounded-xl p-6 shadow-xl cursor-pointer hover:shadow-2xl transition-shadow"
                    onClick={() => handleMatchClick(match)}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                      <div className="flex items-center space-x-2 text-blue-600 font-medium mb-2 md:mb-0">
                        <Trophy className="h-5 w-5" />
                        <span>{match.tournament}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-red-500 font-medium">
                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                        <span>{match.status}</span>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 items-center">
                      <div className="text-center md:text-left">
                        <h3 className="text-xl font-bold mb-2">{match.team1}</h3>
                        <div className="text-2xl font-bold text-blue-600">{match.score1}</div>
                        <div className="text-gray-500">Overs: {match.overs1}</div>
                      </div>

                      <div className="text-center flex flex-col items-center">
                        <span className="text-gray-400 text-xl font-bold">VS</span>
                        <div className="mt-2 flex flex-col items-center">
                          <Flag className="h-5 w-5 text-gray-400 mb-1" />
                          <span className="text-sm text-gray-500">{match.venue}</span>
                        </div>
                      </div>

                      <div className="text-center md:text-right">
                        <h3 className="text-xl font-bold mb-2">{match.team2}</h3>
                        <div className="text-2xl font-bold text-blue-600">{match.score2}</div>
                        <div className="text-gray-500">Overs: {match.overs2}</div>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4" />
                        <span>{match.venue}</span>
                      </div>
                      <span>{match.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quiz Popup */}
            {showQuizPopup && currentQuiz && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl p-8 shadow-xl max-w-2xl w-full mx-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold">Quick Quiz!</h3>
                    <div className="text-blue-600 font-bold">
                      Time Left: {timeLeft}s
                    </div>
                  </div>

                  {!showResult ? (
                    <>
                      <p className="text-lg mb-6">{currentQuiz.questions[currentQuestionIndex].text}</p>
                      
                      <div className="space-y-4">
                        {currentQuiz.questions[currentQuestionIndex].options.map((option) => (
                          <button
                            key={option}
                            onClick={() => setSelectedAnswer(option)}
                            className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                              selectedAnswer === option
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-blue-200'
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>

                      <button
                        onClick={handleAnswerSubmit}
                        disabled={!selectedAnswer}
                        className={`w-full mt-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center ${
                          selectedAnswer
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        }`}
                      >
                        <span>Submit Answer</span>
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </button>
                    </>
                  ) : (
                    <div className="text-center">
                      <Trophy className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
                      <h3 className="text-2xl font-bold mb-2">Quiz Completed!</h3>
                      <p className="text-gray-600 mb-6">
                        You scored {score} out of {currentQuiz.questions.length}
                      </p>
                      <button
                        onClick={resetQuiz}
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Continue Watching Scores
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </>
        ): currentScreen === 'wallet' ? (
          <>
          <WalletScreen/>
          </>
        ): currentScreen === 'account' ? (
          <>
          <Account/>
          </>
        ) : !currentQuiz ? (
         <LandingPage/>
        ) : (
          <div className="max-w-2xl mx-auto">
            {!showResult ? (
              <div className="bg-white rounded-xl p-8 shadow-xl">
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestionIndex + 1) / currentQuiz.questions.length) * 100}%` }}
                  ></div>
                </div>

                <h3 className="text-2xl font-bold mb-6">
                  Question {currentQuestionIndex + 1} of {currentQuiz.questions.length}
                </h3>
                
                <p className="text-lg mb-8">{currentQuiz.questions[currentQuestionIndex].text}</p>
                
                <div className="space-y-4">
                  {currentQuiz.questions[currentQuestionIndex].options.map((option) => (
                    <button
                      key={option}
                      onClick={() => setSelectedAnswer(option)}
                      className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                        selectedAnswer === option
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-200'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleAnswerSubmit}
                  disabled={!selectedAnswer}
                  className={`w-full mt-8 py-3 rounded-lg font-medium transition-colors flex items-center justify-center ${
                    selectedAnswer
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <span>Next Question</span>
                  <ArrowRight className="h-4 w-4 ml-2" />
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-xl p-8 shadow-xl text-center">
                <Trophy className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Quiz Completed!</h3>
                <p className="text-gray-600 mb-6">
                  You scored {score} out of {currentQuiz.questions.length}
                </p>
                <button
                  onClick={resetQuiz}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Try Another Quiz
                </button>
              </div>
            )}
          </div>
        )}
      </main>
      <div>
      <div className="fixed bottom-0 w-full bg-blue-900 text-white flex md:hidden justify-around items-center py-3 shadow-lg">
      {/* Home Tab */}
      <button
        onClick={() => setCurrentScreen("home")}
        className={`flex flex-col items-center px-6 py-2 rounded transition-colors ${currentScreen === "home" ? "text-yellow-400" : ""}`}
      >
        <Home className="h-6 w-6" />
      </button>

      {/* Live Scores Tab */}
      <button
        onClick={() => setCurrentScreen("scores")}
        className={`flex flex-col items-center px-6 py-2 rounded transition-colors ${currentScreen === "scores" ? "text-yellow-400" : ""}`}
      >
        <Cricket className="h-6 w-6" />
      </button>

      {/* Wallet Tab */}
      <button
        onClick={() => setCurrentScreen("wallet")}
        className={`flex flex-col items-center px-6 py-2 rounded transition-colors ${currentScreen === "wallet" ? "text-yellow-400" : ""}`}
      >
        <Wallet className="h-6 w-6" />
      </button>
      <button
        onClick={() => setCurrentScreen("account")}
        className={`flex flex-col items-center px-6 py-2 rounded transition-colors ${currentScreen === "account" ? "text-yellow-400" : ""}`}
      >
        <User className="h-6 w-6" />
      </button>
    </div>
      </div>

    </div>
  );
}

export default Common;