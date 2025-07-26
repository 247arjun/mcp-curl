# mcp-curl

[![npm version](https://badge.fury.io/js/@247arjun%2Fmcp-curl.svg)](https://badge.fury.io/js/@247arjun%2Fmcp-curl)
[![npm downloads](https://img.shields.io/npm/dm/@247arjun/mcp-curl.svg)](https://www.npmjs.com/package/@247arjun/mcp-curl)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)
[![GitHub issues](https://img.shields.io/github/issues/247arjun/mcp-curl.svg)](https://github.com/247arjun/mcp-curl/issues)
[![GitHub stars](https://img.shields.io/github/stars/247arjun/mcp-curl.svg)](https://github.com/247arjun/mcp-curl/stargazers)

A Model Context Protocol (MCP) server that provides curl functionality, allowing AI assistants to make HTTP requests directly from their environment.

## Features

- **HTTP Methods**: Support for GET, POST, PUT, DELETE requests
- **File Downloads**: Download files with curl
- **Advanced Options**: Custom headers, timeouts, redirects, and more
- **JSON Support**: Built-in JSON data handling for POST/PUT requests
- **User Agent**: Custom User-Agent string support
- **Security**: Safe subprocess execution with input validation

## Installation

### From GitHub

```bash
git clone https://github.com/247arjun/mcp-curl.git
cd mcp-curl
npm install
npm run build
```

### From npm

```bash
npm install -g @247arjun/mcp-curl
```

Or use npx to run without installing:

```bash
npx @247arjun/mcp-curl
```

## Usage

### As an MCP Server

Add to your MCP client configuration:

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

Or if installed globally:
```json
{
  "mcpServers": {
    "mcp-curl": {
      "command": "node",
      "args": ["/path/to/mcp-curl/build/index.js"]
    }
  }
}
```

### Claude Desktop Configuration

**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
**Windows**: `%APPDATA%/Claude/claude_desktop_config.json`

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

### Available Tools

The server provides the following tools:

#### curl_get
Make HTTP GET requests
```json
{
  "url": "https://api.example.com/data",
  "headers": ["Authorization: Bearer token"],
  "timeout": 30,
  "follow_redirects": true,
  "user_agent": "MyApp/1.0"
}
```

#### curl_post
Make HTTP POST requests with data
```json
{
  "url": "https://api.example.com/data",
  "json_data": {"key": "value"},
  "headers": ["Content-Type: application/json"]
}
```

#### curl_put
Make HTTP PUT requests
```json
{
  "url": "https://api.example.com/data/123",
  "data": "raw data",
  "content_type": "text/plain"
}
```

#### curl_delete
Make HTTP DELETE requests
```json
{
  "url": "https://api.example.com/data/123",
  "headers": ["Authorization: Bearer token"]
}
```

#### curl_download
Download files
```json
{
  "url": "https://example.com/file.zip",
  "output_filename": "downloaded_file.zip",
  "resume": true
}
```

#### curl_advanced
Execute curl with custom arguments
```json
{
  "args": ["-X", "PATCH", "-H", "Content-Type: application/json", "-d", "{\"status\":\"updated\"}", "https://api.example.com/items/1"]
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

## Security Considerations

- Input validation and sanitization for all curl arguments
- Restricted file operations in advanced mode
- Safe subprocess execution using spawn instead of shell
- No arbitrary shell command execution

## Requirements

- Node.js 18.0.0 or higher
- curl command-line tool installed on the system

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions and configuration examples.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and changes.
