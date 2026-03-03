### 🛡️ SQL Injection (UNION-Based)

📝 **Description**
This vulnerability was discovered on the "Find Members" search page. The input field for the member ID is not sanitized, allowing for a UNION-based SQL injection. This type of attack enables an attacker to combine the results of the original query with a second, forged query to extract sensitive data from other database tables, such as the `users` table.

🕵️‍♂️ **Exploitation Process**

1. **Vulnerability Confirmation**
   - Tested the search input with a classic boolean check: `1 OR 1=1`.
   - The page returned all members, confirming the database interprets user input as code.
2. **Column Discovery**
   - Determined the number of columns in the original query by incrementing NULLs.
   - **Query:** `1 OR 1=1 UNION SELECT NULL, NULL--`.
   - The database returned two columns: `First name` and `Surname`.
3. **Database Mapping**
   - Enumerated table names using the `information_schema.tables` database.
   - **Query:** `1 OR 1=1 UNION SELECT table_name, NULL FROM information_schema.tables`.
   - Identified a high-value table named **`users`** .
4. **Data Extraction & Decryption**
   - Extracted the password hint from the `commentaire` column within the `users` table.
   - **Result:** "Decrypt this password -> then lower all the char, SH256 on it" followed by an MD5 hash: `5ff0d11084f32a1d45d62d083b06cc28`.
   - Decrypted the MD5 hash to get the string: **`fortytwo`** .
   - Converted "fortytwo" to lowercase and generated a SHA256 hash.
5. **Result**
   - **Flag Found (SHA256):** `10a16d834f9b1e4068b25c4c46fe284e99e44dceaf88898fc83925ba631ff5`.

🛠️ **How to Fix**

- **Use Prepared Statements:** Implement parameterized queries so the database engine never treats user input as part of the SQL command.
- **Input Validation:** Restrict the member ID field to only accept integers or specific patterns via regex.
- **Disable Error Messages:** Ensure the web application does not display raw database errors to the user, as these help attackers map the database.
