### 🛡️ Password Guessing (Brute Force)

📝 **Description**
This vulnerability involves a classic Brute Force attack on a login form. The application is highly insecure because it transmits sensitive credentials (username and password) via the URL using `GET` requests, allowing them to be captured in network traffic or browser history. Furthermore, the lack of an account lockout policy or rate-limiting allows for automated login attempts.

🕵️‍♂️ **Exploitation Process**

1. **Reconnaissance**
   - Identified the login page at `/?page=signin`.
   - Noticed that credentials were submitted as URL parameters: `username=admin&password=password`.
2. **Attack Setup (Burp Suite Intruder)**
   - I intercepted the sign-in request and sent it to **Intruder** .
   - **Payload 1 (Username):** Set to `admin`.
   - **Payload 2 (Password):** Utilized the **`rockyou.txt`** wordlist to perform an automated dictionary attack.
3. **Execution & Identification**
   - After running the attack, I monitored the response lengths to identify a successful login.
   - **The Indicator:** Failed attempts returned a length of `2171`, while the correct credential returned a length of **`2267`** .
   - **Correct Credentials Found:** `admin` / `shadow`.
4. **Result**
   - Logging in with the discovered credentials successfully triggered the flag.
   - **Flag Found:** `B3A6E43DDF8B4BBB4125E5E7D23040433827759D4DE1C04EA63907479A80A6B2`.

🛠️ **How to Fix**

- **Use POST Requests:** Credentials should never be sent via `GET` parameters. Use `POST` with HTTPS to ensure data is encrypted.
- **Account Lockout:** Implement a policy to lock accounts after a set number of failed login attempts (e.g., 5 attempts).
- **Rate Limiting & CAPTCHA:** Use throttling and CAPTCHAs to prevent automated tools from guessing passwords.
- **Strong Password Policy:** Enforce a minimum password complexity to ensure credentials cannot be found in common wordlists.
