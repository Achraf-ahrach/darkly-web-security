# 🛡️ Darkly Web Security Audit

A comprehensive security assessment of the **BornToSec/Darkly** ISO. This project documents **14 unique vulnerabilities**, ranging from basic configuration errors to advanced injection attacks, mapped against OWASP security standards.

---

## 📊 Vulnerability Summary

| ID  | Vulnerability Type                                       | Category                  | Severity |
| :-- | :------------------------------------------------------- | :------------------------ | :------- |
| 01  | [Brute Force Enumeration](./1_Brute_Force_Enumeration)   | Broken Authentication     | High     |
| 02  | [Path Traversal](./2_Path_Traversal_Attack)              | Broken Access Control     | High     |
| 03  | [Unvalidated Redirect](./3_Unvalidated_Redirect)         | Injection                 | Medium   |
| 04  | [Web Parameter Tampering](./4_Web_Parameter_Tampering)   | Broken Access Control     | Medium   |
| 05  | [Header Manipulation](./5_Header_Manipulation)           | Security Misconfiguration | Medium   |
| 06  | [Unrestricted File Upload](./6_Unrestricted_File_Upload) | Insecure Design           | High     |
| 07  | [Session Prediction](./7_Session_Prediction)             | Cryptographic Failures    | High     |
| 08  | [XSS Code Encoding](./8_XXS_Code_Encoding)               | Injection                 | Medium   |
| 09  | [Stored XSS](./9_Stored_XSS)                             | Injection                 | High     |
| 10  | [Password Guessing](./10_Password_Guessing)              | Broken Authentication     | Medium   |
| 11  | [SQL Injection (Union)](./11_SQL_Injection_Union)        | Injection                 | Critical |
| 12  | [SQL Injection (Images)](./12_SQL_Injection_Images)      | Injection                 | Critical |
| 13  | [Parameter Tampering (Hidden)](./13_Parameter_Tampering) | Broken Access Control     | Medium   |
| 14  | [Web Crawling / Recon](./14_Web_Crawling)                | Information Disclosure    | Low      |

---

## 🛠️ Tools Used

- **Scanning & Recon**: `nmap`, `GoBuster`, Custom Node.js/Python Crawlers.
- **Exploitation**: `Burp Suite`, `sqlmap`, Browser DevTools.
- **Scripts**: JavaScript (Console-based `fetch` automation).

---

## 🛡️ Key Mitigation Strategies

To secure this application, the following architectural changes are recommended:

1. **Use Prepared Statements**: Essential to prevent the SQL Injection vulnerabilities found in Flags 11 and 12.
2. **Implement Content Security Policy (CSP)**: To mitigate the impact of Stored and Reflected XSS (Flags 8 and 9).
3. **Server-Side Validation**: Never trust client-side data, including hidden inputs or MIME-type headers (Flags 6 and 13).
4. **Disable Directory Indexing**: Prevent automated crawling and information disclosure (Flag 14).

---

## 🚀 How to use this Repo

Each folder contains a dedicated `README.md` explaining the **vulnerability**, the **step-by-step exploit**, and the **remediation code**.
