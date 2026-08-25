# מדריך שוק מחנה יהודה — 项目说明

独立、非营利的马哈内耶胡达市场游客信息站。前台内容仅使用希伯来语，RTL 排版。

## 技术栈

- Astro 7.2.4
- Tailwind CSS 4.3.3 + @tailwindcss/vite 4.3.3
- TypeScript 6.0.3（位于 @astrojs/check 0.9.10 支持范围内）
- pnpm 11.23.0
- Node.js 24.19.0 LTS
- Wrangler 4.125.0，部署到 Cloudflare Workers 静态资源 Worker
- 无数据库、无登录、无 CMS

## 域名只配置一次

打开 `astro.config.mjs`，把 `const site = undefined;` 改成实际正式域名。不要在其他文件硬编码本站域名。

未设置 `site` 时：
- 构建正常；
- canonical / og:url 省略；
- Open Graph 图片使用本地 `/og-card.png` 相对路径；
- JSON-LD 不输出本站 `url` / 绝对图片 URL；
- `@astrojs/sitemap` 不启用，因此不会生成带占位域名的 sitemap。

设置正式域名后重新构建，canonical / OG / JSON-LD / sitemap 会从 `Astro.site` 派生。

## 开发与验证

```bash
corepack enable
pnpm install
pnpm check
pnpm build
```

干净环境验收：

```bash
rm -rf node_modules
CI=1 corepack pnpm install --frozen-lockfile
pnpm check
pnpm build
```

## Cloudflare Workers

`wrangler.jsonc` 使用静态 assets Worker：`./dist`。部署：

```bash
pnpm deploy
```

## Google Analytics 与 Cookie 同意

GA4 测量 ID 为 `G-HXM22WWPKP`。只有用户在 `/cookies/` 明确启用分析 Cookie 后才会加载 Google Analytics。选择保存在浏览器 localStorage。

## 图片来源与授权

当前页面使用真实照片：
- Emilio García — Wikimedia Commons，CC BY-SA 2.0（市场主图）
- Laura Siegal — Unsplash License（Agripas Street / Mahane Yehuda）
- Ilanit Ohana — Unsplash License（坚果、石榴、糖果）
- Yael Hofnung — Unsplash License（Mahane Yehuda 夜间/餐饮场景）

由于本次执行环境无法从图片 CDN 拉取二进制文件，源码保留了经核对的原始图片 URL；正式上线前若希望做到完全本地化，可按以上授权下载原图至 `public/images/` 并把页面 `src` 改成本地路径。Logo、favicon 均已本地化。

## 内容原则

- 不推荐或排名具体商户；餐饮、住宿、停车、商超、燃油/充电仅介绍类别与使用建议。
- 历史叙述采用可核查的城市史脉络，不虚构传说。
- 运营时间、交通、价格与服务存在变动，页面明确要求出发前核实。


## 版本新鲜度说明

本项目锁文件当前与 Astro `7.2.4` 完整同步。交付研究期间 npm 刚发布 Astro `7.2.6`；由于当前沙箱无法访问 npm registry，不能在这里用真实 pnpm 解析重新生成 `7.2.6` 的锁文件。为避免手工伪造 lockfile，本包保留真实可追溯的 `7.2.4` 解析结果，并在 `VERIFICATION.md` 中明确标注这一项尚待联网 CI 更新。
