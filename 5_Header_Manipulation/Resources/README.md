# 🛡️ Header Manipulation & Sensitive Information Disclosure

## 📝 Description

This vulnerability stems from a combination of **Information Disclosure** in source code comments and **Broken Access Control** . The server attempts to restrict access to a specific page by verifying the `Referer` and `User-Agent` headers. However, because these headers are client-side and fully controllable by the user, they can be forged to bypass security checks.

## 🕵️‍♂️ Exploitation Process

### 1. Information Gathering

While auditing the website with the browser console open, I discovered hidden developer comments in the source code of the copyright page. These comments provided the exact requirements for a "next step":

- **Origin Requirement** : "You must be coming from: `https://www.nsa.gov/`".
- **Browser Requirement** : "Let's use this browser: `ft_bornToSec`".

### 2. Forgery via Header-Modifying Extension

On **macOS** , instead of using complex interception tools, I used a browser extension (such as **ModHeader** ) to simplify the forgery process. This allowed me to modify the headers in real-time within my **Brave/Chrome** browser:

- **Configuration** :
- **Header Name** : `Referer` | **Value** : `https://www.nsa.gov/`
- **Header Name** : `User-Agent` | **Value** : `ft_bornToSec`
- **Target** : I navigated to the target hashed page (`/?page=e43ad1fd...`).

### 3. Result

By refreshing the page with the extension active, the browser sent the forged headers. The server validated these headers as legitimate and returned the hidden flag.

**Flag:** `F2a29020EF3132E01DD61DF97FD33EC8D7FCD1388CC9601E7DB691D17D4D6188`

---

## 🛠️ How to Fix

To secure the application against header-based bypasses, the following mitigations should be implemented:

- **Sanitize Source Code** : Remove all sensitive developer comments, internal requirements, or "to-do" lists from production code.
- **Avoid Header-Based Security** : Never use `Referer` or `User-Agent` for security or access control decisions, as they are trivial to spoof.
- **Implement Strong Authentication** : Use cryptographically secure session tokens or multi-factor authentication (MFA).
- **Whitelist User Agents** : If specific browsers must be tracked, use a robust server-side whitelist.
