import React, { useState } from "react";
import axios from "axios";

const ChatCaller: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const handleSendMessage = async () => {
    if (!message.trim()) return;
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const response = await axios.post("${BASE_URL}/api-test/openai/chat", {message});

      setResponse(response.data.reply);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* 메시지 입력 필드 */}
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message..."
        style={{ width: "80%", padding: "10px", marginBottom: "10px" }}
      />
      <br />
      
      {/* 메시지 전송 버튼 */}
      <button
        onClick={handleSendMessage}
        disabled={loading}
        style={{ padding: "10px 20px", cursor: "pointer" }}
      >
        {loading ? "Sending..." : "Send"}
      </button>

      {/* 응답 결과 표시 */}
      {response && (
        <p style={{ marginTop: "18px", fontWeight: "bold" }}>
          <strong>Response:</strong> {response}
        </p>
      )}

      {/* 에러 메시지 표시 */}
      {error && <p style={{ color: "red" }}>오류: {error}</p>}
    </div>
  );
};

export default ChatCaller;
