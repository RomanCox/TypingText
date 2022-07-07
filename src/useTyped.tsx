import {useEffect, useState} from "react";

export enum TypePhase {
    Typing,
    Pausing,
    Deleting,
}

/*const typingInterval = 100;
const pauseDuration = 1000;
const deletingInterval = 50;*/

export const useTyped = ( propsTexts: string[], typingInterval:number, pauseDuration:number, deletingInterval:number ): {
    text: string,
    selectedText: string,
    phase: TypePhase
} => {

    const [selectedPhraseIndex, setSelectedPhraseIndex] = useState(0);
    const [phase, setPhase] = useState(TypePhase.Typing);
    const [text, setText] = useState('');

    useEffect(() => {

        switch (phase) {
            case TypePhase.Typing: {
                const nextText = propsTexts[selectedPhraseIndex].slice(0, text.length + 1);
                if (nextText === text) {
                    setPhase(TypePhase.Pausing)
                    return
                }
                const timeout = setTimeout(() => {
                    setText(nextText)
                }, typingInterval)
                return () => clearTimeout(timeout)
            }

            case TypePhase.Deleting: {
                if (!text) {
                    const nextPhraseIndex = selectedPhraseIndex + 1;
                    setSelectedPhraseIndex(propsTexts[nextPhraseIndex] ? nextPhraseIndex : 0);
                    setPhase(TypePhase.Typing);
                    return
                }
                const nextRemaining = propsTexts[selectedPhraseIndex].slice(0, text.length - 1);
                const timeout = setTimeout(() => {
                    setText(nextRemaining)
                }, deletingInterval)
                return () => clearTimeout(timeout)
            }

            case TypePhase.Pausing:
            default:
                const timeout = setTimeout(() => {
                    setPhase(TypePhase.Deleting)
                }, pauseDuration)
                return () => clearTimeout(timeout)
        }
    }, [propsTexts, text, selectedPhraseIndex, phase]);

    return { text, phase, selectedText: propsTexts[selectedPhraseIndex] }
};