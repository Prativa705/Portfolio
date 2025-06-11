import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I can help answer questions about this portfolio. What would you like to know?' }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Add user message
    const newMessages = [...messages, { role: 'user', content: inputMessage }];
    setMessages(newMessages);
    setInputMessage('');

    // Simple portfolio-related responses
    const response = getPortfolioResponse(inputMessage.toLowerCase());
    
    // Simulate typing delay
    setTimeout(() => {
      setMessages([...newMessages, { role: 'assistant', content: response }]);
    }, 500);
  };

  const getPortfolioResponse = (message) => {
    const responses = {
      'hello': 'Hello! How can I help you learn more about this portfolio?',
      'hi': 'Hi there! Feel free to ask me anything about this portfolio.',
      'details': 'The portfolio includes details about the owner, projects, skills, and experiences.',
      'name': 'My name is Prativa Dhar',
      'about': 'This is a modern portfolio website built with React and Tailwind CSS. It showcases various projects and skills.',
      'projects': 'The portfolio includes several projects that demonstrate different skills and technologies. You can find them in the Projects section .in brief the portfolio includes project related to disaster management.',
      'contact': 'You can reach out through the Contact section or find social media links in the portfolio.',
      'skills': 'The portfolio showcases various technical skills including React, JavaScript, Tailwind CSS, and more.',
      'technologies': 'This portfolio is built using React, Tailwind CSS, and various modern web technologies.',
      'experience': 'The portfolio includes details about professional experience and projects in the Experience section.',
      'education': 'Educational background and qualifications of the owner is Btech in Computer Science and Engineering can be found in the About section.',
      'social media': 'The portfolio includes social media links in the footer section.Also the owner is active on instagram and linkedin.',
      'default': "I'm not sure about that specific detail, but I can tell you about the portfolio's projects, skills, or contact information. What would you like to know?"
    };

    for (const [key, value] of Object.entries(responses)) {
      if (message.includes(key)) {
        return value;
      }
    }
    return responses.default;
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`rounded-lg shadow-xl w-80 h-96 mb-4 flex flex-col ${
              isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'
            }`}
          >
            <div className={`p-4 border-b flex justify-between items-center ${
              isDarkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <h3 className="font-semibold">Portfolio Assistant</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className={`p-2 rounded-full ${
                    isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {isDarkMode ? '☀️' : '🌙'}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className={`${
                    isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  ✕
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === 'user'
                        ? 'bg-blue-500 text-white'
                        : isDarkMode
                        ? 'bg-gray-700 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className={`p-4 border-t ${
              isDarkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask about the portfolio..."
                  className={`flex-1 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    isDarkMode
                      ? 'bg-gray-700 text-white border-gray-600 placeholder-gray-400'
                      : 'bg-white border-gray-200 text-gray-800'
                  }`}
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Send
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`${
          isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-blue-500 hover:bg-blue-600'
        } text-white p-4 rounded-full shadow-lg transition-colors`}
      >
        {isOpen ? '✕' : '💬'}
      </motion.button>
    </div>
  );
};

export default ChatBot; 