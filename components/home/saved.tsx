import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
const Saved = () => {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center align-middle flex-col gap-3 mt-20">
      <span className="">No saved session</span>
      <Button
        variant="default"
        className="cursor-pointer sm:hidden"
        onClick={() => {
          router.push("/session");
        }}
      >
        Create Session
      </Button>
    </div>
  );
};

export default Saved;
