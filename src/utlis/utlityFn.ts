import { IAnalysis } from "@/store/features/analysis/analysisSlice";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const exportToPdf = (analysis: IAnalysis) => {
  const textContent = `
    Summary
    -----------\n
    ${analysis.summary}\n
    Sentiment Analysis
    ----------------------\n
    ${analysis.sentimentAnalysis}\n
    Topics
    ------------\n
    ${analysis.topics ? analysis.topics : "Topics not available"}\n 
    Keywords
    -----------\n
    ${analysis.keywords ? analysis.keywords : "Keywords not available"}\n
  
    `;

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "pt",
  });

  autoTable(doc, {
    theme: "plain",
    head: [["Analysis Report"]],
    headStyles: { halign: "center", fontSize: 14 },
    body: [[textContent]],
    bodyStyles: { fontSize: 12, font: "times" },
    showHead: "firstPage",
  });

  // add footer to each page
  const pageCount = doc.internal.pages.length;
  doc.setFont("helvetica", "italic");
  doc.setFontSize(8);

  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.textWithLink(
      `Generated from ${window.location.hostname}`,
      doc.internal.pageSize.width / 2,
      doc.internal.pageSize.height - 10,
      {
        align: "center",
      }
    );
  }

  doc.save("analysis.pdf");
};
