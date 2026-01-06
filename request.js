/**
 * Simple RESTful request utility
 * @param {string} url - The URL to send request to
 * @param {Object} options - Request options
 * @param {string} options.method - HTTP method (GET, POST, PUT, DELETE, etc.)
 * @param {Object} options.body - Request body (will be JSON stringified)
 * @param {Object} options.headers - Additional headers
 * @returns {Promise<Object>} Response data
 */
async function request(url, options = {}) {
  const {
    method = 'GET',
    body = null,
    headers = {}
  } = options;

  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    }
  };

  // Add body if provided and not GET request
  if (body && method !== 'GET') {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(url, config);

  // Parse JSON response
  const data = await response.json();

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }

  return data;
}

// Convenience methods
const get = (url, options = {}) => request(url, { ...options, method: 'GET' });
const post = (url, body, options = {}) => request(url, { ...options, method: 'POST', body });
const put = (url, body, options = {}) => request(url, { ...options, method: 'PUT', body });
const del = (url, options = {}) => request(url, { ...options, method: 'DELETE' });

export default request;
export { get, post, put, del };

