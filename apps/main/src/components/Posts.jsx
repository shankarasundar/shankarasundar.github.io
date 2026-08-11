import { useState } from "react";
import { linkedinPosts, profile } from "../data/content";

export default function Posts() {
  const [visible, setVisible] = useState(true);

  return (
    <div id="posts" className="sidebar-block sidebar-block-divider">
      <div className="sidebar-block-head">
        <div>
          <p className="section-kicker">From LinkedIn</p>
          <h2 className="sidebar-title">Recent posts</h2>
        </div>
        <button
          type="button"
          className="posts-toggle"
          onClick={() => setVisible((v) => !v)}
          aria-expanded={visible}
        >
          {visible ? "Hide" : "Show"}
        </button>
      </div>

      {visible && (
        <>
          <div className="posts-stack">
            {linkedinPosts.map((p) => (
              <div className="post-card" key={p.embedSrc}>
                <iframe
                  src={p.embedSrc}
                  title={p.title}
                  className="post-embed"
                  frameBorder="0"
                  allowFullScreen
                />
                <div className="post-footer">
                  <span>{p.title}</span>
                  <a href={p.link} target="_blank" rel="noreferrer">
                    View on LinkedIn
                  </a>
                </div>
              </div>
            ))}
          </div>

          <p className="sidebar-footnote">
            More on{" "}
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            .
          </p>
        </>
      )}
    </div>
  );
}
