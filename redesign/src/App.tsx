import { useState } from "react";
import EditorialHome from "./components/EditorialHome";
import RaveHome from "./components/RaveHome";

type Edition = "editorial" | "rave";

export default function App() {
  const [edition, setEdition] = useState<Edition>("rave");

  return (
    <div>
      {edition === "editorial" ? <EditorialHome /> : <RaveHome />}

      {/* Brutal edition switcher */}
      <div
        role="group"
        aria-label="Switch layout edition"
        className="fixed bottom-4 left-1/2 z-[60] flex -translate-x-1/2 border-2 border-key bg-bone font-code text-xs font-bold uppercase shadow-[4px_4px_0_0_#0a0a0a]"
      >
        <button
          type="button"
          onClick={() => setEdition("editorial")}
          aria-pressed={edition === "editorial"}
          className={`px-4 py-2 ${edition === "editorial" ? "bg-key text-bone" : "text-key hover:bg-yellow"}`}
        >
          Editorial
        </button>
        <button
          type="button"
          onClick={() => setEdition("rave")}
          aria-pressed={edition === "rave"}
          className={`border-l-2 border-key px-4 py-2 ${edition === "rave" ? "bg-magenta text-key" : "text-key hover:bg-cyan"}`}
        >
          Rave
        </button>
      </div>
    </div>
  );
}
