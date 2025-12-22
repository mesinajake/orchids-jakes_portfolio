import React, { useEffect, useState } from 'react';
import { ExternalLink } from './icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faVideo, faSmile } from '@fortawesome/free-solid-svg-icons';
import ProfilePhoto from '../assets/profile_jake.jpg';

const PostModal = ({ open, onClose, personal, draft = '', onDraftChange }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const handlePost = () => {
    if (!content.trim()) return;
    // TODO: send `content` to backend or parent via prop (not implemented)
    if (typeof onDraftChange === 'function') onDraftChange('');
    setContent('');
    if (onClose) onClose();
  };

  // When modal opens, load draft into textarea
  useEffect(() => {
    if (open) setContent(draft || '');
  }, [open, draft]);

  const handleRequestClose = (e) => {
    // simply close; parent `feedInputValue` is kept in sync via `onDraftChange`
    if (onClose) onClose();
  };

  if (!open) return null;

  return (
    <div className="post-modal-overlay" onClick={handleRequestClose}>
      <div className="post-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Create post">
        <div className="post-modal-header">
          <h2>Create post</h2>
          <button className="post-modal-close" onClick={handleRequestClose} aria-label="Close">✕</button>
        </div>
        <div className="post-modal-body">
          <div className="post-modal-author">
            <div className="header-avatar post-modal-avatar-wrapper">
              <img className="post-modal-avatar" src={ProfilePhoto} alt={personal?.name || 'You'} />
            </div>
            <div className="post-modal-author-info">
              <div className="post-modal-author-name">{personal?.name || 'You'}</div>
              <div className="post-modal-author-privacy">Friends ▾</div>
            </div>
          </div>

          <textarea
            className="post-modal-textarea"
            placeholder={`What's on your mind, ${personal?.name?.split(' ')[0] || 'You'}?`}
            rows={6}
            value={content}
            onChange={(e) => {
              const v = e.target.value;
              setContent(v);
              if (typeof onDraftChange === 'function') onDraftChange(v);
            }}
          />

          <div className="post-modal-additions">
            <button className="post-modal-add-btn image-btn" aria-label="Add image">
              <FontAwesomeIcon icon={faImage} />
            </button>
            <button className="post-modal-add-btn video-btn" aria-label="Add video">
              <FontAwesomeIcon icon={faVideo} />
            </button>
            <button className="post-modal-add-btn smile-btn" aria-label="Add emoji">
              <FontAwesomeIcon icon={faSmile} />
            </button>
            <div className="post-modal-add-more">Add to your post <ExternalLink /></div>
          </div>
        </div>

        <div className="post-modal-footer">
          <button
            className="post-modal-post"
            onClick={handlePost}
            disabled={!content.trim()}
            aria-disabled={!content.trim()}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
