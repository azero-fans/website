---
description: As the name suggests, these relate to services needed around to the machine.
---

# External Tasks

## Add a Domain Name Service (DNS)

There is nothing against accessing the remote server via its IP address alone (e.g. 8.8.8.8), however, some functionalities will work better when the server also has a distinctive name that can be resolved via DNS (e.g. google.com). This is particularly important for double-checking ownerships and trust ratings of your web and email servers.

:::info
If you plan to use this server only for validation of a crypto-network, it may be preferrable not to announce your IP in any public DNS tables anywhere. However, note that working without a domain name will not save you from a sophisticated attack, but may spare you from some other threats, specially automated DDoS attacks targeting usual ports for other common services (e.g. web, mail, file servers, etc).
:::

First you need to own a domain name (e.g. _**yourdomain.tld**_) and have access to its DNS zone, this is generally provided by the domain name seller, and you just need to add an **A** (or **AAAA**, for IPv6) record assigning a subdomain, e.g. _**yourhost**_, to the _**ipaddress**_ of the server:

```dns-zone-file title="DNS Zone example"
$ORIGIN yourdomain.tld.
(...)
yourhost.yourdomain.tld.    3600    IN    A        ipaddress(v4)
yourhost.yourdomain.tld.    3600    IN    AAAA     ipaddress(v6)
(...)
```

In the example above, the records were added using the following values per field:

| Variable             | Value                     |
| -------------------- | ------------------------- |
| Host label (Name):   | yourhost.yourdomain.tld   |
| TTL (time to live):  | Default (or 3600 seconds) |
| Record class:        | IN (Internet)             |
| Record type:         | A (or AAAA, for IPv6)     |
| Record data (Value): | ipaddress                 |

Once done, it can take a while until these DNS records propagate across the Internet, and you can check when that becomes active from any console (e.g. DOS):

```shell title="from any machine:"
nslookup yourhost.yourdomain.tld
```

it will return something like this for a site that has both A and AAAA records:

```text
Server:         8.8.8.8
Address:        8.8.8.8#53

Non-authoritative answer:
Name:   yourhost.yourdomain.tld
Address: 54.36.xx.187
Name:   yourhost.yourdomain.tld
Address: 2001:41d0:xx::2538
```

## Add a Reverse DNS record

In the previous subtitle you saw that a DNS record is used to point one subdomain of your domain name to the specific IPs of your server. Now you may also want to add a record that point the IP address of your server back to the relevant subdomain within your domain name. This is especially beneficial for mail-server implementations.

:::info
Once more, for a purely validator node, you may want to consider the pros and cons of announcing your IP address in public DNS tables as this one.
:::

Reverse DNS records are managed in the server side where the IP is used (instead of on the domain side as the subtitle above), so head up to your hosting provider's console, select the appropriate _**ipaddress**_ and declare the related _**yourhost.yourdomain.tld**_ entry, this will result in a PTR (pointer) record being created for the _**arpa**_ top level domain:

```dns-zone-file title="DNS Zone for IP address (Reverse DNS)"
$ORIGIN arpa.
(...)
ipaddress(v4).in-addr.arpa.  IN    PTR    yourhost.yourdomain.tld.
ipaddress(v6).ip6.arpa.      IN    PTR    yourhost.yourdomain.tld.
(...)
```

Once done, it can be also verified using the command below in your preferred console:

```shell title="from any machine:"
nslookup ipaddress
```

## Configure Hosting Firewall

Another external service worth looking at is the firewall facilities supplied by your hosting provider. This firewall is generally in the form of a piece of hardware that blocks traffic to/from the Internet even before reaching your server, so it may result more effective than providing it yourself within your server via software tools like _**iptables**_ or _**ufw**_.

While the server is in preparation, it is recommended to close it to the world. This generally means blocking all incoming connections (you can allow all outgoing connections from your server so it can actually access and download content from the Internet). But before activating the firewall, remember to ensure that you (meaning your local machine's IP address) have incoming access to the server in the relevant ports:

```text title="Recommended Ports for initial server deployment:"
allow incoming SSH:    from ipaddress protocol TCP port 22
allow incoming PING:   from ipaddress protocol ICMP
```

You will surely need to come back and modify these rules as you progress setting up your server.

## Activate DDoS protection

If available from your hosting provider, make sure you activate this facility if you consider that any Distributed-Denial-of-Service (DDoS) attack is a possibility, or if the consequences of such attack would be critical for your operations. Please note that activating this service may add some latency to the Internet connection of your server, but in most cases, it is worth the sacrifice.
