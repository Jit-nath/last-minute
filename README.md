## Last-Minute

A web application to create, organize, and share YouTube video playlists with notes and AI-powered learning support.

---

### Features

* **Playlist Management**
  Create playlists of YouTube videos. Easily arrange or rearrange the order of videos to optimize your learning flow.

* **Interactive Notes**
  Take notes directly in the app. Upload note files or type them in, and attach them to specific videos or playlists.

* **AI Bot for Transcript-Based Learning**
  Boost your learning with an AI assistant that parses video transcripts and helps you understand the content faster.

* **Sharing & Collaboration**
  Share your playlists and notes with friends—collaboration made easy.

---

### Tech Stack & Project Structure

* Built with **Next.js** (bootstrapped using create-next-app) ([GitHub][1])
* Language: **TypeScript** (\~94%) and **CSS** (\~5%) ([GitHub][1])
* Key directories:

  * `app/`, `components/`, `hooks/`, `lib/`, `context/`, `db/`, `types/`
  * `public/` for static assets
* Dev setup includes: `Dockerfile`, `docker-compose.yml`
* Configuration files for eslint, Tailwind CSS, Drizzle ORM, etc.

---

### Getting Started (Windows)

**Prerequisites:**
Ensure you have Node.js and a package manager (npm, yarn, or pnpm) installed.

1. Clone the repository:

   ```powershell
   git clone https://github.com/Jit-nath/last-minute.git
   cd last-minute
   ```
2. Install dependencies:

   ```powershell
   npm install
   ```

   (Or use `yarn` or `pnpm install`)
3. Run the development server:

   ```powershell
   npm run dev
   ```
4. Open your browser and navigate to:
   `http://localhost:3000`

---

### Usage Overview

* **Create & Manage Playlists:** Add YouTube videos, drag-and-drop to reorder.
* **Notes & File Upload:** Write notes or attach files tied to videos/playlists.
* **AI Helper:** Click or ask questions—AI explains video transcripts for quick learning.
* **Share & Collaborate:** Generate shareable links for friends to view playlists and notes.

---

### Contributing

* Fork the repo and create a feature branch
* Make your changes, then submit a pull request

Optionally, submit issues or enhancement ideas—you’re welcome!

---

### Contact

Built by *Jit-nath*. Want to collaborate or chat? Drop a message at \[jit.nathdeb@gmail.com].


