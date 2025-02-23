import PDFDocument from "../utils/pdfkit-table.js";

import { allProject } from "./project.controller.js";

export const newPDF = async (req, res) => {
  const { id } = req.params;
  // Set response headers to indicate a file download
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=projects.pdf");

  let projects = [];
  let allProjects;

  try {
    if (id == "all") {
      allProjects = await fetch("http://localhost:3000/project/allProject");
    } else {
      allProjects = await fetch(
        `http://localhost:3000/project/projectById/${id}`
      );
    }
    const Projects = await allProjects.json();
    projects = Projects.message;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return res.status(500).send("Error fetching project data.");
  }

  // Create The PDF document
  const doc = new PDFDocument();

  // Pipe the PDF into the response stream instead of saving it to a file
  doc.pipe(res);

  // Add the header - https://pspdfkit.com/blog/2019/generate-invoices-pdfkit-node/
  doc
    .fillColor("#444444")
    .fontSize(20)
    .text("Project Information", 110, 57)
    .fontSize(10)
    .text("CNS Assignment", 200, 65, { align: "right" })
    .text("Report", 200, 80, { align: "right" })
    .moveDown();

  // Create the table
  const table = {
    headers: [
      "Name",
      "Details",
      "Owner",
      "Status",
      "Start Date",
      "End Date",
      "Members",
    ],
    rows: [],
  };
  // Add the patients to the table
  for (const project of projects) {
    const response = await fetch(
      `http://localhost:3000/project/projectMember/${project.id}`
    );
    const data = await response.json();
    table.rows.push([
      project.name,
      project.intro,
      project.owner_id,
      project.status,
      String(project.startDateTime).slice(0, 10),
      String(project.endDateTime).slice(0, 10),
      data.message,
    ]);
  }

  // Draw the table
  doc.moveDown().table(table, 10, 125, { width: 590 });

  // Finalize the PDF and end the stream
  doc.end();
};
