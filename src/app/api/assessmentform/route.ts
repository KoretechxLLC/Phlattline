import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma'; // Adjust the import path according to your setup

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, questions } = body;

    // Validate input
    if (!type) {
      return NextResponse.json({ error: 'Assessment type is required.' }, { status: 400 });
    }
    if (!questions || !Array.isArray(questions) || questions.length === 0) {
      return NextResponse.json({ error: 'At least one question is required.' }, { status: 400 });
    }

    // Validate each question
    for (const question of questions) {
      if (!question.question_text) {
        return NextResponse.json({ error: 'Question text is required for each question.' }, { status: 400 });
      }
      if (!question.category || (question.category !== 'individual' && question.category !== 'organization')) {
        return NextResponse.json({ error: 'Valid category (individual/organization) is required for each question.' }, { status: 400 });
      }
      if (!question.options || !Array.isArray(question.options) || question.options.length === 0) {
        return NextResponse.json({ error: 'Each question must have at least one option.' }, { status: 400 });
      }
    }

    // Step 1: Create the assessment form
    const newAssessment = await prisma.assessmentsform.create({
      data: {
        type,
        assessmentsquestions: {
          create: questions.map((q: any) => ({
            question_text: q.question_text,
            category: q.category,
            assessmentsformoptions: {
              create: q.options.map((option: string) => ({
                option_text: option,
              })),
            },
          })),
        },
      },
      include: {
        assessmentsquestions: {
          include: {
            assessmentsformoptions: true, // Include options in the response
          },
        },
      },
    });
    return NextResponse.json({ success: true, data: newAssessment }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating assessment:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to create assessment', details: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const assessmentsid = searchParams.get('id'); // Get the course ID from query params

    if (assessmentsid) {
      const assessment = await prisma.assessmentsform.findUnique({
        where: { id: Number(assessmentsid) },
        include: {
          assessmentsquestions: {
            include: {
              assessmentsformoptions: true
            }
          }
        
        },
      });

      // If the course is not found, return an error
      if (!assessment) {
        return NextResponse.json({ error: 'No assessments found' }, { status: 404 });
      }

      // Return the specific course
      return NextResponse.json({ success: true, data: assessment }, { status: 200 });
    }

    const allassessment = await prisma.assessmentsform.findMany({
      include: {
        assessmentsquestions: {
          include: {
            assessmentsformoptions: true
          }
        }
      
      },
    });

    if(allassessment.length == 0 ){
      return NextResponse.json({error:'No assessments avaiable'},{status : 404})
    }

    return NextResponse.json({ success: true, data: allassessment }, { status: 200 });

  } catch (error: any) {
    console.error('Error fetching assessments:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to fetch assessments', details: error.message },
      { status: 500 }
    );
  }
}
