## Reflection Questions

### 1. Why is it dangerous to store passwords in plain text, and how does hashing prevent harm if the database is compromised?

Storing passwords in plain text is dangerous because attackers can easily access users' credentials if the database is compromised. Password hashing with bcrypt converts passwords into hashes that are difficult to reverse. This helps protect users' actual passwords even if the database is leaked.

### 2. The login endpoint returns the same error for "user not found" and "wrong password." Why is this better than giving specific messages?

Using the same error message for both cases prevents attackers from discovering which email addresses are registered. Specific error messages could reveal valid accounts to malicious users. Generic messages improve user privacy and strengthen application security.

### 3. In your own words, what does the middleware do on every protected request, and why is it better than putting token-checking code inside every route handler?

Authentication middleware checks the JWT before allowing access to protected routes. If the token is valid, the request continues; otherwise, the API rejects it. This approach avoids repeated code, keeps routes organized, and ensures consistent authentication across the application.

### 4. What is one thing that could still go wrong in this system, and how would you address it in a real application?

One possible risk is JWT theft, which could allow attackers to access a user's account. To reduce this risk, I would use HTTPS, secure token storage, and short-lived access tokens. I would also implement refresh token rotation to improve authentication security.