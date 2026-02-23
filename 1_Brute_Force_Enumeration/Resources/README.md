# 🛡️ Brute Force Directories and File Names

## 📝 Description

This vulnerability involves **Sensitive Data Exposure** through improper directory indexing and weak password hashing. By using automated enumeration tools, it was possible to find hidden files containing administrative credentials.

## 🕵️‍♂️ Exploitation Process

### 1. Enumeration

Using tools like `nmap` and `gobuster`, I scanned the web server for hidden directories.

```
nmap -sC -sV
```

`-sC (Script scan, very noisy, should be only performed with permission)`
`-sV (Version detection)`

- Found an accessible folder: `/whatever/`.
- Discovered a sensitive file: `.htpasswd`.

### 2. Credential Cracking

The `.htpasswd` file contained the following line:
`root:437394baff5aa33daa618be47b75cb49`

- **Hash Identification** : The string was identified as an **MD5 hash** .
- **Cracking** : Using an online hash cracker (Rainbow Table attack), the hash was reversed to reveal the plaintext password: `dragon`.

### 3. Gaining Access

- Attempting to use these credentials for **SSH** access on port 4242 failed.
- I checked the `/admin` route discovered earlier by `gobuster`.
- Using the username `root` and password ~~`qwerty123@`~~, I successfully logged into the web administrative panel.

**Flag:** `d19b4823e0d5600ceed56d5e896ef328d7a2b9e7ac7e80f4fcdb9b10bcb3e7ff`

---

## 🛠️ How to Fix

To secure the application against this type of attack, implement the following:

- **Restrict Directory Listing** : Configure the web server (Nginx/Apache) to deny access to sensitive directories and prevent the listing of files like `.htpasswd`.
- **Use Strong Hashing** : Replace MD5 with modern, slow hashing algorithms such as **Bcrypt** or **Argon2** to make brute-forcing impossible.
- **Audit Public Files** : Regularly use tools like `gobuster` or `dirbuster` during development to ensure no sensitive configuration files are visible to the public eye.
