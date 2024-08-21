// app/api/fetchProjects/route.ts

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://api.pentacle.xyz/api/projects?pagination%5BpageSize%5D=1000', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${process.env.WELCOME_ONCHAIN_API_KEY}`, // Use server-side env variable
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return NextResponse.json({ message: 'Error fetching data from the external API' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
