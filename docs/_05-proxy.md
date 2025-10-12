---
sidebar_position: 6
---

```
###
# HAPROXY CONFIGURATION FILE
###

global

###
# Standard Settings
###

   # Basic configuration
   log /dev/log    local0
   log /dev/log    local1 notice
   chroot /var/lib/haproxy
   stats socket /run/haproxy/admin.sock mode 600 level admin
   stats timeout 30s
   user  haproxy
   group haproxy
   daemon

   # Default SSL material locations
   ca-base /etc/ssl/certs
   crt-base /etc/ssl/private

   # See: https://ssl-config.mozilla.org/#server=haproxy&server-version=2.0.3&config=intermediate
   ssl-default-bind-ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384
   ssl-default-bind-ciphersuites TLS_AES_128_GCM_SHA256:TLS_AES_256_GCM_SHA384:TLS_CHACHA20_POLY1305_SHA256
   ssl-default-bind-options ssl-min-ver TLSv1.2 no-tls-tickets

###
# Extra Settings
###

   # Maximum per-process number of concurrent connections
   maxconn 250000

   # Maximum per-process number of connections per second
   maxconnrate 1000

   # multithread suppport
   nbthread 8

   # Buffer size (in bytes) for cookies. Default value is 16384.
   tune.bufsize 32768

   # Maximum size of the Diffie-Hellman parameters used for generating keys
   tune.ssl.default-dh-param 4096

   # Maximum CPU usage before stopping compression
   maxcompcpuusage 50

###
# HTTP MODE
###

###
# HTTP - Default Values
###

defaults
   log     global
   mode    http
   retries 3
   option  httpslog
   option  dontlognull
   option  forwardfor
   timeout connect         5s
   timeout client          2m
   timeout client-fin      10s
   timeout server          1m
   timeout server-fin      5s
   timeout tunnel          10m
   timeout queue           10s
   timeout http-request    10s
   timeout http-keep-alive 2s
   balance leastconn
   maxconn 250000
   errorfile 400 /etc/haproxy/errors/400.http
   errorfile 403 /etc/haproxy/errors/403.http
   errorfile 408 /etc/haproxy/errors/408.http
   errorfile 500 /etc/haproxy/errors/500.http
   errorfile 502 /etc/haproxy/errors/502.http
   errorfile 503 /etc/haproxy/errors/503.http
   errorfile 504 /etc/haproxy/errors/504.http

###
# HTTP - HAProxy Stats listener
###

listen li-stats
      bind localhost:8080       # default port, but you can pick any port
      stats enable      # turns on stats module
      stats refresh 10s # set auto-refresh rate
      # security
      stats uri /stats # choose a subpath for the dashboard
      stats hide-version
      #stats admin if localhost   # enable to restrict to localhost
      #stats admin if 10.0.0.0/8  # enable to restrict to 10.x.x.x network sources
      #stats admin auth <username:password> # enable to setup basic http auth

###
# HTTP - HTTP listener (auto-redirect to HTTPS)
###

listen li-http
   bind *:80
   http-request redirect scheme https unless { ssl_fc }

###
# HTTP - HTTPS Frontends
###

frontend fe-ssl
   bind *:443 ssl crt /etc/ssl/private

   ## Evaluate ACLs (Access Control Lists) ##

   # Routing based on websocket protocol header
   acl is_upgraded  hdr(Connection)  -i upgrade
   acl is_websocket hdr(Upgrade)     -i websocket

   # Check if asking for HAproxy stats
   acl is_proxy     hdr(host) -i haproxy.mydomain.tld

   # Discriminate individual chains
   acl is_azero hdr(host)     -i mainnet.azero.fans  azero.gatotech.network
   acl is_tzero hdr(host)     -i testnet.azero.fans  tzero.gatotech.network

   ## Organise backends ##

   # HAproxy stats
   use_backend be-proxy         if is_proxy

   # Independent Solochains
   use_backend be-azero-rpc      if is_azero
   use_backend be-tzero-rpc      if is_tzero

###
# HTTP - HTTPS Backends
###

# HAProxy stats backend
backend be-proxy
   server proxy localhost:8080 check

# Aleph Zero backends
backend be-azero-rpc
   option http-server-close
   #option httpchk GET /health
   #http-check expect rstring {\"peers\":[3-9]|\d{2,},\"isSyncing\":false,\"shouldHavePeers\":true}
   server azero-rpc1 172.16.0.1:9944 check inter 10s
   server azero-rpc2 172.16.0.2:9944 check inter 10s

backend be-tzero-rpc
   option http-server-close
   #option httpchk GET /health
   #http-check expect rstring {\"peers\":[3-9]|\d{2,},\"isSyncing\":false,\"shouldHavePeers\":true}
   server tzero-rpc1 172.16.1.1:9944 check inter 10s
   server tzero-rpc2 172.16.1.2:9944 check inter 10s

####
# HTTP - Bootnodes' listeners over P2P/Websockets
####

# Aleph Zero bootnodes

listen li-azero-boot-p2pWS
   bind *:34333
   bind *:35333 ssl crt /etc/ssl/private
   server azero-boot-p2pWS 172.16.0.1:30333 check inter 10s

listen li-tzero-boot-p2pWS
   bind *:34334
   bind *:35334 ssl crt /etc/ssl/private
   server tzero-boot-p2pWS 172.16.1.1:30333 check inter 10s

###
# TCP MODE
###

###
# TCP - Default Values
###

defaults
   log     global
   mode    tcp
   retries 3
   option  tcplog
   option  dontlognull
   timeout connect    5s
   timeout client     5m
   timeout server     5m
   timeout queue      10s

####
# TCP - Listeners for Bootnodes over P2P
####

# Aleph Zero bootnodes

listen li-azero-boot-p2p
   bind *:33333
   server azero-boot-p2p 172.16.0.1:30333 check inter 10s

listen li-tzero-boot-p2p
   bind *:33334
   server tzero-boot-p2p 172.16.1.1:30333 check inter 10s

####
# END HAPROXY CONFIGURATION FILE
####
```