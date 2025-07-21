# Micro Blog JS

A minimalist microblogging platform that uses GitHub as a backend and Netlify for serverless functions. Posts are written in Markdown with YAML front matter and are automatically created through GitHub Actions.

## Features

- 📝 Markdown support for posts
- 🏷️ Tag support
- 🚀 Serverless architecture
- 🔄 Automatic post creation via GitHub Actions
- 🎨 Clean, minimalist UI with Tailwind CSS

## Quick Start

### Prerequisites

- GitHub account
- Netlify account
- Node.js and npm installed locally

### Installation

1. Clone the repository:
```bash
git clone https://github.com/inakimaldive/micro-blog-js.git
cd micro-blog-js
```

2. Install dependencies:
```bash
npm install
```

### Configuration

#### 1. GitHub Setup

1. Create a new GitHub Personal Access Token:
   - Go to GitHub Settings → Developer Settings → Personal Access Tokens
   - Generate a new token with `repo` scope
   - Save the token for later use

2. Fork this repository (if you haven't already)

#### 2. Netlify Setup

1. Create a new site on Netlify:
   ```bash
   npm install -g netlify-cli
   netlify login
   netlify init
   ```

2. Set up environment variables in Netlify:
   - Go to Site Settings → Build & Deploy → Environment
   - Add the following variables:
     - `GITHUB_TOKEN`: Your GitHub Personal Access Token
     - `GITHUB_OWNER`: Your GitHub username
     - `GITHUB_REPO`: Your repository name (e.g., micro-blog-js)

3. Deploy to Netlify:
   ```bash
   netlify deploy --prod
   ```

### Local Development

1. Start the development server:
```bash
npm run dev
```

2. Open `http://localhost:8888` in your browser

## Creating Posts

### Via Web Interface

1. Visit your deployed site
2. Fill in the post creation form:
   - Title
   - Tags (comma-separated)
   - Content (Markdown supported)
3. Click Submit

### Manual Post Creation

Create a new file in `_posts/` with the format `YYYY-MM-DD-title.md`:

```markdown
---
title: "Your Post Title"
date: "2025-07-21T12:00:00Z"
author: "Your Name"
tags: ["tag1", "tag2"]
---

Your post content here...
```

## File Structure

```
├── _posts/               # Markdown blog posts
├── functions/           # Netlify serverless functions
│   └── create-post.js   # Post creation function
├── js/
│   └── app.js          # Main application logic
├── .github/workflows/   # GitHub Actions
│   └── create-post.yml # Post creation workflow
├── index.html          # Main page
└── netlify.toml        # Netlify configuration
```

## Post Format

Posts use Markdown with YAML front matter:

```markdown
---
title: "Post Title"
date: "2025-07-21T12:00:00Z"
author: "Author Name"
tags: ["tag1", "tag2"]
---

Post content in Markdown...
```

## Customization

### Styling
The project uses Tailwind CSS. Modify classes in `index.html` to customize the appearance.

### Post Display
Edit the `renderPosts` method in `js/app.js` to customize how posts are displayed.

## Troubleshooting

### Common Issues

1. Posts not appearing:
   - Check GitHub repository permissions
   - Verify GitHub token has correct scope
   - Check browser console for errors

2. Cannot create posts:
   - Verify Netlify environment variables
   - Check Netlify Function logs
   - Ensure GitHub Action has correct permissions

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License - Feel free to use this project for your own blog!


--  added netlify
