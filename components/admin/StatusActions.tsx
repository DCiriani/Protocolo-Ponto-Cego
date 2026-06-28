"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const statuses = [
  {
    value: "received",
    label: "Recebida",
  },
  {
    value: "in_analysis",
    label: "Em análise",
  },
  {
    value: "reading_ready",
    label: "Leitura pronta",
  },
  {
    value: "finished",
    label: "Finalizada",
  },
];

export default function StatusActions({
  id,
  currentStatus,
}: {
  id: string;
  currentStatus: string;
}) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);

  async function updateStatus(status: string) {
    setIsUpdating(true);

    try {
      const response = await fetch(`/api/admin/analises/${id}/status`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        alert("Não foi possível atualizar o status.");
        setIsUpdating(false);
        return;
      }

      router.refresh();
    } catch {
      alert("Erro ao atualizar status.");
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <div className="mt-8 flex flex-wrap gap-3">
      {statuses.map((status) => {
        const active = status.value === currentStatus;

        return (
          <button
            key={status.value}
            type="button"
            disabled={isUpdating || active}
            onClick={() => updateStatus(status.value)}
            className={`rounded-full border px-4 py-2 text-xs font-medium transition ${
              active
                ? "border-[#88B39A] bg-[#88B39A]/10 text-[#88B39A]"
                : "border-white/10 text-zinc-500 hover:border-[#88B39A]/40 hover:text-[#F5F5F3]"
            } disabled:cursor-not-allowed disabled:opacity-70`}
          >
            {status.label}
          </button>
        );
      })}
    </div>
  );
}