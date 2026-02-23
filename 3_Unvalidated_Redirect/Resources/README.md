# 🛡️ Unvalidated Redirect and Forward Attack

## 📝 Description

An **Unvalidated Redirect** (also known as an Open Redirect) occurs when a web application accepts a user-controlled input that specifies a link to an external site and uses that link in a Redirect. While not directly critical to the server's data, these are dangerous because they are used in **phishing attacks** to make a malicious link look like it belongs to a trusted domain.

## 🕵️‍♂️ Exploitation Process

### 1. Discovery

During the enumeration phase, I inspected the social media icons (Facebook, Twitter, Instagram) in the footer of the website. Looking at the HTML source code, I noticed the links were structured as internal redirects:

- `index.php?page=redirect&site=facebook`

### 2. Forging the URL

The application does not validate the value of the `site` parameter. By changing the parameter to an unexpected or malicious string, I was able to trigger the vulnerability.

- **The Injection** : I modified the URL to use a non-existent or "malicious" identifier to see how the redirect logic handled unlisted sites.
- **The Payload** : `index.php?page=redirect&site=malicious_link`

### 3. Result

By clicking the modified link, the application logic failed to find a valid destination but exposed the flag in the process.

**Flag:** `B9E775A0291FED784A2D9680FCFAD7EDD6B8CDF87648DA647AAF4BBA288BCAB3`

---

## 🛠️ How to Fix

To prevent Unvalidated Redirects, implement these security measures:

- **Avoid Redirects** : The best solution is simply not to use redirects based on user input.
- **Whitelist Destinations** : Use a server-side list of allowed URLs. If the requested `site` parameter is not on that list, the redirect should be denied.
- **Use ID Mapping** : Instead of passing the URL or a name in the parameter, use an ID (e.g., `site=1` for Facebook) and map it to the actual URL in a secure server-side database.
