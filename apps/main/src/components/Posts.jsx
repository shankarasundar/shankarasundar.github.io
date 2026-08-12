import { useState } from "react";
import { linkedinPosts as linkedinPostsData, profile } from "../data/content";
import { useEditableCollection, EditableText, ItemControls, AddItemButton } from "edit-kit";

export default function Posts() {
  const [visible, setVisible] = useState(true);
  const linkedinPosts = useEditableCollection("linkedinPosts", linkedinPostsData);

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
            {linkedinPosts.items.map((p) => (
              <div className="post-card" key={p.id}>
                <iframe
                  src={p.embedSrc}
                  title={p.title}
                  className="post-embed"
                  frameBorder="0"
                  allowFullScreen
                />
                <div className="post-footer">
                  <EditableText as="span" value={p.title} onChange={(v) => linkedinPosts.updateItem(p.id, { title: v })} />
                  <a href={p.link} target="_blank" rel="noreferrer">
                    View on LinkedIn
                  </a>
                  <ItemControls
                    onMoveUp={() => linkedinPosts.moveItem(p.id, -1)}
                    onMoveDown={() => linkedinPosts.moveItem(p.id, 1)}
                    onDelete={() => linkedinPosts.removeItem(p.id)}
                    canMoveUp={linkedinPosts.items.indexOf(p) > 0}
                    canMoveDown={linkedinPosts.items.indexOf(p) < linkedinPosts.items.length - 1}
                  />
                </div>
              </div>
            ))}
          </div>
          <AddItemButton
            label="Add LinkedIn post"
            onClick={() => {
              const embedSrc = window.prompt("Paste the LinkedIn embed src (from Embed this post):");
              if (!embedSrc) return;
              const link = window.prompt("Paste the post's public URL:") || embedSrc;
              linkedinPosts.addItem({ id: `post-${Date.now()}`, title: "New post", embedSrc, link });
            }}
          />

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
