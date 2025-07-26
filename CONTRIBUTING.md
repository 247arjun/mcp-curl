# Contributing to mcp-curl

Thank you for your interest in contributing to mcp-curl! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct:
- Be respectful and inclusive
- Welcome newcomers and help them get started
- Focus on constructive feedback
- Respect different viewpoints and experiences

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm package manager
- git
- Basic familiarity with TypeScript and MCP (Model Context Protocol)

### Development Setup

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/mcp-curl.git
   cd mcp-curl
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Build the project:
   ```bash
   npm run build
   ```
5. Run tests:
   ```bash
   npm test
   ```

## Development Workflow

### Making Changes

1. Create a new branch for your feature/fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes in the `src/` directory

3. Build and test your changes:
   ```bash
   npm run build
   npm test
   ```

4. Test the MCP server manually:
   ```bash
   echo '{"jsonrpc": "2.0", "id": 1, "method": "tools/list", "params": {}}' | node build/index.js
   ```

5. Run linting:
   ```bash
   npm run lint
   ```

### Code Style

- Use TypeScript for all source code
- Follow the existing code style and conventions
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions focused and concise

### Testing

- Add tests for new functionality
- Ensure all existing tests pass
- Test manually with actual MCP clients when possible
- Include edge cases and error conditions

## Types of Contributions

### Bug Reports

When reporting bugs, please include:
- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Environment details (Node.js version, OS, etc.)
- MCP client being used
- Sample curl commands that demonstrate the issue

### Feature Requests

For new features:
- Describe the use case and problem being solved
- Provide examples of how the feature would be used
- Consider backward compatibility
- Discuss potential implementation approaches

### Code Contributions

We welcome:
- Bug fixes
- New curl features or options
- Performance improvements
- Documentation improvements
- Test coverage improvements
- Code quality enhancements

## Submitting Changes

### Pull Request Process

1. Ensure your code follows the project's style guidelines
2. Add or update tests as needed
3. Update documentation if you've changed APIs
4. Ensure all tests pass
5. Update the CHANGELOG.md if applicable
6. Submit a pull request with:
   - Clear description of changes
   - Reference to any related issues
   - Screenshots or examples if applicable

### Pull Request Guidelines

- Keep changes focused and atomic
- Write clear commit messages
- Reference issues using GitHub keywords (fixes #123)
- Be responsive to feedback and questions
- Ensure CI passes

## Project Structure

```
mcp-curl/
├── src/
│   └── index.ts          # Main server implementation
├── build/                # Compiled JavaScript output
├── test/                 # Test files
├── examples/             # Usage examples
├── .github/              # GitHub workflows and templates
└── docs/                 # Additional documentation
```

## Adding New curl Features

When adding new curl functionality:

1. **Research the curl option**: Understand the curl command-line option thoroughly
2. **Design the tool interface**: Create a clear, intuitive tool schema
3. **Implement the handler**: Add the logic in `src/index.ts`
4. **Add error handling**: Handle edge cases and provide clear error messages
5. **Write tests**: Test both success and failure scenarios
6. **Update documentation**: Add examples to README.md

### Example Tool Implementation

```typescript
// Add to the tools array
{
  name: "curl_new_feature",
  description: "Description of what this does",
  inputSchema: {
    type: "object",
    properties: {
      url: { type: "string", description: "URL to request" },
      option: { type: "string", description: "New option description" }
    },
    required: ["url"]
  }
}

// Add handler case
case "curl_new_feature":
  return await handleNewFeature(request.params.arguments);
```

## Documentation

- Keep README.md up to date
- Add inline code comments for complex logic
- Update DEPLOYMENT.md for configuration changes
- Include examples for new features

## Release Process

Maintainers handle releases, but contributors should:
- Update version numbers if needed
- Update CHANGELOG.md with their changes
- Tag any breaking changes clearly

## Getting Help

- Check existing issues and discussions
- Ask questions in issue comments
- Reach out to maintainers for major changes
- Review MCP documentation for protocol questions

## Recognition

Contributors will be recognized in:
- CHANGELOG.md for their contributions
- GitHub contributors list
- Release notes for significant contributions

Thank you for contributing to mcp-curl! 🎉
