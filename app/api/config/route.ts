export const runtime = "edge"

import { type NextRequest, NextResponse } from "next/server"
// Note: @vercel/blob might not be fully compatible with Cloudflare's Edge Runtime
// This is a simplified version that will work with Edge Runtime
import config from "@/config/default/config"

export async function GET() {
  return NextResponse.json(config)
}

export async function POST(request: NextRequest) {
  try {
    // Check if user is authenticated (in a real app, use proper auth)
    // For demo purposes, we'll skip this check

    // Get the updated config from the request
    const updatedConfig = await request.json()

    // In Edge Runtime, we can't directly write to the filesystem
    // Instead, we'll just return the updated config
    // In a real app, you would use a database or other storage solution compatible with Edge

    return NextResponse.json({
      success: true,
      message:
        "Config received. Note: In Edge Runtime, permanent storage requires a compatible database or storage service.",
      config: updatedConfig,
    })
  } catch (error) {
    console.error("Error processing config:", error)
    return NextResponse.json({ error: "Failed to process configuration", details: String(error) }, { status: 500 })
  }
}

