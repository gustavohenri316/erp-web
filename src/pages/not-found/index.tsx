import { useNavigate } from "react-router-dom";
import { SwitchTheme } from "../../components/SwitchTheme";

export default function NotFound() {
  const router = useNavigate();
  return (
    <div className="w-screen h-screen bg-green-600 dark:bg-green-800 items-center  flex justify-center">
      <SwitchTheme fixed />
      <div className="flex flex-col items-center justify-center  text-neutral-100">
        <span className="text-[200px]">404</span>
        <span className="text-3xl">Not Found</span>
        <span
          className="text-xl cursor-pointer underline italic"
          onClick={() => router(-1)}
        >
          Go back
        </span>
      </div>
    </div>
  );
}
