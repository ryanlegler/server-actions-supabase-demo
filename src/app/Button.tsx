"use client";

import { useTransition } from "react";

export function Button({ onClick }: any) {
    const [isPending, startTransition] = useTransition();

    const handleClick = async () => {
        startTransition(() => {});
        await onClick();
    };

    return (
        <button
            disabled={isPending}
            className={`bg-blue-500 hover:bg-blue-700  text-white font-bold py-2 px-4 rounded disabled:bg-slate-600`}
            onClick={handleClick}
        >
            {isPending ? "Saving.." : "Save User"}
        </button>
    );
}
