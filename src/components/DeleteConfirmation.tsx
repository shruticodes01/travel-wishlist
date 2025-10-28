import { useEffect } from "react";
import ProgressBar from "./ProgressBar.tsx";

const TIMER = 3000;
export default function DeleteConfirmation({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void;
  onConfirm: () => void;
}) {
  useEffect(() => {
    console.log("TIMER SET");

    const timer = setTimeout(() => {
      onConfirm();
    }, TIMER);

    // useEffect Cleanup function
    return () => {
      console.log("CLEAR TIMER");

      clearTimeout(timer);
    };
  }, [onConfirm]);

  return (
    <div className="p-4">
      <h2 className="text-2xl text-[#5d0909] font-[Raleway] p-0 m-0">
        Are you sure?
      </h2>
      <p className="max-w-[38ch] text-[1.15rem] text-[#804242]">
        Do you really want to remove this place?
      </p>
      <div className="flex justify-end gap-4 mt-4 font-[Raleway] text-base">
        <button
          className="border-none bg-transparent text-[#5d0909]"
          onClick={onCancel}
        >
          No
        </button>
        <button
          className="border-none bg-[#5d0909] text-white py-2 px-6 shadow-[0_1px_4px_rgba(0,0,0,0.4)] hover:bg-[#3e0505] rounded-sm"
          onClick={onConfirm}
        >
          Yes
        </button>
      </div>
      <ProgressBar timer={TIMER} />
    </div>
  );
}
