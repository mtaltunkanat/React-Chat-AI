import React, { useState } from "react";
import CodeBlock from "./CodeBlock";  // CodeBlock bileşenini dahil ediyoruz
import { fetchAIResponse } from "./openaiService"; // API entegrasyonu için ekleme
import "./App.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;

    const newMessages = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setUserMessage(""); // Giriş alanını temizle
    setIsTyping(true);

    try {
      const response = await fetchAIResponse(userMessage); // API çağrısı
      setMessages([...newMessages, { role: "assistant", content: response }]);
    } catch (error) {
      setMessages([...newMessages, { role: "assistant", content: "Bir hata oluştu." }]);
    } finally {
      setIsTyping(false);
    }
  };

  // Komutları özel olarak işleme fonksiyonu
  const renderMessageContent = (content) => {
    // Eğer içerik bir git komutu veya bash komutu içeriyorsa, ona göre stil uygula
    if (content.includes("git ")) {
      return <CodeBlock code={content} language="bash" className="git-command" />;
    } else if (content.includes("$")) {
      return <CodeBlock code={content} language="bash" className="bash-command" />;
    } else {
      return <p>{content}</p>;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>ChatGPT Benzeri Sohbet</h1>
        <div className="chat-container">
          <div className="messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.role === "user" ? "user" : "assistant"}`}
              >
                {renderMessageContent(msg.content)}
              </div>
            ))}
            {isTyping && <div className="typing-indicator">Yazıyor...</div>}
          </div>
          <input
            placeholder="Bir mesaj yazın..."
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            rows="4"
          />
          <button onClick={handleSendMessage}>Gönder</button>
        </div>
      </header>
    </div>
  );
}

export default App;
