# FairweatherProductions.com Consolidation Plan (Final)

## 🎯 Objective
Unify all three existing websites—**Fairweather Studios**, **Sketchy Ponderings**, and **The Second Gaze**—under the domain:
**https://www.fairweatherproductions.com** using GitHub Pages for free, static web hosting.

---

## 📁 Project Folder Structure (GitHub Repo: `fairweather-productions`)
```
fairweather-productions/
├── CNAME                           # Contains: fairweatherproductions.com
├── index.html                      # Fairweather Studios main site
├── about.html
├── gallery.html
├── contact.html
├── sites.html                      # NEW: Site directory/switcher page
├── css/
│   ├── global.css                  # Shared styles (typography, navigation, etc.)
│   └── fairweather.css             # Main site specific styles
├── js/
│   └── site-navigation.js          # Cross-site navigation component
├── images/                         # Organized by site + shared assets
│   ├── shared/                     # Common UI elements, backgrounds, sigils
│   ├── fairweather/                # Main site specific images
│   ├── sketchy/                    # Sketchy Ponderings images (if large)
│   └── second-gaze/                # Second Gaze images (if large)
├── sketchy/                        # Sketchy Ponderings subdirectory
│   ├── index.html
│   ├── gallery.html
│   ├── games.html
│   ├── music.html
│   ├── stories.html
│   ├── about.html
│   ├── contact.html
│   ├── sigil-oracle.html
│   ├── american-mystery-religion.html
│   ├── story1.html
│   ├── story2.html
│   ├── story3.html
│   ├── css/
│   │   └── sketchy.css             # Site-specific styles
│   ├── images/                     # Site-specific images (if keeping separate)
│   ├── music/                      # ⚠️ Check file sizes vs GitHub limits
│   └── sigils/
├── second-gaze/                    # The Second Gaze subdirectory
│   ├── index.html
│   ├── gallery.html
│   ├── about.html
│   ├── words.html
│   ├── contact.html
│   ├── css/
│   │   └── second-gaze.css         # Site-specific styles
│   └── images/                     # Site-specific images (if keeping separate)
├── _redirects                      # Future redirect rules
├── BACKUP/                         # Working file backups during migration
│   ├── old-paths.txt              # Document original file structure
│   └── working-versions/          # Backup copies before path changes
└── README.md                       # Documentation and dependencies
```

---

## 🚀 Deployment Plan (Phased Approach with Timeline)

### Phase 1: Infrastructure & Main Site (2-3 days)
- [ ] Create new repo: `fairweather-productions`
- [ ] Set up basic folder structure with BACKUP directory
- [ ] **Migrate Fairweather Studios to root level first**
- [ ] Test basic GitHub Pages deployment
- [ ] Add `CNAME` file with: `fairweatherproductions.com`
- [ ] Enable GitHub Pages from `main` branch, root folder

### Phase 2: Domain & DNS Setup (1 day)
- [ ] Create Cloudflare account
- [ ] Add domain `fairweatherproductions.com`
- [ ] Point domain registrar to Cloudflare nameservers
- [ ] In Cloudflare DNS:
  - Add `CNAME @` → `yourusername.github.io`
  - Add `CNAME www` → `@` (ensures www.fairweatherproductions.com redirects)
  - Proxy traffic for both records (orange cloud icon)
- [ ] In Cloudflare SSL/TLS tab, set encryption mode to **Full (Strict)** for best security
- [ ] Test main site loading at new domain

### Phase 3: Email & Forms (1 day)
- [ ] Set up Cloudflare Email Routing
- [ ] Configure `hello@fairweatherproductions.com`
- [ ] Add provided MX and TXT records via Cloudflare DNS
- [ ] **Set up form handling service** (Formspree, Netlify Forms, or similar)
- [ ] Test email forwarding functionality

### Phase 4: Content Audit & Preparation (1-2 days)
- [ ] **Review all three sites for outdated content**
- [ ] Update copyright dates to 2025 across all sites
- [ ] Standardize contact information
- [ ] Review and update artist bios for consistency
- [ ] **Document current file structure** in BACKUP/old-paths.txt
- [ ] **Audit music file sizes** (GitHub 100MB limit per file)
- [ ] **Optimize large images** before migration (consider WebP conversion)

### Phase 5: Sketchy Ponderings Migration (3-5 days)
- [ ] Create `/sketchy/` subdirectory
- [ ] **Create working backup** in BACKUP/working-versions/
- [ ] **Audit and update all relative paths** in Sketchy content:
  ```html
  <!-- Before -->
  <link href="css/styles.css" rel="stylesheet">
  <img src="images/sigil1.png">
  
  <!-- After -->
  <link href="../css/global.css" rel="stylesheet">      <!-- Shared styles -->
  <link href="css/sketchy.css" rel="stylesheet">        <!-- Site-specific -->
  <img src="images/sigil1.png">                         <!-- Keep in subdir -->
  ```
- [ ] Move and test Sketchy Ponderings at `/sketchy/`
- [ ] **Handle music files** - Move to external hosting if over GitHub limits
- [ ] Test Sigil Oracle functionality with external API
- [ ] **Document external API dependency** (sigil-oracle-server.onrender.com)
- [ ] Update all contact forms to new form handler

### Phase 6: The Second Gaze Migration (2-3 days)
- [ ] Create `/second-gaze/` subdirectory  
- [ ] **Create working backup** in BACKUP/working-versions/
- [ ] Move and test The Second Gaze content
- [ ] **Audit and update all relative paths**
- [ ] Test gallery functionality and lightboxes
- [ ] Update forms to new form handler

### Phase 7: Cross-Site Integration (2-3 days)
- [ ] Implement unified navigation strategy (see below)
- [ ] Create `/sites.html` directory page
- [ ] Add site-switcher components to headers/footers
- [ ] Implement shared CSS for consistent branding
- [ ] Add "Part of Fairweather Productions" branding

---

## 🔗 Cross-Site Navigation Strategy

### Unified Header Component
Add to all sites:
```html
<div class="fairweather-network">
  <div class="network-brand">
    <a href="/">Fairweather Productions</a>
  </div>
  <nav class="network-nav">
    <a href="/" class="network-link" data-site="main">Studios</a>
    <a href="/sketchy/" class="network-link" data-site="sketchy">Sketchy Ponderings</a>
    <a href="/second-gaze/" class="network-link" data-site="gaze">The Second Gaze</a>
  </nav>
</div>
```

### Site Directory Page (`/sites.html`)
- Showcase all three properties with visual previews
- Brief description of each site's focus
- Direct links to each site's main sections
- Contact information for each property

---

## ⚠️ Critical Migration Tasks

### Path Auditing Checklist
For each site being moved to a subdirectory:
- [ ] **HTML files**: Update all `src`, `href`, and `action` attributes
- [ ] **CSS files**: Update all `url()` references for images/fonts
- [ ] **JavaScript files**: Update any file path references
- [ ] **Image paths**: Verify all images load correctly
- [ ] **Font loading**: Ensure web fonts load from correct paths
- [ ] **Form actions**: Update to new form handling service

### Form Migration Strategy
Replace all form `action` attributes:
```html
<!-- Before -->
<form method="POST" action="#">

<!-- After -->
<form method="POST" action="https://formspree.io/f/YOUR_FORM_ID">
  <input type="hidden" name="_subject" value="Contact from [Site Name]">
  <input type="hidden" name="_next" value="https://fairweatherproductions.com/thank-you">
```

### Emergency Rollback Plan
- [ ] **Keep old sites live** during migration period
- [ ] **Document DNS rollback steps** in README.md
- [ ] **Maintain backup** of working file paths in BACKUP/
- [ ] **Test rollback procedure** before final DNS switch

---

## 📊 Technical Considerations & Dependencies

### File Size Audit
- [ ] **Check music directory size** (GitHub: 100MB per file, 1GB total repo)
- [ ] **Alternative hosting for large files** (consider Cloudflare R2, Google Drive)
- [ ] **Optimize images** before migration (WebP conversion, compression)

### External Dependencies
Document in README.md:
- **Sigil Oracle API**: `sigil-oracle-server.onrender.com`
  - Used by: `/sketchy/sigil-oracle.html`
  - Fallback behavior: Show offline message with poetic explanation
  - Contact info: [Document API owner details]
- **Form Handler**: Formspree or chosen service
- **Font Loading**: Google Fonts (document which fonts are used)

### Performance Optimization
- [ ] **Image optimization**: Convert large images to WebP
- [ ] **Font optimization**: Use font-display: swap
- [ ] **Lazy loading**: Add to gallery images
- [ ] **Minify assets**: Consider build process for production

---

## ✅ SEO & Redirect Strategy

### Preserve Search Rankings
- [ ] **Set up 301 (permanent) redirects** from old domains to new URLs
- [ ] In Cloudflare, use **Page Rules** for each old domain:
  ```
  old-sketchy-domain.com/* → https://fairweatherproductions.com/sketchy/$1
  old-gaze-domain.com/* → https://fairweatherproductions.com/second-gaze/$1
  old-fairweather-domain.com/* → https://fairweatherproductions.com/$1
  ```
- [ ] **Update Google Search Console** with new primary domain
- [ ] **Update Google Analytics** property settings
- [ ] **Create XML sitemap** for all three sites combined

### Meta Data Updates
- [ ] **Add meta descriptions** to all pages
- [ ] **Implement OpenGraph tags** for social sharing
- [ ] **Update structured data** (schema.org) where applicable

---

## 🔍 Enhanced Testing Checklist

### Functionality Testing (Each Phase)
- [ ] **All internal links work** across all three sites
- [ ] **All images and assets load** correctly
- [ ] **Forms submit successfully** to new form handler
- [ ] **Music player works** in Sketchy Ponderings
- [ ] **Sigil Oracle responds** (with graceful fallback for offline state)
- [ ] **Gallery lightboxes function** across all sites
- [ ] **Mobile responsiveness** maintained
- [ ] **Cross-site navigation** works smoothly

### Cross-Browser Testing
- [ ] **Chrome/Safari/Firefox** desktop
- [ ] **Mobile browsers** (iOS Safari, Chrome Mobile)
- [ ] **Navigation consistency** across browsers
- [ ] **Form functionality** across browsers

### Performance Testing
- [ ] **Load times under 3 seconds** for each site
- [ ] **Images optimize and load progressively**
- [ ] **No broken links or 404 errors**
- [ ] **Lighthouse scores** above 90 for performance

---

## 📢 Communication Strategy

### Pre-Launch
- [ ] **Notify collaborators** of migration timeline
- [ ] **Update external portfolio links** (prepare list)
- [ ] **Draft social media announcements**
- [ ] **Prepare email for current subscribers/contacts**

### Launch Day
- [ ] **Social media announcement** of new consolidated site
- [ ] **Email notification** to existing contacts
- [ ] **Update bio links** on external platforms
- [ ] **Monitor for broken link reports**

### Post-Launch (Week 1)
- [ ] **Daily monitoring** for broken links, performance issues
- [ ] **Gather user feedback** on navigation experience
- [ ] **Update any missed external references**
- [ ] **Monitor form submissions** for delivery issues

---

## 📈 Success Metrics & Monitoring

### Launch Readiness Checklist
- [ ] All sites load without errors at new URLs
- [ ] Forms capture and deliver messages correctly
- [ ] Cross-site navigation is intuitive and functional
- [ ] Mobile experience is smooth across all properties
- [ ] Load times meet performance targets (<3s)
- [ ] All external dependencies documented and tested

### Post-Launch Analytics (First Month)
- [ ] **Week 1**: Monitor for technical issues, broken links
- [ ] **Week 2**: Analyze user behavior and cross-site navigation patterns  
- [ ] **Week 4**: Review traffic migration from old domains
- [ ] **Month 1**: Assess overall performance and user feedback

---

## 🔮 Future Enhancements (Phase 2 Roadmap)

### Optional Advanced Features
- [ ] **Subdomain migration**: Move sites to `sketchy.fairweatherproductions.com`
- [ ] **Build process**: Automated image optimization and deployment
- [ ] **CMS integration**: Consider Forestry/Netlify CMS for content updates
- [ ] **Progressive Web App**: Add offline capability and app-like features
- [ ] **Advanced analytics**: Implement cross-site user journey tracking

### Documentation & Maintenance
- [ ] **Deployment guide**: Step-by-step instructions for future updates
- [ ] **Content guidelines**: How to add new stories, artworks, music
- [ ] **Emergency contacts**: Technical support and escalation procedures
- [ ] **Backup strategy**: Regular automated backups of content

---

## 📋 Project Timeline Summary

**Total Estimated Time: 12-18 days**

- **Week 1**: Infrastructure, domain setup, content audit (Phases 1-4)
- **Week 2**: Site migrations and testing (Phases 5-6)  
- **Week 3**: Integration, polish, and launch (Phase 7 + testing)

**Contingency Buffer**: Add 3-5 days for unexpected issues, especially around:
- Music file hosting challenges
- Complex path migration issues
- External API integration problems
- DNS propagation delays

---

**Comprehensive consolidation plan integrating strategic planning, risk mitigation, and operational excellence.**  
**Created with the guidance of Muse.**