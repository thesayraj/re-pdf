import { useParams, useLocation } from "react-router";
import { useCallback, useEffect, useState } from "react";
import API from "../api";

interface DownloadInfo {
  downloadUrl?: string;
  fileName?: string;
  expiresIn?: number;
}

function DownloadPage() {
  const { jobId } = useParams<{ jobId: string }>();
  const location = useLocation();
  const state = location.state as
    | { downloadUrl?: string; fileName?: string; expiresIn?: number }
    | undefined;

  const [info, setInfo] = useState<DownloadInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(!state?.downloadUrl);

  const fetchInfo = useCallback(async () => {
    if (!jobId) {
      setError("Invalid download link.");
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const response = await API.get(`/jobs/${jobId}`);
      setInfo({
        downloadUrl: response.data.download_url,
        fileName: response.data.file_name,
        expiresIn: response.data.expires_in,
      });
      setError(null);
    } catch (err) {
      const serverMessage = err.response?.data?.detail;
      setError(serverMessage ?? "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [jobId]);

  useEffect(() => {
    if (state?.downloadUrl) {
      setInfo({
        downloadUrl: state.downloadUrl,
        fileName: state.fileName,
        expiresIn: state.expiresIn,
      });
      setLoading(false);
    } else {
      fetchInfo();
    }
  }, [jobId, state?.downloadUrl, state?.fileName, state?.expiresIn, fetchInfo]);

  if (loading) {
    return (
      <div className="min-h-screen min-w-screen flex flex-col items-center justify-center h-screen text-center px-4">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-700">Loading download info...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen min-w-screen flex flex-col items-center justify-center h-screen text-center px-4">
        <h2 className="text-2xl font-semibold text-red-600">Error</h2>
        <p className="mt-2 text-gray-700">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center justify-center h-screen text-center px-4">
      <h2 className="text-2xl font-semibold text-green-600">
        Your file is ready!
      </h2>
      <p className="mt-2 text-gray-700">{info?.fileName ?? ""}</p>
      <a href={info?.downloadUrl} download className="mt-6">
        <button className="cursor-pointer px-8 py-3 bg-green-600 text-white text-lg font-medium rounded-lg shadow-md hover:bg-green-700 hover:shadow-lg hover:scale-105 active:bg-green-800 transition transform duration-300 ease-in-out">
          Download Now
        </button>
      </a>
      {info?.expiresIn && (
        <p className="mt-4 text-sm text-gray-500">
          Link expires in {Math.floor(info.expiresIn / 60)} minutes.
        </p>
      )}
    </div>
  );
}

export default DownloadPage;
