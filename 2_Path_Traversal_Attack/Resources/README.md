# 🛡️ Path Traversal Attack

## 📝 Description

A **Path Traversal** (or Directory Traversal) attack occurs when an application uses user-controllable input to construct a path to a file or directory on the server without proper validation. This allows an attacker to read arbitrary files on the server's file system, such as sensitive configuration files or system password files.

## 🕵️‍♂️ Exploitation Process

### 1. Discovery

While exploring the web server, I discovered a hidden directory via `nmap` and `gobuster` scans. Navigating through the deeply nested subdirectories (e.g., `/.hidden/eipm.../`) showed a directory listing that appeared to map directly to the server's file system.

### 2. Testing the Vulnerability

Using the **Search Member** form, I noticed that the `page` parameter in the URL was used to fetch content. I attempted to move up the directory tree using dot-dot-slash (`../`) sequences to access sensitive system files.

- **Initial Attempt** : `192.168.1.210/?page=../../../../etc/shadow`
- **Result** : The server returned an "Almost" alert, confirming the injection was working but the path was not deep enough.

### 3. Gaining the Flag

I increased the depth of the traversal to ensure I reached the root directory before targeting the `/etc/passwd` file, which stores user account information.

- **Final Payload** : `192.168.1.210/?page=../../../../../../../etc/passwd`

**Flag:** `b12c4b2cb8094750ae121a676269aa9e2872d07c06e429d25a63196ec1c8c1d0`

---

## 🛠️ How to Fix

To prevent Path Traversal vulnerabilities, developers should implement the following security measures:

- **Input Validation** : Never trust user input. Validate the `page` parameter against a "whitelist" of allowed files.
- **Use Filesystem APIs** : Instead of building paths manually with strings, use built-in language functions that resolve paths safely.
- **Principle of Least Privilege** : Ensure the web server user account (e.g., `www-data`) has the minimum necessary permissions and cannot access system files like `/etc/passwd`.
- **Chroot Jail** : Run the web application in a "chroot" environment or a container to isolate it from the rest of the host file system.
