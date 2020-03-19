---
layout: post
title: "JVM Architecture in a nutshell"
date: 2020-03-17
categories: [Java, JVM]
abstract: "In this blog, the architecture of JVM (Java virtual machine) is described along with brief introduction of Java platform."
abstract_img: "/assets/20200317_JVM_ARCHITECTURE_IN_A_NUTSHELL/jvm-abs.jpg"
---

## What is the JVM

The Java source code doesn't compiled to machine code directly like what C/C++ or Golang dose. Instead, Java source codes are compiled to Java byte codes first, then those byte codes are executed line by line by Java Virtual Machine (JVM).  This process can be demonstrated in the following diagram:

![Java Source Code Execution](/assets/20200317_JVM_ARCHITECTURE_IN_A_NUTSHELL/java-exec.png)

According to the description above, the JVM is a important part in the Java platform. The JVM is responsible for the hardware- and operating system-independence of the Java platform. The JVM is an abstract computing machine, which has an instruction set and manipulates various memory areas at run time.

## How does the JVM work

As shown in the JVM architecture diagram, there are three major components in the JVM:

- Class Loader
- Run-Time Data Areas
- Execution Engine

![JVM Architecture](/assets/20200317_JVM_ARCHITECTURE_IN_A_NUTSHELL/jvm-arch.png)

### Class Loader

Class Loader loads the Java class dynamically when it refer to this class for the first time in run-time.
There are three steps to load class file into memory: loading, linking and initialization.

#### Loading

Loading is the process of finding the binary representation of a class or interface type with a particular name and creating a class or interface from that binary representation.
Different types of classes are loaded by different class loader:

- Bootstrap class loader: Loading classes from bootstrap class path, AKA, rt.jar.
- Extension class loader: Loading classes in the extension folder, AKA, jre/lib.
- Application class loader: Loading classes that defined by user.

The class loader deal with bootstrap classes first, then extension classes, and finally, application classes.

#### Linking

Linking a class or interface in the JVM means verifying and preparing that class or interface, resolution of symbolic references in the class or interface.

- Verification: Checking the binary representation of a binary class or interface is structurally correct.
- Preparation: Creating the static fields for a class or interface and initializing such fields to their default values.
- Resolution: Resolving class or interface dependencies that rely on symbolic references in the run-time constant pool.

#### Initialization

Initialization of a class or interface consists of executing the class or interface initialization method clinit, which is class initialization method.

### Run-Time Data Areas

The JVM defines several run-time memory areas that are used during execution of a program.
Some of areas, like Heap Area, Method Area and Run-Time Constant Area, are created when the JVM starts up, shared by threads when running, and only destroyed when the JVM exits.
Other areas. Program Counter Register, Stack Area and Native Method Stack, are created when the thread starts, used by this thread only, and destroyed when thread exits.

#### Program Counter Register

Program Counter Register, like what it means in general computer architecture, is a pointer to the current instruction in sequence of instructions in a program.
A Program Counter Register is created every time a new thread starts.
However, if current execution method is "native" (C/C++), the Program Counter Register will be remain undefined.

#### Stack Area

Stack Area is used to store the JVM frames.
Stack Area is created and managed for each thread.

#### Heap Area

Heap Area is the location that store objects of classes and arrays.
Heap Area is shared with all threads.
Garbage Collector aims to optimize the usage of this Heap Area.
Heap Area is created when the JVM booted up.

#### Method Area

In general, Method area is a logical part of Heap Area.
Method area stores static fields, structures, method data, constructor code, and run-time constant pool for each class.
Method Area is created when the JVM starts.

#### Run-Time Constant Pool

Run-Time Constant Pool is created out of Method Area.
It contains constants that referred per class.

#### Native Method Stack

The implementation of JVM that supports native methods will have Native Method Stacks.

### Execution Engine

Execution Engine executes the Byte Code which is loaded to the Run-Time Data Areas through the Class Loader and translate it into machine code.

#### Interpreter

Interpreter reads the Byte Code instructions and executes them sequentially.

#### JIT Compiler

JIT Compiler compiles the similar part of the Byte Code together to optimize Interpreter's performance.

#### Garbage Collector

Garbage Collector is a part of execution engine which release the memory by collecting and removing the not referenced objects.

## More readings

- [Java Language Specification](https://docs.oracle.com/javase/specs/jls/se14/html/index.html)
- [JVM Specification](https://docs.oracle.com/javase/specs/jvms/se14/html/index.html)
- [Java Virtual Machine Guide](https://docs.oracle.com/en/java/javase/14/vm/java-virtual-machine-technology-overview.html)
- [HotSpot Virtual Machine Garbage Collection Tuning Guide](https://docs.oracle.com/en/java/javase/14/vm/java-virtual-machine-technology-overview.html)
- JVM (Java Virtual Machine) acts as Java byte code's interpreter that executing the compiled Java program line by line.
- JRE (Java Runtime Environment) is an installation package which provides environment to only run the Java application on the machine.
- JRE = JVM + Library class (rt.jar, etc.).
- JDK (Java Development Kit) is a tool kit which provides the environment to develop and execute the Java program.
- JDK = JRE + Java development tool (javac, etc.).
- [JDK, JRE, JVM](https://docs.oracle.com/javase/7/docs/index.html)
