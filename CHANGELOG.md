# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-01-26

### Added
- Initial release of mcp-curl MCP server
- Support for HTTP GET, POST, PUT, DELETE requests
- File download functionality with curl
- Advanced curl command support
- JSON data handling for POST/PUT requests
- Custom headers support
- Timeout and redirect options
- User-Agent customization
- Comprehensive documentation and deployment guides
- MIT license
- GitHub Actions CI/CD pipeline
- ESLint configuration
- Basic test suite
- Development and contribution guidelines

### Features
- `curl_get` - Make HTTP GET requests
- `curl_post` - Make HTTP POST requests with JSON/raw data
- `curl_put` - Make HTTP PUT requests
- `curl_delete` - Make HTTP DELETE requests
- `curl_download` - Download files using curl
- `curl_advanced` - Execute curl with custom arguments

### Infrastructure
- TypeScript source code with compilation to JavaScript
- npm package configuration for publication
- Git repository with proper .gitignore
- Documentation for deployment and local setup
- GitHub workflow for continuous integration
- Code quality tools (ESLint, TypeScript)

## [Unreleased]

### Planned
- Enhanced error handling and validation
- More comprehensive test coverage
- Performance optimizations
- Additional curl features based on user feedback
- Integration tests with real HTTP endpoints
