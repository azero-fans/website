---
description: Just after your hosting provider makes the server available to you.
---

# First Access

You should have either selected your own access credentials or received them from your hosting provider, either in the form of a `root` user, or a predetermined user with extra permissions (`sudo` user), etc. in all cases, let's use the _**`username`**_ convention.

Additionally, your hosting provider would have also informed to you the IP addresses assigned to your server, these could be in the form of an IPv4 address (e.g. 123.16.1.1) or a newer IPv6 one (e.g. 2001:db8::8a2e:37:334), in any case, let's use the _**`ipaddress`**_ convention.

From any terminal (e.g. DOS, PowerShell, etc.) access your server with the following command (be prepared to enter the password corresponding to the relevant user):

```shell title="in your local machine:"
ssh username@ipaddress
```

Now it is highly recommendable to update all the software packages which were provisioned by the hosting, these could be now obsolete and/or carry additional security risks, then reboot the machine to ensure the changes are enacted:

**Note**: In the commands below, the `sudo` part is not needed if you are using the `root` user.

```shell title="on your remote SSH session:"
sudo apt update
sudo apt full-upgrade
sudo reboot
```

You may need to wait for a short moment while the remote machine reboots, if you try to connect too soon you will have either no response or an error returned from the below command:

```shell title="in your local machine:"
ssh username@ipaddress
```
