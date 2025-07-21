const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: 'Method Not Allowed'
        };
    }

    try {
        const payload = JSON.parse(event.body);
        
        // Validate required fields
        if (!payload.title || !payload.content) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Title and content are required' })
            };
        }

        // Trigger GitHub Action via repository_dispatch event
        const response = await fetch(
            `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/dispatches`,
            {
                method: 'POST',
                headers: {
                    'Authorization': `token ${process.env.GITHUB_TOKEN}`,
                    'Accept': 'application/vnd.github.v3+json'
                },
                body: JSON.stringify({
                    event_type: 'create-post',
                    client_payload: payload
                })
            }
        );

        if (!response.ok) {
            throw new Error('Failed to trigger GitHub Action');
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Post creation initiated' })
        };
    } catch (error) {
        console.error('Error:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal server error' })
        };
    }
};
