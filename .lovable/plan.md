## Connect Google Search Console

### Steps

1. **Initiate the connection** — Trigger the Google Search Console connector. You'll be prompted to sign in with Google and authorize access to your Search Console data.

2. **Verify the connection** — Once authorized, confirm the credentials work via the gateway's verify endpoint.

3. **Check site verification status** — List the sites already verified on your account. If `humanendurancepodcast.com` is already there, we're done with verification.

4. **If not yet verified** — Generate a Google site-verification META token, add it to `index.html` `<head>`, you republish the site, then call the verify endpoint and add the site to Search Console.

5. **Mark the SEO finding fixed** — Once the property is live in Search Console, update the corresponding finding.

### Notes

- Verification uses the META tag method (the only method that works for a Lovable-hosted site).
- After step 4 the site needs to be **republished** before Google can fetch the meta tag — I'll prompt you when that's needed.
