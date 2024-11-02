import { NextResponse, NextRequest } from 'next/server';

const SPHERE_API_BASE_URL = 'https://api.spherepay.co/v1';

async function sphereRequest(endpoint: string, options: RequestInit) {
  const url = `${SPHERE_API_BASE_URL}${endpoint}`;
  const headers = {
    'Authorization': `Bearer ${process.env.SPHERE_API_KEY}`,
    'Content-Type': 'application/json',
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      throw new Error(data.error || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error(`Sphere API error (${endpoint}):`, error);
    throw error;
  }
}

export async function GET(request: NextRequest) {
  try {
    const endpoint = request.nextUrl.searchParams.get('endpoint');
    const id = request.nextUrl.searchParams.get('id');
    const limit = request.nextUrl.searchParams.get('limit') || '10';

    if (!endpoint) {
      return NextResponse.json(
        { error: 'Endpoint parameter is required' },
        { status: 400 }
      );
    }

    let url = `/${endpoint}`;
    if (id) {
      url += `/${id}`;
    }

    const queryParams = new URLSearchParams();
    if (!id) {
      queryParams.append('limit', limit);
      url += `?${queryParams.toString()}`;
    }

    const data = await sphereRequest(url, { method: 'GET' });
    return NextResponse.json(data);

  } catch (error) {
    console.error('API request error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data from Sphere API' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { endpoint, ...payload } = body;

    if (!endpoint) {
      return NextResponse.json(
        { error: 'Endpoint parameter is required' },
        { status: 400 }
      );
    }

    const data = await sphereRequest(`/${endpoint}`, {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    return NextResponse.json({ message: 'Request successful', data });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 400 }
    );
  }
} 