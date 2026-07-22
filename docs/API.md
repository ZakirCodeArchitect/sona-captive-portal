# Sona Tower Guest WiFi Portal — API Documentation

Base URL (development): `http://localhost:3001/api`  
Base URL (production): `https://guest.sonatower.com/api`

## Authentication

Guest endpoints do not require authentication. The captive portal network layer provides access control.

---

## Health Check

### `GET /api/health`

Returns API and database health status.

**Response 200**

```json
{
  "success": true,
  "status": "healthy",
  "timestamp": "2026-07-21T12:30:00.000Z",
  "services": {
    "database": "up"
  }
}
```

**Response 503** — Database unavailable

---

## Create Registration

### `POST /api/registrations`

Registers a guest for WiFi access.

**Request Headers**

| Header | Value |
|---|---|
| Content-Type | application/json |

**Request Body**

| Field | Type | Required | Description |
|---|---|---|---|
| cnic | string | Yes | Pakistani CNIC format `#####-#######-#` |
| fullName | string | Yes | Guest full name (2–100 chars) |
| phoneNumber | string | Yes | Pakistani mobile `03XX-XXXXXXX` |
| company | string | Yes | Company name (2–150 chars) |

**Optional query parameters** (from captive portal redirect):

| Param | Description |
|---|---|
| mac | Client MAC address |

IP address is captured from `X-Forwarded-For` or the socket connection.

**Example Request**

```json
{
  "cnic": "12345-1234567-1",
  "fullName": "Ahmed Khan",
  "phoneNumber": "0300-1234567",
  "company": "ABC Pvt Ltd"
}
```

**Response 201 — Success**

```json
{
  "success": true,
  "message": "Registration successful. You may now access the internet.",
  "data": {
    "visitorId": 42,
    "registrationTime": "2026-07-21T12:30:00.000Z"
  }
}
```

**Response 400 — Validation Error**

```json
{
  "success": false,
  "error": "VALIDATION_ERROR",
  "message": "Invalid input.",
  "details": [
    { "field": "cnic", "message": "Invalid CNIC format. Expected 12345-1234567-1." }
  ]
}
```

**Response 409 — Duplicate Registration**

```json
{
  "success": false,
  "error": "DUPLICATE_REGISTRATION",
  "message": "This CNIC has already been registered today."
}
```

**Response 429 — Rate Limited**

```json
{
  "success": false,
  "error": "RATE_LIMIT_EXCEEDED",
  "message": "Too many registration attempts. Please try again later."
}
```

---

## Business Rules

1. CNIC must match Pakistani format with dashes after normalization.
2. Phone must be a valid Pakistani mobile number starting with `03`.
3. Duplicate CNIC registrations are blocked within the same calendar day (Pakistan Standard Time).
4. All inputs are sanitized server-side before database insertion.
5. SQL queries use parameterized statements only.

---

## Error Codes

| Code | HTTP Status | Description |
|---|---|---|
| VALIDATION_ERROR | 400 | Invalid or missing input |
| DUPLICATE_REGISTRATION | 409 | CNIC already registered today |
| RATE_LIMIT_EXCEEDED | 429 | Too many requests from same IP |
| NOT_FOUND | 404 | Unknown route |
| INTERNAL_SERVER_ERROR | 500 | Unexpected server error |
