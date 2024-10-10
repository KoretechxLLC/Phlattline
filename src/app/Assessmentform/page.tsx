"use client";
import React, { useState } from 'react';
import axios from 'axios';

const CreateAssessment: React.FC = () => {
  const [assessmentName, setAssessmentName] = useState('');
  const [questions, setQuestions] = useState<{ questionText: string; options: string[]; category: string }[]>([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [newOptions, setNewOptions] = useState<string[]>(['']);
  const [category, setCategory] = useState<'individual' | 'organization'>('individual');

  const handleAddOption = (index: number) => {
    const updatedOptions = [...newOptions];
    updatedOptions.splice(index + 1, 0, '');
    setNewOptions(updatedOptions);
  };

  const handleAddQuestion = () => {
    if (newQuestion.trim() && newOptions.length) {
      setQuestions([...questions, { questionText: newQuestion, options: newOptions, category }]);
      setNewQuestion('');
      setNewOptions(['']); 
    }
  };

  const handleSubmit = async () => {
    const data = {
      type: assessmentName,
      questions: questions,
    };
    
    try {
      const response = await axios.post('/api/assessmentform', data);

      if (response.status === 201) {
    
        setAssessmentName('');
        setQuestions([]);
        setNewQuestion('');
        setNewOptions(['']);
      }
    } catch (error) {
      console.error('Failed to create assessment:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center mb-6">Create Assessment</h1>
        <input
          type="text"
          placeholder="Assessment Name"
          value={assessmentName}
          onChange={(e) => setAssessmentName(e.target.value)}
          className="w-full p-2 mb-4 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Questions</h2>
          {questions.map((q, index) => (
            <div key={index} className="mb-4 p-4 border rounded-md bg-gray-50">
              <h3 className="font-medium">{`Question ${index + 1}: ${q.questionText}`}</h3>
              <div className="mt-2">
                {q.options.map((option, optIndex) => (
                  <div key={optIndex} className="flex items-center">
                    <input  onChange={(e) => setAssessmentName(e.target.value)} type="text" value={option} readOnly className="w-full p-2 mb-2 border rounded-md" />
                  </div>
                ))}
                <select
                  value={q.category}
                  onChange={(e) => {
                    const updatedQuestions = [...questions];
                    updatedQuestions[index].category = e.target.value as 'individual' | 'organization';
                    setQuestions(updatedQuestions);
                  }}
                  className="mt-2 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                >
                  <option value="individual">Individual</option>
                  <option value="organization">Organization</option>
                </select>
              </div>
            </div>
          ))}

          <div className="mt-4">
            <input
              type="text"
              placeholder="New Question"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              className="w-full p-2 mb-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
            {newOptions.map((option, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="text"
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) => {
                    const updatedOptions = [...newOptions];
                    updatedOptions[index] = e.target.value;
                    setNewOptions(updatedOptions);
                  }}
                  className="w-full p-2 mb-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                />
                <button
                  type="button"
                  onClick={() => handleAddOption(index)}
                  className="ml-2 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Add Option
                </button>
              </div>
            ))}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as 'individual' | 'organization')}
              className="mt-2 p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            >
              <option value="individual">Individual</option>
              <option value="organization">Organization</option>
            </select>
            <button
              type="button"
              onClick={handleAddQuestion}
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              Add Question
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Submit Assessment
        </button>
      </div>
    </div>
  );
};

export default CreateAssessment;
