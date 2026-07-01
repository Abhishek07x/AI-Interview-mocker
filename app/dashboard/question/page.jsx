'use client'
import React, { useState } from 'react';

const App = () => {
const [questions, setQuestions] = useState([]);
const [input, setInput] = useState('');

const handleSubmit = (e) => {
e.preventDefault();
if (input.trim()) {
setQuestions([...questions, input]);
setInput('');
}
};

return (
<div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 py-12 mt-10">
    <div className="container mx-auto px-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-12">Submit Your Questions or Queries</h1>

        <form onSubmit={handleSubmit} className="mb-8">
            <div className="flex items-center justify-center">
                <input type="text" value={input} onChange={(e)=> setInput(e.target.value)}
                placeholder="Type your question or query here..."
                className="w-full max-w-2xl p-4 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2
                focus:ring-blue-500"
                />
                <button type="submit"
                    className="bg-blue-500 text-white p-4 rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Submit
                </button>
            </div>
        </form>

        <div className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Questions and Queries</h2>
            <ul className="space-y-4">
                {questions.map((question, index) => (
                <li key={index} className="p-4 bg-gray-100 rounded-lg border border-gray-200 shadow-sm">
                    {question}
                </li>
                ))}
            </ul>
            {questions.length === 0 && (
            <p className="text-gray-500 text-center mt-4">No questions or queries yet. Be the first to submit!</p>
            )}
        </div>
    </div>
</div>
);
};

export default App;