---
title: How to Use Vault Signed SSH Certificate Manager
author: hakan
category: tools
tags: [vault,ssh,manager,certificate]
thumbnail: vault-signed-ssh-certificate-manager.jpg
isPublished: true
createdAt: 2021-06-24
---

A tool to use Vault Signed SSH Certificate Manager to SSH your server.
<!--more-->

## Introduction

Vault is a popular secret manager from Hashicorp. Using a Signed certificate to SSH
to your server adds another layer of security. I created 
**[Vault Signed SSH Certificate Manager][1]** to allow other developers to 
SSH servers more securely.

## Prerequisites
Before you get started, you will need to have a number of things.
1. Running Vault server 


## Installing SSH Manager Binary

In order to be able to run `ssh-manager`, we need to install the binary to the
local machine. For this, run the following go command to get the package.

```shell
go get -u github.com/omegion/vault-ssh
```

Let's test that the binary is working:

```shell
vault-ssh --help
```

If everything went well, you will see the CLI help as below:

```shell
❯ vault-ssh --help
CLI command to manage SSH connections with Vault

Usage:
  vault-ssh [command]

Available Commands:
  certificate Manages certificates for SSH engine.
  enable      Enables SSH Engine.
  help        Help about any command
  role        Manages roles for SSH engine.
  sign        Signs given public key with SSH engine and role.
  version     Print the version/build number

Flags:
  -h, --help   help for vault-ssh

Use "vault-ssh [command] --help" for more information about a command.
```

## Create SSH engine and role.

1. Enable a SSH engine in your Vault.

```shell
vault-ssh enable --path my-ssh-signer
```

2. Generate a Certificate CA for the engine.

```shell
vault-ssh certificate create --engine my-ssh-signer
```

3. Read created certificate to put on your server.

```shell
vault-ssh certificate read --engine my-ssh-signer
```

4. Create a role for the engine.

```shell
vault-ssh role create --name omegion --engine my-ssh-signer
```

5. Sign your public key with a role. The generated file will be written in `signed-key.pub` in this example.

```shell
vault-ssh sign \
  --role omegion \
  --engine my-ssh-signer \
  --public-key ~/.ssh/id_rsa.pub > signed-key.pub
```

6. SSH your server with signed key.

```shell
ssh -i signed-key.pub -i ~/.ssh/id_rsa root@1.1.1.1
```

## Conclusion

In this tutorial, we enabled SSH engine in Vault, then we generated CA certificate.
We used the generated CA certificate to the server we want to SSH. Also, we created
a role in Vault within the created engine with static configuration. Finally,
we signed our SSH key with Vault then used a temporary CA certificate to SSH to 
the server.


[1]: https://github.com/omegion/vault-ssh
