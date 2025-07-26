# Curl MCP Server

An MCP (Model Context Protocol) server that exposes curl functionality to MCP clients. This server allows MCP clients to make HTTP requests and download files using the curl command-line tool.

## Installation

Install the package globally to use with npx:

```bash
npm install -g mcp-curl
```

Or run directly with npx:

```bash
npx mcp-curl
```

## Features

This MCP server provides the following tools:

### HTTP Request Tools

- **curl_get**: Make HTTP GET requests
- **curl_post**: Make HTTP POST requests with data or JSON
- **curl_put**: Make HTTP PUT requests with data or JSON  
- **curl_delete**: Make HTTP DELETE requests

### Utility Tools

- **curl_download**: Download files from URLs
- **curl_advanced**: Execute curl with custom arguments (with safety restrictions)

## Configuration

### Claude Desktop

To use with Claude Desktop, add the following to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "mcp-curl": {
      "command": "npx",
      "args": ["mcp-curl"]
    }
  }
}
```

### Other MCP Clients

For other MCP clients, configure them to run the server with:
- Command: `npx`
- Arguments: `["mcp-curl"]`
- Transport: stdio

## Tool Documentation

### curl_get

Make an HTTP GET request.

**Parameters:**
- `url` (string, required): The URL to request
- `headers` (array of strings, optional): HTTP headers in format "Header: Value"
- `follow_redirects` (boolean, optional): Whether to follow redirects (default: false)
- `timeout` (number, optional): Request timeout in seconds
- `user_agent` (string, optional): Custom User-Agent string

**Example:**
```
Use curl_get to fetch https://httpbin.org/get with headers ["Accept: application/json", "Authorization: Bearer token123"]
```

### curl_post

Make an HTTP POST request.

**Parameters:**
- `url` (string, required): The URL to post to
- `data` (string, optional): Raw data to send in request body
- `json_data` (object, optional): JSON object to send (will be stringified)
- `headers` (array of strings, optional): HTTP headers
- `content_type` (string, optional): Content-Type header
- `follow_redirects` (boolean, optional): Whether to follow redirects
- `timeout` (number, optional): Request timeout in seconds

**Example:**
```
Use curl_post to send JSON data {"name": "test", "value": 123} to https://httpbin.org/post
```

### curl_put

Make an HTTP PUT request. Same parameters as curl_post.

### curl_delete

Make an HTTP DELETE request.

**Parameters:**
- `url` (string, required): The URL to send DELETE request to
- `headers` (array of strings, optional): HTTP headers
- `follow_redirects` (boolean, optional): Whether to follow redirects
- `timeout` (number, optional): Request timeout in seconds

### curl_download

Download a file from a URL.

**Parameters:**
- `url` (string, required): The URL of the file to download
- `output_filename` (string, optional): Local filename to save as
- `resume` (boolean, optional): Resume partial download (default: false)
- `follow_redirects` (boolean, optional): Whether to follow redirects (default: true)
- `timeout` (number, optional): Request timeout in seconds

**Example:**
```
Use curl_download to download https://example.com/file.zip and save it as "downloaded-file.zip"
```

### curl_advanced

Execute curl with custom arguments (advanced usage with safety restrictions).

**Parameters:**
- `args` (array of strings, required): Array of curl arguments (excluding 'curl' itself)

**Security Note:** This tool blocks potentially dangerous flags like file operations, config files, and certificate operations for security reasons.

**Example:**
```
Use curl_advanced with args ["-I", "https://example.com"] to get only headers
```

## Security Features

- Input validation and sanitization
- Restricted file operations in advanced mode
- Safe subprocess execution using spawn instead of shell execution
- No execution of arbitrary shell commands

## Development

### Building

```bash
npm run build
```

### Running Locally

```bash
npm start
```

### Development Mode

```bash
npm run dev
```

## Requirements

- Node.js 16 or higher
- curl command-line tool installed on the system

## License

ISC

## Contributing

This is an MCP server that safely exposes curl functionality. When contributing:

1. Ensure all curl operations go through the `executeCurl` helper function
2. Never use `console.log()` - use `console.error()` for debugging as stdout is reserved for MCP communication
3. Validate and sanitize all inputs before passing to curl
4. Test with various MCP clients to ensure compatibility
