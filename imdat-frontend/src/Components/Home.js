import React, { useState } from "react";

function Home() {
    const [storedEmail, setStoredEmail] = useState("");

    function showEmail() {
        const emailFromStorage = sessionStorage.getItem('email');
        setStoredEmail(emailFromStorage);
    }

    return (
        <div>
            <h1>Home</h1>
            <button onClick={showEmail}>Show Stored Email</button>
            {storedEmail && (
                <div className="alert alert-info" role="alert">
                    Stored Email: {storedEmail}
                </div>
            )}
        </div>
    );
}

export default Home;
