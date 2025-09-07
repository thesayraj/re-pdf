import { useState } from "react";
import API from "../api";

export function useJobHandler() {
  const [isProcessing, setIsProcessing] = useState(false);

  async function handleConvert(
    files: File[],
    task_type: string,
    options: object = {}
  ) {
    if (!files) return;

    setIsProcessing(true);
    try {
      // Step 1: validate job
      const {
        data: { job_id, upload_urls, upload_names },
      } = await API.post(`/validate/${task_type}`, {
        files_info: files.map((f) => ({ name: f.name, size: f.size })),
      });

      // Step 2: upload files (parallel)
      await Promise.all(
        files.map((file, i) =>
          API.put(upload_urls[i], file, {
            headers: {
              "Content-Type": file.type || "application/octet-stream",
            },
          })
        )
      );

      // Step 3: trigger processing
      await API.post(`/tasks/${task_type}/${job_id}`, {
        upload_names,
        options,
      });

      // Step 4: poll job status
      let result;
      while (true) {
        const { data } = await API.get(`/jobs/${job_id}`);
        result = data;

        if (result.status === "finished" || result.status === "failed") break;
        await new Promise((r) => setTimeout(r, 2000));
      }

      if (result.status === "failed") {
        throw new Error(result.reason || "Job failed");
      }
      // step 5: get download_url
      return result.download_url;
    } catch (err) {
      console.error("Error in jobHandler flow:", err);
      throw err;
    } finally {
      setIsProcessing(false);
    }
  }

  return { isProcessing, handleConvert };
}
