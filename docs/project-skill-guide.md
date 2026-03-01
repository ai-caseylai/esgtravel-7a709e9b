# STAR SDG 專案架構與技術指南

## 1. 專案架構與路由設計

### 三層架構
應用分為三個獨立區域，各自使用不同佈局：

| 路徑前綴 | 用途 | 佈局元件 | 特點 |
|---------|------|---------|------|
| `/site` | 行銷介紹網站 | `SiteLayout` | PC 優先、SEO 友好、公開 |
| `/mobile` | WebApp 手機版 | `Layout` | Mobile-first、需登入、PWA |
| `/admin` | 管理後台 | `AdminDashboard` | 側邊欄導覽、角色保護 |

### 路由規則
- 根路徑 `/` → 重定向至 `/site`
- `/site` 下含 `login` 頁（PC 登入）、`how-it-works`、`events`、`contact`
- `/mobile` 下含 `login`、`signup`、`badges`、`badge/:id`、`payment/:badgeId`、`passport`、`settings` 等
- `/admin` 採用嵌套路由 (`Outlet`)，子頁含 `users`、`orders`、`badges`、`posts`、`media`、`companies`、`agents`、`roles`、`content`、`mobile-content`

### 登入跳轉機制
- 未登入訪問受保護頁時，跳轉至對應登入頁並帶 `?redirect=` 參數
- Admin 頁 → `/site/login?redirect=/admin`
- Mobile 頁 → `/mobile/login?redirect=/mobile/passport`
- SiteLogin 頁監聽 `onAuthStateChange`，OTP 點連結回來後自動跳轉

---

## 2. 資料庫設計與 RLS 策略

### 角色系統
- 使用 `app_role` enum: `user | agent | company_admin | admin | editor`
- 角色存於獨立 `user_roles` 表（非 profiles）
- `has_role(_user_id, _role)` 為 SECURITY DEFINER 函式，RLS 中使用避免遞迴

### 核心表結構

| 表名 | 用途 | RLS 模式 |
|------|------|---------|
| `profiles` | 用戶資料 | 自己讀寫 + admin 可讀 |
| `user_roles` | 角色分配 | 自己讀 + admin CRUD |
| `badges` / `badge_translations` | 徽章及翻譯 | 公開讀 + admin 管理 |
| `orders` | 訂單 | 自己讀 + 自己建 + admin 更新 |
| `posts` / `post_translations` | 文章/活動 | 公開讀已發佈 + admin/editor 管理 |
| `site_content` | 網站 UI 文字 | 公開讀 + admin 管理 |
| `mobile_content` | App UI 文字 | 公開讀 + admin 管理 |
| `companies` / `agents` | 公司與代理 | 認證讀 + admin 管理 |
| `rankings` | 排行榜 | 公開讀 + 用戶自建自改 |
| `sdg_badges` | SDG 關聯 | 公開讀 + admin 管理 |
| `country_codes` | 電話區號 | 公開讀 |

### RLS 策略模式
```sql
-- 公開讀取
CREATE POLICY "Anyone can read" ON table FOR SELECT USING (true);

-- 僅自己讀
CREATE POLICY "Own data" ON table FOR SELECT USING (auth.uid() = user_id);

-- Admin 完整管理
CREATE POLICY "Admin manage" ON table FOR ALL USING (has_role(auth.uid(), 'admin'));
```

### 自動觸發器
- `handle_new_user`: 新用戶註冊時自動建立 profile + 分配 `user` 角色
- `handle_first_admin`: 首位用戶自動獲得 `admin` 角色
- `update_updated_at_column`: 更新時自動設定 `updated_at`

---

## 3. 多語言與 CMS 系統

### 語言編號映射
| ID | 語言 |
|----|------|
| 0 | 繁體中文 |
| 1 | 简体中文 |
| 2 | English |
| 3 | 日本語 |

### 前端多語言架構
```tsx
// 靜態翻譯 - 直接使用 t()
const { t } = useI18n();
t({ 0: '繁中', 1: '简中', 2: 'EN', 3: '日本語' })

// 動態 CMS 內容 - 網站
const { tc } = useSiteContent();  // 從 site_content 表讀取
tc('fieldname', 'fallback')

// 動態 CMS 內容 - App
const { mc } = useMobileContent();  // 從 mobile_content 表讀取
mc('section', 'content_key', 'fallback')
```

### CMS 三大內容來源

1. **site_content** — 介紹網站 UI 文字（單行欄位，4 語言各一列 `lang=0~3`）
2. **mobile_content** — App 介面文字（`section` + `content_key` 組合，`value_tw/cn/en/ja` 四欄）
3. **posts + post_translations** — 部落格/活動文章（支援分類 `blog/event`、封面圖、日期、發佈狀態）

### 後台管理
- `/admin/content` — 編輯 site_content（分欄位多語言 inline 表格）
- `/admin/mobile-content` — 編輯 mobile_content（按 section 分群）
- `/admin/posts` — 文章管理（左列表右編輯、多語言 Tab 切換）

---

## 4. 認證與權限流程

### 認證方式
1. **Email + 密碼**：標準 `signInWithPassword`
2. **電郵快速登入 (OTP)**：`signInWithOtp` 發送 Magic Link

### 認證上下文
```tsx
// AuthProvider 包裹整個 App
<AuthProvider>
  {children}
</AuthProvider>

// 任何元件中使用
const { user, session, loading, signOut } = useAuth();
```

### 權限保護模式
- **Admin 頁面**：`AdminDashboard` 檢查 `!user` → 跳轉登入
- **Mobile 受保護頁**：各頁面自行檢查 `!user` → 跳轉登入（無提示訊息）
- **Admin 操作**：RLS 層面用 `has_role(auth.uid(), 'admin')` 保護

### Edge Functions
- `admin-create-user`：管理員建立用戶（繞過自註冊限制）
  - 驗證呼叫者 admin 身份
  - 使用 `SERVICE_ROLE_KEY` 的 `auth.admin.createUser`
  - 自動更新 profile 額外欄位

### PWA 配置
- `vite-plugin-pwa` 搭配 `registerType: "autoUpdate"`
- Service Worker 排除 OAuth 回調路徑 (`/~oauth`)
- 啟動頁面為 `/mobile`

---

## 5. 技術棧摘要

| 類別 | 技術 |
|------|------|
| 前端框架 | React 18 + TypeScript + Vite |
| 樣式 | Tailwind CSS + shadcn/ui + HSL 設計令牌 |
| 狀態管理 | TanStack React Query |
| 路由 | React Router v6 |
| 後端 | Supabase (外部專案) |
| 認證 | Supabase Auth |
| 資料庫 | PostgreSQL (Supabase) |
| 邊緣函式 | Deno (Supabase Edge Functions) |
| PWA | vite-plugin-pwa |
| 動畫 | Framer Motion |
| 主色調 | #1B78B5 (HSL 204 74% 41%) |

---

## 6. 設計原則

- **Mobile-first**：手機版 WebApp 為核心體驗
- **視覺一致性**：藍色主色調、全屏背景圖 + 白色卡片疊加
- **語義化令牌**：所有顏色使用 CSS 變數（`--primary`、`--foreground` 等），不在元件中寫死色值
- **安全性**：角色獨立表、SECURITY DEFINER 函式、RLS 全覆蓋
- **100% 可編輯**：所有前端文字均可從後台動態更新

---

## 7. 介紹網站 (Site) 建構模式

### 架構總覽
介紹網站位於 `/site` 路由下，使用 `SiteLayout` 統一佈局（含導覽列、頁尾、語言切換）。所有頁面內容均來自 CMS，支援四國語言即時切換。

### 頁面清單
| 路徑 | 元件 | 說明 |
|------|------|------|
| `/site` | `SiteHome` | 首頁：Hero、計劃介紹、4 特色卡片、17 SDG 方格、CTA |
| `/site/how-it-works` | `SiteHowItWorks` | 如何獲得徽章：4 步驟圖文交錯佈局 |
| `/site/events` | `SiteEvents` | 活動與部落格列表（合併頁） |
| `/site/contact` | `SiteContact` | 聯絡資訊 |
| `/site/login` | `SiteLogin` | PC 端登入頁 |
| `/site/p/:slug` | `SitePage` | 動態自訂頁面（Page Builder 產生） |

### 內容讀取模式
```tsx
// 1. 取得 CMS 內容
const { tc } = useSiteContent();

// 2. 文字欄位直接使用
<h1>{tc('site_hero_title', 'Fallback Title')}</h1>

// 3. 富文本欄位使用 HtmlContent 元件
<HtmlContent html={tc('site_hero_desc', '')} className="text-muted-foreground" />

// 4. 圖片欄位帶 fallback
const heroImg = tc('site_hero_img', '') || localFallbackImage;
<img src={heroImg} alt="" />
```

### HtmlContent 元件
- 路徑：`src/components/HtmlContent.tsx`
- 功能：偵測內容是否含 HTML 標籤，有則用 `dangerouslySetInnerHTML` 渲染，無則純文字顯示
- 套用 `.rich-content` CSS class 確保標題、清單、連結等樣式一致
- 支援 `as` prop 可指定包裹標籤（預設 `div`）

### 圖片 Fallback 機制
每個圖片欄位在 `site_content` 表中有對應 `_img` 後綴欄位（如 `site_hero_img`、`site_feature1_img`）。前端邏輯：
```tsx
const image = tc('site_feature1_img', '') || localFallbackAsset;
```
本地 fallback 圖存放於 `src/assets/` 目錄。

### SiteLayout 結構
```
SiteLayout
├── <header>  ← 導覽列（品牌、導覽連結、語言切換）
├── <Outlet /> ← 子頁面內容
└── <footer>  ← 頁尾（品牌說明、快速連結、聯絡資訊、版權）
```
所有導覽文字、頁尾文字皆來自 `tc()` 動態讀取。

---

## 8. 語言映射詳解

### 前端語言 ID vs 資料庫語言 ID

**注意：`site_content` 與 `badge_translations/post_translations` 使用不同語言編號！**

| 前端 lang | 語言 | site_content 的 lang | badge/post translations 的 lang |
|-----------|------|--------------------|---------------------------------|
| 0 | 繁體中文 | 0 | 0 |
| 1 | 簡體中文 | 3 | 0 (fallback 繁中) |
| 2 | English | 1 | 1 |
| 3 | 日本語 | 2 | 2 |

### use-site-content.ts 映射
```typescript
const SITE_LANG_TO_DB_LANG: Record<number, number> = {
  0: 0, // 繁中 → DB lang 0
  1: 3, // 简中 → DB lang 3
  2: 1, // EN → DB lang 1
  3: 2, // JP → DB lang 2
};
```

### mobile_content 語言
mobile_content 使用四欄式設計，不需映射：
| 前端 lang | 對應欄位 |
|-----------|---------|
| 0 | `value_tw` |
| 1 | `value_cn` |
| 2 | `value_en` |
| 3 | `value_ja` |

---

## 9. Page Builder（頁面產生器）

### 資料庫結構
- `pages` 表：管理頁面元資料（slug、title、is_published）
- `page_blocks` 表：每頁由多個區塊組成，`block_type` + `content`(JSONB) + `sort_order`

### 區塊類型
| block_type | 說明 | content 欄位 |
|-----------|------|-------------|
| `heading` | 標題 | `{ text, level: 'h1'|'h2'|'h3' }` |
| `text` | 段落文字 | `{ text }` |
| `image` | 圖片 | `{ url, alt }` |
| `hero` | 橫幅 | `{ title, subtitle, bg }` |
| `blog_feed` | 文章列表 | `{ category: 'all'|'blog'|'event', limit }` |

### 前端渲染
- 路由 `/site/p/:slug` → `SitePage` 元件
- 查詢 `pages` 取得 `id`，再查 `page_blocks` 依 `sort_order` 排列
- 使用 `PagePreview` 元件依 `block_type` 分別渲染

### 後台管理
- `/admin/pages` → `AdminPages` 元件
- 左側：固定頁面列表 + 自訂頁面列表
- 右側：固定頁面用 `FixedPageEditor`（直接編輯 site_content 欄位）；自訂頁面用區塊拖曳編輯器
- 支援即時預覽（Iframe 嵌入前端頁面）

---

## 10. Mobile API（React Native 用 RESTful API）

### 端點
```
Base URL: https://jbfybrxpdippdsettdgv.supabase.co/functions/v1/mobile-api
```

### API 分組
| 分類 | 端點 | 方法 | 需認證 |
|------|------|------|--------|
| Auth | `/auth/signup` | POST | ✗ |
| Auth | `/auth/login` | POST | ✗ |
| Auth | `/auth/refresh` | POST | ✗ |
| Auth | `/auth/logout` | POST | ✔ |
| Auth | `/auth/reset-password` | POST | ✗ |
| Badges | `/badges?lang=0` | GET | ✗ |
| Badges | `/badges/:id?lang=0` | GET | ✗ |
| Orders | `/orders` | GET/POST | ✔ |
| Profile | `/profile` | GET/PUT | ✔ |
| Rankings | `/rankings` | GET | ✗ |
| Content | `/mobile-content?section=` | GET | ✗ |
| Content | `/site-content` | GET | ✗ |
| Posts | `/posts?lang=0&category=` | GET | ✗ |
| Posts | `/posts/:slug?lang=0` | GET | ✗ |
| Misc | `/country-codes` | GET | ✗ |

### 認證方式
`Authorization: Bearer <access_token>` header。Token 來自 `/auth/login` 或 `/auth/signup` 回傳的 `session.access_token`。

### 詳細文件
完整 API 文件見 `docs/mobile-api.md`。

---

## 11. 後台管理系統

### 內容管理頁面
| 路徑 | 元件 | 說明 |
|------|------|------|
| `/admin/content` | `AdminSiteContent` | 網站 UI 文字（按欄位分群、4 語言 Tab） |
| `/admin/mobile-content` | `AdminMobileContent` | App UI 文字（按 section 分群） |
| `/admin/posts` | `AdminPosts` | 文章/活動管理（多語言 Tab 切換、WYSIWYG 編輯器） |
| `/admin/pages` | `AdminPages` | 頁面管理（固定頁面 + 自訂頁面、區塊編輯器） |
| `/admin/media` | `AdminMedia` | 媒體庫（Supabase Storage） |

### AdminSiteContent 結構
- 左側：欄位分群導覽（首頁、徽章、護照、排行榜、登入、表單、錯誤訊息、付款、聯絡）
- 右側：4 語言 Tab，每個 Tab 下顯示當前分群的欄位編輯表單
- 搜尋：支援按欄位名稱或 key 過濾

### WYSIWYG 編輯器
- 技術：Tiptap（`@tiptap/react`、`@tiptap/starter-kit`）
- 支援：粗體、斜體、底線、標題(H1-H3)、清單、連結、圖片、文字對齊
- 元件：`src/components/RichTextEditor.tsx`
- 樣式：`src/components/RichTextEditor.css`（`.rich-content` class 同時用於前台顯示）

---

## 12. 媒體管理

### Storage Bucket
- Bucket 名稱：`media`（公開）
- 支援上傳：圖片、文件等
- MediaPickerButton 元件可在任何編輯器中嵌入，選擇媒體庫圖片

### 使用方式
```tsx
import { MediaPickerButton } from '@/components/MediaPickerButton';

<MediaPickerButton onSelect={(url) => handleImageSelected(url)} />
```

---

## 13. 新增功能開發指南

### 新增介紹網站頁面
1. 在 `site_content` 表新增對應欄位（4 個語言記錄各一列）
2. 建立頁面元件於 `src/pages/site/`，使用 `tc()` 讀取內容
3. 在 `src/App.tsx` 的 `<Route path="/site">` 下新增路由
4. 在 `SiteLayout` 的 `navItems` 加入導覽項目
5. 在 `AdminPages` 的 `FIXED_PAGES` 加入欄位定義
6. 在 `AdminSiteContent` 的 `FIELD_GROUPS` 加入管理介面

### 新增 Mobile API 端點
1. 在 `supabase/functions/mobile-api/index.ts` 新增路由分支
2. 處理認證檢查（需認證則驗證 Bearer token）
3. 更新 `docs/mobile-api.md` 文件
4. 部署 edge function

### 新增 CMS 欄位
1. 資料庫 migration 新增欄位
2. `FIELD_GROUPS`（AdminSiteContent）或 `FIXED_PAGES`（AdminPages）加入欄位定義
3. 前端頁面用 `tc('new_field_key', 'fallback')` 讀取
