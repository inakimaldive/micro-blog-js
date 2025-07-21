class MicroBlog {
    constructor() {
        this.postsContainer = document.getElementById('posts');
        this.newPostForm = document.getElementById('newPostForm');
        this.owner = 'inakimaldive';
        this.repo = 'micro-blog-js';
        this.postsPath = '_posts';
        
        this.init();
    }

    async init() {
        this.setupEventListeners();
        await this.loadPosts();
    }

    setupEventListeners() {
        this.newPostForm.addEventListener('submit', (e) => this.handleNewPostSubmit(e));
    }

    async loadPosts() {
        try {
            const response = await fetch(`https://api.github.com/repos/${this.owner}/${this.repo}/contents/${this.postsPath}`);
            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }

            const files = await response.json();
            const posts = await Promise.all(
                files
                    .filter(file => file.name.endsWith('.md'))
                    .map(file => this.fetchAndParsePost(file))
            );

            // Sort posts by date in descending order
            posts.sort((a, b) => new Date(b.metadata.date) - new Date(a.metadata.date));
            this.renderPosts(posts);
        } catch (error) {
            console.error('Error loading posts:', error);
            this.postsContainer.innerHTML = '<p class="text-red-500">Error loading posts. Please try again later.</p>';
        }
    }

    async fetchAndParsePost(file) {
        const response = await fetch(file.download_url);
        const content = await response.text();
        return this.parsePost(content);
    }

    parsePost(content) {
        // Split front matter and content
        const parts = content.split('---\n');
        const metadata = jsyaml.load(parts[1]);
        const markdownContent = parts.slice(2).join('---\n');

        return {
            metadata,
            content: marked.parse(markdownContent)
        };
    }

    renderPosts(posts) {
        this.postsContainer.innerHTML = posts.map(post => `
            <article class="bg-white p-6 rounded-lg shadow-md">
                <h2 class="text-2xl font-bold mb-2">${post.metadata.title}</h2>
                <div class="text-gray-600 mb-2">
                    <span>${new Date(post.metadata.date).toLocaleDateString()}</span>
                    <span class="mx-2">•</span>
                    <span>${post.metadata.author}</span>
                </div>
                <div class="mb-4">
                    ${post.metadata.tags.map(tag => 
                        `<span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#${tag}</span>`
                    ).join('')}
                </div>
                <div class="prose">${post.content}</div>
            </article>
        `).join('');
    }

    async handleNewPostSubmit(e) {
        e.preventDefault();
        
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        const tags = document.getElementById('tags').value
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag);

        const post = {
            title,
            date: new Date().toISOString(),
            author: 'Anonymous', // This will be replaced with actual user authentication
            tags: JSON.stringify(tags), // Format tags for GitHub Actions
            content,
            slug: this.slugify(title)
        };

        try {
            const response = await fetch('/.netlify/functions/create-post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(post)
            });

            if (!response.ok) {
                throw new Error('Failed to create post');
            }

            alert('Post created successfully!');
            this.newPostForm.reset();
            await this.loadPosts(); // Refresh the posts list
        } catch (error) {
            console.error('Error creating post:', error);
            alert('Failed to create post. Please try again.');
        }
    }

    slugify(text) {
        return text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '');
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    new MicroBlog();
});
