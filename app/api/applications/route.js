import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request) {
  try {
    const data = await request.json();

    // Validate required fields
    const { name, email, city, profession, healthFitness, whyJoin } = data;
    
    if (!name || !email || !city || !profession || !healthFitness || !whyJoin) {
      return NextResponse.json(
        { error: 'All required fields must be filled' },
        { status: 400 }
      );
    }

    // Check if email already exists
    const existingApplication = await prisma.application.findUnique({
      where: { email }
    });

    if (existingApplication) {
      return NextResponse.json(
        { error: 'An application with this email already exists' },
        { status: 400 }
      );
    }

    // Create application
    const application = await prisma.application.create({
      data: {
        name,
        email,
        city,
        profession,
        healthFitness,
        whyJoin,
        linkedinWebsite: data.linkedinWebsite || null,
        referral: data.referral || null,
        status: 'PENDING'
      }
    });

    return NextResponse.json(
      { success: true, applicationId: application.id },
      { status: 201 }
    );

  } catch (error) {
    console.error('Application submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit application' },
      { status: 500 }
    );
  }
}
