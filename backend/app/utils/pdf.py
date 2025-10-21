import subprocess


GHOSTSCRIPT_OPTIONS = [
    "gs",
    "-sDEVICE=pdfwrite",
    "-dCompatibilityLevel=1.7",
    "-dPDFSETTINGS=/prepress",
    "-dNOPAUSE",
    "-dQUIET",
    "-dBATCH"
]

def repair_pdf(input_path: str, output_path: str) -> None:
    command = GHOSTSCRIPT_OPTIONS + [f"-sOutputFile={output_path}", input_path]
    subprocess.run(command, check=True)
