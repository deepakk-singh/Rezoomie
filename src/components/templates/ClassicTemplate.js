// ClassicTemplate.js
import React from "react";

function SectionTitle({ children }) {
  return (
    <h3 style={{ margin: "10px 0 8px", borderBottom: "1px solid #ddd", paddingBottom: 6 }}>
      {children}
    </h3>
  );
}

export default function ClassicTemplate({ personalInfo, sections }) {
  return (
    <div style={{ fontFamily: "Georgia, serif", color: "#111" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 10 }}>
        <div style={{ fontSize: 24, fontWeight: 800 }}>{personalInfo.fullName}</div>
        {personalInfo.jobTitle && <div style={{ fontStyle: "italic", color: "#444" }}>{personalInfo.jobTitle}</div>}
        <div style={{ marginTop: 6, fontSize: 13, color: "#333" }}>
          {personalInfo.email} {personalInfo.email && " | "} {personalInfo.phone} {personalInfo.phone && " | "} {personalInfo.address}
        </div>
        <div style={{ marginTop: 4, fontSize: 13, color: "#0073b1" }}>
          {personalInfo.linkedin} {personalInfo.linkedin && " | "} {personalInfo.github}
        </div>
      </div>

      {/* Sections */}
      {sections.map((s) => (
        <section key={s.id} style={{ marginBottom: 12 }}>
          <SectionTitle>{s.title}</SectionTitle>

          {/* Professional summary */}
          {s.id === "professionalSummary" && s.entries.map((e, i) => <p key={i} style={{ margin: 0, textAlign: "justify" }}>{e.summary}</p>)}

          {/* Skills: s.entries = [{category, skills}] */}
          {s.id === "skills" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {s.entries.map((e, i) => (
                <div key={i}><strong>{e.category}:</strong> {e.skills}</div>
              ))}
            </div>
          )}

          {/* Education */}
          {s.id === "education" &&
            s.entries.map((e, i) => (
              <div key={i} style={{ marginBottom: 6 }}>
                <div><strong>{e.degree}</strong> — {e.school}</div>
                <div style={{ color: "#555", fontSize: 13 }}>{e.start_date} {e.start_date && "–"} {e.end_date}</div>
              </div>
            ))}

          {/* Experience */}
          {s.id === "experience" &&
            s.entries.map((e, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <div><strong>{e.jobTitle}</strong> — {e.company} {e.location && `(${e.location})`}</div>
                  <div style={{ color: "#555", fontSize: 13 }}>{e.start_date} {e.start_date && "–"} {e.end_date}</div>
                </div>
                <ul style={{ marginTop: 6 }}>
                  {(e.achievements || []).filter(Boolean).map((a, ai) => <li key={ai} style={{ marginBottom: 4 }}>{a}</li>)}
                </ul>
              </div>
            ))}

          {/* Projects */}
          {s.id === "projects" &&
            s.entries.map((p, i) => (
              <div key={i} style={{ marginBottom: 8 }}>
                <div><strong>{p.title}</strong> {p.technologies && <em>— {p.technologies}</em>}</div>
                <div style={{ marginTop: 4 }}>{p.description}</div>
                {p.link && <div style={{ marginTop: 4 }}><a href={p.link} target="_blank" rel="noreferrer">{p.link}</a></div>}
              </div>
            ))}

          {/* Certifications or other sections simple render */}
          {["certifications"].includes(s.id) &&
            s.entries.map((c, i) => (
              <div key={i} style={{ marginBottom: 6 }}>
                <div><strong>{c.name}</strong> — {c.issuer}</div>
                <div style={{ color: "#555", fontSize: 13 }}>{c.date}</div>
              </div>
            ))}

          {/* Generic fallback */}
          {!["professionalSummary","skills","education","experience","projects","certifications"].includes(s.id) &&
            s.entries.map((entry, i) => (
              <div key={i} style={{ marginBottom: 6 }}>
                {Object.entries(entry).map(([k, v]) => v && <div key={k}><strong>{k.replace(/_/g," ")}</strong>: {v}</div>)}
              </div>
            ))}
        </section>
      ))}
    </div>
  );
}
