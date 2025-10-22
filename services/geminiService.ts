
import { GoogleGenAI, Type } from "@google/genai";
import type { Track, Playlist } from '../types';

if (!process.env.API_KEY) {
  console.warn("API_KEY environment variable not set. AI features will be disabled.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const playlistSchema = {
  type: Type.OBJECT,
  properties: {
    tracks: {
      type: Type.ARRAY,
      description: "A list of 5 to 10 song tracks.",
      items: {
        type: Type.OBJECT,
        properties: {
          title: {
            type: Type.STRING,
            description: "The title of the song.",
          },
          artist: {
            type: Type.STRING,
            description: "The artist of the song.",
          },
          album: {
            type: Type.STRING,
            description: "The album the song belongs to.",
          }
        },
        required: ["title", "artist", "album"],
      },
    },
  },
  required: ["tracks"],
};


export const generatePlaylist = async (prompt: string): Promise<Playlist> => {
  if (!process.env.API_KEY) {
    throw new Error("API key is not configured. Please set the API_KEY environment variable.");
  }
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Create a playlist of 5-10 songs based on this theme: "${prompt}".`,
      config: {
        responseMimeType: "application/json",
        responseSchema: playlistSchema,
      },
    });

    const jsonText = response.text.trim();
    const generated = JSON.parse(jsonText);
    
    const newTracks: Track[] = generated.tracks.map((track: any, index: number) => ({
        id: `gen-${Date.now()}-${index}`,
        title: track.title,
        artist: track.artist,
        album: track.album,
        duration: `${Math.floor(Math.random() * 3) + 2}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
        coverArt: `https://picsum.photos/seed/${encodeURIComponent(track.title)}/200`
    }));

    const newPlaylist: Playlist = {
        id: `pl-gen-${Date.now()}`,
        name: `AI: ${prompt}`,
        creator: 'Gemini',
        coverArt: `https://picsum.photos/seed/${encodeURIComponent(prompt)}/400`,
        tracks: newTracks
    };

    return newPlaylist;

  } catch (error) {
    console.error("Error generating playlist with Gemini:", error);
    throw new Error("Failed to generate playlist. The model may be unavailable or the request was invalid.");
  }
};
