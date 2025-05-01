import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

function SearchButton() {
  return (
    <Button className="cursor-pointer">
      <Search />
    </Button>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-300 to-blue-600 flex items-center justify-center">
      <div className="w-full max-w-md space-y-4">
        <form action="" className="flex gap-1.5">
          <Input
            name="city"
            type="text"
            placeholder="Search city name"
            className="bg-white/90"
            required
          />
          <SearchButton />
        </form>
      </div>
    </div>
  );
}
