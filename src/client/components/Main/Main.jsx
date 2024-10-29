import React from 'react';
import Button from 'react-bootstrap/Button';


import { EmojiProvider, Emoji } from "react-apple-emojis"
import emojiData from "react-apple-emojis/src/data.json"

import './main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Main = () => {
    return (
        <EmojiProvider data={emojiData}>
            <div className="main">
                <Emoji name={"fire"} height={128} />
                <h1>Create one-time secret notes!</h1>

                <p>Works as easy as it appears: just enter the text, press the button<br/>
                    below and your personal, one-time note will be generated. Just share<br/>
                    the link with anyone to let them read the note and then it will be automatically deleted!</p>
                
                <div className={"note-area"}>
                    <textarea className={"note-text"} placeholder={"Anything on mind?"}></textarea>
                </div>

                <div className={"button-area"}>
                    <Button variant="primary" size="lg" className={"create-button"}>
                        Create
                    </Button>
                </div>

            </div>
        </EmojiProvider>
    );
};

export default Main;
