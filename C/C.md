C1. How would you prove that our Xero API connection is working before checking 
invoices?

GET https://api.xero.com/connections

This is a good first call to make after completing the authorisation process to confirm we’re able to connect to the Xero API on behalf of the consenting user.

C2. If /connections works but GET /Invoices fails, what would you check?

Check error details

If the request returns 400, check if we exceed the high volume threshold limit.

If it returns 429, check if we exceed the rate limit.

If the code is 401, check the organization scopes, invoices api need accounting.invoices

C3. What endpoint would you call to check invoices?

/api.xro/2.0/Invoices

C4. How would you check one specific invoice?

GET https://api.xero.com/api.xro/2.0/Invoices/{InvoiceID}

C5. If the invoice API returns 429, how should the backend handle it?

Returning 429 indicates invoices api request too much and exceed a rate limit. And backend should check the X-Rate-Limit-Problem header and RetryAfter header in response.

| Header               | Description                                                                                                                              |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Retry-After          | This header is received with a 429 error and provides the wait time (in seconds) that you should wait before attempting another request. |
| X-Rate-Limit-Problem | This header is received with a 429 error and specifies which limit was exceeded (e.g., "day").                                           |

To prevent repeated 429 errors and maintain stable Invoice API integration, the backend should implement the following strategies:

- **Monitor Remaining Limits:** Before making a critical series of API calls, check the **X-DayLimit-Remaining**and **X-MinLimit-Remaining** headers. The daily limit is **5,000 calls per tenant**, and the minute limit is **60 calls per tenant**. If you're getting close to a limit, consider pausing or delaying subsequent requests.

- **Implement a back-off strategy with Retry-After**: The backend should pause all Invoice API requests to the affected tenant and resume calling only after the time specified in the `Retry-After` header has elapsed.

- **Batch Requests:** Combine multiple invoice operations into a single API call where supported, to reduce total request volume and stay within rate limits.

- **Queue and Schedule:** For applications dealing with high volumes of data, consider implementing a robust queuing system. This allows your application to process API requests asynchronously, spacing them out over time to avoid hitting limits.

- **Understand Per-Tenant Limits:** Daily and minute limits are applied per tenant (Xero organisation). If your application connects to multiple Xero organisations, each connection has its own set of limits. The only exception is the **X-AppMinLimit-Remaining**, which tracks the overall application-wide minute limit of **10,000 calls** across all connected tenants.

Finally, backend can implement logging and monitoring system, for longer term historical analysis or identifying seasonal patterns beyond 30 days.


