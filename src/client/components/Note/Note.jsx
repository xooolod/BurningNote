import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';

import { useParams } from 'react-router-dom';

import { EmojiProvider, Emoji } from "react-apple-emojis"
import emojiData from "react-apple-emojis/src/data.json"

import "./note.css";

const Note = () => {
    const { link } = useParams(); // Retrieve link from URL parameters
    const [noteData, setNoteData] = useState(null); // state for note data
    const [loading, setLoading] = useState(true); // state for loading process
    const [error, setError] = useState(null); // state for errors

    useEffect(() => {
        const fetchNote = async () => {
            /**
             * if link is missing, just stop the loading process
             */

            if (!link) {
                setLoading(false); 
                return;
            }

            try {
                /**
                 * Getting info about the note from server 
                 */

                const response = await fetch(`/api/getNote/${link}`);
                if (!response.ok) {
                    throw new Error('Error fetching the note');
                }

                const data = await response.json();
                setNoteData(data);

                /**
                 * Deleting the note, so nobody will see the note again
                 */

                fetch(`/api/burn-note/`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ link: link }),
                })
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNote();
    }, [link]);

    // TODO: Fancy loading screen
    if (loading) return <div>Loading...</div>;

    return (
        <div className="note">
            <EmojiProvider data={emojiData}>
                <div className="note-details">
                    
                    {noteData ? (
                        <>
                            <Emoji name={"eyes"}></Emoji>
                            <h1>Secrets, huh?</h1>
                            <p>Here is your secret message:</p>
                            <p className="note-text-display">{noteData.text}</p>
                            <p><br/>This note is already burned. No one can see it, except you.</p>
                            <Button variant="primary" size="lg" className={"create-button"} href="/" > Homepage </Button>
                        </>
                    ) : (
                        <div className="note-details">
                            <Emoji name={"fire-extinguisher"}></Emoji>
                            <h1>This note was not found.</h1>
                            <p>You never know if this note ever existed. If it was, it is already burned. Sorry, mate!</p>
                            <Button variant="primary" size="lg" className={"create-button"} href="/" > Homepage </Button>
                        </div>
                    )}
                </div>
            </EmojiProvider>
        </div>
    );
};

export default Note;
