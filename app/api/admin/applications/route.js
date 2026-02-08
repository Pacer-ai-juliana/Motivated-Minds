import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  // TODO: Add authentication middleware
  // For now, this is unprotected - add auth in production
  
  try {
    const { searchParams } = new URL(request.url);
    const filter = searchParams.get('filter') || 'ALL';

    // Get stats
    const stats = {
      total: await prisma.application.count(),
      pending: await prisma.application.count({ where: { status: 'PENDING' } }),
      accepted: await prisma.application.count({ where: { status: 'ACCEPTED' } }),
      waitlist: await prisma.application.count({ where: { status: 'WAITLIST' } }),
      declined: await prisma.application.count({ where: { status: 'DECLINED' } })
    };

    // Get applications based on filter
    const whereClause = filter === 'ALL' ? {} : { status: filter };
    
    const applications = await prisma.application.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ stats, applications });

  } catch (error) {
    console.error('Admin dashboard error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}
