import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(request) {
  // TODO: Add authentication middleware
  
  try {
    const { applicationId, status } = await request.json();

    if (!applicationId || !status) {
      return NextResponse.json(
        { error: 'Application ID and status are required' },
        { status: 400 }
      );
    }

    // Validate status
    const validStatuses = ['PENDING', 'ACCEPTED', 'WAITLIST', 'DECLINED'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    // Update application
    const application = await prisma.application.update({
      where: { id: applicationId },
      data: {
        status,
        reviewedAt: new Date()
        // TODO: Add reviewedBy when auth is implemented
      }
    });

    // If accepted, create Member record
    if (status === 'ACCEPTED') {
      const existingMember = await prisma.member.findUnique({
        where: { applicationId }
      });

      if (!existingMember) {
        await prisma.member.create({
          data: {
            applicationId,
            name: application.name,
            email: application.email,
            city: application.city,
            status: 'ACTIVE'
          }
        });
      }
    }

    return NextResponse.json({ success: true, application });

  } catch (error) {
    console.error('Status update error:', error);
    return NextResponse.json(
      { error: 'Failed to update status' },
      { status: 500 }
    );
  }
}
