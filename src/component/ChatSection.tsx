import { Send, ThumbsUp, Flag, MessageCircle, Users, Trophy, Clock, CheckCircle, XCircle } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

interface Message {
  text: string;
  sender: string;
  timestamp: string;
  likes: number;
  isHighlight: boolean;
}

interface ContestQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  userAnswer?: number;
  timeRemaining: number;
  isActive: boolean;
  isAnswered: boolean;
}

const ChatSection: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "What a six by Kohli!", sender: "CricketFan123", timestamp: "2m ago", likes: 8, isHighlight: true },
    { text: "The pitch is looking good today", sender: "BowlingExpert", timestamp: "4m ago", likes: 3, isHighlight: false },
    { text: "Need 42 runs from 24 balls now", sender: "StatsGuru", timestamp: "5m ago", likes: 5, isHighlight: false },
  ]);
  
  const [input, setInput] = useState("");
  const [activeTab, setActiveTab] = useState<"chat" | "highlights" | "contest">("chat");
  const [onlineUsers, setOnlineUsers] = useState(287);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [contestQuestions, setContestQuestions] = useState<ContestQuestion[]>([
    {
      id: 1,
      question: "Who will take the most wickets today?",
      options: ["Bumrah", "Cummins", "Ashwin", "Starc"],
      correctAnswer: 0, // Will be revealed after match
      timeRemaining: 60,
      isActive: true,
      isAnswered: false
    },
    {
      id: 2,
      question: "Will there be a century in this match?",
      options: ["Yes", "No"],
      correctAnswer: 1, // Will be revealed after match
      timeRemaining: 30,
      isActive: false,
      isAnswered: false
    },
    {
      id: 3,
      question: "Total runs in the last over?",
      options: ["0-6", "7-12", "13-18", "19+"],
      correctAnswer: 2, // Will be revealed after match
      timeRemaining: 15,
      isActive: false,
      isAnswered: false
    }
  ]);
  
  const [userPoints, setUserPoints] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const sendMessage = () => {
    if (input.trim() !== "") {
      setMessages([
        ...messages, 
        { 
          text: input, 
          sender: "You", 
          timestamp: "Just now", 
          likes: 0,
          isHighlight: false
        }
      ]);
      setInput("");
    }
  };

  const likeMessage = (index: number) => {
    const newMessages = [...messages];
    newMessages[index].likes += 1;
    setMessages(newMessages);
  };

  const toggleHighlight = (index: number) => {
    const newMessages = [...messages];
    newMessages[index].isHighlight = !newMessages[index].isHighlight;
    setMessages(newMessages);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };
  
  const answerQuestion = (questionId: number, answerIndex: number) => {
    setContestQuestions(prevQuestions => 
      prevQuestions.map(q => 
        q.id === questionId 
          ? { ...q, userAnswer: answerIndex, isAnswered: true } 
          : q
      )
    );
  };
  
  const activateNextQuestion = () => {
    const currentActiveIndex = contestQuestions.findIndex(q => q.isActive);
    if (currentActiveIndex < contestQuestions.length - 1) {
      const newQuestions = [...contestQuestions];
      newQuestions[currentActiveIndex].isActive = false;
      newQuestions[currentActiveIndex + 1].isActive = true;
      setContestQuestions(newQuestions);
    }
  };
  
  const endContest = () => {
    // Calculate points
    let points = 0;
    contestQuestions.forEach(q => {
      if (q.userAnswer === q.correctAnswer) points += 10;
    });
    setUserPoints(points);
    setShowResults(true);
  };

  useEffect(() => {
    // Auto-scroll to bottom when new messages are added
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    
    // Simulate fluctuating online users
    const interval = setInterval(() => {
      setOnlineUsers(prev => prev + Math.floor(Math.random() * 5) - 2);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [messages]);
  
  useEffect(() => {
    // Timer for active contest questions
    const timer = setInterval(() => {
      setContestQuestions(prevQuestions => {
        const updated = prevQuestions.map(q => {
          if (q.isActive && q.timeRemaining > 0 && !q.isAnswered) {
            return { ...q, timeRemaining: q.timeRemaining - 1 };
          }
          return q;
        });
        
        // Check if current active question timer expired
        const activeQuestion = updated.find(q => q.isActive);
        if (activeQuestion && activeQuestion.timeRemaining === 0 && !activeQuestion.isAnswered) {
          // Auto-move to next question after time expires
          const currentIndex = updated.findIndex(q => q.id === activeQuestion.id);
          if (currentIndex < updated.length - 1) {
            updated[currentIndex].isActive = false;
            updated[currentIndex + 1].isActive = true;
          } else {
            // End contest if it was the last question
            setTimeout(() => endContest(), 1000);
          }
        }
        
        return updated;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const filteredMessages = activeTab === "highlights" 
    ? messages.filter(msg => msg.isHighlight)
    : messages;
    
  const activeQuestion = contestQuestions.find(q => q.isActive);

  return (
    <div className="w-full bg-white text-black rounded-lg shadow-2xl overflow-hidden">
      
      {/* Tabs */}
      <div className="flex border-b">
        <button 
          onClick={() => setActiveTab("contest")} 
          className={`flex-1 py-2 px-4 flex items-center justify-center gap-2 ${activeTab === "contest" ? "border-b-2 border-blue-500 font-semibold" : ""}`}
        >
          <Trophy className="h-4 w-4" />
          Contest
        </button>
        <button 
          onClick={() => setActiveTab("chat")} 
          className={`flex-1 py-2 px-4 flex items-center justify-center gap-2 ${activeTab === "chat" ? "border-b-2 border-blue-500 font-semibold" : ""}`}
        >
          <MessageCircle className="h-4 w-4" />
          Chat
        </button>
        <button 
          onClick={() => setActiveTab("highlights")} 
          className={`flex-1 py-2 px-4 flex items-center justify-center gap-2 ${activeTab === "highlights" ? "border-b-2 border-blue-500 font-semibold" : ""}`}
        >
          <Flag className="h-4 w-4" />
          Highlights
        </button>
      </div>
      
      {/* User count */}
      <div className="flex items-center gap-2 px-4 py-2 bg-gray-50 text-sm text-gray-600">
        <Users className="h-4 w-4" />
        <span>{onlineUsers} fans watching</span>
      </div>
      
      {activeTab === "contest" ? (
        // Contest section
        <div className="h-72 overflow-y-auto p-3 bg-gray-50">
          {showResults ? (
            // Results view
            <div className="p-4">
              <h3 className="text-lg font-bold text-center mb-4">Contest Results</h3>
              <div className="bg-blue-50 p-4 rounded-lg mb-4 text-center">
                <p className="text-sm text-gray-600">Your Score</p>
                <p className="text-3xl font-bold text-blue-600">{userPoints}</p>
                <p className="text-sm text-gray-600">out of {contestQuestions.length * 10} points</p>
              </div>
              
              {contestQuestions.map((q, i) => (
                <div key={q.id} className="mb-4 p-3 bg-white rounded-lg border shadow-sm">
                  <p className="font-medium mb-2">Question {i+1}: {q.question}</p>
                  <div className="grid grid-cols-1 gap-2 mb-2">
                    {q.options.map((option, idx) => (
                      <div 
                        key={idx}
                        className={`p-2 rounded flex justify-between items-center ${
                          q.correctAnswer === idx 
                            ? "bg-green-100 border border-green-300" 
                            : q.userAnswer === idx && q.userAnswer !== q.correctAnswer
                              ? "bg-red-100 border border-red-300"
                              : "bg-gray-50 border"
                        }`}
                      >
                        <span>{option}</span>
                        {q.correctAnswer === idx && <CheckCircle className="h-4 w-4 text-green-600" />}
                        {q.userAnswer === idx && q.userAnswer !== q.correctAnswer && <XCircle className="h-4 w-4 text-red-600" />}
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">
                    {q.userAnswer === q.correctAnswer 
                      ? "Correct! +10 points" 
                      : q.userAnswer !== undefined 
                        ? "Incorrect. The correct answer was: " + q.options[q.correctAnswer]
                        : "Unanswered. The correct answer was: " + q.options[q.correctAnswer]
                    }
                  </p>
                </div>
              ))}
            </div>
          ) : activeQuestion ? (
            // Active question view
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Question {contestQuestions.indexOf(activeQuestion) + 1}/{contestQuestions.length}</h3>
                <div className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{activeQuestion.timeRemaining}s</span>
                </div>
              </div>
              
              <p className="text-lg mb-4">{activeQuestion.question}</p>
              
              <div className="grid grid-cols-1 gap-3 mb-4">
                {activeQuestion.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => answerQuestion(activeQuestion.id, idx)}
                    disabled={activeQuestion.isAnswered}
                    className={`p-3 border rounded-lg text-left ${
                      activeQuestion.userAnswer === idx 
                        ? "bg-blue-100 border-blue-400" 
                        : "bg-white hover:bg-gray-50"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              
              {activeQuestion.isAnswered && (
                <div className="flex justify-center">
                  <button 
                    onClick={activateNextQuestion}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Next Question
                  </button>
                </div>
              )}
              
              <p className="text-sm text-gray-500 text-center mt-4">
                Answer all questions to get points! Results will be revealed after the match.
              </p>
            </div>
          ) : (
            // No active question (shouldn't happen with our implementation)
            <p className="text-gray-500 text-center py-8">Contest has ended. Check back soon for more!</p>
          )}
        </div>
      ) : (
        // Chat or Highlights section
        <div className="h-72 overflow-y-auto p-3 bg-gray-50">
          {filteredMessages.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No messages yet. Start the conversation!</p>
          ) : (
            filteredMessages.map((msg, index) => (
              <div 
                key={index} 
                className={`p-3 mb-3 rounded-lg ${
                  msg.isHighlight ? "bg-yellow-50 border border-yellow-200" : "bg-white border border-gray-100"
                } shadow-sm`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-sm">{msg.sender}</span>
                  <span className="text-xs text-gray-500">{msg.timestamp}</span>
                </div>
                <p className="mb-2">{msg.text}</p>
                <div className="flex gap-3 text-xs text-gray-500">
                  <button 
                    onClick={() => likeMessage(index)}
                    className="flex items-center gap-1 hover:text-blue-600 transition"
                  >
                    <ThumbsUp className="h-3 w-3" /> {msg.likes}
                  </button>
                  <button 
                    onClick={() => toggleHighlight(index)}
                    className={`flex items-center gap-1 ${msg.isHighlight ? "text-yellow-600" : "hover:text-yellow-600"} transition`}
                  >
                    <Flag className="h-3 w-3" /> {msg.isHighlight ? "Unhighlight" : "Highlight"}
                  </button>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      )}
      
      {/* Input area (only shown for chat tab) */}
      {activeTab === "chat" && (
        <div className="p-3 bg-white border-t">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 p-2 border rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Type your message..."
            />
            <button 
              onClick={sendMessage} 
              className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition"
            >
              <Send className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatSection;