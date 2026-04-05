#!/usr/bin/env python3
"""
Simple HTTP Server for Connekt Studio Website
Run this script to test the website locally
"""

import http.server
import socketserver
import os
import webbrowser
from pathlib import Path

# Change to the directory containing this script
os.chdir(os.path.dirname(os.path.abspath(__file__)))

PORT = 8000

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
        self.send_header('Pragma', 'no-cache')
        self.send_header('Expires', '0')
        super().end_headers()

    def log_message(self, format, *args):
        # Suppress log messages for cleaner output
        pass

if __name__ == "__main__":
    print("=" * 60)
    print("🧘‍♀️  CONNEKT STUDIO WEBSITE SERVER")
    print("=" * 60)
    print(f"🌐 Server starting on port {PORT}")
    print(f"📁 Serving from: {os.getcwd()}")
    print()
    print("🚀 Open your browser and go to:")
    print(f"   http://localhost:{PORT}")
    print()
    print("📱 Or use these links:")
    print(f"   http://localhost:{PORT}/index.html")
    print(f"   http://localhost:{PORT}/test.html")
    print()
    print("🛑 Press Ctrl+C to stop the server")
    print("=" * 60)
    
    try:
        with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
            print(f"✅ Server is running on http://localhost:{PORT}")
            
            # Auto-open browser after a short delay
            import threading
            import time
            
            def open_browser():
                time.sleep(1)
                webbrowser.open(f'http://localhost:{PORT}/index.html')
            
            browser_thread = threading.Thread(target=open_browser)
            browser_thread.daemon = True
            browser_thread.start()
            
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n🛑 Server stopped by user")
        print("👋 Thank you for using Connekt Studio!")
    except OSError as e:
        if e.errno == 48:  # Address already in use
            print(f"❌ Port {PORT} is already in use!")
            print("💡 Try a different port or close the other server")
        else:
            print(f"❌ Error starting server: {e}")
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
