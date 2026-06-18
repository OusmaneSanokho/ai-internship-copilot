import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    const arrayBuffer = await file.arrayBuffer()
    const base64PDF = Buffer.from(arrayBuffer).toString('base64')

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
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
              text: `You are an expert career advisor and recruiter. Analyze the CV/resume in this PDF for an internship applicant and provide structured feedback.

Please provide your analysis in exactly this format:

STRENGTHS:
- List 3-5 key strengths you notice in this CV

WEAKNESSES:
- List 3-5 areas that need improvement

MISSING SKILLS:
- List 3-5 important skills that are missing for internship applications

LEARNING ROADMAP:
- List 4-6 specific actionable steps the student should take to improve their chances`,
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