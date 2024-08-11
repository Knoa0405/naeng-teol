// "use client";
import { Button } from "@/components/ui/button";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function Home() {
  const genAI = new GoogleGenerativeAI(
    process.env.GOOGLE_GEMINI_API_KEY as string
  );

  async function run() {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = "한국어로 김치찌개 레시피 알려줘";

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
  }

  run();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button>Click me</Button>
      hello
    </main>
  );
}
