import { useRef } from "react";
import ePub, { Rendition } from "epubjs";

function App() {
  const viewerRef = useRef<HTMLDivElement>(null);
  const renditionRef = useRef<Rendition | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || !viewerRef.current) return;

    renditionRef.current?.destroy();

    const data = await file.arrayBuffer();
    const book = ePub(data);
    const rendition = book.renderTo(viewerRef.current, {
      width: "100%",
      height: "100%",
    });
    renditionRef.current = rendition;
    await rendition.display();
  }

  return (
    <div>
      <input type="file" accept=".epub" onChange={handleFile} />
      <div ref={viewerRef} style={{ height: "80vh" }} />
    </div>
  );
}

export default App;