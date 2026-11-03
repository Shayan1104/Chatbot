import ChatWidget from "./components/Chatwidget";

export default function App() {

  const sendMessage = async (message) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: message }),
      });

      const data = await res.json();
      return data.answer;

    } catch (error) {
      console.error(error);
      return "⚠️ Backend not responding.";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <ChatWidget sendMessage={sendMessage} />
    </div>
  );
}