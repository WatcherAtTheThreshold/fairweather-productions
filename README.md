# FairweatherProductions.com Migration Plan (Simplified)

## 🎯 Objective
Consolidate all three existing websites—**Fairweather Studios**, **Sketchy Ponderings**, and **The Second Gaze**—under the domain:
**https://www.fairweatherproductions.com** using GitHub Pages.

**Strategy**: Move sites as-is with minimal changes, preserving all existing functionality and structure.

---

## 📁 Final Structure (Simple Migration)
```
fairweather-productions/
├── CNAME                           # Contains: fairweatherproductions.com
├── index.html                      # Fairweather Studios (unchanged)
├── about.html                      # Update cross-site links only
├── gallery.html                    # Update cross-site links only  
├── contact.html                    # Update cross-site links only
├── css/                            # (unchanged)
├── images/                         # (unchanged)
├── js/                             # (unchanged)
├── sketchy/                        # Complete Sketchy Ponderings site
│   ├── index.html                  # (unchanged internally)
│   ├── css/                        # (unchanged)
│   ├── images/                     # (unchanged)
│   ├── music/                      # (unchanged - check GitHub size limits)
│   └── [all other files as-is]
├── second-gaze/                    # Complete Second Gaze site  
│   ├── index.html                  # (unchanged internally)
│   ├── css/                        # (unchanged)
│   ├── images/                     # (unchanged)
│   └── [all other files as-is]
└── README.md                       # This documentation
```

---

## 🚀 Migration Plan (3-5 Days Total)

### Phase 1: Repository Setup (Day 1)
- [x] Create new GitHub repo: `fairweather-productions`
- [x] Copy Fairweather Studios files to root level (no changes needed)
- [x] Create `/sketchy/` folder and copy all Sketchy Ponderings files
- [ ] Create `/second-gaze/` folder and copy all Second Gaze files
- [ ] Add `CNAME` file with: `fairweatherproductions.com`
- [ ] Test basic GitHub Pages deployment

### Phase 2: Update Cross-Site Links Only (Day 2)
**In Fairweather Studios files** (index.html, about.html, gallery.html, contact.html):
```html
<!-- Update footer links from: -->
<a href="https://watcheratthethreshold.github.io/sketchy-ponderings/">Sketchy Ponderings</a>
<a href="https://watcheratthethreshold.github.io/the-second-gaze/">The Second Gaze</a>

<!-- To: -->
<a href="/sketchy/">Sketchy Ponderings</a>
<a href="/second-gaze/">The Second Gaze</a>
```

**In The Second Gaze footer** (update Sketchy Ponderings link):
```html
<!-- From: -->
<a href="https://watcheratthethreshold.github.io/sketchy-ponderings/">Sketchy Ponderings</a>

<!-- To: -->
<a href="/sketchy/">Sketchy Ponderings</a>
```

### Phase 3: Domain & DNS Setup (Day 3)
- [ ] Set up Cloudflare account (optional but recommended)
- [ ] Point domain to GitHub Pages:
  - **GitHub Pages**: Enable from `main` branch, root folder
  - **DNS**: Add `CNAME` record pointing to `yourusername.github.io`
- [ ] Test all three sites load at new domain

### Phase 4: Forms & Polish (Day 4-5)
- [ ] Test existing contact forms (update handlers if needed)
- [ ] Verify external dependencies (Sigil Oracle API, etc.)
- [ ] Final testing across all sites

---

## ✅ Critical Link Updates Checklist

### Fairweather Studios Files to Update:
- [ ] `index.html` - Footer links to other sites
- [ ] `about.html` - Footer links to other sites  
- [ ] `gallery.html` - Footer links to other sites
- [ ] `contact.html` - Footer links to other sites

### The Second Gaze Files to Update:
- [ ] Footer in all HTML files - Link to Sketchy Ponderings

### Sketchy Ponderings:
- [ ] No changes needed (doesn't currently link to other sites)

---

## 🔍 Testing Checklist

### Functionality Testing
- [ ] **Fairweather Studios**: All pages load and navigate correctly
- [ ] **Sketchy Ponderings**: All internal functionality works at `/sketchy/`
  - [ ] Gallery images load
  - [ ] Music player works
  - [ ] Sigil Oracle connects to external API
  - [ ] All internal navigation works
- [ ] **The Second Gaze**: All functionality works at `/second-gaze/`
  - [ ] Gallery images load
  - [ ] All internal navigation works
- [ ] **Cross-site navigation**: Links between sites work correctly
- [ ] **Forms**: Contact forms submit successfully

### Performance Testing
- [ ] All sites load quickly
- [ ] Images display correctly
- [ ] No broken links or 404 errors
- [ ] Mobile responsiveness maintained

---

## ⚠️ Potential Issues & Solutions

### Music Files (Sketchy Ponderings)
- **Issue**: GitHub has 100MB per file limit
- **Solution**: Check music directory size, move large files to external hosting if needed
- **Fallback**: Link to external music hosting (SoundCloud, etc.)

### External Dependencies
- **Sigil Oracle API**: `sigil-oracle-server.onrender.com`
  - Should continue working without changes
  - Test functionality after migration

### Email Forms
- Current forms may need new handler (Formspree, Netlify Forms, etc.)
- Update `action` attributes if needed

---

## 📊 Success Metrics

### Launch Ready When:
- [ ] All three sites load without errors at new domain
- [ ] Cross-site navigation works smoothly
- [ ] All images and assets display correctly
- [ ] Contact forms function properly
- [ ] External dependencies (Sigil Oracle) work
- [ ] Mobile experience is smooth

---

## 🔮 Future Enhancements (Optional)

### Phase 2 Possibilities:
- [ ] **Unified navigation bar** across all sites
- [ ] **Shared CSS** for consistent branding
- [ ] **Site directory page** at `/sites.html`
- [ ] **Subdomain setup**: `sketchy.fairweatherproductions.com`
- [ ] **Performance optimization**: Image compression, minification

### Content Updates:
- [ ] Update copyright dates to 2025
- [ ] Standardize contact information
- [ ] Add meta descriptions for SEO
- [ ] Create XML sitemap

---

## 🚨 Emergency Rollback Plan

If issues arise:
1. **Keep old sites live** during migration
2. **DNS rollback**: Point domain back to old hosting
3. **Repository backup**: Clone repo before major changes
4. **External dependencies**: Document API endpoints and contacts

---

## 📝 Migration Notes

### Why This Approach:
- **Minimal risk**: No complex path changes or restructuring
- **Preserve functionality**: All existing features continue working
- **Fast deployment**: 3-5 days vs 12-18 days
- **Easy testing**: Each site can be tested independently
- **Future-friendly**: Can optimize and consolidate later

### What Stays the Same:
- All internal site navigation
- All CSS and JavaScript files
- All image paths and assets
- All existing functionality
- Current site designs and layouts

### What Changes:
- Domain name (fairweatherproductions.com)
- Cross-site links between the three properties
- Form handlers (if needed)

---

**Simple, low-risk consolidation preserving all existing functionality.**  
**Estimated timeline: 3-5 days**
