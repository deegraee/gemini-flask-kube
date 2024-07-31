document.addEventListener('DOMContentLoaded', function() {
    const backendUrl = 'http://34.67.42.139';

    async function checkBackendConnection() {
        const backend_status = document.getElementById('backend-status');
        try {
            const response = await fetch(`${backendUrl}/`);
            const data = await response.json();

            if (response.ok) {
                backend_status.innerText = data.message;
                backend_status.classList.add("text-green-600");
            } else {
                backend_status.innerText = data.message;
                backend_status.classList.add("text-red-600");
            }
        } catch (error) {
            console.error('Error fetching backend status:', error);
            backend_status.innerText = 'Failed to connect to backend';
            backend_status.classList.add("text-red-600");
        }
    }

    document.getElementById('prompt-form').addEventListener('submit', async function(e) {
        e.preventDefault();
        const prompt = document.getElementById('prompt').value;
        const generatedMessage = document.getElementById('generated-message');

        try {
            const response = await fetch(`${backendUrl}/generate`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prompt })
            });

            const result = await response.json();
            if (response.ok) {
                generatedMessage.innerText = result.response;
            } else {
                generatedMessage.innerText = `Error: ${result.error}`;
            }
        } catch (error) {
            console.error('Error generating message:', error);
            generatedMessage.innerText = 'Failed to generate message.';
        }
    });

    checkBackendConnection();
});
