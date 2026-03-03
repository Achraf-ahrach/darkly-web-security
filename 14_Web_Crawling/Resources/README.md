### 🛡️ Information Disclosure (Recursive Crawling)

📝 **Description**
This vulnerability involves the exposure of sensitive information (the flag) hidden within a massive, deeply nested directory structure located at `/.hidden/`. The application relied on "security by obscurity," assuming that thousands of subdirectories and thousands of "noise" `README` files would prevent a human from finding the target. However, this structure is easily bypassed using automated crawling techniques.

🕵️‍♂️ **Exploitation Process**

1. **Reconnaissance**
   - Discovered the `/.hidden/` directory listing, which contained 26 subdirectories, each branching into further nested folders.
   - Manually inspected several `README` files and found they contained irrelevant French phrases like _"Demande à ton voisin de gauche"_ .
2. **Vulnerability Analysis**
   - The sheer volume of data made manual inspection impossible (estimated over 24 hours of effort).
   - The lack of restricted access or index disabling allowed any script to systematically visit every folder.
3. **Execution**
   - Developed and executed a recursive `fetch` script directly in the browser console to bypass local networking (EHOSTUNREACH) issues.
   - The script was programmed to:
     - Recursively visit every subdirectory.
     - Read the content of every `README` file.
     - Filter out known "noise" phrases to isolate unique data.
4. **Result**
   - The crawler successfully isolated a unique hash located deep within the tree.
   - **Flag Found:** `99dde1d35d1fdd283924d84e6d9f1d820`.

🛠️ **How to Fix**

- **Disable Directory Indexing** : Configure the web server (e.g., Apache's `Options -Indexes`) to prevent users from viewing the contents of folders.
- **Access Control** : Implement authentication or IP-based restrictions for sensitive or internal-only directories.
- **Remove Sensitive Files** : Do not store flags, credentials, or development hints in plain text files within the web root.
