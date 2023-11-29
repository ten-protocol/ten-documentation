import React, { useState, useEffect } from 'react';
import './ReleaseNotes.css';

function ReleaseNotes() {
    const [releases, setReleases] = useState([]);

    useEffect(() => {
        fetch('https://api.github.com/repos/ten-protocol/go-ten/releases')
            .then(response => response.json())
            .then(data => setReleases(data));
    }, []);

    return (
        <section className="release-notes">
            {releases.map(release => (
                <article key={release.id} className="release">
                    <h3>{release.name}</h3>
                    <ul>
                        {release.body.split('\n').map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </article>
            ))}
        </section>
    );
}

export default ReleaseNotes;
