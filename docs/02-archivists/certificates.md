# Certificates for SSL termination

This documentation covers the SSL certificate management for `*.azero.fans`, using automated processes
to ensure certificates are consistently up-to-date and securely deployed. The certificates are stored 
in designated Git repositories, enabling version control and traceability.

## Repository Details

- Repository URL: `git@github.com:azero-fans/ssl-cert.git`
- Managed by: GATOTECH LTD 

In order to gain access to the relevat reposiroty, please create a Deploy Key (please follow the instructions [here](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/managing-deploy-keys#deploy-keys)) and provide it to the manager of the repository.

## Directory Structure and File Description

```
ssl-cert/
├── cert
│   ├── cert.pem              # RSA Public key
│   ├── chain.pem             # Certificate Authorities (chain)
│   ├── fullchain.pem         # Combined cert + chain
│   ├── azero.fans.pem        # Combined key + cert + chain
│   └── privkey.pem           # RSA Private Key
└── README.md
```

## Certificate Update Procedures

Certificates are updated automatically through scheduled cron jobs that fetch
the latest changes from the respective Git repositories and update the
certificates used by HAProxy. Recommended to be set on redundant servers where
your SSL termination is being handled.

### Cron Jobs Configuration

```bash
# AZERO.FANS domain SSL certificates update
0 0 1,15 * * ssh-agent bash -c 'ssh-add /root/.ssh/azero_fans_key; \
  git -C /opt/github/ssl-cert reset --hard HEAD && \
  git -C /opt/github/ssl-cert clean -fd && \
  git -C /opt/github/ssl-cert pull --rebase && \
  cp /opt/github/ssl-cert/cert/azero.fans.pem /etc/ssl/private/ && \
  systemctl reload haproxy'
```

## Security and Access

Access to these repositories is secured with SSH keys, and only authorized
personnel have access to perform operations. Ensure keys are stored securely
and permissions are appropriately set:

```bash
chmod 600 /root/.ssh/azero_fans_key
```
