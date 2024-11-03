import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import { EmojiProvider, Emoji } from "react-apple-emojis";
import emojiData from "react-apple-emojis/src/data.json";

import './main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Main = () => {
    /**
     * React state to store note text value
     */

    const [noteText, setNoteText] = useState('');
    const navigate = useNavigate();

    /**
     * Function that handles data when user has pressed the "Share" button
     */

    const handleSubmit = async () => {
        /**
         * Alert when user haven't entered text in a textbox
         */

        if (!noteText) {
            alert("You haven't entered the note!");
            return;
        }

        try {
            /**
             * POST request to the server to create a note
             */

            const response = await fetch('/api/create-note', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: noteText }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Note created:', data);
            setNoteText('');

            if (data) {
                navigate(`/note-success/${data.link}`);
            } else {
                console.error("Note ID is missing from the response");
            }
        } catch (error) {
            console.error('Error creating note:', error);
        }
    };

    return (
        <EmojiProvider data={emojiData}>
            <div className="main">
                <Emoji name={"fire"} height={128} />
                <h1>Create one-time secret notes!</h1>

                <p>Works as easy as it appears: just enter the text, press the button<br />
                    below and your personal, one-time note will be generated. Just share<br />
                    the link with anyone to let them read the note and then it will be automatically deleted!</p>

                <div className={"note-area"}>
                    <textarea
                        className={"note-text"}
                        placeholder={"Anything on your mind?"}
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                    />
                </div>

                <div className={"button-area"}>
                    <Button variant="primary" size="lg" className={"create-button"} onClick={handleSubmit}>
                        Create
                    </Button>
                </div>

            </div>
        </EmojiProvider>
    );
};

export default Main;
