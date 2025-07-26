# MCP Server for Curl

[![npm version](https://badge.fury.io/js/@247arjun%2Fmcp-curl.svg)](https://badge.fury.io/js/@247arjun%2Fmcp-curl)
[![npm downloads](https://img.shields.io/npm/dm/@247arjun/mcp-curl.svg)](https://www.npmjs.com/package/@247arjun/mcp-curl)

A Model Context Protocol (MCP) server that provides curl functionality, allowing AI assistants to make HTTP requests directly from their environment.

## Features

- **HTTP Methods**: Support for GET, POST, PUT, DELETE requests
- **File Downloads**: Download files with curl
- **Advanced Options**: Custom headers, timeouts, redirects, and more
- **JSON Support**: Built-in JSON data handling for POST/PUT requests
- **User Agent**: Custom User-Agent string support
- **Security**: Safe subprocess execution with input validation

## Installation

### Method 1: NPM Installation (Recommended)

```bash
# Install globally
npm install -g @247arjun/mcp-curl

# Or install locally in your project
npm install @247arjun/mcp-curl
```

### Method 2: From Source

```bash
# Clone the repository
git clone https://github.com/247arjun/mcp-curl.git
cd mcp-curl

# Install dependencies
npm install

# Build the project
npm run build

# Optional: Link globally
npm link
```

### Method 3: Direct from GitHub

```bash
# Install directly from GitHub
npm install -g git+https://github.com/247arjun/mcp-curl.git
```

## Configuration

### Claude Desktop Setup

Add to your Claude Desktop configuration file:

**Location:**
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`
- Windows: `%APPDATA%/Claude/claude_desktop_config.json`

**Configuration:**
```json
{
  "mcpServers": {
    "mcp-curl": {
      "command": "mcp-curl",
      "args": []
    }
  }
}
```

**Alternative: Using npx (no global install needed)**
```json
{
  "mcpServers": {
    "mcp-curl": {
      "command": "npx",
      "args": ["@247arjun/mcp-curl"]
    }
  }
}
```

**Local Development Setup**
```json
{
  "mcpServers": {
    "mcp-curl": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-curl/build/index.js"]
    }
  }
}
```

After adding the configuration, restart Claude Desktop to load the MCP server.

## Available Tools

### 1. `curl_get`
Make HTTP GET requests.

**Parameters:**
- `url` (string): The URL to make the GET request to
- `headers` (array, optional): HTTP headers in the format 'Header: Value'
- `timeout` (number, optional): Request timeout in seconds
- `follow_redirects` (boolean, optional): Whether to follow redirects
- `user_agent` (string, optional): Custom User-Agent string

**Example:**
```json
{
  "url": "https://api.example.com/data",
  "headers": ["Authorization: Bearer token"],
  "timeout": 30,
  "follow_redirects": true,
  "user_agent": "MyApp/1.0"
}
```

### 2. `curl_post`
Make HTTP POST requests with data.

**Parameters:**
- `url` (string): The URL to make the POST request to
- `json_data` (object, optional): JSON object to send as POST data
- `data` (string, optional): Data to send in the POST request body
- `headers` (array, optional): HTTP headers
- `content_type` (string, optional): Content-Type header
- `timeout` (number, optional): Request timeout in seconds
- `follow_redirects` (boolean, optional): Whether to follow redirects

**Example:**
```json
{
  "url": "https://api.example.com/data",
  "json_data": {"key": "value"},
  "headers": ["Content-Type: application/json"]
}
```

### 3. `curl_put`
Make HTTP PUT requests.

**Parameters:**
- `url` (string): The URL to make the PUT request to
- `json_data` (object, optional): JSON object to send as PUT data
- `data` (string, optional): Data to send in the PUT request body
- `headers` (array, optional): HTTP headers
- `content_type` (string, optional): Content-Type header
- `timeout` (number, optional): Request timeout in seconds
- `follow_redirects` (boolean, optional): Whether to follow redirects

**Example:**
```json
{
  "url": "https://api.example.com/data/123",
  "data": "raw data",
  "content_type": "text/plain"
}
```

### 4. `curl_delete`
Make HTTP DELETE requests.

**Parameters:**
- `url` (string): The URL to make the DELETE request to
- `headers` (array, optional): HTTP headers
- `timeout` (number, optional): Request timeout in seconds
- `follow_redirects` (boolean, optional): Whether to follow redirects

**Example:**
```json
{
  "url": "https://api.example.com/data/123",
  "headers": ["Authorization: Bearer token"]
}
```

### 5. `curl_download`
Download files.

**Parameters:**
- `url` (string): The URL of the file to download
- `output_filename` (string, optional): Output filename
- `resume` (boolean, optional): Resume partial download if file exists
- `timeout` (number, optional): Request timeout in seconds
- `follow_redirects` (boolean, optional): Whether to follow redirects

**Example:**
```json
{
  "url": "https://example.com/file.zip",
  "output_filename": "downloaded_file.zip",
  "resume": true
}
```

### 6. `curl_advanced`
Execute curl with custom arguments (advanced users).

**Parameters:**
- `args` (array): Array of curl arguments (excluding 'curl' itself)

**Example:**
```json
{
  "args": ["-X", "PATCH", "-H", "Content-Type: application/json", "-d", "{\"status\":\"updated\"}", "https://api.example.com/items/1"]
}
```

## Usage Examples

### Make a GET request
```json
{
  "tool": "curl_get",
  "url": "https://api.example.com/users",
  "headers": ["Authorization: Bearer your-token"]
}
```

### POST JSON data
```json
{
  "tool": "curl_post",
  "url": "https://api.example.com/users",
  "json_data": {
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### Download a file
```json
{
  "tool": "curl_download",
  "url": "https://example.com/file.zip",
  "output_filename": "download.zip"
}
```

## Development

### Prerequisites

- Node.js 18.0.0 or higher
- npm package manager
- curl command-line tool

### Building

```bash
npm run build
```

### Testing

Test the server manually:

```bash
echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/list", "params": {}}' | node build/index.js
```

Run tests:
```bash
npm test
```

### Linting

```bash
npm run lint
npm run lint:fix
```

### Project Structure

```
mcp-curl/
├── src/
│   └── index.ts          # Main server implementation
├── build/
│   └── index.js          # Compiled JavaScript
├── test/
│   └── basic.test.js     # Basic functionality tests
├── examples/
│   └── test-server.js    # Example usage
├── .github/
│   └── workflows/
│       └── ci.yml        # CI/CD pipeline
├── package.json          # Project configuration
├── tsconfig.json         # TypeScript configuration
├── .eslintrc.json        # ESLint configuration
├── LICENSE               # MIT License
├── DEPLOYMENT.md         # Deployment guide
├── CONTRIBUTING.md       # Contribution guidelines
├── CHANGELOG.md          # Version history
└── README.md             # This file
```

## Verification

Test that the server is working:

```bash
# Test the built server
node build/index.js

# Should show: "Curl MCP Server running on stdio"
# Press Ctrl+C to exit
```

## Troubleshooting

### Common Issues

1. **"Command not found" error**
   - Ensure mcp-curl is installed globally: `npm install -g @247arjun/mcp-curl`
   - Or use npx: `"command": "npx", "args": ["@247arjun/mcp-curl"]`

2. **"Permission denied" error**
   - Check file permissions: `chmod +x build/index.js`
   - Rebuild the project: `npm run build`

3. **MCP server not appearing in Claude**
   - Verify JSON syntax in configuration file
   - Restart Claude Desktop completely
   - Check that the command path is correct

4. **"curl command not found"**
   - Install curl on your system (usually pre-installed on macOS/Linux)
   - Windows users: Install via package manager or download from curl website

### Debugging

Enable verbose logging by setting environment variable:
```bash
# For development
DEBUG=1 node build/index.js

# Test with sample input
echo '{"jsonrpc": "2.0", "method": "initialize", "params": {}}' | node build/index.js
```

## Security Notes

- Input validation and sanitization for all curl arguments
- Restricted file operations in advanced mode
- Safe subprocess execution using spawn instead of shell
- No arbitrary shell command execution
- Input validation with Zod schemas
