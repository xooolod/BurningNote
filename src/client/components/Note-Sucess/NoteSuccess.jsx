import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import { EmojiProvider, Emoji } from "react-apple-emojis";
import emojiData from "react-apple-emojis/src/data.json";

import "./noteSuccess.css";

/**
 * Page to display when user successfully created the note
 */

const NoteSuccess = () => {
    const { link } = useParams(); // Getting link from URL parameters

    /**
     * Useful states
     */

    const [noteData, setNoteData] = useState(null);
    const [noteStaticURL, setNoteStaticURL] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(false); 

    useEffect(() => {
        /**
         * Getting note info from the server
         */

        const fetchNote = async () => {
            if (!link) {
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`/api/getNote/${link}`);
                if (!response.ok) {
                    throw new Error('Error fetching the note');
                }
                const data = await response.json();
                setNoteData(data);
                setNoteStaticURL(window.location.origin + "/note/" + data.link);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNote();
    }, [link]);

    /** 
     * Function to handle copy and set temporary "Copied!" status
     */

    const handleCopy = () => {
        navigator.clipboard.writeText(noteStaticURL);
        setCopied(true);

        setTimeout(() => setCopied(false), 2000);
    };

    // TODO: Fancy loading screen
    if (loading) return <div>Loading...</div>;

    return (
        <div className="note">
            <EmojiProvider data={emojiData}>
                <div className="note-details">
                    {noteData ? (
                        <>
                            <Emoji name={"check-mark"} />
                            <h1>Success!</h1>
                            <p>You can access your secret note through this link:</p>
                            <p className="note-link">{noteStaticURL}</p>
                            <p><br />Feel free to share this link with anyone. Remember: this note can be viewed only once.</p>
                            <Button 
                                variant="primary" 
                                size="lg" 
                                className={`create-button ${copied ? "copied" : ""}`}
                                onClick={handleCopy} 
                                style={{ backgroundColor: copied ? "green" : "", color: copied ? "white" : "" }}
                            >
                                {copied ? "Copied!" : "Share"}
                            </Button>
                            <Button variant="primary" size="lg" className={"create-button"} href="/" > Homepage </Button>
                        </>
                    ) : (
                        <div className="note-details">
                            <Emoji name={"chicken"} />
                            <h1>Nothing here but chicken!</h1>
                            <p>Ooops... Unexpected error has occurred. Sorry about that! Please contact us on GitHub.</p>
                            <Button variant="primary" size="lg" className={"create-button"} href="/" > Homepage </Button>
                        </div>
                    )}
                </div>
            </EmojiProvider>
        </div>
    );
};

export default NoteSuccess;
