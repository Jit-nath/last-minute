import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
const Search = () => {
  return (
    <div className="felx flex-col items-center align-middle justify-center mt-10">
      <div className="flex flex-col justify-center align-middle items-center gap-5">
        <Input className="w-sm m-auto h-12" placeholder="Search" />
        <Button className="w-sm">Search</Button>
      </div>
    </div>
  );
};

export default Search;
