/**
 * Function that generates random 8-digit link.
 * Runs when user creates new note.
 * @returns {String} Random link
 */

const generateLink = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'; 
    let randomLink = '';

    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length); 
        randomLink += characters[randomIndex];
    }

    return randomLink;
};

export { generateLink };