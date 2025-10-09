import React, { useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import './ReleaseNotesList.css';

export default function ReleaseNotesList() {
  const [releases, setReleases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://api.github.com/repos/ten-protocol/go-ten/releases')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to load release notes');
        return response.json();
      })
      .then((data) => setReleases(data || []))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const renderBody = (body) => {
    const lines = (body || '').split('\n');
    const elements = [];
    let listBuffer = [];
    let key = 0;

    const renderTextWithCode = (text) => {
      const parts = [];
      const regex = /`?([0-9a-fA-F]{7,40})`?/g;
      let lastIndex = 0;
      let match;
      while ((match = regex.exec(text)) !== null) {
        if (match.index > lastIndex) {
          parts.push(text.slice(lastIndex, match.index));
        }
        parts.push(<code key={`code-${key++}`}>{match[1]}</code>);
        lastIndex = match.index + match[0].length;
      }
      if (lastIndex < text.length) {
        parts.push(text.slice(lastIndex));
      }
      return <>{parts}</>;
    };

    const flushList = () => {
      if (listBuffer.length > 0) {
        elements.push(
          <ul key={`ul-${key++}`}>
            {listBuffer.map((text, idx) => (
              <li key={`li-${idx}`}>{renderTextWithCode(text)}</li>
            ))}
          </ul>
        );
        listBuffer = [];
      }
    };

    lines.forEach((rawLine) => {
      const line = (rawLine || '').trim();
      if (!line) {
        flushList();
        return;
      }
      if (/^[-]{3,}\s*$/.test(line)) {
        flushList();
        elements.push(<hr key={`hr-${key++}`} />);
        return;
      }
      const listMatch = line.match(/^[\-*+]\s+(.*)$/);
      if (listMatch) {
        listBuffer.push(listMatch[1]);
      } else {
        flushList();
        elements.push(<p key={`p-${key++}`}>{renderTextWithCode(line)}</p>);
      }
    });

    flushList();
    return <>{elements}</>;
  };

  if (loading) return <p className="text--center">Loading…</p>;
  if (error) return <p className="text--danger text--center">{error}</p>;

  return (
    <div className="row release-notes">
      {releases.map((release) => (
        <div key={release.id} className="col col--12 margin-bottom--lg">
          <article className="card release">
            <div className="card__header">
              <h3 className="margin-bottom--xs">{release.name || release.tag_name}</h3>
              <small>
                {release.published_at
                  ? new Date(release.published_at).toLocaleDateString()
                  : ''}
              </small>
            </div>
            <div className="card__body">{renderBody(release.body)}</div>
            <div className="card__footer">
              <Link className="button button--sm button--secondary" to={release.html_url}>
                View on GitHub
              </Link>
            </div>
          </article>
        </div>
      ))}
    </div>
  );
}


