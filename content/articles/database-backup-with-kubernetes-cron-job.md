---
title: Database Backup with Kubernetes Cron Job
description: This is a tutorial how to create database backup with Kubernetes cron job.
author: hakan
category: kubernetes
tags: [database,backup,postgresql,kubernetes,k8s]
thumbnail: pexels-brett-sayles-4425157.jpg
isPublished: false
createdAt: 2021-02-16
---

## Introduction

If you have self-managed database for your projects, it is hard to manage the
backups. You can use `db-backup` tool to create backup on S3 bucket easily
within your cluster.

## Prerequisites

Before you get started, you will need to have a number of things.

1. Kubernetes cluster.
1. `kubectl` installed. If not, you will need it to manage your clusters.
1. Have a `KUBECONFIG` file (default location is ~/.kube/config).

## What is Cron Job

Kubernetes CronJob is a job that repeat itself with given schedule. CronJob is a
perfect fit for creating a database backup for your self-manage database.

## Create CronJob

Let's create `backup-cronjob.yaml` with given content.

```yaml
apiVersion: batch/v1beta1
kind: CronJob
metadata:
  name: database-backup-job
  namespace: default
spec:
  schedule: "0 0 * * *"
  jobTemplate:
    spec:
      template:
        spec:
          restartPolicy: OnFailure
          containers:
            - name: db-backup
              image: "ghcr.io/omegion/db-backup:v0.9.0"
              imagePullPolicy: IfNotPresent
              args:
                - s3
                - export
                - --host=$DB_HOST
                - --port=$DB_PORT
                - --databases=$DATABASE_NAMES
                - --username=$DB_USER
                - --password=$DB_PASS
                - --bucket=$BUCKET_NAME
              env:
                - name: DB_HOST
                  value: ""
                - name: DB_PORT
                  value: ""
                - name: DB_USER
                  value: ""
                - name: DB_PASS
                  value: ""
                - name: DATABASE_NAMES
                  value: ""
                - name: BUCKET_NAME
                  value: ""
                - name: AWS_ACCESS_KEY_ID
                  value: ""
                - name: AWS_SECRET_ACCESS_KEY
                  value: ""
                - name: AWS_REGION
                  value: ""
```

Now, we can create CronJob with `kubectl`.

```shell
kubectl apply -f backup-cronjob.yaml
```

### Verify CronJob

Let's verify that the CronJob is created successfully.

```shell
kubectl get cronjob database-backup-job                                             
NAME                  SCHEDULE    SUSPEND   ACTIVE   LAST SCHEDULE   AGE
database-backup-job   0 0 * * *   False     0        <none>          27s
```

### Test CronJob

The CronJob that we created will be executed every day. So, lets create a
temporary job from the CronJob that we can test our Job.

```shell
kubectl create job --from=cronjob/database-backup-job database-backup-job-manual-001
```

## Conclusion

In this tutorial we created a CronJob to create database backups for our
self-managed database.
