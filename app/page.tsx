"use client"
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

function SearchButton() {
  return (
    <Button type="submit" className="cursor-pointer">
      <Search />
    </Button>
  );
}

export default function Home() {

  const handleSearch = () => {
    console.log("Working")
  }


  return (
    <div className="w-full">
      <img className="w-full h-screen" src='/storm-clouds.jpg' alt="cloud" />
      <div className="w-full h-screen flex items-center justify-center fixed top-0 left-0">
        <div className="w-full max-w-md space-y-4 bg-white/20 p-5 border border-white/40">
          <form action={handleSearch} className="flex gap-1.5">
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
    </div>
  );
}
