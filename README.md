# My Blog

Personal blog built with [Hugo](https://gohugo.io/) and deployed to GitHub Pages.

## Quick start

```bash
# Install Hugo (macOS)
brew install hugo

# Run locally
hugo server -D

# Build for production
hugo --minify
```

## Writing posts

Create a new post:

```bash
hugo new content posts/my-new-post.md
```

Or just create a markdown file in `content/posts/`:

```markdown
---
title: "My Post Title"
date: 2026-01-04
description: "A brief description for previews"
tags: ["tag1", "tag2"]
draft: false
---

Your content here...
```

## Deployment

Push to `main` branch → GitHub Actions builds → Live on GitHub Pages

### First-time setup

1. Create a new GitHub repo
2. Push this code to `main`
3. Go to repo **Settings → Pages**
4. Set Source to **GitHub Actions**
5. Update `baseURL` in `hugo.yaml` to match your GitHub Pages URL

## Structure

```
.
├── content/
│   ├── posts/          # Blog posts
│   └── about.md        # About page
├── themes/minimal/     # Custom theme
├── hugo.yaml           # Site config
└── .github/workflows/  # GitHub Actions
```

## Customisation

- Edit `hugo.yaml` for site title, description, social links
- Edit `themes/minimal/static/css/style.css` for styling
- Edit templates in `themes/minimal/layouts/` for structure
