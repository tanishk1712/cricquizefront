import React, { useEffect, useState } from 'react';
import { User, Settings, LogOut, Award, Clock } from 'lucide-react';
import { base_url, getUser } from './Api';

interface Settings {
    notifications: boolean;
    darkMode: boolean;
    sound: boolean;
    publicProfile: boolean;
  }
  

export default function AccountComponent() {
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser ] = useState({
    username: 'CricketFan123',
    email: 'cricket@example.com',
    createdAt: 'January 15, 2025',
    quizzesTaken: 24,
    averageScore: 82,
    rank: 'Cricket Expert'
  });

  const [quizHistory,// setQuizHistory
] = useState([
    { id: 1, name: 'IPL History Quiz', date: 'March 28, 2025', score: '8/10', time: '3:45' },
    { id: 2, name: 'Cricket World Cup Legends', date: 'March 23, 2025', score: '9/10', time: '4:12' },
    { id: 3, name: 'Test Cricket Rules', date: 'March 15, 2025', score: '7/10', time: '5:30' },
    { id: 4, name: 'Famous Cricket Grounds', date: 'March 10, 2025', score: '10/10', time: '2:55' },
  ]);

  const [achievements, 
    // setAchievements
] = useState([
    { id: 1, name: 'Perfect Score', description: 'Score 10/10 on any quiz', achieved: true },
    { id: 2, name: 'Quiz Master', description: 'Complete 25 quizzes', achieved: false },
    { id: 3, name: 'Speed Demon', description: 'Complete a quiz in under 2 minutes', achieved: true },
    { id: 4, name: 'Cricket Scholar', description: 'Score above 80% on 10 consecutive quizzes', achieved: true },
  ]);

  const [settings, setSettings] = useState<Settings>({
    notifications: true,
    darkMode: false,
    sound: true,
    publicProfile: true
  });

  const handleSettingChange = (setting: keyof Settings) => {
    setSettings(prevSettings => ({
      ...prevSettings,
      [setting]: !prevSettings[setting]
    }));
  };

  useEffect(() => {
    const userId: string | null = localStorage.getItem("userId");

    const fetchUser = async () => {
      if (!userId) return;

      try {
        const response = await fetch(`${base_url}${getUser}${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (response.ok) {
          setUser(data);
        } else {
          console.error("Fetch error:", data.error);
          alert(data.error || "Failed to fetch user");
        }
      } catch (error) {
        console.error("Auth error:", error);
        alert("Something went wrong");
      }
    };

    fetchUser();

    
  }, []);
  

  const renderTabContent = () => {
    switch(activeTab) {
      case 'profile':
        return (
          <div className="p-4 bg-white rounded-lg shadow">
            <div className="flex items-center mb-6">
              <div className="bg-blue-500 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold">
                {user.username.charAt(0)}
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-bold">{user.username}</h2>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-500">Member since {new Date(user.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600">Quizzes Taken</p>
                <p className="text-2xl font-bold text-blue-600">{user.quizzesTaken}</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600">Average Score</p>
                <p className="text-2xl font-bold text-green-600">{user.averageScore}%</p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <p className="text-sm text-gray-600">Rank</p>
                <p className="text-2xl font-bold text-purple-600">{user.rank}</p>
              </div>
            </div>
            
            <div className="mt-6">
              <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded flex items-center" onClick={()=>{
                localStorage.removeItem("token")
                localStorage.removeItem("userId")
                window.location.href = "/auth"
              }}>
                <LogOut size={16} className="mr-2" />
                Sign Out
              </button>
            </div>
          </div>
        );
      
      case 'history':
        return (
          <div className="bg-white rounded-lg shadow">
            <h2 className="text-lg font-bold p-4 border-b">Quiz History</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-3 text-left text-sm font-medium text-gray-500">Quiz Name</th>
                    <th className="p-3 text-left text-sm font-medium text-gray-500">Date</th>
                    <th className="p-3 text-left text-sm font-medium text-gray-500">Score</th>
                    <th className="p-3 text-left text-sm font-medium text-gray-500">Time (min)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {quizHistory.map(quiz => (
                    <tr key={quiz.id} className="hover:bg-gray-50">
                      <td className="p-3 text-sm text-gray-900">{quiz.name}</td>
                      <td className="p-3 text-sm text-gray-500">{quiz.date}</td>
                      <td className="p-3 text-sm text-gray-900 font-medium">{quiz.score}</td>
                      <td className="p-3 text-sm text-gray-500">{quiz.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {quizHistory.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                You haven't taken any quizzes yet!
              </div>
            )}
          </div>
        );
        
      case 'achievements':
        return (
          <div className="bg-white rounded-lg shadow">
            <h2 className="text-lg font-bold p-4 border-b">Your Achievements</h2>
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {achievements.map(achievement => (
                <div 
                  key={achievement.id}
                  className={`border rounded-lg p-4 flex items-center ${achievement.achieved ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'}`}
                >
                  <div className={`rounded-full p-2 mr-3 ${achievement.achieved ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-400'}`}>
                    <Award size={24} />
                  </div>
                  <div>
                    <h3 className={`font-medium ${achievement.achieved ? 'text-green-800' : 'text-gray-500'}`}>
                      {achievement.name}
                    </h3>
                    <p className="text-sm text-gray-600">{achievement.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        
      case 'settings':
        return (
          <div className="bg-white rounded-lg shadow">
            <h2 className="text-lg font-bold p-4 border-b">Account Settings</h2>
            <div className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border-b">
                  <div>
                    <h3 className="font-medium">Email Notifications</h3>
                    <p className="text-sm text-gray-500">Receive quiz recommendations and updates</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={settings.notifications} 
                      onChange={() => handleSettingChange('notifications')} 
                      className="sr-only peer"
                    />
                    <div className={`w-11 h-6 rounded-full peer ${settings.notifications ? 'bg-blue-600' : 'bg-gray-200'} peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-3 border-b">
                  <div>
                    <h3 className="font-medium">Dark Mode</h3>
                    <p className="text-sm text-gray-500">Switch to dark theme</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={settings.darkMode} 
                      onChange={() => handleSettingChange('darkMode')} 
                      className="sr-only peer"
                    />
                    <div className={`w-11 h-6 rounded-full peer ${settings.darkMode ? 'bg-blue-600' : 'bg-gray-200'} peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-3 border-b">
                  <div>
                    <h3 className="font-medium">Sound Effects</h3>
                    <p className="text-sm text-gray-500">Play sounds during quizzes</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={settings.sound} 
                      onChange={() => handleSettingChange('sound')} 
                      className="sr-only peer"
                    />
                    <div className={`w-11 h-6 rounded-full peer ${settings.sound ? 'bg-blue-600' : 'bg-gray-200'} peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between p-3 border-b">
                  <div>
                    <h3 className="font-medium">Public Profile</h3>
                    <p className="text-sm text-gray-500">Let others see your achievements</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={settings.publicProfile} 
                      onChange={() => handleSettingChange('publicProfile')} 
                      className="sr-only peer"
                    />
                    <div className={`w-11 h-6 rounded-full peer ${settings.publicProfile ? 'bg-blue-600' : 'bg-gray-200'} peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
                  </label>
                </div>
              </div>
              
              <div className="mt-6">
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        );
        
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 mt-8">
      <h1 className="text-2xl font-bold mb-6">My Account</h1>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-64 bg-white rounded-lg shadow">
          <nav className="p-2">
            <button 
              onClick={() => setActiveTab('profile')} 
              className={`flex items-center w-full text-left px-4 py-3 rounded-lg mb-1 ${activeTab === 'profile' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
            >
              <User className="mr-3" size={18} />
              <span>Profile</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('history')} 
              className={`flex items-center w-full text-left px-4 py-3 rounded-lg mb-1 ${activeTab === 'history' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
            >
              <Clock className="mr-3" size={18} />
              <span>Quiz History</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('achievements')} 
              className={`flex items-center w-full text-left px-4 py-3 rounded-lg mb-1 ${activeTab === 'achievements' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
            >
              <Award className="mr-3" size={18} />
              <span>Achievements</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('settings')} 
              className={`flex items-center w-full text-left px-4 py-3 rounded-lg mb-1 ${activeTab === 'settings' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'}`}
            >
              <Settings className="mr-3" size={18} />
              <span>Settings</span>
            </button>
          </nav>
        </div>
        
        {/* Main Content */}
        <div className="flex-1">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}