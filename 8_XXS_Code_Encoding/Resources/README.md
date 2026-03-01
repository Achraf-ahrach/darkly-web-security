### 🛡️ XSS via Data URI Encoding

📝 **Description**
This vulnerability is a Reflected Cross-Site Scripting (XSS) attack. The application fails to sanitize the `src` parameter in the URL when rendering content within an HTML `<object>` tag. By encoding a malicious script into a Base64 data URI, an attacker can bypass simple server-side string filters and execute arbitrary JavaScript in the user's browser.

🕵️‍♂️ **Exploitation Process**

1. **Reconnaissance**
   - Identified a suspicious URL pattern: `/?page=media&src=nsa`.
   - Inspected the source code and found the input is placed directly into an `<object data="...">` tag.
2. **Filter Bypass Attempt**
   - A standard payload like `<script>alert("XSS")</script>` was blocked or failed to execute.
   - To bypass this, I used a **Data URI** with Base64 encoding.
3. **Crafting the Payload**
   - **Original Script:** `<script>alert("XSS")</script>`
   - **Base64 Encoded Version:** `PHNjcmlwdD5hbGVydCgiWFNTIik8L3NjcmlwdD4=`
   - **Final Crafted URL:** `/?page=media&src=data:text/html;base64,PHNjcmlwdD5hbGVydCgiWFNTIik8L3NjcmlwdD4=`
4. **Execution**
   - I used Burp Suite to intercept the request and replace the `src` value with the crafted Base64 string.
   - Upon forwarding, the browser decoded the script and executed it, triggering the vulnerability.
5. **Result**
   - The server validated the exploit and returned the flag.
   - **Flag Found:** `928D819FC19405AE09921A2B71227BD9ABA106F9D2D37AC412E9E5A750F1506D`

🛠️ **How to Fix**

- **Input Validation:** Implement strict regex validation on the backend for the `src` parameter.
- **Allowlisting:** Only allow predefined, safe values for the `src` parameter rather than accepting arbitrary strings or URIs.
- **Output Encoding:** Sanitize all user-supplied input before rendering it into the DOM, especially within sensitive tags like `<object>`, `<iframe>`, or `<embed>`.
- **Content Security Policy (CSP):** Implement a strong CSP header to disallow the execution of inline scripts and prevent the loading of data URIs in object tags.
