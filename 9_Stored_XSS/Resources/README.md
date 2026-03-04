### 🛡️ Stored Cross-Site Scripting (XSS)

📝 **Description**
A **Stored XSS** (also known as Persistent XSS) vulnerability was identified on the feedback/guestbook page. This is the most dangerous type of XSS because the malicious script is saved on the server's database. Every time a user visits the feedback section, the script executes automatically in their browser.

🕵️‍♂️ **Exploitation Process**

1. **Reconnaissance**
   - While inspecting the feedback page, console errors revealed that standard validation functions like `checkForm` were not defined.
   - This suggested that the input fields might not be properly sanitized before being sent to the server.
2. **Vulnerability Confirmation**
   - Initially, a complex malformed tag payload was used to bypass filters: `<IMG """><SCRIPT>alert("XSS")</SCRIPT>">`.
   - Further testing revealed a much simpler trigger: the application specifically monitors for the string `alert` within the feedback comments.
3. **Execution**
   - Entered the word `alert` into the **Comment** or **Message** field.
   - Submitted the form to store the message in the database.
4. **Result**
   - Upon page refresh or re-visiting the feedback list, the application processed the stored string and triggered the flag.
   - **Flag Found:** `0FBB54BBF7D099713CA4BE297E1BC7DA0173D8B3C21C1811B916A3A86652724E`.

🛠️ **How to Fix**

- **Input Sanitization** : Implement a strict allow-list or use libraries to strip any potentially executable code or sensitive keywords from user input.
- **Output Encoding** : Convert all user-submitted text into HTML entities (e.g., converting `<` to `&lt;`) before rendering it on the page to prevent the browser from interpreting it as code.
- **Content Security Policy (CSP)** : Set up a CSP header to prevent the execution of inline scripts and untrusted sources.
