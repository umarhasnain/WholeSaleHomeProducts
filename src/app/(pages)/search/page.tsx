// app/(pages)/search/page.tsx
import { Suspense } from "react";
import SearchPageClient from "@/components/SearchPageClient";

export default function SearchPage() {
  return (
    <Suspense fallback={<p className="text-gray-500 p-10">Loading search results...</p>}>
      <SearchPageClient />
    </Suspense>
  );
}
