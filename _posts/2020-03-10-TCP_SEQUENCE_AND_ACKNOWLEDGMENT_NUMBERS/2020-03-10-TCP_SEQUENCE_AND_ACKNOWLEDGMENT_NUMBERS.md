---
layout: post
title: "TCP Sequence and Acknowledgment numbers"
date: 2020-03-10
categories: [Computer network]
abstract: "In this article, the definition and usage of TCP sequence and acknowledgment numbers are described. An client-server sample sample are demonstrated with network traffic analysis using Wireshark."
abstract_img: "/assets/20200310_TCP_SEQUENCE_AND_ACKNOWLEDGMENT_NUMBERS/tcp-3ways-handshake.png"
---

## What is TCP sequence and acknowledgment number

As we known, [Transmission Control Protocol (TCP)]([https://tools.ietf.org/html/rfc793](https://tools.ietf.org/html/rfc793)) and [Internet Protocol (IP)]([https://tools.ietf.org/html/rfc791](https://tools.ietf.org/html/rfc791)) are the foundation of internet protocol suite. TCP is a connection-oriented, end-to-end reliable protocol designed to fit into a layered hierarchy of protocols which support multi-network applications. TCP sequence and acknowledgment numbers are used to achieve transmission reliability.

Technically, TCP is transmit data in octet, and each octet of data is assigned with a sequence number. The sequence number of the first octet of data in a segment is transmitted with that segment and is called the segment sequence number.  Segments also carry an acknowledgment number which is the sequence number of the next expected data octet of transmissions in the reverse direction.

## How does sequence and acknowledgment number change

The sequence number starts from a random number when connection established, and increases by the size of previous data in bytes when receiving data on client side. On server side, the first acknowledgment number is derived from the sequence number that coming from client (0) by adding 1, and increases by the size of current data in bytes when sending data. The acknowledgment number on client side and sequence number on server side increase by one only when connection establishing and terminating, while remain all same during data transmission. A TCP flow with the evolution of sequence and acknowledge numbers on both client and server sides are shown in the following figure:
![TCP Sequence and Acknowledgment number evolution](/assets/20200310_TCP_SEQUENCE_AND_ACKNOWLEDGMENT_NUMBERS/tcp-seq-ack-num.png)

## Example

In this section, the evolution of sequence and acknowledgment number in a TCP connection is visualized with [Wireshark](https://www.wireshark.org/). The network traffic data is generated with a sample client and sever program, and dumped with [tcpdump](https://www.tcpdump.org/).

### Client and Server

An client sample code that connect to port 1111 and write 5 integers to server (client.c):

```c
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <string.h>
#include <stdio.h>

int main() {
    int sockfd = socket(AF_INET, SOCK_STREAM, 0);
    struct sockaddr_in servaddr = {
        AF_INET, htons(1111), htonl(INADDR_ANY)
    };
    connect(sockfd, (const struct sockaddr*)&servaddr,
            sizeof(servaddr));
    for(int i = 0; i < 5; i++) {
        write(sockfd, (const void*)&i, sizeof(int));
    }
    close(sockfd);
}
```

An server sample code that host on port 1111 and read 5 integers, and then close connection (server.c):

```c
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <string.h>
#include <stdio.h>

int main() {
    int listenfd = socket(AF_INET, SOCK_STREAM, 0);
    struct sockaddr_in servaddr = {
        AF_INET, htons(1111), htonl(INADDR_ANY)
    };
    bind(listenfd, (const struct sockaddr*)&servaddr,
         sizeof(servaddr));
    listen(listenfd, 8);
    int connfd = accept(listenfd, (struct sockaddr*) 0, 0);
    int n;
    for(int i = 0; i < 5; i++) {
        read(connfd, &n, sizeof(int));
    }
    close(connfd);
    close(listenfd);
}
```

### Network traffic data generation

To generate the network traffic data to analyze, we need to compile and run server binary first:

```bash
gcc server.c -o server
sudo ./server
```

Now, the server is running on port 1111. Then we can start traffic capture with tcpdump, given interface name "lo" and port "1111":

```bash
sudo tcpdump -i lo port 1111 -w test.pcap
```

Then, compile and run client binary:

```bash
gcc client.c -o client
sudo ./client
```

Finally, terminate the tcpdump process, and the generated pcap file "test.pcap" is ready for analysis.

### Network traffic data analysis

Wireshark is a free and open-source packet analyzer for network troubleshooting and analysis. Wireshark is very similar to tcpdump, but a graphical front-end, which makes analyzer easy to view analysis result.

To generate the TCP flow graph, open the "test.pcap" with Wireshark, and then click on Statistics->Flow Graph with Flow type as "TCP Flows". A sample TCP flow graph are shown in the following figure:
![TCP flow graph from Wireshark](/assets/20200310_TCP_SEQUENCE_AND_ACKNOWLEDGMENT_NUMBERS/tcp-flow-graph.png)

Here we can see our client starts a connection from port 38810 to server port 1111, send 5 32-bits integers, and then close the connection. The sequence and acknowledgment number are increases as expected on both client and server side.

## More readings

- [RFC793, TCP](https://tools.ietf.org/html/rfc793)
- [Wireshark official document](https://www.wireshark.org/#learnWS)
