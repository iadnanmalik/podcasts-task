// /app/api/podcasts/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
  try {
    // Extract query params from the request URL
    const { searchParams } = new URL(request.url);

    // Convert query params to an object
    const query = Object.fromEntries(searchParams.entries());

    // Build the query string for the backend request
    const queryString = new URLSearchParams(query).toString();

    // Call the backend API with the query parameters
    const response = await axios.get(
      `http://localhost:3001/api/podcasts?${queryString}`
    );

    return NextResponse.json(response.data);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    // Check if the error has a response and if it's a 404
    console.log(error.response.data, error.response.status);

    if (error.response.data && error.response.status === 404) {
      console.log("Returning");
      return NextResponse.json(
        { error: "No podcasts found" }, // Custom error message for 404
        { status: 404 } // Return 404 status
      );
    } else {
      return NextResponse.json(
        { error: "Failed to fetch podcastssssss" },
        { status: 500 } // Generic server error for other issues
      );
    }
  }
}
