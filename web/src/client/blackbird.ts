const BLACKBIRD_API_URL = import.meta.env.VITE_BLACKBIRD_API_URL || "https://fs-blackbird-ui.dev.development-qredo.com/";

interface CompileResponse {
  parse: string;
  protobuffer: string;
  signatures: [string, string][];
  stallers: string[];
}

export async function compile(src: string) {
  const res = await fetch(new URL("compile", BLACKBIRD_API_URL), {
    "method": "POST",
    "body": `"${src}"`,
  });
  if (!res.ok) {
    throw new Error(`Compile failed: ${res.statusText}`);
  }

  const json = await res.json();
  return json as CompileResponse;
}
