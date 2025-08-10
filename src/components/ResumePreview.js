// ResumePreview.js
import React from "react";
import ClassicTemplate from "./templates/ClassicTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";

/**
 * Prepares sections (injects summary, groups skills)
 * and renders the selected template.
 */
export default function ResumePreview({ sections, theme, personalInfo }) {
  // 1) Insert professional summary before education
  const insertProfessionalSummary = (list) => {
    if (!personalInfo.professionalSummary) return list;
    const summarySection = {
      id: "professionalSummary",
      title: "Professional Summary",
      entries: [{ summary: personalInfo.professionalSummary }],
    };
    const idx = list.findIndex((s) => s.id === "education");
    if (idx >= 0) {
      return [...list.slice(0, idx), summarySection, ...list.slice(idx)];
    }
    return [summarySection, ...list];
  };

  // 2) Group skills: convert many entries into category -> string skills
  const formatSkills = (list) =>
    list.map((sec) => {
      if (sec.id !== "skills") return sec;
      const grouped = {};
      (sec.entries || []).forEach((e) => {
        const cat = e.category || "Other";
        const val = (e.value || "").trim();
        if (!val) return;
        if (!grouped[cat]) grouped[cat] = [];
        grouped[cat].push(val);
      });
      // turn into entries: [{category, skills}]
      const entries = Object.entries(grouped).map(([category, arr]) => ({
        category,
        skills: arr.join(", "),
      }));
      return { ...sec, entries };
    });

  const processed = formatSkills(insertProfessionalSummary(sections));

  const props = { personalInfo, sections: processed };
  const map = { classic: ClassicTemplate, modern: ModernTemplate, minimal: MinimalTemplate };
  const Selected = map[theme] || ClassicTemplate;

  return (
    <div
      id="resume-preview"
      style={{
        border: "1px solid #e6eefc",
        padding: 18,
        borderRadius: 8,
        background: "#fff",
      }}
    >
      <Selected {...props} />
    </div>
  );
}
