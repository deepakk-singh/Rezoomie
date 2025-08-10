import React from "react";
import ClassicTemplate from "./templates/ClassicTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";

/**
 * ResumePreview – Formats sections and renders the selected resume template
 */
export default function ResumePreview({ sections, theme, personalInfo }) {
  // Inject professional summary before the Education section
  const injectProfessionalSummary = (list) => {
    if (!personalInfo.professionalSummary?.trim()) return list;

    const summarySection = {
      id: "professionalSummary",
      title: "Professional Summary",
      entries: [{ summary: personalInfo.professionalSummary }],
    };

    const educationIndex = list.findIndex((s) => s.id === "education");
    if (educationIndex >= 0) {
      return [
        ...list.slice(0, educationIndex),
        summarySection,
        ...list.slice(educationIndex),
      ];
    }
    return [summarySection, ...list];
  };

  // Group skills by category and flatten to {category, skills}
  const normalizeSkills = (list) =>
    list.map((section) => {
      if (section.id !== "skills") return section;

      const groupedSkills = {};
      (section.entries || []).forEach((entry) => {
        const category = entry.category?.trim() || "Other";
        const value = entry.value?.trim();
        if (!value) return;
        if (!groupedSkills[category]) groupedSkills[category] = [];
        groupedSkills[category].push(value);
      });

      const entries = Object.entries(groupedSkills).map(([category, skills]) => ({
        category,
        skills: skills.join(", "),
      }));

      return { ...section, entries };
    });

  // Processed Sections
  const processedSections = normalizeSkills(injectProfessionalSummary(sections));

  // Template Map
  const templates = {
    classic: ClassicTemplate,
    modern: ModernTemplate,
    minimal: MinimalTemplate,
  };

  // Fallback to classic template
  const SelectedTemplate = templates[theme] || ClassicTemplate;

  return (
    <div
      id="resume-preview"
      style={{
        border: "1px solid #e6eefc",
        padding: 18,
        borderRadius: 8,
        background: "#fff",
        fontSize: "12px",
        lineHeight: 1.5,
        overflowWrap: "break-word",
      }}
    >
      <SelectedTemplate personalInfo={personalInfo} sections={processedSections} />
    </div>
  );
}
