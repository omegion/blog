---
title: How to Store SSH Keys on Password Managers
author: hakan
category: tools
tags: [ssh,manager,1password,bitwarden]
thumbnail: how-to-store-ssh-keys-on-bw-op.jpg
isPublished: true
createdAt: 2021-06-24
---

A tool to manage and store your SSH keys on password managers.
<!--more-->

## Introduction

Managing SSH keys are hard. Especially if you would like to move them to different
devices, or sharing the same keys across devices add more complexity. In order to
solve this problem, I created **[SSH Manager][1]** to allow other developers to manage
their keys on their favourite password managers securely.

SSH Managers supports only **[1Password][2]** and **[Bitwarden][3]** at the moment, but more 
managers are on the way.

## Prerequisites
Before you get started, you will need to have a number of things.
1. Go 
1. Have the **Bitwarden** CLI tool installed and available in the `$PATH` as `bw`.
1. Or have the **1Password** CLI tool installed and available in the `$PATH` as `op`.
1. Have the `ssh-agent` running in the current session.

## Installing SSH Manager Binary

In order to be able to run `ssh-manager`, we need to install the binary to the 
local machine. For this, run the following go command to get the package.

```shell
go get -u github.com/omegion/ssh-manager
```

Let's test that the binary is working:

```shell
ssh-manager --help
```

If everything went well, you will see the CLI help as below:

```shell
❯ ssh-manager --help
CLI command to automatically unseal Vault

Usage:
  vault-unseal [command]

Available Commands:
  add         Add Manager key to given provider.
  get         Get Manager key from given provider.
  help        Help about any command
  list        List Manager keys from given provider.
  version     Print the version/build number

Flags:
  -h, --help               help for vault-unseal
      --logFormat string   Set the logging format. One of: text|json (default "text") (default "text")
      --logLevel string    Set the logging level. One of: debug|info|warn|error (default "info")

Use "vault-unseal [command] --help" for more information about a command.
```


## Generate Test SSH Keypair

Before using your SSH keys to store in Bitwarden, let's create a dummy keypair
and test with it.

1. Open Terminal.
1. Paste the command below

```shell
ssh-keygen -t ed25519 
```

1. When you're prompted to "Enter a file in which to save the key," enter `test`.
1. At the prompt, do not type a secure passphrase.

## Add SSH Keys

Let's be sure that we have previously created keys:

```shell
❯ ls -l test*
-rw-------  1 X  staff  432 Mar 30 08:38 test
-rw-r--r--  1 X  staff  112 Mar 30 08:38 test.pub
```

I will use Bitwarden as a password manager for this example. Now we can add them 
to Bitwarden.

```shell
ssh-manager add --name test --private-key test --public-key test.pub --provider bw
```

## Get SSH Keys

Once we have SSH keypair on Bitwarden, let's get them to our local machine.

```shell
❯ ssh-manager get --name test --provider bw
SSH Key test added.
```

Let's check `~/.ssh/keys` folder if our keys are added.

```shell
❯ ls -l ~/.ssh/keys/
-rw-------  1 X  staff   432 Mar 30 11:05 test
-rw-------  1 X  staff   112 Mar 30 11:05 test.pub
```

## Conclusion

In this tutorial, we generated SSH keypair and store them in a password manager,
in this case, we used Bitwarden. Then we used SSH Manager to get the SSH keys to
the local machine and add them to `ssh-agent`.


[1]: https://github.com/omegion/ssh-manager
[2]: https://1password.com/
[3]: https://bitwarden.com/
