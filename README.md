# Get Shopify Product

Get Shopify Product Graphql using Using Serverless framework, AWS and Node.js:

## Table of Contents

1. [Requirements](#requirements)
2. [Setup](#setup)
3. [Functions](#functions)

## Requirements

- Node v14
- serverless


## Setup

### Clone Project

```bash
git clone https://github.com/erisitohang/shopify-product
```

### Environment Configuration

```shell
$ cp .env.example .env
```

After this file copy, update the attributes in .env to match your environment


### Install project dependencies.

```bash
npm install
```

### Deploy serverless framework to AWS

```bash
sls deploy
```

### Run Locally

```bash
npn run dev
```

## Functions

### HTTP

- GET - /product/:id
  `No query params required`