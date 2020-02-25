---
layout: post
title: "gRPC: Basics and Examples"
date: 2020-02-20
categories: [gRPC]
abstract: "In this article, a brief introduction on gRPC and benefits of using gRPC are discussed in the first two sections. Then, a sample repo with instruction is provided to setup gRPC server and client in several programming languages."
abstract_img: "/assets/20200220_GRPC_BASIC_AND_EXAMPLES/gRPC-abs.png"
---

![AbstractImage](/assets/20200220_GRPC_BASIC_AND_EXAMPLES/gRPC-abs.png)

## What is gRPC?

First, let's disscuss what is **gRPC**. As described in [wikipedia](https://en.wikipedia.org/wiki/GRPC), gRPC is an open source remote procedure call (RPC) system, which is based on **HTTP/2** for transport, and **Proto buffers** as interface description language.

[HTTP/2](https://developers.google.com/web/fundamentals/performance/http2) is a standard and HTTP protocol that well-known to proxies, firewalls and many software tools. Its streaming nature suits the needs of data transportation with multiplexing implemented.

[Proto buffers](https://developers.google.com/protocol-buffers) play as an IDL (interface definition language) and encoding layer, which bring flexibility message description to support multiple programming languages and efficient serialization algorithms to gRPC framework.

Given the benefits from both HTTP/2 and Proto buffers, gRPC is a good candidate of microservices communication framework.

## Why gRPC?

After we have an overview about gRPC, let's talk about the benefits that we can gain by using gRPC. In this section, we demonstrate the advantages of gRPC as microservices communication framework first, and then, several minor concerns are also listed as gRPC advantages.

### Comparing with JSON/XML based HTTP (REST) server

gRPC is not the only candidate of microservices communication framework: one can use JSON/XML based HTTP server to transport information also. However, as an advanced RPC framework, there are several advantages of gRPC over JSON/XML based HTTP server:

- **Smaller data size**: Since gRPC is using Proto buffers as interface description language, gRPC can benefit from Proto buffers on the aspect of data size. According to [Proto buffers official document](https://developers.google.com/protocol-buffers/docs/overview#whynotxml), Proto buffers are 3 to 10 times smaller than XML data when expressing same data.
- **Faster speed**: Since the data size is smaller, the Proto buffers can transport more information in same time with same network bendwidth. The binary encoding algorithm makes it faster to be serilized. Moreover, the multiplexing of HTTP/2 also improve the message transportation efficiencies. According to [Proto buffers official document](https://developers.google.com/protocol-buffers/docs/overview#whynotxml), Proto buffers are 20 to 100 times faster than XML data.
- **Generated programmable object**: People usually write a program object that corresponding to the data content when implement JSON/XML based RESTful server. One may need to change this data related program object in several places when the data definition changed. However, this data format related programmable object is automatically generated, and therefore only change of Protobuf files is needed.

Moreover, there are several other benefits by using gRPC:

- **Compatible with JSON based HTTP server**: Although it is better to have one single communication framework in the full system, two communication frameworks may existed at same time in a system during system migration. One can move from one microservice to another to replace core communication framework gradually without breaking system.
- **API Documentation**: API documentation is a must have for collaborative code development. For example, one can use [Swagger](https://swagger.io/) as a RESTful based API documentation tool. However, both API documentation and code implementation may need to be revisited if one changed the API data schema. However, since the programmable object is automatically generated in gRPC framework, both the documentation and programmable object can be modified accrodingly once Proto file have been changed.

## How to setup gRPC server and client?

Finally, after understand what and why about gRPC, let's do a hands-on section to play with gRPC server and client.

### General steps to build gRPC server and client

Generally speaking, one can setup its gRPC server and client with three steps:

- First, design gRPC service and its Proto buffers messages in Proto file, and then render it into programmable objects accroding to programming language.
- Second, build server and client code with generated gRPC code.
- Third, test gRPC client on gRPC server.

To be specific, let's go over several examples to setup gRPC server and client with different programming languages.

In this demo, a gRPC service with authentication methods and corresponding data messages are defined:
```protobuf
syntax = "proto3";

option java_multiple_files = true;
option java_package = "com.example.grpc";
option java_outer_classname = "AuthUserProtoBuf";
option objc_class_prefix = "RTG";

package messages;

service AuthUser {
    rpc CreateAuthUser (CreateAuthUserRequest) returns (CreateAuthUserReply) {}
    rpc ReadAuthUser (ReadAuthUserRequest) returns (ReadAuthUserReply) {}
    rpc UpdateAuthUser (UpdateAuthUserRequest) returns (UpdateAuthUserReply) {}
    rpc DeleteAuthUser (DeleteAuthUserRequest) returns (DeleteAuthUserReply) {}
}

message AuthUserToken {
    string method = 1;
    string digest = 2;
}

message AuthUserInfo {
    string username = 1;
    string password = 2; // NOTE, password is hidden in ALL reply related messages
    string emailaddr = 3;
}

message AuthUserReply {
    string msg = 1;
}

message CreateAuthUserRequest {
    AuthUserToken token = 1;
    AuthUserInfo info = 2;
}

message CreateAuthUserReply {
    AuthUserReply reply = 1;
}

message ReadAuthUserRequest {
    AuthUserToken token = 1;
}

message ReadAuthUserReply {
    AuthUserReply reply = 1;
    repeated AuthUserInfo info = 2;
}

message UpdateAuthUserRequest {
    AuthUserToken token = 1;
    AuthUserInfo info = 2;
}

message UpdateAuthUserReply {
    AuthUserReply reply = 1;
    AuthUserInfo info = 2;
}

message DeleteAuthUserRequest {
    AuthUserToken token = 1;
}

message DeleteAuthUserReply {
    AuthUserReply reply = 1;
}
```

Source code for demonstration can be found in [this github repo](https://github.com/weihuacern/grpc_playground). One may need to install [dependencies](https://github.com/weihuacern/grpc_playground#dependencies) before compiling.

### gRPC example in Golang

- To compile gRPC server and client with Golang: 
```bash
make prep
make rpc_go
```
- To start Golang gRPC server: 
```bash
cd server/go
./server
```
- To test Golang gRPC client by querying gRPC server: 
```bash
cd client/go
./client
```

### gRPC example in Python

- To compile gRPC server and client with Python: 
```bash
make prep
make rpc_python
```
- To start Python gRPC server: 
```bash
cd server/python
python3 server.pyz
```
- To test Python gRPC client by querying gRPC server: 
```bash
cd client/python
python3 client.pyz
```

### gRPC example in Java

- To compile gRPC server and client with Java: 
```bash
make prep
make rpc_java
```
- To start Java gRPC server: 
```bash
cd server/java/server/target
java -jar server-1.0-SNAPSHOT-jar-with-dependencies.jar
```
- To test Java gRPC client by querying gRPC server: 
```bash
cd client/java/client/target
java -jar client-1.0-SNAPSHOT-jar-with-dependencies.jar
```

### gRPC example in NodeJS

- To compile gRPC server and client with NodeJS: 
```bash
make prep
make rpc_js
```
- To start NodeJS gRPC server: 
```bash
cd server/js
./server.exe
```
- To test NodeJS gRPC client by querying gRPC server: 
```bash
cd client/js
./client.exe
```