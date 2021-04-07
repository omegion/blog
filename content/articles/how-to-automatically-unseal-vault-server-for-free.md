---
title: How to automatically unseal Vault Server for free
description: Deploy your CronJob with Helm to unseal your Vault server for free with Kubernetes.
author: hakan
category: kubernetes
tags: [vault,server,cronjob,cron,helm,chart,kubernetes,k8s]
thumbnail: 3828944.jpg
isPublished: true
createdAt: 2021-04-07
---

## Introduction

Vault is a very powerful secret manager tool from Hashicorp. It is widely used
for a different platform to store secrets. I run my Vault server in my
Kubernetes cluster deployed with Helm Chart. When the pod restarted, the Vault
will seal itself. You will need to unseal it to use. Vault introduces different
alternatives to unseal it automatically. However, all of them require an extra
fee. For this reason, I created a CLI tool to unseal your Vault server. In this
tutorial, I will show you how to create a CronJob within a Kubernetes cluster to
unseal your Vault server for free.

## Prerequisites

Before you get started, you will need to have a number of things.

1. A running Kubernetes cluster.
2. `kubectl` installed. If not, you will need it to manage your clusters.
3. Have a `KUBECONFIG` file (default location is ~/.kube/config).
4. Helm v3.

## Vault Unseal CLI

Vault Unseal is a tool to allow you to unseal your Vault server in command line.
It accepts `address` and `shard` parameters. If you Vault is sealed, it will use
provided shards to unseal it. If it is unsealed already, it will simply do
nothing.

```bash
CLI command to automatically unseal Vault

Usage:
  vault-unseal [command]

Available Commands:
  help        Help about any command
  unseal      Unseal Vault.
  version     Print the version/build number

Flags:
  -h, --help   help for vault-unseal

Use "vault-unseal [command] --help" for more information about a command.
```

## Helm Repository

We will use Vault Unseal helm chart to create Kubernetes Cron Job. For this,
let's add Helm Chart repository.

```bash
helm repo add omegion https://charts.omegion.dev
helm repo update
```

Now, we have helm charts, let's look up the one that we want to install.

```bash
❯ helm search repo omegion/vault-unseal-cronjob
NAME                        	CHART VERSION	APP VERSION	DESCRIPTION
omegion/vault-unseal-cronjob	0.3.0        	0.3.0      	A chart for unseal Vault cron job
```

You can see the cronjob chart. Let's install it on our cluster.

## Helm Chart Install

Before we install our Vault Unseal helm chart, let's create `values.yaml` file
which will contain Vault server details for the job.

```yaml[values.yaml]
schedule: '"*/30 * * * *"' # Runs every 30 mins.
vault:
  address: https://vault.mydomain.com
  shards:
    - "SHARD_1"
    - "SHARD_2"
    - "SHARD_3"
```

Once we have `values.yaml` file created and details are provided, let's install
the helm chart with it.

```bash
❯ helm install vault-unseal-cronjob omegion/vault-unseal-cronjob --values values.yaml
NAME: vault-unseal-cronjob
LAST DEPLOYED: Wed Apr  7 20:42:17 2021
NAMESPACE: default
STATUS: deployed
REVISION: 1
TEST SUITE: None
```

We successfully deployed the job, let's check it with `kubectl`:

```bash
❯ kubectl get cronjob vault-unseal-cronjob
NAME                   SCHEDULE       SUSPEND   ACTIVE   LAST SCHEDULE   AGE
vault-unseal-cronjob   */30 * * * *   False     0        <none>          54s
```

## Test Cron Job

The job will run every `30` minutes. Let's create a job from the cronjob that we
created to test it.

```bash
❯ kubectl create job --from=cronjob/vault-unseal-cronjob manual-unseal-job
job.batch/manual-unseal-job created
```

Let's see the logs of the job that we created.

```bash
❯ kubectl get pods --selector=job-name=manual-unseal-job
NAME                      READY   STATUS      RESTARTS   AGE
manual-unseal-job-bsjwv   0/1     Completed   0          102s

❯ kubectl logs manual-unseal-job-bsjwv                    
It is unsealed.
```

As my Vault server is already unsealed, the job logged that it is unsealed.

## Conclusion

Self-managing the Vault server on a Kubernetes cluster is hard. It can get
sealed if the pod recreated. We used the Vault Unsealed CLI tool with Kubernetes
CronJob to automatically unseal it. It is not a perfect solution, however, it is
the only free way to keep your Vault server unsealed.
