"use client";

import { getDayOfWeek } from "@/utils/date";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { MouseEventHandler, useState } from "react";
import PrintAndPDFAll from "./PrintAndPDFAll";

type DeleteRecordProps = {
  rData: Record<string, any>;
};

const DeleteRecord = ({ rData }: DeleteRecordProps) => {
  const [loadingDelete, setLoadingDelete] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const handleDelete = async () => {
    setLoadingDelete(true);
    try {
      const res = await fetch("/api/delete-list", {
        method: "POST",
        cache: "no-cache",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ id: rData._id }),
      });
      if (!res.ok) {
        setLoadingDelete(false);
        toast({
          title: "Alert",
          description: "There was an error while deleting the record.",
          status: "error",
          duration: 9000,
          isClosable: true,
          position: "bottom-right",
        });
        return;
      }

      setLoadingDelete(false);
      router.refresh();
    } catch (error) {
      setLoadingDelete(false);
      toast({
        title: "Alert",
        description: `${error}`,
        status: "info",
        duration: 9000,
        isClosable: true,
        position: "bottom-right",
      });
    }
  };

  return (
    <div className="my-2 flex flex-col md:flex-row gap-2 md:gap-5">
      <button
        className="p-2 hover:bg-red-700 rounded bg-red-400 text-white border-none outline-none"
        onClick={loadingDelete ? undefined : handleDelete}
        type="button"
      >
        {loadingDelete ? "Deleting record" : "Delete record"}
      </button>

      <PrintAndPDFAll
        data={[rData]}
        printText="Print"
        generateText="Export To PDF"
      />
    </div>
  );
};

export default DeleteRecord;
