---
description: Keep in mind to revisit these aspects periodically.
---

# Basic Maintenance

It is highly recommendable to keep your system updated with the latest version of the software packages which it utilises, generally speaking  older ones could entail additional security risks due to previous exploits and other malicious code developed to target those versions.

**Note**: However, please also note that installing new versions is not free from risks of malicious code being inserted (e.g. by disgruntled team members of the relevant projects). Additionally, sometimes new versions of one package may break the dependencies of other packages, rendering the upgraded machine inoperable. In conclusion, please proceed with cautions and research before committing to the upgrades.

```shell title="on the terminal"
sudo apt update
sudo apt full-upgrade
sudo reboot
```

From time to time it will be also needed to upgrade the Operating System (OS), this will be usually notified in the Message-of-the-Day (MOTD) at the start of the session.

After proper consideration of the upgrade, you just need to install the update manager (if not already) and execute upgrade:

```shell title="on the terminal"
sudo apt install update-manager-core
do-release-upgrade
```

Finally, you can check the installation with:

```shell title="on the terminal"
lsb_release -a
```

and that's the end of this document, feel free to now use your server for the purpose you want, check out the relevant guides provided here!
