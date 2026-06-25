import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 60

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const jobDescription = formData.get('jobDescription') as string || ''

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    const arrayBuffer = await file.arrayBuffer()
    const base64PDF = Buffer.from(arrayBuffer).toString('base64')

    const jobDescriptionSection = jobDescription.trim().length > 0
      ? `\nJob Description Provided:\n${jobDescription}\n`
      : '\nNo job description provided. Analyze the CV generally.\n'

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 4096,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'document',
              source: {
                type: 'base64',
                media_type: 'application/pdf',
                data: base64PDF,
              },
            },
            {
              type: 'text',
              text: `You are an expert career advisor, recruiter, and technical interviewer specializing in helping students land internships.

Analyze the CV/resume in this PDF carefully.
${jobDescriptionSection}
Return your analysis using EXACTLY these section headers in EXACTLY this order. Do not skip any section.

COMPATIBILITY SCORE: [number between 0 and 100 only, no % sign]

STRENGTHS:
- List 4-5 specific strengths from the CV
- Be specific, not generic

WEAKNESSES:
- List 4-5 specific weaknesses or gaps
- Be constructive and actionable

MISSING SKILLS:
- List 4-5 important skills missing from the CV
- Focus on skills relevant to the target role

RECOMMENDED CERTIFICATIONS:
- List 3-4 specific certifications the candidate should pursue
- Include the full certification name

SUGGESTED PORTFOLIO PROJECTS:
- List 3-4 specific project ideas
- Each project should address a gap in the CV

INTERVIEW QUESTIONS:
- List 10 interview questions the candidate should prepare for
- Mix technical, behavioral, and role-specific questions

LEARNING ROADMAP:
WEEK 1: [title]
- Task 1
- Task 2
- Task 3

WEEK 2: [title]
- Task 1
- Task 2
- Task 3

WEEK 3: [title]
- Task 1
- Task 2
- Task 3

WEEK 4: [title]
- Task 1
- Task 2
- Task 3

Important rules:
- Follow the format exactly
- Be specific to this candidate's actual CV content
- If no job description is provided, give general internship advice
- Compatibility score should reflect how well the CV matches the job description
- If no job description, give a score based on general internship readiness`,
            },
          ],
        },
      ],
    })

    const responseText =
      message.content[0].type === 'text' ? message.content[0].text : ''

    return NextResponse.json({ analysis: responseText })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    )
  }
}