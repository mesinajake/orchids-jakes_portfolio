import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import PostModal from "../components/PostModal";
import "../styles/index.css";
import ProfilePhoto from "../assets/profile_jake.jpg";

import {
  TechIcon,
} from "../components/icons";

// ─── Helper: time-ago formatter ───────────────────────────────
const timeAgo = (iso) => {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
};

// ─── Shared Post Actions Component ───────────────────────────
const PostActions = ({ postId, likes, comments, isLiked = false, onLike, onToggleComments, onShare }) => {
  const [liked, setLiked] = useState(Boolean(isLiked));
  const [showCopied, setShowCopied] = useState(false);

  useEffect(() => {
    setLiked(Boolean(isLiked));
  }, [isLiked, postId]);

  const handleLike = async () => {
    const nextLiked = !liked;
    setLiked(nextLiked);
    const success = await onLike(postId, nextLiked);
    if (success === false) {
      setLiked(!nextLiked);
    }
  };

  const handleShare = () => {
    const url = `${window.location.origin}#post-${postId}`;
    navigator.clipboard.writeText(url).then(() => {
      setShowCopied(true);
      setTimeout(() => setShowCopied(false), 2000);
    });
    if (onShare) onShare(postId);
  };

  return (
    <>
      {/* Reaction summary */}
      <div className="px-4 py-2 flex items-center justify-between text-muted-foreground text-xs">
        <div className="flex items-center gap-1">
          {likes > 0 && (
            <>
              <div className="flex -space-x-1">
                <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center border border-card">
                  <span className="material-symbols-outlined text-[8px] text-white">thumb_up</span>
                </div>
                {likes > 5 && (
                  <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center border border-card">
                    <span className="material-symbols-outlined text-[8px] text-white">favorite</span>
                  </div>
                )}
              </div>
              <span className="ml-1 hover:underline cursor-pointer">{likes}</span>
            </>
          )}
        </div>
        {comments.length > 0 && (
          <button onClick={() => onToggleComments(postId)} className="hover:underline cursor-pointer">
            {comments.length} comment{comments.length !== 1 ? "s" : ""}
          </button>
        )}
      </div>

      {/* Action buttons */}
      <div className="px-2 py-1 flex items-center border-t border-border">
        <button
          onClick={handleLike}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm transition-colors group ${liked ? "text-blue-500 font-semibold" : "text-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
        >
          <span className={`material-symbols-outlined ${liked ? "fill-1 text-blue-500" : "group-hover:text-blue-500"}`}>thumb_up</span>
          Like
        </button>
        <button
          onClick={() => onToggleComments(postId)}
          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-muted-foreground text-sm transition-colors group hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <span className="material-symbols-outlined group-hover:text-green-500">chat_bubble</span>
          Comment
        </button>
        <button
          onClick={handleShare}
          className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-muted-foreground text-sm transition-colors group hover:bg-slate-100 dark:hover:bg-slate-800 relative"
        >
          <span className="material-symbols-outlined group-hover:text-primary">share</span>
          {showCopied ? "Copied!" : "Share"}
        </button>
      </div>
    </>
  );
};

// ─── Comment Section Component ───────────────────────────────
const CommentSection = ({ postId, comments, onAddComment }) => {
  const [text, setText] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAddComment(postId, text.trim());
    setText("");
  };

  return (
    <div className="px-4 py-3 border-t border-border space-y-3 animate-fade-in">
      {/* Existing comments */}
      {comments.map((c, i) => (
        <div key={i} className="flex gap-2">
          <div className="w-7 h-7 rounded-full bg-slate-300 dark:bg-slate-600 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[14px]">person</span>
          </div>
          <div className="bg-slate-100 dark:bg-slate-800 rounded-xl px-3 py-2 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold">{c.author}</span>
              <span className="text-[10px] text-muted-foreground">{timeAgo(c.timestamp)}</span>
            </div>
            <p className="text-sm mt-0.5">{c.text}</p>
          </div>
        </div>
      ))}

      {/* Comment input */}
      <form onSubmit={handleSubmit} className="flex gap-2 items-center">
        <img src={ProfilePhoto} alt="You" className="w-7 h-7 rounded-full object-cover shrink-0" />
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a comment..."
            className="w-full bg-slate-100 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 rounded-full px-4 py-2 pr-10 outline-none focus:ring-1 focus:ring-primary placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
          {text.trim() && (
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-primary hover:text-primary/80 transition-colors"
            >
              <span className="material-symbols-outlined text-lg">send</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

const EditPostModal = ({
  open,
  values,
  onChange,
  onClose,
  onSave,
  isSaving,
  error,
}) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-slate-900 rounded-2xl border border-border shadow-2xl w-full max-w-lg animate-slide-up max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
          <h2 className="font-bold text-base">Edit Post</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors">
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          <input
            type="text"
            value={values.title}
            onChange={(e) => onChange({ ...values, title: e.target.value })}
            placeholder="Post title (optional)"
            className="w-full bg-transparent text-sm font-semibold placeholder:text-muted-foreground outline-none border-b border-border pb-2"
          />
          <textarea
            rows={6}
            value={values.content}
            onChange={(e) => onChange({ ...values, content: e.target.value })}
            placeholder="Update your post content..."
            className="w-full bg-transparent text-sm placeholder:text-muted-foreground outline-none resize-none leading-relaxed"
          />
        </div>

        <div className="px-5 pb-4 shrink-0">
          {error && <p className="text-xs text-red-500 mb-2">{error}</p>}
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-full text-sm font-bold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              disabled={isSaving}
              className={`flex-1 py-2.5 rounded-full text-sm font-bold transition-all ${isSaving
                  ? "bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed"
                  : "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20"
                }`}
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DeletePostModal = ({
  open,
  title,
  onCancel,
  onConfirm,
  isDeleting,
  error,
}) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
      onClick={onCancel}
    >
      <div
        className="bg-white dark:bg-slate-900 rounded-2xl border border-border shadow-2xl w-full max-w-md animate-slide-up p-5"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <span className="material-symbols-outlined text-red-500">delete</span>
          </div>
          <div>
            <h3 className="font-bold text-base">Delete Post</h3>
            <p className="text-xs text-muted-foreground">This action cannot be undone.</p>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4">
          Are you sure you want to permanently delete
          {title ? ` "${title}"` : " this post"}?
        </p>

        {error && <p className="text-xs text-red-500 mb-3">{error}</p>}

        <div className="flex gap-2">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-full text-sm font-bold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className={`flex-1 py-2.5 rounded-full text-sm font-bold transition-colors ${isDeleting
                ? "bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed"
                : "bg-red-500 text-white hover:bg-red-600"
              }`}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

const ImageLightbox = ({
  open,
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}) => {
  if (!open || !Array.isArray(images) || images.length === 0) return null;

  const currentImage = images[currentIndex];
  const canNavigate = images.length > 1;

  return (
    <div
      className="fixed inset-0 bg-black/95 z-[130] flex items-center justify-center p-4"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
        title="Close"
      >
        <span className="material-symbols-outlined">close</span>
      </button>

      {canNavigate && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          title="Previous image"
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
      )}

      <div className="max-w-[95vw] max-h-[90vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
        <img
          src={currentImage}
          alt={`Preview ${currentIndex + 1}`}
          className="max-w-[95vw] max-h-[90vh] w-auto h-auto object-contain"
        />
      </div>

      {canNavigate && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
          title="Next image"
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      )}

      {canNavigate && (
        <p className="absolute bottom-4 text-xs text-white/80">
          {currentIndex + 1} / {images.length}
        </p>
      )}
    </div>
  );
};


// ═══════════════════════════════════════════════════════════════
//  HomePage Main Component
// ═══════════════════════════════════════════════════════════════
const HomePage = () => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [activeTab, setActiveTab] = useState("All");
  const [activeSection, setActiveSection] = useState("Home");
  const [darkMode, setDarkMode] = useState(true);
  const [showPostModal, setShowPostModal] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [ownerToken, setOwnerToken] = useState("");
  const [editingPost, setEditingPost] = useState(null);
  const [editPostForm, setEditPostForm] = useState({ title: "", content: "" });
  const [isSavingEditPost, setIsSavingEditPost] = useState(false);
  const [editPostError, setEditPostError] = useState("");
  const [deletingPost, setDeletingPost] = useState(null);
  const [isDeletingPost, setIsDeletingPost] = useState(false);
  const [deletePostError, setDeletePostError] = useState("");
  const [imageViewer, setImageViewer] = useState({ open: false, images: [], index: 0 });

  // ── Interactive state ──────────────────────────────────────
  const [userPosts, setUserPosts] = useState([]);           // Posts created by owner
  const [postLikes, setPostLikes] = useState({});            // { [postId]: number }
  const [postComments, setPostComments] = useState({});      // { [postId]: [{author,text,timestamp}] }
  const [postLikedByMe, setPostLikedByMe] = useState({});    // { [postId]: bool }
  const [openComments, setOpenComments] = useState({});       // { [postId]: bool }
  const [visitorSessionId, setVisitorSessionId] = useState("");
  const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Fetch Data
  useEffect(() => {
    fetch('/portfolio.json')
      .then(res => res.json())
      .then(data => {
        setPortfolioData(data);
        // Seed initial likes from experience data
        const initialLikes = {};
        data.experience?.forEach((exp, i) => {
          initialLikes[`exp-${exp.id}`] = 10 + i * 5;
        });
        initialLikes['pinned-applitrak'] = 42;
        setPostLikes(prev => ({ ...initialLikes, ...prev }));

        // Seed initial comments
        setPostComments(prev => ({
          ...prev,
          'pinned-applitrak': [
            { author: "Tech Recruiter", text: "Impressive AI integration! Would love to discuss.", timestamp: new Date(Date.now() - 3600000).toISOString() },
            { author: "Fellow Dev", text: "The 90% time reduction is incredible 🔥", timestamp: new Date(Date.now() - 1800000).toISOString() },
          ],
        }));
      })
      .catch(err => console.error('Error loading portfolio data:', err));
  }, []);

  useEffect(() => {
    let isMounted = true;

    const validateOwnerSession = async () => {
      const storedOwnerToken = localStorage.getItem("ownerSessionToken");
      if (!storedOwnerToken) {
        if (isMounted) {
          setIsOwner(false);
          setOwnerToken("");
          setShowPostModal(false);
          setEditingPost(null);
          setDeletingPost(null);
        }
        return;
      }

      try {
        const response = await fetch(`${apiBaseUrl}/api/owner/me`, {
          headers: {
            Authorization: `Bearer ${storedOwnerToken}`,
          },
        });

        if (!response.ok) {
          throw new Error("Owner session is invalid.");
        }

        if (isMounted) {
          setIsOwner(true);
          setOwnerToken(storedOwnerToken);
        }
      } catch (_error) {
        localStorage.removeItem("ownerSessionToken");
        if (isMounted) {
          setIsOwner(false);
          setOwnerToken("");
          setShowPostModal(false);
          setEditingPost(null);
          setDeletingPost(null);
        }
      }
    };

    validateOwnerSession();
    return () => {
      isMounted = false;
    };
  }, [apiBaseUrl]);

  useEffect(() => {
    let sessionId = localStorage.getItem("portfolioVisitorSessionId");
    if (!sessionId) {
      sessionId = `visitor_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
      localStorage.setItem("portfolioVisitorSessionId", sessionId);
    }
    setVisitorSessionId(sessionId);
  }, []);

  useEffect(() => {
    let isMounted = true;
    if (!visitorSessionId) return () => { isMounted = false; };

    const loadPosts = async () => {
      try {
        const response = await fetch(`${apiBaseUrl}/api/posts?sessionId=${encodeURIComponent(visitorSessionId)}`);
        if (!response.ok) {
          throw new Error(`Failed with status ${response.status}`);
        }

        const payload = await response.json();
        const fetchedPosts = Array.isArray(payload?.data) ? payload.data : [];
        if (!isMounted) return;

        setUserPosts(fetchedPosts);
        setPostLikes(prev => {
          const next = { ...prev };
          fetchedPosts.forEach((post) => {
            if (post?.id) {
              next[post.id] = Number(post.likes) || 0;
            }
          });
          return next;
        });
        setPostLikedByMe(prev => {
          const next = { ...prev };
          fetchedPosts.forEach((post) => {
            if (post?.id) {
              next[post.id] = Boolean(post.likedByCurrentSession);
            }
          });
          return next;
        });
        setPostComments(prev => {
          const next = { ...prev };
          fetchedPosts.forEach((post) => {
            if (post?.id) {
              next[post.id] = Array.isArray(post.comments) ? post.comments : [];
            }
          });
          return next;
        });
      } catch (error) {
        console.error('Error loading persisted posts:', error);
      }
    };

    loadPosts();
    return () => {
      isMounted = false;
    };
  }, [apiBaseUrl, visitorSessionId]);

  // Theme Toggle
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  useEffect(() => {
    if (!imageViewer.open) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setImageViewer({ open: false, images: [], index: 0 });
        return;
      }

      if (event.key === "ArrowLeft") {
        setImageViewer((prev) => {
          if (!prev.open || prev.images.length < 2) return prev;
          const nextIndex = (prev.index - 1 + prev.images.length) % prev.images.length;
          return { ...prev, index: nextIndex };
        });
      }

      if (event.key === "ArrowRight") {
        setImageViewer((prev) => {
          if (!prev.open || prev.images.length < 2) return prev;
          const nextIndex = (prev.index + 1) % prev.images.length;
          return { ...prev, index: nextIndex };
        });
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [imageViewer.open]);

  if (!portfolioData) return <div className="flex items-center justify-center h-screen bg-background text-foreground">Loading...</div>;

  const { personal, experience, education, certifications, skills, social } = portfolioData;
  const socialLinks = Object.entries(social || {}).filter(
    ([key, url]) => url && key.toLowerCase() !== "linkedin"
  );

  // ── Interaction handlers ───────────────────────────────────
  const handleNewPost = (post) => {
    if (!isOwner || !post?.id) return;
    setUserPosts(prev => [post, ...prev]);
    setPostLikes(prev => ({ ...prev, [post.id]: Number(post.likes) || 0 }));
    setPostLikedByMe(prev => ({ ...prev, [post.id]: Boolean(post.likedByCurrentSession) }));
    setPostComments(prev => ({ ...prev, [post.id]: Array.isArray(post.comments) ? post.comments : [] }));
  };

  const handleLike = async (postId, isLiking) => {
    if (!postId) return false;

    if (postId.startsWith("pinned-") || postId.startsWith("exp-")) {
      setPostLikes(prev => ({
        ...prev,
        [postId]: Math.max(0, (prev[postId] || 0) + (isLiking ? 1 : -1)),
      }));
      setPostLikedByMe(prev => ({ ...prev, [postId]: isLiking }));
      return true;
    }

    if (!visitorSessionId) return false;

    const previousLikes = Number(postLikes[postId]) || 0;
    const previousLiked = Boolean(postLikedByMe[postId]);
    const optimisticLikes = Math.max(0, previousLikes + (isLiking ? 1 : -1));

    setPostLikedByMe(prev => ({ ...prev, [postId]: isLiking }));
    setPostLikes(prev => ({ ...prev, [postId]: optimisticLikes }));

    try {
      const response = await fetch(`${apiBaseUrl}/api/posts/${postId}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId: visitorSessionId,
          isLiking,
        }),
      });

      const payload = await response.json();
      if (!response.ok || !payload?.data?.id) {
        throw new Error(payload?.message || "Failed to update like.");
      }

      const updated = payload.data;
      setPostLikes(prev => ({ ...prev, [postId]: Number(updated.likes) || 0 }));
      setPostLikedByMe(prev => ({ ...prev, [postId]: Boolean(updated.likedByCurrentSession) }));
      if (Array.isArray(updated.comments)) {
        setPostComments(prev => ({ ...prev, [postId]: updated.comments }));
      }
      return true;
    } catch (error) {
      console.error("Error updating like:", error);
      setPostLikes(prev => ({ ...prev, [postId]: previousLikes }));
      setPostLikedByMe(prev => ({ ...prev, [postId]: previousLiked }));
      return false;
    }
  };

  const handleToggleComments = (postId) => {
    setOpenComments(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleAddComment = async (postId, text) => {
    if (!text?.trim()) return;

    if (postId.startsWith("pinned-") || postId.startsWith("exp-")) {
      const newComment = {
        author: "Visitor",
        text: text.trim(),
        timestamp: new Date().toISOString(),
      };
      setPostComments(prev => ({
        ...prev,
        [postId]: [...(prev[postId] || []), newComment],
      }));
      return;
    }

    if (!visitorSessionId) return;

    try {
      const response = await fetch(`${apiBaseUrl}/api/posts/${postId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId: visitorSessionId,
          author: "Visitor",
          text: text.trim(),
        }),
      });

      const payload = await response.json();
      if (!response.ok || !payload?.data?.post?.id) {
        throw new Error(payload?.message || "Failed to add comment.");
      }

      const updatedPost = payload.data.post;
      setPostComments(prev => ({
        ...prev,
        [postId]: Array.isArray(updatedPost.comments) ? updatedPost.comments : [],
      }));
      setPostLikes(prev => ({
        ...prev,
        [postId]: Number(updatedPost.likes) || 0,
      }));
      setPostLikedByMe(prev => ({
        ...prev,
        [postId]: Boolean(updatedPost.likedByCurrentSession),
      }));
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleEditPost = (post) => {
    if (!isOwner || !post?.id) return;
    setEditingPost(post);
    setEditPostForm({
      title: post.title || "",
      content: post.content || "",
    });
    setEditPostError("");
  };

  const closeEditPostModal = () => {
    if (isSavingEditPost) return;
    setEditingPost(null);
    setEditPostError("");
    setEditPostForm({ title: "", content: "" });
  };

  const saveEditedPost = async () => {
    if (!isOwner || !ownerToken || !editingPost?.id) return;

    setIsSavingEditPost(true);
    setEditPostError("");

    try {
      const response = await fetch(`${apiBaseUrl}/api/posts/${editingPost.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ownerToken}`,
        },
        body: JSON.stringify({
          title: editPostForm.title.trim() || null,
          content: editPostForm.content.trim(),
        }),
      });

      const payload = await response.json();
      if (!response.ok || !payload?.data?.id) {
        throw new Error(payload?.message || "Failed to update post.");
      }

      setUserPosts(prev => prev.map((item) => (item.id === editingPost.id ? payload.data : item)));
      setPostLikes(prev => ({ ...prev, [editingPost.id]: Number(payload.data.likes) || 0 }));
      setPostLikedByMe(prev => ({ ...prev, [editingPost.id]: Boolean(payload.data.likedByCurrentSession) }));
      setPostComments(prev => ({
        ...prev,
        [editingPost.id]: Array.isArray(payload.data.comments) ? payload.data.comments : [],
      }));

      closeEditPostModal();
    } catch (error) {
      console.error("Error updating post:", error);
      setEditPostError(error.message || "Failed to update post.");
    } finally {
      setIsSavingEditPost(false);
    }
  };

  const handleDeletePost = (post) => {
    if (!isOwner || !post?.id) return;
    setDeletingPost(post);
    setDeletePostError("");
  };

  const closeDeletePostModal = () => {
    if (isDeletingPost) return;
    setDeletingPost(null);
    setDeletePostError("");
  };

  const confirmDeletePost = async () => {
    if (!isOwner || !ownerToken || !deletingPost?.id) return;

    setIsDeletingPost(true);
    setDeletePostError("");

    try {
      const response = await fetch(`${apiBaseUrl}/api/posts/${deletingPost.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${ownerToken}`,
        },
      });

      const payload = await response.json();
      if (!response.ok || payload?.success !== true) {
        throw new Error(payload?.message || "Failed to delete post.");
      }

      setUserPosts(prev => prev.filter((item) => item.id !== deletingPost.id));
      setPostLikes(prev => {
        const next = { ...prev };
        delete next[deletingPost.id];
        return next;
      });
      setPostComments(prev => {
        const next = { ...prev };
        delete next[deletingPost.id];
        return next;
      });
      setPostLikedByMe(prev => {
        const next = { ...prev };
        delete next[deletingPost.id];
        return next;
      });
      setOpenComments(prev => {
        const next = { ...prev };
        delete next[deletingPost.id];
        return next;
      });

      closeDeletePostModal();
    } catch (error) {
      console.error("Error deleting post:", error);
      setDeletePostError(error.message || "Failed to delete post.");
    } finally {
      setIsDeletingPost(false);
    }
  };

  const openImageViewer = (images, index = 0) => {
    if (!Array.isArray(images) || images.length === 0) return;
    const safeIndex = Math.max(0, Math.min(index, images.length - 1));
    setImageViewer({
      open: true,
      images,
      index: safeIndex,
    });
  };

  const closeImageViewer = () => {
    setImageViewer({ open: false, images: [], index: 0 });
  };

  const showPreviousImage = () => {
    setImageViewer((prev) => {
      if (!prev.open || prev.images.length < 2) return prev;
      const nextIndex = (prev.index - 1 + prev.images.length) % prev.images.length;
      return { ...prev, index: nextIndex };
    });
  };

  const showNextImage = () => {
    setImageViewer((prev) => {
      if (!prev.open || prev.images.length < 2) return prev;
      const nextIndex = (prev.index + 1) % prev.images.length;
      return { ...prev, index: nextIndex };
    });
  };

  const handleShare = (postId) => {
    // Already handled in PostActions, but could log analytics here
  };

  const getTechColor = (name) => {
    const normalized = name.toLowerCase();
    if (normalized.includes("react")) return "text-cyan-400 border-cyan-400/20 bg-cyan-400/10";
    if (normalized.includes("javascript") || normalized === "js") return "text-yellow-400 border-yellow-400/20 bg-yellow-400/10";
    if (normalized.includes("html")) return "text-orange-500 border-orange-500/20 bg-orange-500/10";
    if (normalized.includes("css")) return "text-blue-500 border-blue-500/20 bg-blue-500/10";
    if (normalized.includes("vite")) return "text-purple-500 border-purple-500/20 bg-purple-500/10";
    if (normalized.includes("node")) return "text-green-500 border-green-500/20 bg-green-500/10";
    if (normalized.includes("mongo")) return "text-emerald-500 border-emerald-500/20 bg-emerald-500/10";
    return "text-primary border-primary/20 bg-primary/10";
  };

  // ── Social icon mapper ─────────────────────────────────────
  const getSocialIcon = (key) => {
    const k = key.toLowerCase();
    if (k === "github") return {
      color: "text-slate-800 dark:text-white",
      svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
    };
    if (k === "linkedin") return {
      color: "text-[#0A66C2]",
      svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
    };
    if (k === "instagram") return {
      color: "text-[#E4405F]",
      svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.882 0 1.441 1.441 0 012.882 0z" /></svg>
    };
    if (k === "twitter" || k === "x") return {
      color: "text-slate-800 dark:text-white",
      svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
    };
    if (k === "portfolio" || k === "website") return {
      color: "text-primary",
      svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" /></svg>
    };
    // fallback
    return {
      color: "text-muted-foreground",
      svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" /></svg>
    };
  };

  // ── Feed Controls ──────────────────────────────────────────
  const renderFeedControls = () => {
    if (!isOwner) return null;

    return (
      <div className="bg-card rounded-xl border border-border p-4 shadow-sm animate-fade-in mb-6">
        <div className="flex gap-3">
          <img src={ProfilePhoto} alt="Me" className="w-10 h-10 rounded-full object-cover" />
          <div className="flex-1">
            <button
              onClick={() => setShowPostModal(true)}
              className="w-full text-left bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-muted-foreground rounded-full px-4 py-2.5 text-sm transition-colors border border-transparent focus:border-primary outline-none"
            >
              START A PROJECT UPDATE...
            </button>
            <div className="flex gap-4 mt-3 ml-1">
              <button onClick={() => setShowPostModal(true)} className="flex items-center gap-1.5 text-muted-foreground hover:text-sky-500 text-xs font-medium transition-colors">
                <span className="material-symbols-outlined text-lg text-sky-500">image</span> Media
              </button>
              <button onClick={() => setShowPostModal(true)} className="flex items-center gap-1.5 text-muted-foreground hover:text-emerald-500 text-xs font-medium transition-colors">
                <span className="material-symbols-outlined text-lg text-emerald-500">code</span> Snippet
              </button>
              <button onClick={() => setShowPostModal(true)} className="flex items-center gap-1.5 text-muted-foreground hover:text-amber-500 text-xs font-medium transition-colors">
                <span className="material-symbols-outlined text-lg text-amber-500">calendar_month</span> Event
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ── Feed Posts ──────────────────────────────────────────────
  const renderFeedPosts = () => {
    const pinnedPostImages = [
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1766235642796.png?width=8000&height=8000&resize=contain",
      "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/Screenshot-2025-12-13-191932-1766235676192.png?width=8000&height=8000&resize=contain",
    ];

    return (
      <div className="space-y-6">
      {/* ── User-Created Posts (newest first) ── */}
      {userPosts.map((post) => (
        <article key={post.id} id={`post-${post.id}`} className="bg-card rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow animate-slide-up">
          <div className="bg-emerald-500/10 px-4 py-1 flex items-center gap-2 border-b border-border/50">
            <span className="material-symbols-outlined text-emerald-500 text-sm">auto_awesome</span>
            <span className="text-[10px] font-bold text-emerald-500 tracking-wide">NEW POST</span>
          </div>
          <div className="p-4 flex items-start justify-between">
            <div className="flex gap-3">
              <img src={ProfilePhoto} alt={post.author} className="w-12 h-12 rounded-lg object-cover" />
              <div>
                <div className="flex items-center gap-1">
                  <h3 className="font-bold text-sm">{post.author}</h3>
                  <span className="material-symbols-outlined text-primary text-[16px] fill-1">verified</span>
                </div>
                <p className="text-muted-foreground text-[10px] mt-0.5 flex items-center gap-1">
                  {timeAgo(post.timestamp)} | <span className="material-symbols-outlined text-[10px]">public</span>
                </p>
              </div>
            </div>
            {isOwner && (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleEditPost(post)}
                  className="w-8 h-8 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-muted-foreground hover:text-primary"
                  title="Edit post"
                >
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                </button>
                <button
                  onClick={() => handleDeletePost(post)}
                  className="w-8 h-8 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-muted-foreground hover:text-red-500"
                  title="Delete post"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            )}
          </div>
          <div className="px-4 pb-3">
            {post.title && <h4 className="font-bold text-sm mb-1">{post.title}</h4>}
            {post.content && <p className="text-sm leading-relaxed whitespace-pre-wrap">{post.content}</p>}
          </div>

          {/* Attached Images */}
          {post.images && post.images.length > 0 && (
            <div className={`grid gap-1 px-4 mb-3 ${post.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
              {post.images.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  alt={`Attachment ${idx + 1}`}
                  onClick={() => openImageViewer(post.images, idx)}
                  className="w-full max-h-96 h-auto object-contain rounded-lg border border-border bg-slate-100 dark:bg-slate-800 cursor-zoom-in"
                />
              ))}
            </div>
          )}

          {/* Attached Video */}
          {post.video && (
            <div className="px-4 mb-3">
              <video src={post.video} controls className="w-full rounded-lg border border-border max-h-60 bg-black" />
            </div>
          )}

          {/* Attached Code Snippet */}
          {post.codeSnippet && (
            <div className="mx-4 mb-3 rounded-lg overflow-hidden border border-border">
              <div className="bg-slate-800 px-3 py-1.5 flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400 uppercase">{post.codeLang || "code"}</span>
                <button
                  onClick={() => navigator.clipboard.writeText(post.codeSnippet)}
                  className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                >
                  <span className="material-symbols-outlined text-xs">content_copy</span> Copy
                </button>
              </div>
              <pre className="bg-slate-900 p-3 text-xs font-mono text-green-400 overflow-x-auto leading-relaxed"><code>{post.codeSnippet}</code></pre>
            </div>
          )}

          {/* Attached Event */}
          {post.event && post.event.title && (
            <div className="mx-4 mb-3 bg-amber-500/5 border border-amber-500/20 rounded-lg p-3 flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex flex-col items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-amber-500 text-xl">event</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm truncate">{post.event.title}</p>
                <p className="text-xs text-muted-foreground flex items-center gap-2 mt-0.5">
                  {post.event.date && <span>{new Date(post.event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>}
                  {post.event.time && <span>| {post.event.time}</span>}
                </p>
              </div>
              <span className="material-symbols-outlined text-amber-500 text-sm">arrow_forward</span>
            </div>
          )}

          <PostActions
            postId={post.id}
            likes={postLikes[post.id] || 0}
            comments={postComments[post.id] || []}
            isLiked={Boolean(postLikedByMe[post.id])}
            onLike={handleLike}
            onToggleComments={handleToggleComments}
            onShare={handleShare}
          />
          {openComments[post.id] && (
            <CommentSection
              postId={post.id}
              comments={postComments[post.id] || []}
              onAddComment={handleAddComment}
            />
          )}
        </article>
      ))}

      {/* ── Pinned Post: AppliTrak ── */}
      <article id="post-pinned-applitrak" className="bg-card rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow animate-slide-up">
        <div className="bg-primary/5 px-4 py-1 flex items-center gap-2 border-b border-border/50">
          <span className="material-symbols-outlined text-primary text-sm">push_pin</span>
          <span className="text-[10px] font-bold text-primary tracking-wide">PINNED POST</span>
        </div>
        <div className="p-4 flex items-start justify-between">
          <div className="flex gap-3">
            <img src={ProfilePhoto} alt={personal.name} className="w-12 h-12 rounded-lg object-cover" />
            <div>
              <div className="flex items-center gap-1">
                <h3 className="font-bold text-sm hover:underline cursor-pointer">{personal.name}</h3>
                <span className="material-symbols-outlined text-primary text-[16px] fill-1" title="Verified">verified</span>
                <span className="text-muted-foreground text-xs">| 1st</span>
              </div>
              <div className="flex flex-col">
                <p className="text-muted-foreground text-[11px]">{personal.title}</p>
                <p className="text-muted-foreground text-[10px] mt-0.5 flex items-center gap-1">
                  Just now | <span className="material-symbols-outlined text-[10px]">public</span>
                </p>
              </div>
            </div>
          </div>
          <button className="text-muted-foreground hover:text-primary rounded-full p-1 transition-colors">
            <span className="material-symbols-outlined">more_horiz</span>
          </button>
        </div>

        <div className="px-4 pb-2">
          <h4 className="font-bold text-sm mb-1">AppliTrak: AI-Powered Job Portal</h4>
          <div className="text-sm leading-relaxed mb-4 text-foreground/90">
            Building AppliTrak! (Work in Progress) Making great strides on this <span className="text-primary font-medium">AI-powered job portal</span> that uses local LLMs.
            <div className="mt-2 text-xs text-muted-foreground bg-slate-100 dark:bg-slate-800 p-2 rounded border border-border/50">
              Reduced manual screening from 5-7 minutes to <span className="font-bold text-emerald-500">30 seconds</span>.
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-1 px-4 mb-4">
          {pinnedPostImages.map((src, idx) => (
            <img
              key={src}
              src={src}
              className="rounded-lg border border-border object-contain w-full h-32 bg-black cursor-zoom-in"
              alt={idx === 0 ? "Dashboard" : "AI Analyzer"}
              onClick={() => openImageViewer(pinnedPostImages, idx)}
            />
          ))}
        </div>

        <PostActions
          postId="pinned-applitrak"
          likes={postLikes['pinned-applitrak'] || 0}
          comments={postComments['pinned-applitrak'] || []}
          isLiked={Boolean(postLikedByMe['pinned-applitrak'])}
          onLike={handleLike}
          onToggleComments={handleToggleComments}
          onShare={handleShare}
        />
        {openComments['pinned-applitrak'] && (
          <CommentSection
            postId="pinned-applitrak"
            comments={postComments['pinned-applitrak'] || []}
            onAddComment={handleAddComment}
          />
        )}
      </article>

      {/* ── Dynamic Experience Posts ── */}
      {experience.filter(exp => !exp.project.includes("AppliTrak")).map((exp, i) => {
        const postId = `exp-${exp.id}`;
        return (
          <article key={exp.id} id={`post-${postId}`} className="bg-card rounded-xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-shadow animate-slide-up" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="p-4 flex items-start justify-between">
              <div className="flex gap-3">
                <img src={ProfilePhoto} alt={personal.name} className="w-12 h-12 rounded-lg object-cover" />
                <div>
                  <div className="flex items-center gap-1">
                    <h3 className="font-bold text-sm hover:underline cursor-pointer">{personal.name}</h3>
                    <span className="material-symbols-outlined text-primary text-[16px] fill-1">verified</span>
                  </div>
                  <p className="text-muted-foreground text-[11px]">{exp.position}</p>
                  <p className="text-muted-foreground text-[10px] mt-0.5">{exp.duration}</p>
                </div>
              </div>
            </div>
            <div className="px-4 pb-2">
              <h4 className="font-bold text-sm mb-1">{exp.project}</h4>
              <p className="text-sm leading-relaxed mb-4 text-foreground/90">{exp.description}</p>

              <div className="flex flex-wrap gap-2 mb-3">
                {exp.technologies?.slice(0, 4).map(tech => (
                  <span key={tech} className={`px-2 py-0.5 rounded text-[10px] font-medium border ${getTechColor(tech)}`}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {exp.githubUrl && (
              <div className="px-4 py-3 bg-black/5 dark:bg-white/5 mx-4 mb-4 rounded-lg flex items-center justify-between border border-border">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">code</span>
                  <span className="text-xs font-mono">View Source Code</span>
                </div>
                <a href={exp.githubUrl} target="_blank" rel="noreferrer" className="text-xs font-bold text-primary hover:underline flex items-center gap-1">
                  GitHub <span className="material-symbols-outlined text-xs">open_in_new</span>
                </a>
              </div>
            )}

            <PostActions
              postId={postId}
              likes={postLikes[postId] || 0}
              comments={postComments[postId] || []}
              isLiked={Boolean(postLikedByMe[postId])}
              onLike={handleLike}
              onToggleComments={handleToggleComments}
              onShare={handleShare}
            />
            {openComments[postId] && (
              <CommentSection
                postId={postId}
                comments={postComments[postId] || []}
                onAddComment={handleAddComment}
              />
            )}
          </article>
        );
      })}
      </div>
    );
  };

  // ═══════════════════════════════════════════════════════════
  //  RENDER
  // ═══════════════════════════════════════════════════════════
  return (
    <div className="min-h-screen bg-background text-foreground font-sans transition-colors duration-300">

      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 glass backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">

          <div className="flex items-center gap-4 flex-1">
            <div className="flex items-center gap-2 text-primary hover:opacity-80 transition-opacity cursor-pointer">
              <span className="material-symbols-outlined text-3xl">terminal</span>
              <span className="text-xl font-bold tracking-tight hidden sm:block">DevPort</span>
            </div>
            <div className="relative w-full max-w-md hidden md:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-foreground/60 text-xl">search</span>
              <input
                type="text"
                className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg py-2 pl-10 pr-4 text-sm text-slate-900 dark:text-slate-100 focus:ring-1 focus:ring-primary placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none"
                placeholder="Search projects, skills, or experience..."
              />
            </div>
          </div>

          <nav className="flex items-center gap-1 md:gap-6">
            <button
              onClick={() => setActiveSection('Home')}
              className={`flex flex-col items-center pb-1 pt-2 px-2 transition-colors ${activeSection === 'Home' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <span className="material-symbols-outlined">home</span>
              <span className="text-[10px] font-medium hidden md:block mt-0.5">Home</span>
            </button>
            <button
              onClick={() => setActiveSection('About')}
              className={`flex flex-col items-center pb-1 pt-2 px-2 transition-colors ${activeSection === 'About' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <span className="material-symbols-outlined">person</span>
              <span className="text-[10px] font-medium hidden md:block mt-0.5">About</span>
            </button>
            <button
              onClick={() => setActiveSection('Certifications')}
              className={`flex flex-col items-center pb-1 pt-2 px-2 transition-colors ${activeSection === 'Certifications' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <span className="material-symbols-outlined">workspace_premium</span>
              <span className="text-[10px] font-medium hidden md:block mt-0.5">Certs</span>
            </button>
            <div className="h-8 w-[1px] bg-border mx-2"></div>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-primary"
            >
              <span className="material-symbols-outlined">{darkMode ? 'light_mode' : 'dark_mode'}</span>
            </button>

            <div className="h-9 w-9 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center overflow-hidden">
              <img src={ProfilePhoto} className="w-full h-full object-cover" alt="Profile" />
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-12 gap-6">

        {/* Left Sidebar */}
        <aside className="md:col-span-3 space-y-4 hidden md:block">
          <div className="bg-card rounded-xl border border-border">
            <div className="h-20 bg-gradient-to-r from-primary to-blue-600 rounded-t-xl"></div>
            <div className="px-4 pb-6">
              <div className="relative -mt-10 mb-3 text-center">
                <img src={ProfilePhoto} className="w-20 h-20 rounded-xl border-4 border-card object-cover mx-auto shadow-lg" alt={personal.name} />
              </div>{/*  */}
              <div className="text-center">
                <h1 className="text-lg font-bold">{personal.name}</h1>
                <p className="text-muted-foreground text-xs leading-tight mt-1">{personal.title}</p>
                <div className="flex items-center justify-center gap-1 text-muted-foreground text-[11px] mt-3">
                  <span className="material-symbols-outlined text-[14px]">location_on</span>
                  {personal.location.split(',')[0]}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border space-y-2">
                <div className="flex justify-between items-center text-xs group cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 p-1.5 rounded transition-colors">
                  <span className="text-muted-foreground group-hover:text-primary transition-colors">Projects</span>
                  <span className="font-bold text-primary">{experience.length + userPosts.length}</span>
                </div>
                <div className="flex justify-between items-center text-xs group cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 p-1.5 rounded transition-colors">
                  <span className="text-muted-foreground group-hover:text-primary transition-colors">Certifications</span>
                  <span className="font-bold text-primary">{certifications.length}</span>
                </div>
              </div>

              <a
                href="https://www.linkedin.com/in/jake-mesina-b16908307/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mt-4 py-2 bg-primary hover:bg-primary/90 text-white text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
              >
                <span className="material-symbols-outlined text-sm">person_add</span>
                Connect on LinkedIn
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-card rounded-xl border border-border p-4">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3">Socials</h3>
            <div className="space-y-2">
              {socialLinks.map(([key, url]) => {
                const icon = getSocialIcon(key);
                return (
                  <a key={key} href={url} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 p-2 rounded transition-colors group">
                    <span className={`w-5 h-5 flex items-center justify-center shrink-0 ${icon.color}`}>
                      {icon.svg}
                    </span>
                    <span className="capitalize flex-1">{key}</span>
                    <span className="material-symbols-outlined text-[12px] opacity-0 group-hover:opacity-100">arrow_outward</span>
                  </a>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Center Feed */}
        <section className="md:col-span-6 space-y-6">
          {renderFeedControls()}

          {isOwner && (
            <PostModal
              open={showPostModal}
              onClose={() => setShowPostModal(false)}
              personal={portfolioData.personal}
              onPost={handleNewPost}
              apiBaseUrl={apiBaseUrl}
              ownerToken={ownerToken}
            />
          )}

          {isOwner && (
            <EditPostModal
              open={Boolean(editingPost)}
              values={editPostForm}
              onChange={setEditPostForm}
              onClose={closeEditPostModal}
              onSave={saveEditedPost}
              isSaving={isSavingEditPost}
              error={editPostError}
            />
          )}

          {isOwner && (
            <DeletePostModal
              open={Boolean(deletingPost)}
              title={deletingPost?.title}
              onCancel={closeDeletePostModal}
              onConfirm={confirmDeletePost}
              isDeleting={isDeletingPost}
              error={deletePostError}
            />
          )}

          {activeSection === 'Home' && renderFeedPosts()}

          {activeSection === 'About' && (
            <div className="bg-card rounded-xl border border-border p-6 animate-fade-in">
              <h2 className="text-xl font-bold mb-4">About Me</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">{personal.bio}</p>
              <h3 className="font-bold text-sm mb-2 mt-6">Core Traits</h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                {portfolioData.personality.traits.map(t => <li key={t}>{t}</li>)}
              </ul>
            </div>
          )}

          {activeSection === 'Certifications' && (
            <div className="space-y-4 animate-fade-in">
              {certifications.map(cert => (
                <div key={cert.credentialId} className="bg-card rounded-xl border border-border p-4 flex gap-4 items-center">
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-2xl text-primary">verified</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-sm">{cert.name}</h3>
                    <p className="text-xs text-muted-foreground">{cert.issuer} | {cert.date}</p>
                  </div>
                  <a href={cert.url} target="_blank" className="text-primary hover:underline text-xs">View</a>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Right Sidebar */}
        <aside className="md:col-span-3 space-y-6 hidden lg:block">
          <div className="bg-card rounded-xl border border-border p-4">
            <h2 className="font-bold text-sm flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-primary">terminal</span>
              Technical Arsenal
            </h2>
            <div className="space-y-4">
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Frontend</p>
                <div className="flex flex-wrap gap-1.5">
                  {skills.frontend.map(skill => (
                    <span key={skill.name} className={`px-2 py-1 rounded text-[10px] font-medium border ${getTechColor(skill.name)}`}>
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Backend</p>
                <div className="flex flex-wrap gap-1.5">
                  {skills.backend.map(skill => (
                    <span key={skill.name} className={`px-2 py-1 rounded text-[10px] font-medium border ${getTechColor(skill.name)}`}>
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border p-4">
            <h2 className="font-bold text-sm mb-4">Education</h2>
            <div className="space-y-4">
              {education.map(edu => (
                <div key={edu.institution} className="flex gap-3 items-start">
                  <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary text-sm">school</span>
                  </div>
                  <div>
                    <p className="text-[12px] font-medium leading-tight">{edu.degree}</p>
                    <p className="text-[10px] text-muted-foreground mt-1">{edu.institution}</p>
                    <p className="text-[10px] text-muted-foreground">{edu.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <footer className="text-[10px] text-muted-foreground text-center space-y-2 pt-4 border-t border-border">
            <div className="flex flex-wrap justify-center gap-2">
              <a href="#" className="hover:text-primary">Privacy</a>
              <a href="#" className="hover:text-primary">Terms</a>
              <a href="#" className="hover:text-primary">Cookies</a>
            </div>
            <p>(c) 2024 Jake Mesina. All rights reserved.</p>
          </footer>
        </aside>
      </main>

      <ImageLightbox
        open={imageViewer.open}
        images={imageViewer.images}
        currentIndex={imageViewer.index}
        onClose={closeImageViewer}
        onPrev={showPreviousImage}
        onNext={showNextImage}
      />

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border h-14 flex items-center justify-around z-50">
        <button onClick={() => setActiveSection('Home')} className={`flex flex-col items-center ${activeSection === 'Home' ? 'text-primary' : 'text-muted-foreground'}`}>
          <span className="material-symbols-outlined">home</span>
        </button>
        <button onClick={() => setActiveSection('About')} className={`flex flex-col items-center ${activeSection === 'About' ? 'text-primary' : 'text-muted-foreground'}`}>
          <span className="material-symbols-outlined">person</span>
        </button>
        <button onClick={() => setActiveSection('Certifications')} className={`flex flex-col items-center ${activeSection === 'Certifications' ? 'text-primary' : 'text-muted-foreground'}`}>
          <span className="material-symbols-outlined">workspace_premium</span>
        </button>
      </div>

    </div>
  );
};

export default HomePage;

