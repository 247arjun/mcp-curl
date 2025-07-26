# Deployment Guide

This guide explains how to deploy and configure the mcp-curl server locally and in various environments.

## Local Development Setup

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn package manager
- git

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/247arjun/mcp-curl.git
   cd mcp-curl
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build the project**
   ```bash
   npm run build
   ```

4. **Test the installation**
   ```bash
   npm test
   ```

5. **Test the MCP server**
   ```bash
   echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/list", "params": {}}' | node build/index.js
   ```

## MCP Client Configuration

### Claude Desktop Configuration

Add to your Claude Desktop configuration file:

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%/Claude/claude_desktop_config.json`

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

### VS Code Configuration

For VS Code with MCP extension, add to your `mcp.json`:

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

### Generic MCP Client

```json
{
  "servers": {
    "mcp-curl": {
      "command": "node",
      "args": ["/path/to/mcp-curl/build/index.js"],
      "env": {}
    }
  }
}
```

## Global Installation

### From npm (when published)

```bash
npm install -g mcp-curl
```

Then use in MCP config:
```json
{
  "mcpServers": {
    "mcp-curl": {
      "command": "mcp-curl"
    }
  }
}
```

### Manual Global Installation

```bash
git clone https://github.com/247arjun/mcp-curl.git
cd mcp-curl
npm install
npm run build
npm link
```

## Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY build/ ./build/

USER node

ENTRYPOINT ["node", "build/index.js"]
```

Build and run:
```bash
docker build -t mcp-curl .
docker run -i mcp-curl
```

## Environment Variables

The server respects these environment variables:

- `MCP_CURL_TIMEOUT`: Default timeout for requests (default: 30)
- `MCP_CURL_USER_AGENT`: Default user agent string
- `MCP_CURL_MAX_REDIRECTS`: Maximum number of redirects to follow

## Security Considerations

1. **Network Access**: The server can make outbound HTTP requests to any URL
2. **File Downloads**: Downloads are saved to the current working directory
3. **Headers**: Custom headers can be set, including authentication tokens
4. **SSL/TLS**: Respects system SSL/TLS configuration

## Troubleshooting

### Common Issues

1. **Permission denied**: Ensure the script has execute permissions
2. **Module not found**: Run `npm install` and `npm run build`
3. **Timeout errors**: Check network connectivity and increase timeout values
4. **JSON parsing errors**: Ensure proper JSON formatting in requests

### Debug Mode

Run with debug output:
```bash
DEBUG=mcp-curl node build/index.js
```

### Logs

The server logs to stderr by default. Redirect for debugging:
```bash
node build/index.js 2> debug.log
```

## Performance Tuning

- Use connection pooling for multiple requests
- Set appropriate timeouts based on your use case
- Consider caching for frequently accessed endpoints
- Monitor memory usage for large file downloads

## Updates

To update to the latest version:

```bash
cd mcp-curl
git pull origin main
npm install
npm run build
```

Restart your MCP client after updating.
