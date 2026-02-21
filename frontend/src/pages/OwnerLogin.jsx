import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const OwnerLogin = () => {
  const navigate = useNavigate();
  const [passkey, setPasskey] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!passkey.trim()) {
      setError("Passkey is required.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch(`${apiBaseUrl}/api/owner/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ passkey: passkey.trim() }),
      });

      const payload = await response.json();
      if (!response.ok || !payload?.token) {
        throw new Error(payload?.message || "Login failed.");
      }

      localStorage.setItem("ownerSessionToken", payload.token);
      navigate("/", { replace: true });
    } catch (submitError) {
      setError(submitError.message || "Unable to login as owner.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-card border border-border rounded-2xl p-6 shadow-xl"
      >
        <h1 className="text-xl font-bold">Owner Access</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Enter your owner passkey to enable post publishing.
        </p>

        <label htmlFor="owner-passkey" className="block text-xs font-semibold uppercase tracking-wide mt-6 mb-2">
          Passkey
        </label>
        <input
          id="owner-passkey"
          type="password"
          value={passkey}
          onChange={(e) => setPasskey(e.target.value)}
          className="w-full bg-slate-100 dark:bg-slate-800 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/50"
          placeholder="Enter owner passkey"
          autoComplete="current-password"
        />

        {error && (
          <p className="text-red-500 text-xs mt-3">{error}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-5 py-2.5 rounded-lg bg-primary text-white text-sm font-bold hover:bg-primary/90 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? "Signing in..." : "Sign in as owner"}
        </button>
      </form>
    </div>
  );
};

export default OwnerLogin;
