# jakes_portfolioweb

## Owner-Only Publishing

This portfolio now supports owner-only post publishing:

- Visitors can view the feed but cannot see the composer panel.
- The owner logs in through hidden route: `/owner`
- Owner-created posts are persisted in MongoDB and visible to all visitors.

## Required Environment Variables

### Backend (`backend/.env`)

```env
OWNER_PASSKEY=change_me_owner_passkey
OWNER_SESSION_TTL_HOURS=168
OWNER_DISPLAY_NAME=Jake Mesina

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
POST_MEDIA_MAX_SIZE_MB=50
```

### Frontend (`frontend/.env`)

```env
VITE_API_URL=http://localhost:5000
```

## Cloudinary Setup (Free Tier)

1. Create a free Cloudinary account.
2. Copy your `Cloud name`, `API Key`, and `API Secret` from the Cloudinary dashboard.
3. Set those values in `backend/.env`.
4. Restart backend and frontend servers.

## Owner Login Flow

1. Open `http://localhost:5173/owner`
2. Enter `OWNER_PASSKEY`
3. On success, session token is stored locally and composer appears on `/`
