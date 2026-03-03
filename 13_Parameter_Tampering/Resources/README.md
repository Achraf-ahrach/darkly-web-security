### 🛡️ Web Parameter Tampering (Hidden Input)

📝 **Description**
This vulnerability was discovered in the "Forgot Password" mechanism. The application used a hidden HTML input field to store the recipient's email address for the password reset function. Since hidden fields are part of the client-side DOM, they are not secure and can be easily modified by a user before the form is submitted to the server.

🕵️‍♂️ **Exploitation Process**

1. **Reconnaissance**
   - Navigated to the password recovery page and inspected the page source.
   - Found the following hidden input field: `<input type="hidden" name="mail" value="webmaster@borntosec.com">`.
2. **Vulnerability Analysis**
   - The developer used `type="hidden"` as a security measure, assuming users could not see or change it.
   - However, hidden inputs are visible in any browser's developer tools and can be manipulated to redirect sensitive actions (like password resets) to an attacker's email.
3. **Execution**
   - Used the Brave **Inspect Element** tool to modify the `value` attribute.
   - Changed the value from `webmaster@borntosec.com` to a different email address for example `achrafahrach44@gmail.com`.
   - Clicked the **Submit** button to send the tampered data.
4. **Result**
   - The server accepted the modified email address and displayed the flag.
   - **Flag Found:** `1D4855F7337C0C14B6F44946872C4EB33853F40B2D54393FBE94F49F1E19BBB0`.

🛠️ **How to Fix**

- **Avoid Hidden Inputs for Logic:** Never use hidden fields for sensitive data like email addresses, prices, or user IDs.
- **Server-Side Verification:** The email address should be pulled from the backend database based on the authenticated user session, not sent from the client.
- **Input Validation:** Implement strict validation on the backend to ensure that any submitted parameters match expected, authorized values.
