type JsonLdData = Record<string, unknown> | Record<string, unknown>[];

/**
 * Renders one or more JSON-LD nodes. The "<" escape prevents a stray
 * closing tag inside a string value from breaking out of the script block.
 */
export function JsonLd({ data }: { data: JsonLdData }) {
  const nodes = Array.isArray(data) ? data : [data];
  return (
    <>
      {nodes.map((node, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(node).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </>
  );
}
