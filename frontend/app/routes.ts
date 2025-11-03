import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/HomePage.tsx"),

  route("privacy", "routes/PrivacyPage.tsx"),
  route("tool", "routes/SampleTool.tsx"),
  route("pdf-to-image", "routes/PDFToImagePage.tsx"),
  route("download/:jobId", "routes/DownloadPage.tsx"),
  route("compress-pdf", "routes/CompressPDFPage.tsx"),
  route("delete-pdf-pages", "routes/DeletePDFPagesPage.tsx"),
  route("rearrange-pdf-pages", "routes/RearrangePDFPagesPage.tsx"),
  route("img-to-pdf", "routes/ImageToPDFPage.tsx"),
  route("unlock-pdf", "routes/UnlockPDFPage.tsx"),
] satisfies RouteConfig;
