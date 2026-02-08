# Motivated Minds - Application System

A premium membership application platform with admin dashboard, built with Next.js 14, Prisma, and PostgreSQL.

## Architecture Overview

### Database Schema

**Current Implementation:**
- `Application` - Stores membership applications with review status
- `Member` - Accepted members (created when application status = ACCEPTED)
- `Admin` - Admin users for dashboard access

**Future-Ready Architecture:**
- `Subscription` - Annual/monthly membership billing
- `Event` - Signature experiences, city socials, fitness sessions
- `EventBooking` - Member event registrations with priority access
- Stripe integration ready (payment intent fields included)

### Key Features

✅ **Application System**
- Clean, minimal form
- Stores: name, email, city, profession, health/fitness, why join, LinkedIn, referral
- Email uniqueness validation
- Thank you confirmation

✅ **Admin Dashboard**
- Stats overview (total, pending, accepted, waitlist, declined)
- Filter applications by status
- Click to view full application details
- Update status with single click
- Export accepted members to CSV

🔜 **Future Enhancements** (Database ready)
- Stripe subscription billing
- Event creation and management
- Member priority booking
- Payment processing

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Database

Create a PostgreSQL database and update `.env`:

```bash
cp .env.example .env
```

Edit `.env` and set your `DATABASE_URL`:
```
DATABASE_URL="postgresql://user:password@localhost:5432/motivated_minds"
```

### 3. Run Database Migrations

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 4. Create Admin User (Optional)

```bash
npx prisma studio
```

Navigate to the `Admin` table and create a user manually, or use this script:

```javascript
// scripts/create-admin.js
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('your-secure-password', 10);
  
  const admin = await prisma.admin.create({
    data: {
      email: 'admin@motivatedminds.com',
      passwordHash,
      name: 'Admin',
      role: 'SUPER_ADMIN'
    }
  });
  
  console.log('Admin created:', admin.email);
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
  });
```

Run with: `node scripts/create-admin.js`

### 5. Start Development Server

```bash
npm run dev
```

Visit:
- Application form: `http://localhost:3000/apply`
- Admin dashboard: `http://localhost:3000/admin`

## Project Structure

```
motivated-minds-app/
├── app/
│   ├── api/
│   │   ├── applications/         # Application submission
│   │   └── admin/
│   │       ├── applications/     # Admin dashboard data
│   │       ├── update-status/    # Status management
│   │       └── export/           # CSV export
│   ├── apply/                    # Public application page
│   └── admin/                    # Admin dashboard page
├── components/
│   ├── ApplicationForm.jsx       # Application form component
│   └── AdminDashboard.jsx        # Admin dashboard component
├── prisma/
│   └── schema.prisma             # Database schema
└── lib/
    └── prisma.js                 # Prisma client singleton
```

## API Endpoints

### Public
- `POST /api/applications` - Submit application

### Admin (TODO: Add authentication)
- `GET /api/admin/applications?filter=STATUS` - Get applications
- `PATCH /api/admin/applications/update-status` - Update application status
- `GET /api/admin/export` - Export accepted members to CSV

## Database Schema Details

### Application Statuses
- `PENDING` - Newly submitted, awaiting review
- `ACCEPTED` - Approved for membership (creates Member record)
- `WAITLIST` - On waitlist
- `DECLINED` - Not accepted

### Member Statuses
- `ACTIVE` - Current member in good standing
- `INACTIVE` - Membership lapsed
- `SUSPENDED` - Temporarily suspended

## Future Payment Integration

The database is structured for:

1. **Membership Subscriptions**
   - Annual or monthly billing
   - Stripe customer ID and subscription ID stored
   - Automatic status management (active, past_due, canceled)

2. **Event Ticketing**
   - Different pricing for members vs non-members
   - Priority capacity for members
   - Event types: Signature Experiences, City Socials, Fitness Sessions, Workshops, Retreats
   - Booking statuses: Confirmed, Waitlist, Canceled, Attended, No-Show

3. **Stripe Integration Points** (Ready but not implemented)
   ```javascript
   // Example: Create subscription
   const subscription = await stripe.subscriptions.create({
     customer: member.stripeCustomerId,
     items: [{ price: 'price_annual_membership' }],
   });
   
   // Store in database
   await prisma.subscription.create({
     data: {
       memberId: member.id,
       stripeSubscriptionId: subscription.id,
       status: 'ACTIVE',
       amount: 99900, // $999 in cents
       // ...
     }
   });
   ```

## Security Notes

⚠️ **IMPORTANT - Before Production:**

1. **Add Authentication**
   - Implement NextAuth.js for admin routes
   - Protect all `/api/admin/*` endpoints
   - Add middleware to verify admin role

2. **Environment Variables**
   - Never commit `.env` file
   - Use strong `NEXTAUTH_SECRET`
   - Rotate secrets regularly

3. **Rate Limiting**
   - Add rate limiting to application submission
   - Prevent spam and abuse

4. **Input Validation**
   - Add Zod or similar for schema validation
   - Sanitize all user inputs
   - Validate URLs and email formats

## Design Philosophy

This system follows luxury software principles:
- Minimal, functional design
- Clear information hierarchy
- No unnecessary elements
- Fast, responsive interactions
- Premium feel throughout

## Next Steps

1. Implement authentication (NextAuth.js)
2. Add email notifications (accepted/waitlist/declined)
3. Build Stripe integration for memberships
4. Create event management system
5. Add member portal
6. Implement automated emails
7. Add analytics and reporting

## Support

For questions or issues, contact: dev@motivatedminds.com
