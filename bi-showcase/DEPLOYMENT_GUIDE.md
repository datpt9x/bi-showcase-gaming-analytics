# BI Showcase - Deployment Guide

## 🚀 **Production Deployment Options**

### **Option 1: Vercel (Recommended)**

Vercel is perfect for React applications with automatic deployments and excellent performance.

#### **Steps:**
1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from project directory**
   ```bash
   cd bi-showcase
   vercel
   ```

4. **Follow prompts:**
   - Set up and deploy? `Y`
   - Which scope? Choose your account
   - Link to existing project? `N`
   - Project name: `bi-showcase`
   - Directory: `./` (current directory)
   - Override settings? `N`

5. **Production deployment**
   ```bash
   vercel --prod
   ```

#### **Custom Domain Setup:**
```bash
vercel domains add yourdomain.com
vercel alias your-deployment-url.vercel.app yourdomain.com
```

---

### **Option 2: Netlify**

Great for static sites with continuous deployment from Git.

#### **Steps:**
1. **Build the project**
   ```bash
   npm run build
   ```

2. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

3. **Login and deploy**
   ```bash
   netlify login
   netlify deploy --dir=dist --prod
   ```

#### **Git Integration:**
1. Push code to GitHub/GitLab
2. Connect repository in Netlify dashboard
3. Set build command: `npm run build`
4. Set publish directory: `dist`

---

### **Option 3: AWS S3 + CloudFront**

For enterprise-level hosting with full AWS integration.

#### **Steps:**
1. **Build the project**
   ```bash
   npm run build
   ```

2. **Create S3 bucket**
   ```bash
   aws s3 mb s3://your-bi-showcase-bucket
   ```

3. **Upload files**
   ```bash
   aws s3 sync dist/ s3://your-bi-showcase-bucket --delete
   ```

4. **Configure bucket for static hosting**
   ```bash
   aws s3 website s3://your-bi-showcase-bucket --index-document index.html
   ```

5. **Setup CloudFront distribution** (via AWS Console)

---

### **Option 4: GitHub Pages**

Free hosting for open source projects.

#### **Steps:**
1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Add to package.json**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     },
     "homepage": "https://yourusername.github.io/bi-showcase"
   }
   ```

3. **Deploy**
   ```bash
   npm run deploy
   ```

---

## ⚙️ **Environment Configuration**

### **Environment Variables**
Create `.env.production` file:
```env
VITE_APP_TITLE=BI Showcase
VITE_API_URL=https://api.yourdomain.com
VITE_ANALYTICS_ID=your-analytics-id
VITE_ENVIRONMENT=production
```

### **Build Optimization**
Update `vite.config.ts`:
```typescript
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          charts: ['chart.js', 'react-chartjs-2'],
          router: ['react-router-dom']
        }
      }
    }
  },
  base: '/' // Change if deploying to subdirectory
})
```

---

## 🔧 **Performance Optimization**

### **Pre-Deployment Checklist**
- [ ] Bundle size analysis completed
- [ ] Images optimized (WebP format)
- [ ] Lazy loading implemented
- [ ] Code splitting configured
- [ ] Unused dependencies removed
- [ ] Source maps disabled for production

### **Bundle Analysis**
```bash
npm install --save-dev vite-bundle-analyzer
npm run build
npx vite-bundle-analyzer
```

### **Image Optimization**
```bash
# Install image optimization tools
npm install --save-dev @squoosh/lib

# Optimize images before deployment
# (Add custom script or use build tools)
```

---

## 📊 **Monitoring & Analytics**

### **Google Analytics Setup**
1. Create GA4 property
2. Add tracking code to `index.html`:
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### **Error Monitoring with Sentry**
```bash
npm install @sentry/react @sentry/tracing
```

Add to `main.tsx`:
```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: "production",
});
```

### **Performance Monitoring**
- Setup Core Web Vitals tracking
- Monitor page load times
- Track user interactions
- Monitor error rates

---

## 🔒 **Security Configuration**

### **Content Security Policy**
Add to `index.html`:
```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline' https://www.googletagmanager.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com;
  img-src 'self' data: https:;
  connect-src 'self' https://api.yourdomain.com;
">
```

### **HTTPS Configuration**
- Ensure SSL certificate is properly configured
- Redirect HTTP to HTTPS
- Use HSTS headers
- Configure secure cookies

---

## 🌐 **CDN Configuration**

### **Asset Optimization**
- Enable Gzip/Brotli compression
- Set proper cache headers
- Use CDN for static assets
- Optimize font loading

### **Cache Strategy**
```
HTML files: no-cache
CSS/JS files: 1 year (with hash)
Images: 1 month
Fonts: 1 year
```

---

## 📱 **Mobile Optimization**

### **PWA Configuration** (Optional)
1. **Add manifest.json**
```json
{
  "name": "BI Showcase",
  "short_name": "BI Showcase",
  "description": "Gaming & Mobile Analytics Platform",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#111827",
  "theme_color": "#3B82F6",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

2. **Add service worker** (optional)
3. **Test PWA functionality**

---

## 🧪 **Post-Deployment Testing**

### **Automated Testing**
```bash
# Lighthouse CI
npm install -g @lhci/cli
lhci autorun --upload.target=temporary-public-storage

# Performance testing
npm install -g lighthouse
lighthouse https://yourdomain.com --output=html
```

### **Manual Testing Checklist**
- [ ] All pages load correctly
- [ ] Navigation works
- [ ] Charts render properly
- [ ] Mobile responsive
- [ ] Performance acceptable
- [ ] No console errors
- [ ] Analytics tracking works

---

## 🔄 **Continuous Deployment**

### **GitHub Actions Example**
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Build
      run: npm run build
      
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
```

---

## 📈 **Success Metrics**

### **Performance Targets**
- Lighthouse Performance Score: > 90
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1

### **User Experience Goals**
- Mobile usability score: 100
- Accessibility score: > 95
- SEO score: > 90
- Best practices score: 100

---

## 🆘 **Troubleshooting**

### **Common Deployment Issues**

**Build Failures:**
- Check Node.js version compatibility
- Clear node_modules and reinstall
- Verify all dependencies are in package.json

**Routing Issues:**
- Configure server for SPA routing
- Add _redirects file for Netlify
- Set up proper fallback routes

**Performance Issues:**
- Analyze bundle size
- Implement code splitting
- Optimize images and assets
- Enable compression

**Mobile Issues:**
- Test on real devices
- Check viewport meta tag
- Verify touch targets
- Test offline functionality

---

## 📞 **Support & Maintenance**

### **Monitoring Setup**
- Setup uptime monitoring
- Configure error alerts
- Monitor performance metrics
- Track user analytics

### **Update Strategy**
- Regular dependency updates
- Security patch management
- Feature rollout planning
- Rollback procedures

### **Backup Strategy**
- Code repository backups
- Database backups (if applicable)
- Asset backups
- Configuration backups
