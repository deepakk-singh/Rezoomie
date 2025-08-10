// ResumeBuilder.js
import React, { useState, useEffect } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import ResumePreview from "./ResumePreview";
import EditableSection from "./EditableSection";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Initial Sections
const initialSections = [
  {
    id: "education",
    title: "Education",
    entries: [{ school: "", degree: "", start_date: "", end_date: "" }],
  },
  {
    id: "experience",
    title: "Experience",
    entries: [
      {
        jobTitle: "",
        company: "",
        location: "",
        start_date: "",
        end_date: "",
        achievements: [""],
      },
    ],
  },
  {
    id: "skills",
    title: "Skills",
    entries: [
      { category: "Programming Languages", value: "" },
      { category: "Frameworks & Libraries", value: "" },
      { category: "Databases", value: "" },
      { category: "Tools & Platforms", value: "" },
    ],
  },
  {
    id: "projects",
    title: "Projects",
    entries: [{ title: "", description: "", technologies: "", link: "" }],
  },
  {
    id: "certifications",
    title: "Certifications",
    entries: [{ name: "", issuer: "", date: "" }],
  },
];

// Section drag item
function SectionItem({ id, title }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    background: "#f2f6fb",
    padding: "0.6rem 0.8rem",
    border: "1px solid #dbe7fb",
    borderRadius: 6,
    cursor: "grab",
    fontWeight: 600,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {title}
    </div>
  );
}

export default function ResumeBuilder() {
  const [sections, setSections] = useState(() => {
    const saved = localStorage.getItem("resumeData_v2");
    return saved ? JSON.parse(saved) : initialSections;
  });

  const [theme, setTheme] = useState("classic");

  const [personalInfo, setPersonalInfo] = useState(() => {
    const saved = localStorage.getItem("personalInfo_v2");
    return saved
      ? JSON.parse(saved)
      : {
          fullName: "",
          jobTitle: "",
          email: "",
          phone: "",
          address: "",
          linkedin: "",
          github: "",
          professionalSummary: "",
        };
  });

  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [openSection, setOpenSection] = useState("education");

  useEffect(() => {
    localStorage.setItem("resumeData_v2", JSON.stringify(sections));
  }, [sections]);

  useEffect(() => {
    localStorage.setItem("personalInfo_v2", JSON.stringify(personalInfo));
  }, [personalInfo]);

  const toggleSection = (id) => {
    setOpenSection((prev) => (prev === id ? null : id));
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = sections.findIndex((s) => s.id === active.id);
    const newIndex = sections.findIndex((s) => s.id === over.id);
    const newList = [...sections];
    const [moved] = newList.splice(oldIndex, 1);
    newList.splice(newIndex, 0, moved);
    setSections(newList);
  };

  const handleDownloadPDF = async () => {
    const preview = document.getElementById("resume-preview");
    if (!preview) return;
    const canvas = await html2canvas(preview, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("resume.pdf");
  };

  const handleResetResume = () => {
    if (
      window.confirm(
        "Are you sure you want to reset your resume? This will clear all entered data."
      )
    ) {
      setSections(initialSections);
      setPersonalInfo({
        fullName: "",
        jobTitle: "",
        email: "",
        phone: "",
        address: "",
        linkedin: "",
        github: "",
        professionalSummary: "",
      });
      localStorage.removeItem("resumeData_v2");
      localStorage.removeItem("personalInfo_v2");
      setOpenSection("education");
    }
  };

  const addSection = () => {
    if (!newSectionTitle.trim()) return;
    const id = newSectionTitle.toLowerCase().replace(/\s+/g, "_");
    if (sections.some((s) => s.id === id)) {
      alert("Section already exists");
      return;
    }
    const newSection = { id, title: newSectionTitle, entries: [{}] };
    setSections((prev) => [...prev, newSection]);
    setNewSectionTitle("");
  };

  const removeSection = (id) => {
    if (!window.confirm("Remove section?")) return;
    setSections((prev) => prev.filter((s) => s.id !== id));
    if (openSection === id) setOpenSection(null);
  };

  return (
    <div
      style={{
        display: "flex",
        gap: 24,
        maxWidth: 1200,
        margin: "2rem auto",
        alignItems: "flex-start",
        padding: "0 1rem",
      }}
    >
      {/* LEFT: Editor */}
      <div style={{ flex: 1, minWidth: 360 }}>
        <h2 style={{ marginBottom: 12 }}>Personal Information</h2>

        <div
          style={{
            padding: 12,
            border: "1px solid #e6eefc",
            borderRadius: 8,
            marginBottom: 12,
            background: "#fbfdff",
          }}
        >
          {[
            { k: "fullName", label: "Full name" },
            { k: "jobTitle", label: "Job title (optional)" },
            { k: "email", label: "Email" },
            { k: "phone", label: "Phone" },
            { k: "address", label: "Address" },
            { k: "linkedin", label: "LinkedIn" },
            { k: "github", label: "GitHub / Portfolio" },
          ].map((f) => (
            <div key={f.k} style={{ marginBottom: 8 }}>
              <label
                style={{ display: "block", fontWeight: 600, marginBottom: 6 }}
              >
                {f.label}
              </label>
              <input
                type="text"
                value={personalInfo[f.k] || ""}
                onChange={(e) =>
                  setPersonalInfo((prev) => ({
                    ...prev,
                    [f.k]: e.target.value,
                  }))
                }
                style={{
                  width: "100%",
                  padding: "8px 10px",
                  borderRadius: 6,
                  border: "1px solid #d0d7e6",
                }}
              />
            </div>
          ))}

          <div style={{ marginTop: 8 }}>
            <label
              style={{ display: "block", fontWeight: 600, marginBottom: 6 }}
            >
              Professional Summary
            </label>
            <textarea
              value={personalInfo.professionalSummary || ""}
              onChange={(e) =>
                setPersonalInfo((prev) => ({
                  ...prev,
                  professionalSummary: e.target.value,
                }))
              }
              rows={4}
              placeholder="Short 2-4 sentence summary — strengths, role, impact"
              style={{
                width: "100%",
                padding: 8,
                borderRadius: 6,
                border: "1px solid #d0d7e6",
              }}
            />
          </div>
        </div>

        {/* Add Section */}
        <h2 style={{ marginBottom: 12 }}>Resume Sections</h2>
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <input
            placeholder="New section title (e.g. Awards)"
            value={newSectionTitle}
            onChange={(e) => setNewSectionTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addSection()}
            style={{
              flex: 1,
              padding: 8,
              borderRadius: 6,
              border: "1px solid #d0d7e6",
            }}
          />
          <button
            onClick={addSection}
            style={{
              padding: "8px 12px",
              background: "#0b76ff",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            Add
          </button>
        </div>

        {/* Collapsible cards with DnD */}
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={sections.map((s) => s.id)}
            strategy={verticalListSortingStrategy}
          >
            {sections.map((section) => (
              <div key={section.id} style={{ marginBottom: 12 }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: 12,
                      alignItems: "center",
                      flex: 1,
                    }}
                  >
                    <SectionItem id={section.id} title={section.title} />
                  </div>

                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      onClick={() => toggleSection(section.id)}
                      style={{
                        padding: "6px 10px",
                        borderRadius: 6,
                        border: "1px solid #d0d7e6",
                        background:
                          openSection === section.id ? "#eef6ff" : "#fff",
                        cursor: "pointer",
                      }}
                    >
                      {openSection === section.id ? "Close" : "Edit"}
                    </button>
                    <button
                      onClick={() => removeSection(section.id)}
                      style={{
                        padding: "6px 10px",
                        borderRadius: 6,
                        border: "1px solid #ffd6d6",
                        background: "#fff",
                        color: "#c33",
                        cursor: "pointer",
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {openSection === section.id && (
                  <div
                    style={{
                      marginTop: 8,
                      padding: 12,
                      border: "1px solid #e6eefc",
                      borderRadius: 6,
                      background: "#fff",
                    }}
                  >
                    <EditableSection
                      section={section}
                      onChange={(id, updatedEntries) =>
                        setSections((prev) =>
                          prev.map((s) =>
                            s.id === id ? { ...s, entries: updatedEntries } : s
                          )
                        )
                      }
                    />
                  </div>
                )}
              </div>
            ))}
          </SortableContext>
        </DndContext>
      </div>

      {/* RIGHT: Preview */}
      <div style={{ width: 540 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <div>
            <label style={{ fontWeight: 600, marginRight: 8 }}>Theme</label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              style={{ padding: 6, borderRadius: 6 }}
            >
              <option value="classic">Classic</option>
              <option value="modern">Modern</option>
              <option value="minimal">Minimal</option>
            </select>
          </div>

          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={handleDownloadPDF}
              style={{
                padding: "8px 12px",
                background: "#0b76ff",
                color: "#fff",
                border: "none",
                borderRadius: 6,
              }}
            >
              Download as PDF
            </button>
            <button
              onClick={handleResetResume}
              style={{
                padding: "8px 12px",
                background: "#c33",
                color: "#fff",
                border: "none",
                borderRadius: 6,
              }}
            >
              Reset
            </button>
          </div>
        </div>

        <ResumePreview
          sections={sections}
          theme={theme}
          personalInfo={personalInfo}
        />
      </div>
    </div>
  );
}
