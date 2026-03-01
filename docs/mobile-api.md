# Mobile API Documentation

Base URL: `https://jbfybrxpdippdsettdgv.supabase.co/functions/v1/mobile-api`

## Authentication

Protected endpoints require `Authorization: Bearer <access_token>` header.

All endpoints accept `Content-Type: application/json`.

---

## Auth

### POST `/auth/signup`
Register a new user.
```json
// Request
{ "email": "user@example.com", "password": "123456", "contact_name": "John" }
// Response 201
{ "user": { ... }, "session": { "access_token": "...", "refresh_token": "..." } }
```

### POST `/auth/login`
Login with email & password.
```json
// Request
{ "email": "user@example.com", "password": "123456" }
// Response 200
{ "user": { ... }, "session": { "access_token": "...", "refresh_token": "..." } }
```

### POST `/auth/refresh`
Refresh an expired access token.
```json
// Request
{ "refresh_token": "..." }
// Response 200
{ "user": { ... }, "session": { "access_token": "...", "refresh_token": "..." } }
```

### POST `/auth/logout` 🔒
Sign out the current user.
```json
// Response 200
{ "success": true }
```

### POST `/auth/reset-password`
Send password reset email.
```json
// Request
{ "email": "user@example.com" }
// Response 200
{ "success": true }
```

---

## Badges

### GET `/badges?lang=0`
List all active badges with translations.

**Query params:**
- `lang` (0=繁中, 1=簡中, 2=EN, 3=日本語) — default: 0

```json
// Response 200
[
  {
    "id": 1,
    "code": "PALAU",
    "price": 8,
    "image_url": "https://...",
    "map_url": "https://...",
    "is_active": true,
    "translation": {
      "home_header": "帛琉",
      "title": "帛琉海洋保護",
      "content": "...",
      "impact": "...",
      "summary": "...",
      "details": "...",
      "show_more": "..."
    }
  }
]
```

### GET `/badges/:id?lang=0`
Get a single badge with translation and SDG goals.

```json
// Response 200
{
  "id": 1,
  "code": "PALAU",
  "price": 8,
  "image_url": "...",
  "translation": { ... },
  "sdg_ids": [14, 15]
}
```

---

## Orders 🔒

### GET `/orders`
List the current user's paid orders (with badge info).

```json
// Response 200
[
  {
    "id": 1,
    "badge_id": 1,
    "price": 8,
    "extra_help": 5,
    "payment_status": "paid",
    "payment_method": "card",
    "created_at": "2025-01-01T00:00:00Z",
    "badges": { "code": "PALAU", "image_url": "..." }
  }
]
```

### POST `/orders`
Create a new order (purchase a badge).

```json
// Request
{ "badge_id": 1, "extra_help": 5, "payment_method": "card" }
// Response 201
{ "id": 10, "badge_id": 1, "price": 8, "extra_help": 5, "payment_status": "paid", ... }
```

---

## Profile 🔒

### GET `/profile`
Get the current user's profile.

```json
// Response 200
{
  "id": "uuid",
  "contact_name": "John",
  "mobile": "12345678",
  "country_code": "852",
  "avatar_url": null,
  "lang": 0,
  "email": "user@example.com"
}
```

### PUT `/profile`
Update the current user's profile.

```json
// Request (all fields optional)
{ "contact_name": "Jane", "mobile": "87654321", "lang": 2 }
// Response 200
{ "id": "uuid", "contact_name": "Jane", ... }
```

---

## Rankings

### GET `/rankings`
Get the leaderboard sorted by badge count then total donated.

```json
// Response 200
[
  {
    "user_id": "uuid",
    "contact_name": "John",
    "avatar_url": "https://...",
    "badge_count": 5,
    "total_donated": 65
  }
]
```

---

## Content

### GET `/mobile-content?section=home`
Get mobile app CMS content. Optional `section` filter.

```json
// Response 200
[
  { "id": 1, "section": "home", "content_key": "hero_title", "value_tw": "...", "value_cn": "...", "value_en": "...", "value_ja": "..." }
]
```

### GET `/site-content`
Get all site content (all languages).

---

## Posts / Blog

### GET `/posts?lang=0&category=blog&limit=20&offset=0`
List published posts with translations.

### GET `/posts/:slug?lang=0`
Get a single post by slug with translation.

---

## Country Codes

### GET `/country-codes`
List active country dial codes.

```json
// Response 200
[{ "id": 1, "country_name": "Hong Kong", "dial_code": "+852" }]
```

---

## Error Format
```json
{ "error": "Error message" }
```

## Language Mapping
| Parameter | Language |
|-----------|----------|
| 0 | 繁體中文 |
| 1 | 簡體中文 |
| 2 | English |
| 3 | 日本語 |

🔒 = Requires `Authorization: Bearer <token>` header
