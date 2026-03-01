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
