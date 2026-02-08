# Motivated Minds - System Architecture & Deployment Guide

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     PUBLIC WEBSITE                           │
│  Landing Page → Application Form → Thank You                 │
│  (Next.js App Router)                                        │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                     API LAYER                                │
│  POST /api/applications     - Submit application             │
│  GET  /api/admin/*          - Admin endpoints (protected)    │
│  PATCH /api/admin/*         - Update operations              │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                   DATABASE (PostgreSQL)                      │
│                                                              │
│  Applications → Members → Subscriptions                      │
│                      ↓                                       │
│                   Events → EventBookings                     │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│              ADMIN DASHBOARD (Protected)                     │
│  Review Applications → Update Status → Export CSV            │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│            FUTURE: PAYMENT INTEGRATION                       │
│  Stripe → Subscriptions → Event Ticketing                   │
└─────────────────────────────────────────────────────────────┘
```

## Database Relationships

```
Application (1) ──→ (0..1) Member
                        │
                        ├──→ (0..n) Subscription
                        │
                        └──→ (0..n) EventBooking
                                        │
                                        ↓
Event (1) ──────────────────→ (0..n) EventBooking
```

## Deployment Options

### Option 1: Vercel + Supabase (Recommended for MVP)

**Pros:**
- Zero DevOps
- Free tier available
- Automatic scaling
- Built for Next.js

**Setup:**
1. Create Supabase project → Get PostgreSQL URL
2. Connect GitHub repo to Vercel
3. Add environment variables in Vercel
4. Deploy

**Cost:** 
- Free tier: $0/month
- Pro tier: ~$25/month (Vercel) + $25/month (Supabase)

### Option 2: Railway

**Pros:**
- PostgreSQL included
- Simple deployment
- Good free tier

**Setup:**
1. Connect GitHub repo
2. Railway auto-detects Next.js
3. Add PostgreSQL service
4. Deploy

**Cost:** Free tier → $5-20/month

### Option 3: Self-Hosted (DigitalOcean/AWS)

**Pros:**
- Full control
- Cost-effective at scale

**Cons:**
- Requires DevOps knowledge
- Manual setup

## Environment Variables

Required for production:

```bash
# Database
DATABASE_URL="postgresql://..."

# NextAuth (for admin login)
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="[generate with: openssl rand -base64 32]"

# Future: Stripe
STRIPE_SECRET_KEY=""
STRIPE_PUBLISHABLE_KEY=""
STRIPE_WEBHOOK_SECRET=""

# Future: Email
EMAIL_SERVER=""
EMAIL_FROM="hello@motivatedminds.com"
```

## Initial Database Setup

After deployment:

```bash
# Run migrations
npx prisma migrate deploy

# Generate Prisma client
npx prisma generate

# Create first admin user
node scripts/create-admin.js
```

## Security Checklist

Before going live:

- [ ] Add NextAuth.js authentication
- [ ] Protect all `/api/admin/*` routes
- [ ] Add rate limiting to application form
- [ ] Set strong NEXTAUTH_SECRET
- [ ] Enable HTTPS only
- [ ] Add CORS restrictions
- [ ] Implement CSP headers
- [ ] Add input validation (Zod)
- [ ] Sanitize all user inputs
- [ ] Add SQL injection protection (Prisma handles this)
- [ ] Enable Prisma query logging in production

## Monitoring & Analytics

Recommended tools:
- **Error tracking:** Sentry
- **Analytics:** Plausible or Fathom (privacy-focused)
- **Uptime:** UptimeRobot
- **Database:** Prisma Pulse (for real-time monitoring)

## Backup Strategy

1. **Database backups**
   - Automated daily backups (built into Supabase/Railway)
   - Weekly manual exports
   - Store in S3 or similar

2. **Application data**
   - Regular CSV exports of accepted members
   - Store application data in multiple locations

## Scaling Roadmap

### Phase 1: MVP (Current)
- Application system
- Admin dashboard
- Manual review process

### Phase 2: Automation
- Email notifications
- Automated workflows
- Member portal

### Phase 3: Payments
- Stripe integration
- Annual memberships
- Event ticketing

### Phase 4: Community
- Member directory
- Internal messaging
- Event RSVP system

### Phase 5: Advanced
- Mobile app
- AI-powered matching
- Analytics dashboard

## API Rate Limits (Recommended)

```javascript
// Example using next-rate-limit
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many applications from this IP'
});

// Apply to application endpoint
app.use('/api/applications', limiter);
```

## Testing Strategy

1. **Application Form**
   - Submit with valid data
   - Submit with invalid email
   - Submit duplicate email
   - Test required field validation

2. **Admin Dashboard**
   - Load with 0 applications
   - Load with 1000+ applications
   - Filter functionality
   - Status update
   - CSV export

3. **Database**
   - Test foreign key constraints
   - Test unique constraints
   - Test cascade deletes

## Performance Optimization

1. **Database**
   - Add indexes on frequently queried fields (already in schema)
   - Use connection pooling
   - Implement pagination for large datasets

2. **Frontend**
   - Lazy load admin dashboard
   - Optimize images (use Next.js Image component)
   - Implement infinite scroll for applications

3. **Caching**
   - Cache stats on admin dashboard (1 minute)
   - Use SWR for data fetching

## Cost Estimation

### Monthly Operating Costs (Year 1)

| Service | Cost |
|---------|------|
| Hosting (Vercel Pro) | $20 |
| Database (Supabase Pro) | $25 |
| Domain | $2 |
| Email service (SendGrid) | $15 |
| **Total** | **$62/month** |

### With Payments (Year 2+)

| Service | Additional Cost |
|---------|----------------|
| Stripe fees | 2.9% + $0.30/transaction |
| Monitoring (Sentry) | $26/month |
| **Estimated Total** | **~$90/month** |

## Support & Maintenance

**Weekly tasks:**
- Review new applications
- Export member data
- Check error logs

**Monthly tasks:**
- Database backup verification
- Security updates
- Performance review

**Quarterly tasks:**
- Dependency updates
- Security audit
- Feature planning

## Contact

For technical support: dev@motivatedminds.com
For business inquiries: hello@motivatedminds.com
