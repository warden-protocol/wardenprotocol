package main

import (
	"fmt"
	"net"
	"net/http"
	"strings"
)

func getIP(r *http.Request) (string, error) {
	forwardedFor := r.Header.Get("X-Real-Ip")
	if forwardedFor != "" {
		hops := strings.SplitN(forwardedFor, ",", 2)
		client := strings.TrimSpace(hops[0])
		return client, nil
	}

	ip, _, err := net.SplitHostPort(r.RemoteAddr)
	if err != nil {
		return "", fmt.Errorf("userip: %q is not IP:port", r.RemoteAddr)
	}
	return ip, nil
}
