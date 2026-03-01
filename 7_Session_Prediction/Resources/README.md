### 🛡️ Session Prediction (Cookie Manipulation)

📝 **Description**
This vulnerability occurs when an application uses predictable session identifiers or cookies. In this case, the application used an MD5 hash of a boolean value to determine administrative privileges. By identifying the hashing algorithm and the original value, an attacker can forge a "true" administrative cookie.

🕵️‍♂️ **Exploitation Process**

1. **Cookie Analysis**
   - I inspected the cookies for the site and found a session cookie: `I_am_admin=68934a3e9455fa72420237eb05902327`.
   - Using an online MD5 cracker, I discovered that this string is the MD5 hash for the word **"false"** .
2. **Hypothesis & Forgery**
   - I hypothesized that changing the value to **"true"** would grant me admin access.
   - I generated the MD5 hash for the word **"true"** : `b326b5062b2f0e69046810717534cb09`.
3. **Manipulation**
   - I intercepted the request (using Burp Suite or Browser DevTools) and replaced the existing cookie with the forged one:
     `I_am_admin=b326b5062b2f0e69046810717534cb09`
   - After forwarding the request, the server recognized me as an admin.
4. **Result**
   - The server returned a success alert with the flag.
   - **Flag Found:** `df2eb4ba34ed059a1e3e89ff4dfc13445f104a1a52295214def1c4fb1693a5c3`

🛠️ **How to Fix**

- **Avoid Predictable Values:** Do not store plain boolean values or descriptions (like "admin") in cookies, even if they are hashed.
- **Secure Token Generation:** Use cryptographically secure pseudo-random number generators (CSPRNG) to create session IDs.
- **Use Modern Standards:** Implement JWT (JSON Web Tokens) or secure server-side session management.
- **Strong Hashing:** Never use MD5 for security-sensitive data as it is vulnerable to collision attacks and fast cracking; use SHA-256 or better.

---

### 💡 Pro-Tip for your Documentation

Since you used the Console earlier for the file upload, you can actually set this cookie directly in Brave's console for testing next time by typing:
`document.cookie = "I_am_admin=b326b5062b2f0e69046810717534cb09; path=/"`
