import { useState } from 'react'
import './App.css'
import axios from 'axios'
import { MessageSquare, Send } from 'lucide-react'

function App() {
  const [question, setquestion] = useState("")
  const [answer, setanswer] = useState("")

  async function generateAnswer(){
    setanswer("loading...")
    const API_KEY=import.meta.env.VITE_GEMINI_API_KEY;
   const response = await axios({
  url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
  method: "POST",
  data: {
    contents: [{ parts: [{ text: question }] }],
  },
});

    setanswer(response['data']['candidates'][0]['content']['parts'][0]['text'])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-center mb-6">
          <MessageSquare className="w-8 h-8 text-indigo-600 mr-2" />
          <h1 className="text-3xl font-bold text-gray-800">Chat Gemini</h1>
        </div>

        <div className="mb-4">
          <label htmlFor="question" className="block text-sm font-medium text-gray-700 mb-2">
            Ask your question:
          </label>
          <textarea
            id="question"
            value={question}
            onChange={(e) => setquestion(e.target.value)}
            className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
            placeholder="Type your question here..."
          />
        </div>

        <div className="mb-6">
          <button
            onClick={generateAnswer}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition duration-200 flex items-center justify-center"
          >
            <Send className="w-5 h-5 mr-2" />
            Generate Answer
          </button>
        </div>

        {answer && (
          <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Answer:</h2>
            <div className="text-gray-700 whitespace-pre-wrap max-h-96 overflow-y-auto">
              {answer}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
