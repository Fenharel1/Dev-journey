from mitmproxy import http

def request(flow: http.HTTPFlow) -> None:
    if "mi-endpoint" in flow.request.pretty_url:
        print(f"Interceptado: {flow.request.pretty_url}")
        print(f"Body: {flow.request.text}")
