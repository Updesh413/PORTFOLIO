# Updesh | Software Developer & Architect Portfolio

A high-fidelity, retro-futuristic Cyberpunk Command Line Interface (CLI) dashboard and portfolio redesign. 

Live Url: **[https://theupdesh-portfolio.netlify.app/](https://theupdesh-portfolio.netlify.app/)**

---

## 🚀 Core Features

- **Interactive 3D WebGL Scene (Three.js)**: Renders a dual-layered, glowing wireframe mesh (a central green Torus-Knot core and an outer cyan Sphere shell) surrounded by floating digital particles. The entire 3D camera and geometry dynamically tilt and rotate in response to mouse movement.
- **Retro CRT Boot Animation (Framer Motion)**: Features a line-by-line CLI terminal initialization process that transition-glitches (skew, hue rotate, and scale) into the primary page content when completed.
- **Brutalist / Cyberpunk Aesthetics**: Styled with a strict 8px spacing grid, horizontal CRT scanlines, a dot-matrix overlay background, and monospaced typography (JetBrains Mono).
- **Interactive Component Elements**: Buttons feature terminal-style blinking caret cursors, cards dynamically highlight with neon outlines on hover, and sections use baseline divisions.
- **Secure Email Form System**: A functional contact form that simulates a secure packet transmission log inside an inline terminal container, sending message payloads to your email via the client-side Web3Forms API.
- **Fast Static Export**: Pre-compiled static HTML export (`output: "export"`) ready for instant CDN distribution.

---

## 🛠️ Technology Stack

- **Core**: Next.js 16 (App Router), React 19, TypeScript, PostCSS
- **Styling**: Tailwind CSS v4, Custom CRT CSS Filters
- **3D Visuals**: Three.js, React Three Fiber (`@react-three/fiber`), Drei (`@react-three/drei`)
- **Animation System**: Framer Motion
- **Upstream Router**: Web3Forms API
- **Target Host**: Netlify

---

## 💻 Local Setup & Development

### 1. Installation
Clone the repository and install dependencies using the legacy peer deps flag (required for React 19 R3F compatibility):
```bash
npm install --legacy-peer-deps
```

### 2. Environment Configuration
Create a `.env.local` file in the project root:
```env
# Register your email at https://web3forms.com/ to get your free key
NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your-access-key-here
```

### 3. Spin Development Server
Run the local Next.js development server:
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser to view the application.

### 4. Build Production Build
To test the compiler and compile the static build pages into the `/out` directory:
```bash
npm run build
```

---

## 🌐 Netlify Deployment

This project includes a `netlify.toml` file at the root which configures deployment automatically.

### Automated Setup

1. **Commit and Push**:
   Push the latest changes to your GitHub branch:
   ```bash
   git add -A
   git commit -m "Redesign portfolio documentation"
   git push origin main
   ```
2. **Set Netlify Environment Variables**:
   In your Netlify Dashboard, navigate to **Site configuration > Environment variables**, click **Add a variable**, and enter:
   - **Key**: `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`
   - **Value**: `your-access-key-from-web3forms`
3. **Trigger Deploy**:
   Under the **Deploys** tab, select **Trigger deploy > Deploy site**. Netlify will build the Next.js static files and serve them directly.
