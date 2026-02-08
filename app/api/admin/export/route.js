import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request) {
  // TODO: Add authentication middleware
  
  try {
    // Get all accepted members with their application data
    const members = await prisma.member.findMany({
      where: { status: 'ACTIVE' },
      include: {
        application: true
      },
      orderBy: { memberSince: 'desc' }
    });

    // Create CSV
    const headers = [
      'Name',
      'Email',
      'City',
      'Profession',
      'Health & Fitness',
      'LinkedIn/Website',
      'Member Since',
      'Application Date'
    ];

    const rows = members.map(member => [
      member.name,
      member.email,
      member.city,
      member.application.profession,
      member.application.healthFitness,
      member.application.linkedinWebsite || '',
      new Date(member.memberSince).toLocaleDateString(),
      new Date(member.application.createdAt).toLocaleDateString()
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    return new NextResponse(csvContent, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="accepted-members-${new Date().toISOString().split('T')[0]}.csv"`
      }
    });

  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json(
      { error: 'Failed to export data' },
      { status: 500 }
    );
  }
}
