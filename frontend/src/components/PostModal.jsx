import React, { useEffect } from 'react';
import { ExternalLink } from './icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faVideo, faSmile } from '@fortawesome/free-solid-svg-icons';
import ProfilePhoto from '../assets/profile_jake.jpg';

const PostModal = ({ open, onClose, personal }) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="post-modal-overlay" onClick={onClose}>
      <div className="post-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Create post">
        <div className="post-modal-header">
          <h2>Create post</h2>
          <button className="post-modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div className="post-modal-body">
          <div className="post-modal-author">
            <div className="header-avatar post-modal-avatar-wrapper">
              <img src={personal?.avatar || '/profile_jake.jpg' || ProfilePhoto} alt={personal?.name || 'You'} />
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
          />

          <div className="post-modal-additions">
            <button className="post-modal-add-btn">
              <FontAwesomeIcon icon={faImage} />
            </button>
            <button className="post-modal-add-btn">
              <FontAwesomeIcon icon={faVideo} />
            </button>
            <button className="post-modal-add-btn">
              <FontAwesomeIcon icon={faSmile} />
            </button>
            <div className="post-modal-add-more">Add to your post <ExternalLink /></div>
          </div>
        </div>

        <div className="post-modal-footer">
          <button className="post-modal-cancel" onClick={onClose}>Cancel</button>
          <button className="post-modal-post">Post</button>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
