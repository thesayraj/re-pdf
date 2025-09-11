import { useState } from "react";
import API from "../api";

enum TaskStates {
  None = "",
  Validating = "Validating",
  Uploading = "Uploading Files",
  TriggeringJob = "Initiating",
  Processing = "Processing",
  FetchingResult = "Fetching Result",
}

export function useJobHandler() {
  const [taskState, setTaskState] = useState(TaskStates.None);

  async function handleTask(
    files: File[],
    task_type: string,
    options: object = {}
  ) {
    if (!files) return;

    try {
      // Step 1: validate job
      setTaskState(TaskStates.Validating);
      const {
        data: { job_id, upload_urls, upload_names },
      } = await API.post(`/validate/${task_type}`, {
        files_info: files.map((f) => ({ name: f.name, size: f.size })),
      });

      // Step 2: upload files (parallel)
      setTaskState(TaskStates.Uploading);
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
      setTaskState(TaskStates.TriggeringJob);
      await API.post(`/tasks/${task_type}/${job_id}`, {
        upload_names,
        options,
      });

      // Step 4: poll job status
      setTaskState(TaskStates.Processing);
      let result;
      while (true) {
        const { data } = await API.get(`/jobs/${job_id}`);
        result = data;

        if (result.status === "finished" || result.status === "failed") break;
        await new Promise((r) => setTimeout(r, 2200));
      }

      if (result.status === "failed") {
        throw new Error(result.reason || "Job failed");
      }
      // step 5: get download_url
      setTaskState(TaskStates.FetchingResult);
      return {
        fileName: result.file_name,
        downloadUrl: result.download_url,
        expiresIn: result.expires_in,
        jobId: job_id,
      };
    } catch (err) {
      console.error("Error in jobHandler flow:", err);
      throw err;
    } finally {
      setTaskState(TaskStates.None);
    }
  }

  return { taskState, handleTask };
}
