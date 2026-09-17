import os
import sys
import mimetypes
from http.server import HTTPServer, SimpleHTTPRequestHandler

class RangeRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Accept-Ranges', 'bytes')
        super().end_headers()

    def do_GET(self):
        # Translate path
        path = self.translate_path(self.path)
        if not os.path.exists(path) or os.path.isdir(path):
            super().do_GET()
            return

        range_header = self.headers.get('Range', None)
        if not range_header:
            super().do_GET()
            return

        try:
            file_size = os.path.getsize(path)
            # Example range header: 'bytes=0-1024' or 'bytes=1024-'
            range_type, range_val = range_header.strip().split('=')
            if range_type.strip().lower() != 'bytes':
                super().do_GET()
                return

            ranges = range_val.split('-')
            start = int(ranges[0]) if ranges[0] else 0
            end = int(ranges[1]) if len(ranges) > 1 and ranges[1] else file_size - 1

            if start >= file_size or end >= file_size or start > end:
                self.send_response(416, 'Requested Range Not Satisfiable')
                self.send_header('Content-Range', f'bytes */{file_size}')
                self.end_headers()
                return

            content_length = end - start + 1
            content_type, _ = mimetypes.guess_type(path)
            if not content_type:
                content_type = 'application/octet-stream'

            self.send_response(206, 'Partial Content')
            self.send_header('Content-Type', content_type)
            self.send_header('Content-Range', f'bytes {start}-{end}/{file_size}')
            self.send_header('Content-Length', str(content_length))
            self.send_header('Last-Modified', self.date_time_string(os.path.getmtime(path)))
            self.end_headers()

            with open(path, 'rb') as f:
                f.seek(start)
                remaining = content_length
                chunk_size = 64 * 1024
                while remaining > 0:
                    read_bytes = min(remaining, chunk_size)
                    buf = f.read(read_bytes)
                    if not buf:
                        break
                    try:
                        self.wfile.write(buf)
                    except (ConnectionResetError, BrokenPipeError, ConnectionAbortedError):
                        break
                    remaining -= len(buf)
        except Exception as e:
            # Fallback to standard handling
            super().do_GET()

def run(port=8000):
    server_address = ('', port)
    httpd = HTTPServer(server_address, RangeRequestHandler)
    print(f'Starting Birthday server with HTTP 206 Range support on http://localhost:{port}')
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    finally:
        httpd.server_close()

if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    run(port)
