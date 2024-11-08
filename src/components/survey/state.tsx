import { createContext, ReactNode, useEffect, useState } from 'react';
import { Element } from './surveySetup';
import { toast } from '@/hooks/useToast';
import { db } from '@/services/FirebaseDB';
import useAuth from '@/hooks/useAuth';
import { User } from 'firebase/auth';

type ID = number;

type State ={
    answers: Map<ID, string>;
    errors: Map<ID, string>;
    answer: (number: ID, answer: string | null) => void;
    submit: () => Promise<void>;
    validate: (elements: Element[]) => Map<ID, string>;
}

const initialState: State = {
    answers: new Map(),
    errors: new Map(),
    answer: () => {},
    validate: () => {return new Map()},
    submit: () => {return Promise.resolve()},
};

export const StateContext = createContext<State>(initialState);

export const StateProvider = ({ children }: { children: ReactNode }) => {
    const auth = useAuth();
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    const [answers, setAnswers] = useState<Map<ID, string>>(new Map());
    const [errors, setErrors] = useState<Map<ID, string>>(new Map());

    useEffect(() => {
        if(auth?.uid === currentUser?.uid) return;

        setCurrentUser(auth);
        db.load().then((data) => {
            console.log("Data loaded", data);
        }).catch(() => {});
    },[auth, currentUser]);

    function answer(number: ID, answer: string | null) {
        if(answer === null) {
            if (answers.delete(number)) {
                setAnswers(new Map(answers));
            }
            return;
        }
        
        if (errors.delete(number)) {
            setErrors(new Map(errors));
        }
        
        setAnswers(new Map(answers.set(number, answer)));
    }

    async function submit() {
        if (errors.size !== 0) {
            toast({
                title: "Fill out all required fields!",
                description: "Check previous pages for errors",
                duration: 3500,
            })
            return;
        }

        return db.save(answers);
    }

    function validate(elements: Element[]): Map<ID, string> {
        let newErrors = new Map();
        elements.forEach(e => {
            if(e.type === "Compound") {
                
                if(e.elements) newErrors = new Map([...validate(e.elements), ...newErrors]);
                return;
            }
            if(e.type === "Text") return;
            
            const length = answers.get(e.id)?.length
            
            if(e.required && (length === undefined || length === 0) ) {
                newErrors.set(e.id, "This field is required");
            }
        });
        setErrors(new Map([...errors, ...newErrors]))

        return newErrors;
    }


    return <StateContext.Provider value={{ answers, answer, submit, validate, errors }}>{children}</StateContext.Provider>;
};
