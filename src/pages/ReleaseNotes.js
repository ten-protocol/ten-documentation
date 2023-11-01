import React, { useState, useEffect } from 'react';

function ReleaseNotes() {
    const [releases, setReleases] = useState([]);

    useEffect(() => {
        fetch('https://api.github.com/repos/obscuronet/go-obscuro/releases')
            .then(response => response.json())
            .then(data => setReleases(data));
    }, []);

    return (
        <div>
            {releases.map(release => (
                <div key={release.id}>
                    <h3>{release.name}</h3>
                    <p dangerouslySetInnerHTML={{ __html: release.body }} />
                </div>
            ))}
        </div>
    );
}

export default ReleaseNotes;
