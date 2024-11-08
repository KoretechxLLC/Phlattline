import { useState } from "react";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { role: "model", text: "How can I help you?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    setLoading(true);

    const updatedMessages = [...messages, { role: "user", text: input }];

    try {
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messageHistory: updatedMessages }),
      });

      const data = await response.json();

      setMessages([...updatedMessages, { role: "model", text: data.response }]);
    } catch (error) {
      console.error("Error sending message to API:", error);
    } finally {
      setInput("");
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="p-4 h-80 overflow-y-auto space-y-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg text-black ${
              msg.role === "user"
                ? "bg-blue-100 self-end"
                : "bg-green-100 self-start"
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && (
          <div className="self-start bg-green-100 p-2 rounded-lg text-black">
            <span className="loader animate-spin border-2 border-t-2 border-gray-300 rounded-full h-4 w-4 inline-block mr-2"></span>
            Typing...
          </div>
        )}
      </div>
      <div className="p-4 border-t border-gray-200 flex">
        <input
          type="text"
          className="flex-1 text-black p-2 border border-gray-300 rounded-lg mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
