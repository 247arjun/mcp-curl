#!/usr/bin/env node

/**
 * Example script showing how to test the mcp-curl server locally
 * This script demonstrates the MCP protocol communication
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Example MCP messages to send to the server
const messages = [
  // Initialize the server
  {
    jsonrpc: "2.0",
    id: 1,
    method: "initialize",
    params: {
      protocolVersion: "2024-11-05",
      capabilities: {},
      clientInfo: {
        name: "test-client",
        version: "1.0.0"
      }
    }
  },
  // List available tools
  {
    jsonrpc: "2.0",
    id: 2,
    method: "tools/list",
    params: {}
  },
  // Example: Make a GET request
  {
    jsonrpc: "2.0",
    id: 3,
    method: "tools/call",
    params: {
      name: "curl_get",
      arguments: {
        url: "https://httpbin.org/get",
        headers: ["Accept: application/json"]
      }
    }
  }
];

function testServer() {
  console.log('Testing mcp-curl server...\n');
  
  const serverPath = join(__dirname, '..', 'build', 'index.js');
  const server = spawn('node', [serverPath], {
    stdio: ['pipe', 'pipe', 'pipe']
  });

  let messageIndex = 0;

  server.stdout.on('data', (data) => {
    const responses = data.toString().trim().split('\n');
    responses.forEach(response => {
      if (response) {
        try {
          const parsed = JSON.parse(response);
          console.log(`Response ${parsed.id || 'notification'}:`, JSON.stringify(parsed, null, 2));
          
          // Send next message
          if (messageIndex < messages.length) {
            const nextMessage = messages[messageIndex++];
            console.log(`\nSending message ${nextMessage.id}...`);
            server.stdin.write(JSON.stringify(nextMessage) + '\n');
          } else {
            // All messages sent, close server
            server.kill();
          }
        } catch (e) {
          console.log('Non-JSON response:', response);
        }
      }
    });
  });

  server.stderr.on('data', (data) => {
    console.log('Server log:', data.toString());
  });

  server.on('close', (code) => {
    console.log(`\nServer exited with code ${code}`);
  });

  // Send first message
  if (messages.length > 0) {
    const firstMessage = messages[messageIndex++];
    console.log(`Sending message ${firstMessage.id}...`);
    server.stdin.write(JSON.stringify(firstMessage) + '\n');
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  testServer();
}
