---
title: How to deploy Nuxt JS on Kubernetes Cluster 2
author: hakan
category: kubernetes
tags: [nuxt,vue,kubernetes,k8s]
thumbnail: how-to-run-nuxt-on-kubernetes.jpg
isPublished: false
createdAt: 2021-03-20
---

A tutorial about deploying Nuxt.js application on Kubernetes cluster in minutes.
<!--more-->

## Introduction

In the previous tutorial, I explain how to dockerize Nuxt.js application. Now, we are good to deploy this docker image on a Kubernetes cluster.

## Prerequisites
Before you get started, you will need to have a number of things.
1. Running Kubernetes cluster.

## Pushing Docker Image

We built our docker image on the previous tutorial, now let's tag it and push it to Docker Hub. My Docker Hub username is `omegion`, so you should use your name instead.

```bash
DOCKER_USER=omegion
docker tag nuxt-k8s:latest $DOCKER_USER/nuxt-k8s:latest
docker push $DOCKER_USER/nuxt-k8s
```

## Deployment

## Service

## Ingress

## Test Deployed Application

## Conclusion

In this tutorial, we created Nuxt.js with Buefy CSS framework. Then, we could create a `Dockerfile` with multiple stages which enabled us to reduce an enormous amount of space of the docker image. Finally, we could build and test our docker image.

