---
description: >-
  These internal aspects of the server refer to the settings which allow
  connecting to the Internet.
---

# Check Connectivity

## Check Internet Protocol (IP) Addresses

Your hosting provider should have indicated which IP addresses (both v4 and v6) have been assigned to your server, and this is usually available from the admin consoles of the major providers, however, you can double check that these values are correct for your machine.

```shell title="on your remote SSH session:"
ip addr show
```

The result will look something like:

```text
1: lo: <LOOPBACK,UP,LOWER_UP> mtu 65536 qdisc noqueue state UNKNOWN group default qlen 1000
    link/loopback 00:00:00:00:00:00 brd 00:00:00:00:00:00
    inet 127.0.0.1/8 scope host lo
       valid_lft forever preferred_lft forever
    inet6 ::1/128 scope host
       valid_lft forever preferred_lft forever
2: eth0: <BROADCAST,MULTICAST,UP,LOWER_UP> mtu 1500 qdisc mq state UP group default qlen 1000
    link/ether d0:50:97:fb:9b:7d brd ff:ff:ff:ff:ff:ff
    inet 77.68.xx.53/32 scope global dynamic eth0
       valid_lft 26160sec preferred_lft 26160sec
    inet6 2a00:da00:1800:xx::1/128 scope global
       valid_lft forever preferred_lft forever
```

From the results you can see that there are entries for both IPv4 and IPv6 addresses both in the `lo` (localhost loopback) and in the `eth0` interfaces, which in this example shows: `inet 77.68.xx.53` and `inet6 2a00:da00:1800:xx::1`, these are the addresses which you can compare with the ones given by your hosting provider.

## Check Hosts and Aliases

The names given to the local and external hosts are of importance to properly direct communication between different packages running in the machine. The name of the local machine is configured in the following file, that can be edited using the command:

```shell title="on your remote SSH session:"
sudo nano /etc/hostname
```

The content of this file is just one line indicating the Fully Qualified Domain Name (FQDN) of the host machine as declared in your DNS zone above:

```text title="/etc/hostname"
yourhost.yourdomain.tld
```

The next step is to give a good look at the hosts' declaration file and prune/complete it according to your requirements

:::info
As commented in the previous chapter (DNS), if you are running validator nodes for a crypto-network, you could avoid using public DNS records and chose instead to use the _hosts_ file in your pc/laptop to give a memorable name to your nodes. Here is how.
:::

```shell title="on your remote SSH session:"
sudo nano /etc/hosts
```

This is the standard content of the file:

```text title="/etc/hosts"
# The following lines are desirable for IPv4 capable hosts
127.0.0.1        localhost
127.0.1.1        yourhost.yourdomain.tld    yourhost
ipaddress(v4)    yourhost.yourdomain.tld    yourhost

# The following lines are desirable for IPv6 capable hosts
::1     localhost    ip6-localhost   ip6-loopback
fe00::0 ip6-localnet
ff00::0 ip6-mcastprefix
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
ff02::3 ip6-allhosts
ipaddress(v6)    yourhost.yourdomain.tld    yourhost

# The following lines may be used as a private DNS table (e.g. in your laptop,
# in order to give a name to your crypto-validator nodes).
ipaddress1        yournode1.yourdomain.tld    yournode1
ipaddress2        yournode2.yourdomain.tld    yournode2
```

Apart of setting up the names for the basic IP addresses, it is important that this file does not contain any additional entries redirecting domain names to bogus addresses (e.g. if you see google.com or credit-suisse.com with a suspicious IP address) etc.

After modifying these files, you will need to reboot the machine:

```shell title="on your remote SSH session:"
sudo reboot
```

And to check the way the local host is being named, you can use the below commands:

```shell title="on your remote SSH session:"
# to return the fully qualified domain name (FQDN) of the host:
hostname -f        #e.g: yourhost.yourdomain.tld

# to return the short version of the hostname
hostname -s        #e.g: yourhost
```

## Test Internet specifications

A good connectivity to the Internet is a critical aspect of every remote server, thus having the tools to check this aspect is of utmost importance, the three most critical variables are latency (response time), bandwidth (speed) and traffic (volume).

The latency is the easiest to measure, yet the more difficult to analyse, as you can only measure the latency with one other machine at a time, you will need to check latency against the specific targets which are important to the operations of this server:

```shell title="on your remote SSH session:"
ping target.somedomain.tld
```

And a healthy output should look like this, note the `19.265 ms` average latency:

```text
PING target.somedomain.tld (198.234.213.67) 56(84) bytes of data.
64 bytes from target.somedomain.tld (198.234.213.67): icmp_seq=1 ttl=52 time=19.1 ms
64 bytes from target.somedomain.tld (198.234.213.67): icmp_seq=2 ttl=52 time=19.3 ms
64 bytes from target.somedomain.tld (198.234.213.67): icmp_seq=3 ttl=52 time=20.0 ms
64 bytes from target.somedomain.tld (198.234.213.67): icmp_seq=4 ttl=52 time=18.8 ms
64 bytes from target.somedomain.tld (198.234.213.67): icmp_seq=5 ttl=52 time=19.0 ms

--- target.somedomain.tld (198.234.213.67) ping statistics ---
5 packets transmitted, 5 received, 0% packet loss, time 4006ms
rtt min/avg/max/mdev = 18.829/19.265/20.039/0.416 ms
```

Now to measure the next variables, you will need to install some packages in your server, be always aware of the security and performance implications of installing additional packages to the barely minimum needed for your operations. But if you want to have a way to measure connectivity, you can install these tools below.

you can always check if any tool is already installed in your system by using the command `which`, for example:

```shell title="on your remote SSH session:"
which curl
```

In case the package is already installed, you will receive the path of its location

```text
/usr/bin/curl
```

but if you don't receive a response, meaning, the package is not present in the system, you can install it from your `aptitude` repository:

```shell title="on your remote SSH session:"
sudo apt install curl
```

In our case, we are installing the `curl` (Client URL) program to be able to download some additional tools from the Internet, like for example `speedtest`. Speedtest is a tool that will help you measuring the bandwidth (speed) of your Internet connection in both directions (uploads and downloads), and you can install and run it with:

:::warning
If you are using Ubuntu 24 LTS (Noble Numbat), you may need to follow the additional instructions [in the developer support pages](https://support.ookla.com/hc/en-us/articles/32139787616141-Ubuntu-24-04-noble).
:::

```shell title="on your remote SSH session:"
curl -s https://packagecloud.io/install/repositories/ookla/speedtest-cli/script.deb.sh | sudo bash
sudo apt install speedtest
speedtest
```

To get the following illustrative results, which you can then compare with what the hosting provider is telling about the services contracted for your server:

```text
   Speedtest by Ookla

      Server: Schlueter Onlinedienste - Ruethen (id: 29806)
         ISP: Contabo GmbH
Idle Latency:     2.70 ms   (jitter: 1.00ms, low: 1.70ms, high: 5.68ms)
    Download:   195.84 Mbps (data used: 88.7 MB)
                124.03 ms   (jitter: 37.19ms, low: 1.04ms, high: 316.66ms)
      Upload:   191.06 Mbps (data used: 214.8 MB)
                  1.39 ms   (jitter: 2.18ms, low: 0.97ms, high: 33.13ms)
 Packet Loss:     0.0%
  Result URL: https://www.speedtest.net/result/c/db516797-42b0-4ead7dec7768
```

Now for the final part, some hosting companies put limitations on the quantity of monthly data you can use before hitting a higher price range, or before being downgraded or even disconnected from the Internet, if that is the case, you may consider installing the following tool to keep track of the data consumption:

```shell title="on your remote SSH session:"
sudo apt install vnstat
```

Apart of installing the package, this procedure will start a background process (also called _**daemon**_) that will collect traffic information (without sniffing into the transferred packets). You can verify that the daemon is running using the following command:

```shell title="on your remote SSH session:"
sudo systemctl status vnstat
```

If the configuration is correct, you will see that the status is `active (running)` in the output below:

```text
● vnstat.service - vnStat network traffic monitor
     Loaded: loaded (/lib/systemd/system/vnstat.service; enabled; vendor preset: enabled)
     Active: active (running) since Fri 2022-10-07 16:23:38 UTC; 22s ago
       Docs: man:vnstatd(8)
             man:vnstat(1)
             man:vnstat.conf(5)
   Main PID: 1943 (vnstatd)
      Tasks: 1 (limit: 2180)
     Memory: 824.0K
        CPU: 76ms
     CGroup: /system.slice/vnstat.service
             └─1943 /usr/sbin/vnstatd -n

Oct 07 16:23:38 yourhost systemd[1]: Started vnStat network traffic monitor.
Oct 07 16:23:38 yourhost vnstatd[1943]: No interfaces found in database, adding available interfaces...
Oct 07 16:23:38 yourhost vnstatd[1943]: Interface "ens3" added with 1000 Mbit bandwidth limit.
Oct 07 16:23:38 yourhost vnstatd[1943]: -> 1 new interface found.
```

And can be queried using the command:

```shell title="on your remote SSH session:"
vnstat
```

Which will present the standard report shown below (and it can be also customised to your particular needs and hosting parameters)

```text
Database updated: 2022-10-07 16:35:00
   ens3 since 2022-10-07
          rx:  45.98 KiB      tx:  141.59 KiB      total:  187.57 KiB

   monthly
                     rx      |     tx      |    total    |   avg. rate
     ------------------------+-------------+-------------+---------------
       2022-10     45.98 KiB |  141.59 KiB |  187.57 KiB |        2 bit/s
     ------------------------+-------------+-------------+---------------
     estimated       --      |     --      |     --      |

   daily
                     rx      |     tx      |    total    |   avg. rate
     ------------------------+-------------+-------------+---------------
         today     45.98 KiB |  141.59 KiB |  187.57 KiB |       25 bit/s
     ------------------------+-------------+-------------+---------------
     estimated        66 KiB |     204 KiB |     270 KiB |
```
