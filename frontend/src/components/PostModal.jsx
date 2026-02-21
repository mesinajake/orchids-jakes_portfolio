import React, { useEffect, useState, useRef } from "react";
import ProfilePhoto from "../assets/profile_jake.jpg";

const PostModal = ({ open, onClose, personal, onPost, apiBaseUrl, ownerToken }) => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  // ── Attachments ────────────────────────────────────────────
  const [images, setImages] = useState([]);           // [{ file, preview }]
  const [video, setVideo] = useState(null);            // { file, preview, isCamera }
  const [codeSnippet, setCodeSnippet] = useState("");  // raw code text
  const [codeLang, setCodeLang] = useState("javascript");
  const [event, setEvent] = useState(null);            // { title, date, time }

  // ── UI toggles ────────────────────────────────────────────
  const [showCodePanel, setShowCodePanel] = useState(false);
  const [showEventPanel, setShowEventPanel] = useState(false);
  const [showVideoOptions, setShowVideoOptions] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const cameraVideoRef = useRef(null);
  const mediaStreamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);

  // ── Reset on open ──────────────────────────────────────────
  useEffect(() => {
    if (open) {
      setContent(""); setTitle("");
      setImages([]); setVideo(null);
      setCodeSnippet(""); setCodeLang("javascript");
      setEvent(null);
      setShowCodePanel(false); setShowEventPanel(false);
      setShowVideoOptions(false);
      setIsSubmitting(false);
      setSubmitError("");
      stopCamera();
    }
  }, [open]);

  // ── Escape key ─────────────────────────────────────────────
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") handleClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // ── Cleanup previews on unmount ────────────────────────────
  useEffect(() => {
    return () => {
      images.forEach(img => URL.revokeObjectURL(img.preview));
      if (video?.preview) URL.revokeObjectURL(video.preview);
      stopCamera();
    };
  }, []);

  const handleClose = () => {
    stopCamera();
    onClose();
  };

  // ═══════════════════════════════════════════════════════════
  //  IMAGE HANDLING
  // ═══════════════════════════════════════════════════════════
  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages(prev => [...prev, ...newImages].slice(0, 4)); // max 4 images
    e.target.value = "";
  };

  const removeImage = (index) => {
    setImages(prev => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  // ═══════════════════════════════════════════════════════════
  //  VIDEO HANDLING — file upload
  // ═══════════════════════════════════════════════════════════
  const handleVideoSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (video?.preview) URL.revokeObjectURL(video.preview);
    setVideo({ file, preview: URL.createObjectURL(file), isCamera: false });
    setShowVideoOptions(false);
    e.target.value = "";
  };

  const removeVideo = () => {
    if (video?.preview) URL.revokeObjectURL(video.preview);
    setVideo(null);
  };

  // ═══════════════════════════════════════════════════════════
  //  VIDEO HANDLING — camera capture
  // ═══════════════════════════════════════════════════════════
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: 1280, height: 720 },
        audio: true,
      });
      mediaStreamRef.current = stream;
      setIsCameraActive(true);
      setShowVideoOptions(false);

      // Wait for ref to mount
      setTimeout(() => {
        if (cameraVideoRef.current) {
          cameraVideoRef.current.srcObject = stream;
        }
      }, 100);
    } catch (err) {
      alert("Camera access denied or unavailable.");
      console.error(err);
    }
  };

  const stopCamera = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(t => t.stop());
      mediaStreamRef.current = null;
    }
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    setIsCameraActive(false);
    recordedChunksRef.current = [];
  };

  const [isRecording, setIsRecording] = useState(false);

  const startRecording = () => {
    if (!mediaStreamRef.current) return;
    recordedChunksRef.current = [];
    const recorder = new MediaRecorder(mediaStreamRef.current, { mimeType: "video/webm" });
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) recordedChunksRef.current.push(e.data);
    };
    recorder.onstop = () => {
      const blob = new Blob(recordedChunksRef.current, { type: "video/webm" });
      const preview = URL.createObjectURL(blob);
      setVideo({ file: blob, preview, isCamera: true });
      stopCamera();
    };
    recorder.start();
    mediaRecorderRef.current = recorder;
    setIsRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
  };

  // ═══════════════════════════════════════════════════════════
  //  POST SUBMIT
  // ═══════════════════════════════════════════════════════════
  const hasEventContent = Boolean(
    event && (event.title?.trim() || event.date?.trim() || event.time?.trim())
  );
  const canPost = Boolean(content.trim() || images.length > 0 || video || codeSnippet.trim() || hasEventContent);

  const toUploadFile = (value, fallbackName, fallbackType) => {
    if (value instanceof File) return value;
    if (value instanceof Blob) return new File([value], fallbackName, { type: value.type || fallbackType });
    return null;
  };

  const uploadMediaFile = async (file) => {
    const uploadFormData = new FormData();
    uploadFormData.append("file", file, file.name);

    const uploadResponse = await fetch(`${apiBaseUrl}/api/posts/media`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ownerToken}`,
      },
      body: uploadFormData,
    });

    const uploadPayload = await uploadResponse.json();
    if (!uploadResponse.ok || !uploadPayload?.data?.url || !uploadPayload?.data?.publicId) {
      throw new Error(uploadPayload?.message || "Failed to upload media file.");
    }

    return uploadPayload.data;
  };

  const handlePost = async () => {
    if (!canPost || isSubmitting) return;
    if (!ownerToken) {
      setSubmitError("Owner session expired. Please sign in again.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const uploadedImages = [];
      for (let i = 0; i < images.length; i += 1) {
        const imageFile = toUploadFile(images[i].file, `image-${Date.now()}-${i}.jpg`, "image/jpeg");
        if (!imageFile) continue;
        const uploadedImage = await uploadMediaFile(imageFile);
        uploadedImages.push({
          url: uploadedImage.url,
          publicId: uploadedImage.publicId,
        });
      }

      let uploadedVideo = null;
      if (video?.file) {
        const videoFile = toUploadFile(video.file, `video-${Date.now()}.webm`, "video/webm");
        if (videoFile) {
          const uploadResult = await uploadMediaFile(videoFile);
          uploadedVideo = {
            url: uploadResult.url,
            publicId: uploadResult.publicId,
          };
        }
      }

      const postPayload = {
        title: title.trim() || null,
        content: content.trim(),
        author: personal?.name || "Owner",
        images: uploadedImages,
        video: uploadedVideo,
        codeSnippet: codeSnippet.trim() || null,
        codeLang: codeSnippet.trim() ? codeLang : null,
        event: hasEventContent
          ? {
            title: event?.title?.trim() || "",
            date: event?.date?.trim() || "",
            time: event?.time?.trim() || "",
          }
          : null,
      };

      const createResponse = await fetch(`${apiBaseUrl}/api/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ownerToken}`,
        },
        body: JSON.stringify(postPayload),
      });

      const createPayload = await createResponse.json();
      if (!createResponse.ok || !createPayload?.data) {
        throw new Error(createPayload?.message || "Failed to publish post.");
      }

      if (typeof onPost === "function") onPost(createPayload.data);
      handleClose();
    } catch (postError) {
      setSubmitError(postError.message || "Unable to publish post.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={handleClose}>
      <div
        className="bg-white dark:bg-slate-900 rounded-2xl border border-border shadow-2xl w-full max-w-lg animate-slide-up max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border shrink-0">
          <h2 className="font-bold text-base">Create Post</h2>
          <button onClick={handleClose} className="w-8 h-8 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center transition-colors">
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* ── Scrollable Body ── */}
        <div className="flex-1 overflow-y-auto">
          {/* Author */}
          <div className="px-5 pt-4 flex items-center gap-3">
            <img src={ProfilePhoto} alt={personal?.name || "You"} className="w-10 h-10 rounded-full object-cover" />
            <div>
              <div className="font-bold text-sm">{personal?.name || "You"}</div>
              <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px]">public</span> Anyone
              </div>
            </div>
          </div>

          {/* Text input */}
          <div className="px-5 py-3 space-y-3">
            <input
              type="text"
              placeholder="Post title (optional)"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-transparent text-sm font-semibold placeholder:text-muted-foreground outline-none border-b border-border pb-2"
            />
            <textarea
              placeholder={`What's on your mind, ${personal?.name?.split(" ")[0] || "friend"}?`}
              rows={3}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-transparent text-sm placeholder:text-muted-foreground outline-none resize-none leading-relaxed"
              autoFocus
            />
          </div>

          {/* ── Image Previews ── */}
          {images.length > 0 && (
            <div className="px-5 pb-3">
              <div className={`grid gap-2 ${images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                {images.map((img, i) => (
                  <div key={i} className="relative group">
                    <img src={img.preview} alt={`Upload ${i + 1}`} className="w-full h-32 object-cover rounded-lg border border-border" />
                    <button
                      onClick={() => removeImage(i)}
                      className="absolute top-1 right-1 w-6 h-6 bg-black/60 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <span className="material-symbols-outlined text-xs">close</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Video Preview ── */}
          {video && !isCameraActive && (
            <div className="px-5 pb-3">
              <div className="relative group">
                <video src={video.preview} controls className="w-full rounded-lg border border-border max-h-48 bg-black" />
                <button
                  onClick={removeVideo}
                  className="absolute top-1 right-1 w-6 h-6 bg-black/60 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <span className="material-symbols-outlined text-xs">close</span>
                </button>
              </div>
            </div>
          )}

          {/* ── Camera Viewfinder ── */}
          {isCameraActive && (
            <div className="px-5 pb-3">
              <div className="relative rounded-lg overflow-hidden border border-border bg-black">
                <video ref={cameraVideoRef} autoPlay muted playsInline className="w-full max-h-48 object-cover" />
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-3">
                  {!isRecording ? (
                    <button
                      onClick={startRecording}
                      className="w-12 h-12 rounded-full bg-red-500 border-4 border-white shadow-lg flex items-center justify-center hover:bg-red-600 transition-colors"
                      title="Start recording"
                    >
                      <span className="material-symbols-outlined text-white text-xl">videocam</span>
                    </button>
                  ) : (
                    <button
                      onClick={stopRecording}
                      className="w-12 h-12 rounded-full bg-red-600 border-4 border-white shadow-lg flex items-center justify-center animate-pulse"
                      title="Stop recording"
                    >
                      <span className="material-symbols-outlined text-white text-xl">stop</span>
                    </button>
                  )}
                  <button
                    onClick={stopCamera}
                    className="w-10 h-10 rounded-full bg-slate-700/80 flex items-center justify-center text-white hover:bg-slate-600 transition-colors"
                    title="Cancel"
                  >
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                </div>
                {isRecording && (
                  <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-red-500 text-white px-2 py-0.5 rounded-full text-[10px] font-bold animate-pulse">
                    <div className="w-2 h-2 bg-white rounded-full"></div> REC
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── Code Snippet Panel ── */}
          {showCodePanel && (
            <div className="px-5 pb-3 space-y-2 animate-fade-in">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-muted-foreground">Code Snippet</span>
                <select
                  value={codeLang}
                  onChange={(e) => setCodeLang(e.target.value)}
                  className="text-[10px] bg-slate-100 dark:bg-slate-800 border border-border rounded px-2 py-1 outline-none"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                  <option value="html">HTML</option>
                  <option value="css">CSS</option>
                  <option value="java">Java</option>
                  <option value="cpp">C++</option>
                  <option value="rust">Rust</option>
                  <option value="go">Go</option>
                  <option value="sql">SQL</option>
                  <option value="bash">Bash</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="relative">
                <textarea
                  placeholder="Paste or type your code here..."
                  rows={5}
                  value={codeSnippet}
                  onChange={(e) => setCodeSnippet(e.target.value)}
                  className="w-full bg-slate-900 dark:bg-slate-950 text-green-400 font-mono text-xs p-3 rounded-lg border border-border outline-none resize-none leading-relaxed"
                  spellCheck={false}
                />
                {codeSnippet && (
                  <button
                    onClick={() => { setCodeSnippet(""); setShowCodePanel(false); }}
                    className="absolute top-2 right-2 w-5 h-5 bg-slate-700 text-white rounded-full flex items-center justify-center text-xs hover:bg-slate-600"
                  >
                    <span className="material-symbols-outlined text-[10px]">close</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ── Event Panel ── */}
          {showEventPanel && (
            <div className="px-5 pb-3 space-y-2 animate-fade-in">
              <span className="text-xs font-bold text-muted-foreground">Event Details</span>
              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg border border-border p-3 space-y-2">
                <input
                  type="text"
                  placeholder="Event name"
                  value={event?.title || ""}
                  onChange={(e) => setEvent(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={event?.date || ""}
                    onChange={(e) => setEvent(prev => ({ ...prev, date: e.target.value }))}
                    className="flex-1 bg-white dark:bg-slate-700 text-sm border border-border rounded px-2 py-1 outline-none"
                  />
                  <input
                    type="time"
                    value={event?.time || ""}
                    onChange={(e) => setEvent(prev => ({ ...prev, time: e.target.value }))}
                    className="flex-1 bg-white dark:bg-slate-700 text-sm border border-border rounded px-2 py-1 outline-none"
                  />
                </div>
                <button
                  onClick={() => { setEvent(null); setShowEventPanel(false); }}
                  className="text-xs text-red-400 hover:text-red-500 transition-colors"
                >
                  Remove event
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── Add-ons Bar ── */}
        <div className="mx-5 mb-3 p-3 rounded-lg border border-border flex items-center justify-between shrink-0">
          <span className="text-xs text-muted-foreground">Add to your post</span>
          <div className="flex gap-1 relative">
            {/* Photo */}
            <button
              onClick={() => imageInputRef.current?.click()}
              className="w-9 h-9 rounded-full hover:bg-green-500/10 flex items-center justify-center transition-colors"
              title="Add photos"
            >
              <span className="material-symbols-outlined text-lg text-green-500">image</span>
            </button>
            <input ref={imageInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleImageSelect} />

            {/* Video */}
            <div className="relative">
              <button
                onClick={() => setShowVideoOptions(!showVideoOptions)}
                className="w-9 h-9 rounded-full hover:bg-blue-500/10 flex items-center justify-center transition-colors"
                title="Add video"
              >
                <span className="material-symbols-outlined text-lg text-blue-500">videocam</span>
              </button>
              {showVideoOptions && (
                <div className="absolute bottom-full right-0 mb-2 bg-white dark:bg-slate-800 border border-border rounded-lg shadow-xl py-1 w-40 z-10 animate-fade-in">
                  <button
                    onClick={() => { videoInputRef.current?.click(); }}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2 transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">upload</span> Upload video
                  </button>
                  <button
                    onClick={startCamera}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center gap-2 transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">photo_camera</span> Record from camera
                  </button>
                </div>
              )}
            </div>
            <input ref={videoInputRef} type="file" accept="video/*" className="hidden" onChange={handleVideoSelect} />

            {/* Event */}
            <button
              onClick={() => {
                setShowEventPanel(!showEventPanel);
                if (!event) setEvent({ title: "", date: "", time: "" });
              }}
              className={`w-9 h-9 rounded-full hover:bg-amber-500/10 flex items-center justify-center transition-colors ${event ? 'bg-amber-500/10 ring-1 ring-amber-500/30' : ''}`}
              title="Add event"
            >
              <span className="material-symbols-outlined text-lg text-amber-500">event</span>
            </button>

            {/* Code */}
            <button
              onClick={() => setShowCodePanel(!showCodePanel)}
              className={`w-9 h-9 rounded-full hover:bg-purple-500/10 flex items-center justify-center transition-colors ${codeSnippet ? 'bg-purple-500/10 ring-1 ring-purple-500/30' : ''}`}
              title="Add code snippet"
            >
              <span className="material-symbols-outlined text-lg text-purple-500">code</span>
            </button>
          </div>
        </div>

        {/* ── Post Button ── */}
        <div className="px-5 pb-4 shrink-0">
          {submitError && (
            <p className="text-xs text-red-500 mb-2">{submitError}</p>
          )}
          <button
            onClick={handlePost}
            disabled={!canPost || isSubmitting}
            className={`w-full py-2.5 rounded-full text-sm font-bold transition-all ${canPost && !isSubmitting
                ? "bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/20"
                : "bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed"
              }`}
          >
            {isSubmitting ? "Publishing..." : "Post"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
