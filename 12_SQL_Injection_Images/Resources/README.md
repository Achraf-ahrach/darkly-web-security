### 🛡️ SQL Injection (UNION-Based) - Images

📝 **Description**
This vulnerability was identified on the image search page (`?page=searchimg`). Similar to the previous member search exploit, this input field is not sanitized, allowing an attacker to use `UNION SELECT` statements to view data from the `list_images` table that is not normally visible, specifically the `comment` column.

🕵️‍♂️ **Exploitation Process**

1. **Vulnerability Testing**
   - Entered `1 or 1=1` into the search field.
   - The page returned all images in the database, confirming the SQL injection point.
2. **Column Verification**
   - Used a NULL-based union query to find the required column count.
   - **Query:** `1 or 1=1 UNION SELECT NULL, NULL--`.
   - Two columns were confirmed as the result matched the expected output format.
3. **Data Extraction**
   - Queried the `list_images` table using the `CONCAT()` function to retrieve all hidden comments.
   - **Query:** `1 OR 1=1 UNION SELECT 10, CONCAT(url, title, comment) FROM list_images`.
   - Discovered a hidden instruction: _"If you read this just use this md5 decode lowercase then sha256 to win this flag !"_ .
   - **MD5 Hash Found:** `1928e8083cf461a51303633093573c46`.
4. **Decryption & Transformation**
   - Decoded the MD5 hash to find the plaintext string: **`albatroz`** .
   - Converted the string to lowercase (no change needed) and applied a SHA256 hash.
5. **Result**
   - **Flag Found (SHA256):** `f2a29020ef3132e01dd61df97fd33ec8d7fcd1388cc9601e7db691d74d4d6188`.

🛠️ **How to Fix**

- **Prepared Statements:** Ensure that the database driver handles all user input as data, preventing it from being interpreted as a command.
- **Input Sanitization:** Validate that the input for the image search is a valid string or ID before passing it to the database.
- **Remove Sensitive Comments:** Comments containing sensitive instructions or password hints should never be stored in production database tables.
