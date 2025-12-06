// TEST TO PDF
document.getElementById("generateBtn")?.addEventListener("click", () => {
    const text = document.getElementById("textInput").value;
    const blob = new Blob([text], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "text.pdf";
    link.click();
});

// MERGE PDF
document.getElementById("mergeBtn")?.addEventListener("click", async () => {
    const files = document.getElementById("mergeFiles").files;
    const pdfLib = await PDFLib.PDFDocument.create();

    for (let f of files) {
        let bytes = await f.arrayBuffer();
        let tempPdf = await PDFLib.PDFDocument.load(bytes);
        let pages = await pdfLib.copyPages(tempPdf, tempPdf.getPageIndices());
        pages.forEach(p => pdfLib.addPage(p));
    }

    const mergedPdf = await pdfLib.save();
    const blob = new Blob([mergedPdf], { type: "application/pdf" });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "merged.pdf";
    link.click();
});

// YOUTUBE NOTES
document.getElementById("notesBtn")?.addEventListener("click", () => {
    const link = document.getElementById("ytLink").value;
    const text = "YouTube Notes for: " + link;
    const blob = new Blob([text], { type: "application/pdf" });
    const download = document.createElement("a");

    download.href = URL.createObjectURL(blob);
    download.download = "YT-Notes.pdf";
    download.click();
});
