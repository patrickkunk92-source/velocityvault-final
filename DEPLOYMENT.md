# 🚀 Deployment Guide - SE Bikes Velocity Vault

Complete step-by-step instructions for deploying your website to various platforms.

---

## 📋 Quick Start Checklist

Before deploying, ensure:
- [ ] All HTML files are in the root directory
- [ ] CSS files are in `/css` folder
- [ ] JavaScript files are in `/js` folder
- [ ] Images are in `/images` folder
- [ ] Product data in `js/products.js` is updated
- [ ] Contact email configured (if using backend)
- [ ] Analytics tracking configured
- [ ] Referral codes set up

---

## 🌐 Platform-Specific Guides

### 1. GitHub Pages (Recommended - Free & Easy)

**Pros:**
- Free hosting
- Custom domain support
- Git version control
- Automatic SSL

**Steps:**

1. Create GitHub Account (if not exists)
   - Go to github.com
   - Sign up

2. Create Repository
   ```bash
   # Initialize git in your project
   cd se-bikes-website
   git init
   git add .
   git commit -m "Initial: SE Bikes Velocity Vault"
   ```

3. Push to GitHub
   ```bash
   # Create repo on github.com first, then:
   git remote add origin https://github.com/yourusername/se-bikes-website
   git branch -M main
   git push -u origin main
   ```

4. Enable GitHub Pages
   - Go to Settings → Pages
   - Select "Deploy from a branch"
   - Choose "main" branch
   - Click Save

5. Access Your Site
   - URL: `https://yourusername.github.io/se-bikes-website`
   - Wait 1-2 minutes for deployment

**Custom Domain:**
1. Buy domain (Namecheap, GoDaddy, etc.)
2. Update DNS records to point to GitHub Pages
3. In repository Settings → Pages → Custom domain
4. Enter your domain

---

### 2. Netlify (Recommended - Beginner Friendly)

**Pros:**
- Drag & drop deployment
- Continuous deployment from GitHub
- Custom domains
- Form handling available

**Method 1: Drag & Drop**

1. Go to netlify.com
2. Sign up with GitHub/Google/Email
3. Drag project folder to upload area
4. Site deployed in seconds
5. Get auto-generated URL

**Method 2: Git Integration**

1. Connect GitHub account
2. Select your repository
3. Configure build settings:
   - Build command: (leave empty)
   - Publish directory: /
4. Click Deploy
5. Automatic deployment on git push

**Connect Custom Domain:**
1. Go to Domain Settings
2. Add Custom Domain
3. Follow DNS instructions for your registrar

---

### 3. Vercel

**Pros:**
- Optimized for frontend
- Fast CDN
- Zero-config deployment
- Git integration

**Steps:**

1. Install Vercel CLI
   ```bash
   npm install -g vercel
   ```

2. Deploy
   ```bash
   cd se-bikes-website
   vercel
   ```

3. Follow prompts:
   - Confirm project settings
   - Deploy to production

4. Access your site
   - URL provided after deployment
   - Custom domain in project settings

---

### 4. AWS S3 + CloudFront

**Pros:**
- Scalable
- Pay-as-you-go
- Global CDN
- Advanced features

**Steps:**

1. Create AWS Account (aws.amazon.com)

2. Create S3 Bucket
   - S3 Console → Create bucket
   - Name: se-bikes-website
   - Region: closest to users
   - ACL: Public Read

3. Upload Files
   - Upload all files from project
   - Maintain folder structure
   - Set "Grant public-read" permission

4. Enable Static Hosting
   - Bucket → Properties
   - Static website hosting → Enable
   - Index: index.html
   - Error: index.html

5. Create CloudFront Distribution
   - CloudFront Console → Create distribution
   - Origin: S3 bucket
   - Distribution settings:
     - Cache policy: CachingOptimized
     - Viewer policy: Allow HTTP and HTTPS
   - Create distribution

6. Point Domain
   - Route 53 → Create hosted zone
   - Create A record pointing to CloudFront domain

---

### 5. Azure Static Web Apps

**Pros:**
- Free tier available
- GitHub integration
- Global distribution
- Azure ecosystem

**Steps:**

1. Create Azure Account

2. Create Static Web App
   - Azure Portal → Static Web Apps
   - Create new app
   - Link to GitHub repo
   - Select main branch

3. Configure Build
   - Framework: (leave as custom)
   - App location: /
   - Api location: (leave empty)
   - Output location: /

4. Deploy
   - Click Create
   - Automatic build and deployment
   - Get preview URL

5. Custom Domain
   - Static Web App → Custom domains
   - Add your domain
   - Update DNS records

---

### 6. Google Cloud Storage

**Pros:**
- Reliable
- Scalable
- Integration with Google services

**Steps:**

1. Create Google Cloud Project

2. Create Cloud Storage Bucket
   ```bash
   gsutil mb gs://se-bikes-website
   ```

3. Upload Files
   ```bash
   gsutil -m cp -r * gs://se-bikes-website/
   ```

4. Set Public Access
   ```bash
   gsutil iam ch allUsers:objectViewer gs://se-bikes-website
   ```

5. Configure for Website
   - Set index.html as index page
   - Set error handling

6. Get URL
   - Public URL: gs://se-bikes-website/index.html

---

### 7. Traditional Web Hosting (cPanel, Plesk)

**General Steps:**

1. Purchase Hosting Plan
   - Check for PHP/Node support (optional)
   - Sufficient storage (100MB+ recommended)
   - Unlimited bandwidth preferred

2. Connect via FTP
   ```bash
   # Using FileZilla or similar
   Host: ftp.yourdomain.com
   Username: cpanel username
   Password: cpanel password
   ```

3. Upload Files
   - Create folder: /public_html/se-bikes-website
   - Upload all project files
   - Maintain folder structure

4. Set Index Document
   - cPanel → Index Manager
   - Set index.html as index file

5. Configure Domain
   - Point domain to hosting IP
   - Wait for DNS propagation (24-48 hours)

---

### 8. Docker Deployment

**For Docker Hosting (Heroku, AWS ECS, etc.)**

1. Create Dockerfile
   ```dockerfile
   FROM nginx:alpine
   COPY . /usr/share/nginx/html
   COPY nginx.conf /etc/nginx/conf.d/default.conf
   EXPOSE 80
   ```

2. Create nginx.conf
   ```nginx
   server {
       listen 80;
       server_name _;
       root /usr/share/nginx/html;
       index index.html;
       
       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

3. Build Docker Image
   ```bash
   docker build -t se-bikes-website:latest .
   ```

4. Run Locally
   ```bash
   docker run -p 8080:80 se-bikes-website:latest
   ```

5. Deploy to Docker Hub
   ```bash
   docker tag se-bikes-website:latest yourusername/se-bikes-website:latest
   docker push yourusername/se-bikes-website:latest
   ```

---

## 🔧 Post-Deployment Configuration

### 1. Update Links & References
- [ ] Update email addresses
- [ ] Update phone numbers
- [ ] Update social media links
- [ ] Update company address

### 2. SEO Setup
```html
<!-- Add to <head> in index.html -->
<meta name="description" content="Premium SE Bikes at Velocity Vault">
<meta name="keywords" content="SE Bikes, BMX, Cruiser, Mountain Bikes">
<meta name="author" content="SE Bikes">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- Open Graph for social sharing -->
<meta property="og:title" content="Velocity Vault - SE Bikes">
<meta property="og:description" content="Premium Bikes">
<meta property="og:image" content="images/bike1.svg">
<meta property="og:url" content="https://yourdomain.com">
```

### 3. Analytics Setup
```html
<!-- Add to all pages before </body> -->
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

### 4. Email Integration
```javascript
// Example using Formspree
const contactForm = document.getElementById('contact-form');
contactForm.action = 'https://formspree.io/f/YOUR_FORM_ID';
contactForm.method = 'POST';
```

### 5. Performance Optimization
- [ ] Enable gzip compression
- [ ] Minify CSS and JavaScript
- [ ] Optimize images (convert to WebP)
- [ ] Set up CDN caching
- [ ] Enable browser caching

### 6. Security Headers
```
X-Content-Type-Options: nosniff
X-Frame-Options: SAMEORIGIN
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Content-Security-Policy: default-src 'self'; script-src 'self' cdn.jsdelivr.net cdnjs.cloudflare.com
```

---

## ✅ Pre-Launch Checklist

- [ ] All pages load without errors
- [ ] Cart functionality works
- [ ] Forms submit successfully
- [ ] Images load properly
- [ ] Links work correctly
- [ ] Mobile responsive on all devices
- [ ] Contact form sends emails
- [ ] Analytics tracking active
- [ ] SSL/HTTPS enabled
- [ ] Sitemap.xml created
- [ ] robots.txt configured
- [ ] 404 error page created

---

## 🚨 Troubleshooting Deployments

### Pages Not Loading
**Problem:** 404 errors
**Solutions:**
- Check file paths are correct
- Verify index.html is in root
- Set correct index document in server settings
- Check file permissions (644 for files, 755 for directories)

### CSS/JS Not Loading
**Problem:** Styling/functionality broken
**Solutions:**
- Check file paths in HTML
- Verify CSS/JS files uploaded
- Check for path case sensitivity (Linux is case-sensitive)
- Clear browser cache
- Check browser console for errors

### Forms Not Working
**Problem:** Contact form doesn't submit
**Solutions:**
- Set up backend endpoint
- Use form service (Formspree, Netlify Forms)
- Check form action URL
- Verify email configuration

### Images Broken
**Problem:** Image files showing as broken
**Solutions:**
- Verify images uploaded to correct folder
- Check file names match HTML
- Use correct image paths
- Consider using absolute URLs

### Slow Performance
**Problem:** Site loads slowly
**Solutions:**
- Enable gzip compression
- Use CDN for static files
- Optimize image file sizes
- Minify CSS/JavaScript
- Check database queries (if applicable)

---

## 📊 Monitoring & Maintenance

### Regular Checks
- [ ] Monitor uptime (uptimerobot.com)
- [ ] Check error logs weekly
- [ ] Review analytics monthly
- [ ] Update content regularly
- [ ] Test cart functionality
- [ ] Verify email notifications work

### Backups
- [ ] Back up files weekly
- [ ] Back up databases (if applicable)
- [ ] Keep local copy of project
- [ ] Use version control (Git)

### Updates
- [ ] Update Bootstrap to latest
- [ ] Update FontAwesome icons
- [ ] Review security advisories
- [ ] Test new features before deploying

---

## 🎯 Going Live

1. **Final Testing**
   - Test all features thoroughly
   - Verify on multiple browsers
   - Test on mobile devices
   - Check analytics integration

2. **Point Domain**
   - Update DNS records
   - Wait for propagation
   - Verify site is accessible

3. **Submit to Search Engines**
   - Google Search Console
   - Bing Webmaster Tools
   - Add sitemap.xml

4. **Announce Launch**
   - Social media
   - Email newsletter
   - Press release

---

## 📞 Getting Help

- Check README.md for general info
- Review browser console for errors
- Test in incognito mode
- Check hosting provider documentation
- Contact support@yourdomain.com

---

**Last Updated:** January 2026
**Status:** ✅ Production Ready
