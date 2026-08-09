import { linkedinPosts, profile } from "../data/content";

export default function Posts() {
  return (
    <div id="posts" className="sidebar-inner">
      <p className="section-kicker">From LinkedIn</p>
      <h2 className="sidebar-title">Recent posts</h2>

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
    </div>
  );
}
