"""Static server for previewing this site. Sends no-store so edits show up
on reload instead of being masked by the browser's heuristic cache."""
import http.server, socketserver, sys

class H(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, must-revalidate")
        super().end_headers()

port = int(sys.argv[1]) if len(sys.argv) > 1 else 8899
socketserver.TCPServer.allow_reuse_address = True
with socketserver.TCPServer(("", port), H) as httpd:
    print(f"serving on http://localhost:{port}")
    httpd.serve_forever()
