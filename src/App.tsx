import React from 'react';
import style from'./App.module.css';
import {TypePhase, useTyped} from "./useTyped";

const propsTexts = ['Wow! How did I do it?', 'I tried to do this for a very long time', 'And i do it!'];

function App() {

    const typingInterval = 100;
    const pauseDuration = 1000;
    const deletingInterval = 50;

    const { text, selectedText, phase } = useTyped(propsTexts, typingInterval, pauseDuration, deletingInterval)

    let blinkingStyle =
        phase === TypePhase.Pausing ? `${style.typingText} ${style.blinkingCursor}` :
        phase !== TypePhase.Deleting ? `${style.typingText} ${style.endCursor}` :
            `${style.typingText}`

    return (
        <div className={style.app}>
            <div className={style.textWrapper}>
                <span className={blinkingStyle} aria-label={selectedText} style={style}>{text}</span>
            </div>
        </div>
    );
}

export default App;
