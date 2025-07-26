const { spawn } = require('child_process');
const path = require('path');

describe('MCP Curl Server', () => {
  test('should respond to tools/list request', (done) => {
    const serverPath = path.join(__dirname, '..', 'build', 'index.js');
    const server = spawn('node', [serverPath]);
    
    let output = '';
    
    server.stdout.on('data', (data) => {
      output += data.toString();
      
      // Check if we have a complete JSON response
      try {
        const response = JSON.parse(output.trim());
        if (response.result && response.result.tools) {
          expect(response.result.tools.length).toBeGreaterThan(0);
          expect(response.result.tools[0]).toHaveProperty('name');
          server.kill();
          done();
        }
      } catch (e) {
        // Not complete JSON yet, continue
      }
    });
    
    server.on('error', (error) => {
      done(error);
    });
    
    // Send the tools/list request
    const request = JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/list',
      params: {}
    });
    
    server.stdin.write(request + '\n');
    server.stdin.end();
    
    // Timeout after 5 seconds
    setTimeout(() => {
      server.kill();
      done(new Error('Test timeout'));
    }, 5000);
  }, 10000);
});
