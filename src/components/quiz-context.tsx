"use client";

import React, { createContext, useContext, useState } from "react";

type Answer = { qId: string; value: string };
type QuizData = {
title: string;
questions: { id: string; text: string; options: { id: string; text: string }[] }[];
};

const DATA: QuizData = {
    title: "Caixa Preta",
    questions: [
        { id: "q1", text: "Qual a sua idade?", options: [{ id: "a", text: "18-25" }, { id: "b", text: "25-40" }, { id: "c", text: "40+" }] },
        { id: "q2", text: "Você está solteiro", options: [{ id: "a", text: "Sim" }, { id: "b", text: "Não" }] }
    ]
}
type QuizContextType = {
    DATA: QuizData;
    index: number;
    total: number;
    answers: Answer[];
    progress: number;
    answerQuestion: (qId: string, value: string) => void;
    variant: "A" | "B";
};

const QuizContext = createContext<QuizContextType | null>(null)

export default function QuizCard({ children }: { children: React.ReactNode }) {
    const [index, setIndex] = useState(0);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [variant] = useState<"A" | "B">(() => (Math.random() < 0.5 ? "A" : "B"));
    const total = DATA.questions.length;
    const progress = Math.round(((answers.length) / total) * 100);
    
    function answerQuestion(qId: string, value: string) {
        setAnswers(prev => {
        const updated = prev.filter(p => p.qId !== qId).concat({ qId, value });
            return updated;
        });
        setIndex(i => Math.min(i + 1, total));
    }


    return(
        <div>
            <QuizContext.Provider value={{ DATA, index, total, answers, progress, answerQuestion, variant }}>
                {children}
            </QuizContext.Provider>
        </div>
    )
}

export const useQuiz = () => useContext(QuizContext);