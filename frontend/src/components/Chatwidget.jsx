import React, { useState, useRef, useEffect } from "react";

export default function ChatWidget({ sendMessage }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages, isTyping]);

  // Format AI response with bullet points and paragraphs
  const formatMessage = (text) => {
    return text.split("\n").map((line, i) => {
      if (line.startsWith("- ")) {
        return (
          <li key={i} className="ml-4 list-disc">
            {line.replace("- ", "")}
          </li>
        );
      }
      return (
        <p key={i} className="mb-1 leading-relaxed">
          {line}
        </p>
      );
    });
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const answer = await sendMessage(input);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: answer },
        ]);
        setIsTyping(false);
      }, 600); // slight delay for realism
    } catch {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "⚠️ Something went wrong." },
      ]);
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-4 rounded-full shadow-xl hover:scale-110 transition-transform"
          title="Open Chat"
        >
          🤖
        </button>
      )}

      {/* Chat Box */}
      {isOpen && (
        <div
          className={`fixed bottom-6 right-6 w-80 sm:w-96 h-[520px] rounded-2xl shadow-2xl flex flex-col overflow-hidden border transition-all duration-300
          ${darkMode ? "bg-gray-900 text-white border-gray-700" : "bg-white text-gray-800 border-gray-200"}`}
        >
          {/* Header */}
          <div
            className={`p-4 flex justify-between items-center
            ${darkMode ? "bg-gray-800" : "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"}`}
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-500 text-white flex items-center justify-center rounded-full">
                🤖
              </div>
              <div>
                <div className="text-sm font-semibold">Symtera AI</div>
                <div className="text-xs opacity-70">● Online</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Dark Mode Toggle */}
              <button onClick={() => setDarkMode(!darkMode)} className="text-sm">
                {darkMode ? "☀️" : "🌙"}
              </button>
              <button onClick={() => setIsOpen(false)}>✖</button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-3">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex items-end gap-2 ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {/* Bot Avatar */}
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 bg-indigo-600 text-white flex items-center justify-center rounded-full text-xs">
                    🤖
                  </div>
                )}

                <div
                  className={`px-4 py-2 rounded-2xl max-w-[75%] text-sm shadow leading-relaxed
                  ${
                    msg.role === "user"
                      ? "bg-indigo-600 text-white rounded-br-none"
                      : darkMode
                      ? "bg-gray-700 text-white rounded-bl-none"
                      : "bg-gray-100 text-gray-800 rounded-bl-none"
                  }`}
                >
                  {msg.role === "assistant" ? formatMessage(msg.content) : msg.content}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-end gap-2">
                <div className="w-7 h-7 bg-indigo-600 text-white flex items-center justify-center rounded-full text-xs">
                  🤖
                </div>
                <div className="flex gap-1 px-4 py-2 bg-gray-300 rounded-2xl dark:bg-gray-700">
                  <span className="w-2 h-2 bg-gray-600 dark:bg-gray-300 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-600 dark:bg-gray-300 rounded-full animate-bounce delay-200"></span>
                  <span className="w-2 h-2 bg-gray-600 dark:bg-gray-300 rounded-full animate-bounce delay-400"></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className={`p-3 flex items-center gap-2 border-t ${darkMode ? "border-gray-700 bg-gray-800" : "bg-white"}`}>
            <textarea
              rows="1"
              className={`flex-1 rounded-full px-4 py-2 text-sm resize-none focus:outline-none
              ${darkMode ? "bg-gray-700 text-white" : "border border-gray-300"}`}
              placeholder="Ask something..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleEnter}
            />
            <button
              onClick={handleSend}
              className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition"
            >
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}