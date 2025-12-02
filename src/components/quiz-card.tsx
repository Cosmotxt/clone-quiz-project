"use client";

import { useState } from "react";

type Question = {
  id: string;
  text: string;
  options: string[];
};

export default function QuizPage() {
  // perguntas internas
  const questions: Question[] = [
    {
      id: "q1",
      text: "Quantos anos você tem?",
      options: ["18-25", "26-40", "40+"]
    },
    {
      id: "q2",
      text: "Como você costuma iniciar converas?",
      options: ["Tomando iniciativa", "esperando oportunidade", "Quase nunca"]
    },
    {
      id: "q3",
      text: "Prefere conversar por onde?",
      options: ["WhatsApp", "Instagram", "Pessoalmente"]
    }
  ];

  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const finished = index >= questions.length;

  function handleAnswer(answer: string) {
    const question = questions[index];
    setAnswers(prev => ({
      ...prev,
      [question.id]: answer
    }));
    setIndex(prev => prev + 1);
  }

  if (finished) {
    console.log("Respostas:", answers);
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-md bg-gray-300 shadow-lg rounded-xl p-6 border border-gray-200">
        {!finished ? (
          <>
            <h2 className="text-xl text-zinc-900 font-semibold mb-4">
              Pergunta {index + 1} de {questions.length}
            </h2>

            <p className="text-gray-700 mb-6">{questions[index].text}</p>

            <div className="space-y-3">
              {questions[index].options.map(opt => (
                <button
                  key={opt}
                  onClick={() => handleAnswer(opt)}
                  className="w-full px-4 text-zinc-900 py-3 rounded-lg border border-gray-300 bg-gray-50 hover:bg-gray-100 active:scale-95 transition"
                >
                  {opt}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center text-zinc-900">
            <h2 className="text-2xl font-bold mb-2">Quiz finalizado!</h2>
            <p className=" flex gap-4">
                <div className="flex flex-col items-center m-auto gap-4">
                    <h3 className="text-lg font-medium mb-2">Suas respostas</h3>
                    <div className="flex gap-3">
                        <span className="bg-white px-3 py-1 rounded-2xl">{answers.q1}</span>
                        <span className="bg-white px-3 py-1 rounded-2xl">{answers.q2}</span>
                        <span className="bg-white px-3 py-1 rounded-2xl">{answers.q3}</span>
                    </div>
                </div>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
