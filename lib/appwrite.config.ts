import * as sdk from "node-appwrite";

// Using export to make environment variables easily accessible
export const {
  PROJECT_ID,
  API_KEY,
  DATABASE_ID,
  PATIENT_COLLECTION_ID,
  DOCTOR_COLLECTION_ID,
  APPOINT_COLLECTION_ID,
  NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
  NEXT_PUBLIC_ENDPOINT: ENDPOINT,
} = process.env;

// Check for missing environment variables
if (!PROJECT_ID || !API_KEY || !ENDPOINT) {
  throw new Error("Missing required environment variables.");
}

// Initialize the Appwrite Client
const client = new sdk.Client();
client.setEndpoint(ENDPOINT).setProject(PROJECT_ID).setKey(API_KEY);

// Expose the Appwrite services
export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);

// Import the ID helper for generating unique IDs
export const ID = sdk.ID;
