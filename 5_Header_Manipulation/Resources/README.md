# 🛡️ Header Manipulation & Sensitive Information Disclosure

## 📝 Description

This vulnerability involves **Broken Access Control** where the server relies on the `Referer` HTTP header to verify the origin of a request. Since this header is controlled by the client, it can be easily forged to bypass security restrictions.

## 🕵️‍♂️ Exploitation Process

### 1. Information Gathering

While auditing the website source code, I discovered a hidden developer comment on the copyright page indicating a specific origin requirement for the next step:

- **Origin Requirement** : "You must be coming from: `https://www.nsa.gov/`".

### 2. Forgery via Header-Modifying Extension

Using a browser extension (such as **ModHeader** ) on **macOS** , I manually injected the required header into the request:

- **Configuration** :
- **Header Name** : `Referer`
- **Value** : `https://www.nsa.gov/`
- **Target** : I navigated to the hidden hashed page (`/?page=e43ad1fd...`).

### 3. Result

Upon refreshing the page with the spoofed `Referer`, the server validated the request and displayed the flag.

**Flag:** `F2a29020EF3132E01DD61DF97FD33EC8D7FCD1388CC9601E7DB691D17D4D6188`

---

## 🛠️ How to Fix

- **Do Not Trust Headers** : Never use HTTP headers like `Referer` for security or access control, as they are trivial for users to modify.
- **Remove Sensitive Comments** : Ensure production code is sanitized of developer notes that reveal internal logic or requirements.
- **Secure Authorization** : Use server-side session management and secure tokens to verify user permissions.

---
