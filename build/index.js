#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { spawn } from "child_process";
import { promisify } from "util";
import { exec } from "child_process";
const execAsync = promisify(exec);
// Create server instance
const server = new McpServer({
    name: "mcp-curl",
    version: "1.0.0",
    capabilities: {
        resources: {},
        tools: {},
    },
});
// Helper function to execute curl command safely
async function executeCurl(args) {
    return new Promise((resolve) => {
        // Ensure we're only calling curl with safe arguments
        if (!args.includes('curl')) {
            args.unshift('curl');
        }
        const child = spawn('curl', args.slice(1), {
            stdio: ['pipe', 'pipe', 'pipe'],
            shell: false,
        });
        let stdout = '';
        let stderr = '';
        child.stdout.on('data', (data) => {
            stdout += data.toString();
        });
        child.stderr.on('data', (data) => {
            stderr += data.toString();
        });
        child.on('close', (code) => {
            resolve({
                stdout,
                stderr,
                exitCode: code || 0,
            });
        });
        child.on('error', (error) => {
            resolve({
                stdout: '',
                stderr: error.message,
                exitCode: 1,
            });
        });
    });
}
// Tool: Basic HTTP GET request
server.tool("curl_get", "Make an HTTP GET request using curl", {
    url: z.string().describe("The URL to make the GET request to"),
    headers: z.array(z.string()).optional().describe("Optional HTTP headers in the format 'Header: Value'"),
    follow_redirects: z.boolean().optional().default(false).describe("Whether to follow redirects"),
    timeout: z.number().optional().describe("Request timeout in seconds"),
    user_agent: z.string().optional().describe("Custom User-Agent string"),
}, async ({ url, headers, follow_redirects, timeout, user_agent }) => {
    const args = ['curl'];
    // Add the URL
    args.push(url);
    // Add headers if provided
    if (headers && headers.length > 0) {
        headers.forEach(header => {
            args.push('-H', header);
        });
    }
    // Add follow redirects option
    if (follow_redirects) {
        args.push('-L');
    }
    // Add timeout if provided
    if (timeout) {
        args.push('--max-time', timeout.toString());
    }
    // Add custom user agent if provided
    if (user_agent) {
        args.push('-A', user_agent);
    }
    // Include response headers in output
    args.push('-i');
    try {
        const result = await executeCurl(args);
        return {
            content: [
                {
                    type: "text",
                    text: `Exit Code: ${result.exitCode}\n\nResponse:\n${result.stdout}${result.stderr ? `\n\nErrors:\n${result.stderr}` : ''}`,
                },
            ],
        };
    }
    catch (error) {
        return {
            content: [
                {
                    type: "text",
                    text: `Error executing curl: ${error instanceof Error ? error.message : String(error)}`,
                },
            ],
        };
    }
});
// Tool: HTTP POST request
server.tool("curl_post", "Make an HTTP POST request using curl", {
    url: z.string().describe("The URL to make the POST request to"),
    data: z.string().optional().describe("Data to send in the POST request body"),
    json_data: z.record(z.any()).optional().describe("JSON object to send as POST data"),
    headers: z.array(z.string()).optional().describe("Optional HTTP headers in the format 'Header: Value'"),
    content_type: z.string().optional().describe("Content-Type header (will be added automatically for JSON data)"),
    follow_redirects: z.boolean().optional().default(false).describe("Whether to follow redirects"),
    timeout: z.number().optional().describe("Request timeout in seconds"),
}, async ({ url, data, json_data, headers, content_type, follow_redirects, timeout }) => {
    const args = ['curl'];
    // Add the URL
    args.push(url);
    // Add POST method
    args.push('-X', 'POST');
    // Handle data
    if (json_data) {
        args.push('-d', JSON.stringify(json_data));
        if (!content_type) {
            content_type = 'application/json';
        }
    }
    else if (data) {
        args.push('-d', data);
    }
    // Add content type header
    if (content_type) {
        args.push('-H', `Content-Type: ${content_type}`);
    }
    // Add additional headers if provided
    if (headers && headers.length > 0) {
        headers.forEach(header => {
            args.push('-H', header);
        });
    }
    // Add follow redirects option
    if (follow_redirects) {
        args.push('-L');
    }
    // Add timeout if provided
    if (timeout) {
        args.push('--max-time', timeout.toString());
    }
    // Include response headers in output
    args.push('-i');
    try {
        const result = await executeCurl(args);
        return {
            content: [
                {
                    type: "text",
                    text: `Exit Code: ${result.exitCode}\n\nResponse:\n${result.stdout}${result.stderr ? `\n\nErrors:\n${result.stderr}` : ''}`,
                },
            ],
        };
    }
    catch (error) {
        return {
            content: [
                {
                    type: "text",
                    text: `Error executing curl: ${error instanceof Error ? error.message : String(error)}`,
                },
            ],
        };
    }
});
// Tool: HTTP PUT request
server.tool("curl_put", "Make an HTTP PUT request using curl", {
    url: z.string().describe("The URL to make the PUT request to"),
    data: z.string().optional().describe("Data to send in the PUT request body"),
    json_data: z.record(z.any()).optional().describe("JSON object to send as PUT data"),
    headers: z.array(z.string()).optional().describe("Optional HTTP headers in the format 'Header: Value'"),
    content_type: z.string().optional().describe("Content-Type header (will be added automatically for JSON data)"),
    follow_redirects: z.boolean().optional().default(false).describe("Whether to follow redirects"),
    timeout: z.number().optional().describe("Request timeout in seconds"),
}, async ({ url, data, json_data, headers, content_type, follow_redirects, timeout }) => {
    const args = ['curl'];
    // Add the URL
    args.push(url);
    // Add PUT method
    args.push('-X', 'PUT');
    // Handle data
    if (json_data) {
        args.push('-d', JSON.stringify(json_data));
        if (!content_type) {
            content_type = 'application/json';
        }
    }
    else if (data) {
        args.push('-d', data);
    }
    // Add content type header
    if (content_type) {
        args.push('-H', `Content-Type: ${content_type}`);
    }
    // Add additional headers if provided
    if (headers && headers.length > 0) {
        headers.forEach(header => {
            args.push('-H', header);
        });
    }
    // Add follow redirects option
    if (follow_redirects) {
        args.push('-L');
    }
    // Add timeout if provided
    if (timeout) {
        args.push('--max-time', timeout.toString());
    }
    // Include response headers in output
    args.push('-i');
    try {
        const result = await executeCurl(args);
        return {
            content: [
                {
                    type: "text",
                    text: `Exit Code: ${result.exitCode}\n\nResponse:\n${result.stdout}${result.stderr ? `\n\nErrors:\n${result.stderr}` : ''}`,
                },
            ],
        };
    }
    catch (error) {
        return {
            content: [
                {
                    type: "text",
                    text: `Error executing curl: ${error instanceof Error ? error.message : String(error)}`,
                },
            ],
        };
    }
});
// Tool: HTTP DELETE request
server.tool("curl_delete", "Make an HTTP DELETE request using curl", {
    url: z.string().describe("The URL to make the DELETE request to"),
    headers: z.array(z.string()).optional().describe("Optional HTTP headers in the format 'Header: Value'"),
    follow_redirects: z.boolean().optional().default(false).describe("Whether to follow redirects"),
    timeout: z.number().optional().describe("Request timeout in seconds"),
}, async ({ url, headers, follow_redirects, timeout }) => {
    const args = ['curl'];
    // Add the URL
    args.push(url);
    // Add DELETE method
    args.push('-X', 'DELETE');
    // Add headers if provided
    if (headers && headers.length > 0) {
        headers.forEach(header => {
            args.push('-H', header);
        });
    }
    // Add follow redirects option
    if (follow_redirects) {
        args.push('-L');
    }
    // Add timeout if provided
    if (timeout) {
        args.push('--max-time', timeout.toString());
    }
    // Include response headers in output
    args.push('-i');
    try {
        const result = await executeCurl(args);
        return {
            content: [
                {
                    type: "text",
                    text: `Exit Code: ${result.exitCode}\n\nResponse:\n${result.stdout}${result.stderr ? `\n\nErrors:\n${result.stderr}` : ''}`,
                },
            ],
        };
    }
    catch (error) {
        return {
            content: [
                {
                    type: "text",
                    text: `Error executing curl: ${error instanceof Error ? error.message : String(error)}`,
                },
            ],
        };
    }
});
// Tool: Download file
server.tool("curl_download", "Download a file using curl", {
    url: z.string().describe("The URL of the file to download"),
    output_filename: z.string().optional().describe("Output filename (if not provided, will use remote filename)"),
    resume: z.boolean().optional().default(false).describe("Resume partial download if file exists"),
    follow_redirects: z.boolean().optional().default(true).describe("Whether to follow redirects"),
    timeout: z.number().optional().describe("Request timeout in seconds"),
}, async ({ url, output_filename, resume, follow_redirects, timeout }) => {
    const args = ['curl'];
    // Add the URL
    args.push(url);
    // Add output option
    if (output_filename) {
        args.push('-o', output_filename);
    }
    else {
        args.push('-O'); // Use remote filename
    }
    // Add resume option
    if (resume) {
        args.push('-C', '-');
    }
    // Add follow redirects option
    if (follow_redirects) {
        args.push('-L');
    }
    // Add timeout if provided
    if (timeout) {
        args.push('--max-time', timeout.toString());
    }
    // Show progress
    args.push('--progress-bar');
    try {
        const result = await executeCurl(args);
        return {
            content: [
                {
                    type: "text",
                    text: `Exit Code: ${result.exitCode}\n\nDownload ${result.exitCode === 0 ? 'completed successfully' : 'failed'}:\n${result.stdout}${result.stderr ? `\n\nOutput:\n${result.stderr}` : ''}`,
                },
            ],
        };
    }
    catch (error) {
        return {
            content: [
                {
                    type: "text",
                    text: `Error executing curl: ${error instanceof Error ? error.message : String(error)}`,
                },
            ],
        };
    }
});
// Tool: Advanced curl with custom options
server.tool("curl_advanced", "Execute curl with custom arguments (advanced usage)", {
    args: z.array(z.string()).describe("Array of curl arguments (excluding 'curl' itself)"),
}, async ({ args }) => {
    // Basic validation to prevent potentially dangerous operations
    const dangerousFlags = [
        '--output', '-o', // File operations could be dangerous
        '--remote-name', '-O',
        '--upload-file', '-T',
        '--data-binary', '--data-raw',
        '--config', '-K', // Config files could contain sensitive data
        '--netrc-file',
        '--key', '--cert', // Certificate operations
        '--engine',
    ];
    const hasUnsafeFlag = args.some(arg => dangerousFlags.some(dangerous => arg.startsWith(dangerous)));
    if (hasUnsafeFlag) {
        return {
            content: [
                {
                    type: "text",
                    text: `Error: This command contains potentially unsafe flags. Please use the specific curl tools (curl_get, curl_post, curl_download, etc.) for safety.`,
                },
            ],
        };
    }
    try {
        const result = await executeCurl(['curl', ...args]);
        return {
            content: [
                {
                    type: "text",
                    text: `Exit Code: ${result.exitCode}\n\nResponse:\n${result.stdout}${result.stderr ? `\n\nErrors:\n${result.stderr}` : ''}`,
                },
            ],
        };
    }
    catch (error) {
        return {
            content: [
                {
                    type: "text",
                    text: `Error executing curl: ${error instanceof Error ? error.message : String(error)}`,
                },
            ],
        };
    }
});
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    // Log to stderr since stdout is used for MCP communication
    console.error("Curl MCP Server running on stdio");
}
main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
