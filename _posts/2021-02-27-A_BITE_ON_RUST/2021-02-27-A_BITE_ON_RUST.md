---
layout: post
title: "A Bite on Rust"
date: 2021-02-27
categories: [Rust]
abstract: "In this article, I wrote my LeetCode algorithm with Rust, a wonderful programming language."
abstract_img: "/assets/20210227_A_BITE_ON_RUST/rust-abs.png"
---

## What is Rust

Rust is a programming language designed for performance and safety. Personally, I love Rust a lot. Because I used to be a C++ guy, and then I suddenly find the GC language, like Java/Scala, Go, etc., are getting more and more popular only because they have garbage collection. Garbage collection makes programmer free from memory leak issue, which do help a lot. But, just like a real driver will not like to drive an automobile car, a real programmer would control his own memory. Rust is just the language I need: syntactically similar to C++, but can guarantee memory safety by borrowing a checker instead of garbage collection. This pretty language is from a personal project in 2006 by Mozilla employee Graydon Hoare. He states that the project was named after the rust family of fungi, but I think what he really wants to rust is chrome.

## Why is Rust

There are quite different reasons for different people to learn Rust. For me, there is only one reason: it gives me a way to have memory safety without losing performance. Personally I want to control all details of my code to achieve best performance. I really do not like the garbage collection process raping my program to have uncontrolled stop the world in the runtime. I used to write C++, Java and Go. C++ does not have GC, but sometimes it is hard to find out the culprit of memory leak, and you may need to refactor the whole module to fix this issue. Java have JVM to rape the OS, which make the micorservice image too large. Go looks great, but still has GC and STW to slow down your program. Rust is the thing I just want. So I would like to learn it and use it in real engineering work.

## How to Write Rust

In this section, I will show Rust installation and toolchain first, then develop the first Rust code for a LeetCode question.

### Rust Installation

For the users who coding with unix-like operating system, the following command can be used to install latest official version of Rust:

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

Then, the following Rust toolchain, including ```rustc```, ```cargo``` and ```rustup```, etc. are installed to the path ```~/.cargo/bin```.

### Rust Toolchain

The Rust organization provides a set of toolchains to support developers to use Rust smoothly. The following Rust tools are very useful when I was developing code with Rust:

- rustup: rustup is the toolchain installer of the Rust. One can use it to install Rust from the official release channels, switch from stable, beta and nightly compilers and keep them updated. More details can be found on the [rustup book](https://rust-lang.github.io/rustup/index.html).
- rustc: rustc is the compiler of Rust. It can compile your source code into executable binary code. More details can be found in the [rustc book](https://doc.rust-lang.org/rustc/what-is-rustc.html).
- Cargo: Cargo is the Rust package manager. It can download code dependencies, compile packages and make distributions. The community packages of Rust can be found in the [crate registry](https://crates.io/). More details are in the [cargo book](https://doc.rust-lang.org/cargo/).
- Rustfmt: Rustfmt is a command line tool to format code according to style guidelines. Personally, I like this tool very much. It can mute the argument like "space or tab" in the team, and make the code style aligned. One can also use this tool through ```cargo fmt``` command. More usage of this tool can be found in the [rustfmt github page](https://github.com/rust-lang/rustfmt).
- Clippy: Clippy is the linter of Rust. It can analyze your code to find out mistakes according to the lint level and rules. More detail can be found in the [clippy github page](https://github.com/rust-lang/rust-clippy)

### LeetCode Pratice with Rust

Since we get familiar with Rust toolchain, let's start writing the first Rust code to resolve LeetCode questions. The following is the solution in Rust on the [Two Sum](https://leetcode.com/problems/two-sum/) question:

```rust
impl Solution {
    pub fn two_sum(nums: Vec<i32>, target: i32) -> Vec<i32> {
        let mut map = HashMap::with_capacity(nums.len());
        for (i, num) in nums.iter().enumerate() {
            match map.get(&(target - num)) {
                None => {
                    map.insert(num, i);
                }
                Some(sub_i) => {
                    return vec![*sub_i as i32, i as i32];
                }
            }
        }
        vec![]
    }
}
```

Then, we can also add test cases to make sure your solution is correct:

```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_0001() {
        assert_eq!(vec![1, 3], Solution::two_sum(vec![1, 3, 7, 6], 9));
        assert_eq!(vec![1, 2], Solution::two_sum(vec![11, 2, 4], 6));
    }
}
```

Finally, we can test the LeetCode solutions with ```cargo test```:

```bash
 weihua@localhost  ~/leetcode_rust   main  cargo test                                                         ✔  10708  23:27:42
    Finished test [unoptimized + debuginfo] target(s) in 0.00s
     Running target/debug/deps/leetcode_rust-d9c1ca92e84dc4ca

running 4 tests
test solution::q0004_median_of_two_sorted_arrays::tests::test_0004 ... ok
test solution::q0002_add_two_numbers::tests::test_0002 ... ok
test solution::q0001_two_sum::tests::test_0001 ... ok
test solution::q0003_longest_substring_without_repeating_characters::tests::test_0003 ... ok

test result: ok. 4 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.00s
```

My LeetCode solutions are located in this [github repo](https://github.com/weihuacern/leetcode_rust). Welcome to visit and comment.

## More Readings

- [www.rust-lang.org](https://www.rust-lang.org/)
- [Rust Book](https://doc.rust-lang.org/book/)
- [Rust Tools](https://www.rust-lang.org/tools)
- [Rust vs Go](https://bitfieldconsulting.com/golang/rust-vs-go)
