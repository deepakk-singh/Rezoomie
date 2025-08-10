import React from "react";

export default function MinimalTemplate({ personalInfo, sections }) {
  return (
    <div
      style={{
        fontFamily: "Helvetica, Arial, sans-serif",
        color: "#111",
        fontSize: 11,
        lineHeight: 1.5,
        padding: 16,
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 20, fontWeight: 700 }}>{personalInfo.fullName}</div>
        {personalInfo.jobTitle && (
          <div style={{ fontSize: 13, color: "#444", marginBottom: 4 }}>
            {personalInfo.jobTitle}
          </div>
        )}
        <div style={{ fontSize: 11, color: "#666" }}>
          {personalInfo.email}
          {personalInfo.email && personalInfo.phone && " • "}
          {personalInfo.phone}
          {personalInfo.phone && personalInfo.address && " • "}
          {personalInfo.address}
        </div>
        <div style={{ fontSize: 10, color: "#0073b1", marginTop: 4 }}>
          {personalInfo.linkedin}
          {personalInfo.linkedin && personalInfo.github && " • "}
          {personalInfo.github}
        </div>
      </div>

      {/* Resume Sections */}
      {sections.map((s) => (
        <div key={s.id} style={{ marginBottom: 20 }}>
          <h4
            style={{
              margin: "6px 0",
              fontSize: 13,
              borderBottom: "1px solid #ddd",
              paddingBottom: 4,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              color: "#222",
            }}
          >
            {s.title}
          </h4>

          {/* Summary */}
          {s.id === "professionalSummary" &&
            s.entries.map((e, i) => (
              <p key={i} style={{ margin: 0 }}>
                {e.summary}
              </p>
            ))}

          {/* Skills */}
          {s.id === "skills" &&
            s.entries.map((e, i) => (
              <div key={i} style={{ marginBottom: 6 }}>
                <strong>{e.category}:</strong> {e.skills}
              </div>
            ))}

          {/* Education */}
          {s.id === "education" &&
            s.entries.map((ed, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <strong>{ed.degree}</strong> — {ed.school}
                <div style={{ fontSize: 10, color: "#666" }}>
                  {ed.start_date}
                  {ed.start_date && " – "}
                  {ed.end_date}
                </div>
              </div>
            ))}

          {/* Experience */}
          {s.id === "experience" &&
            s.entries.map((e, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontWeight: 600,
                  }}
                >
                  <div>{e.jobTitle}</div>
                  <div style={{ fontSize: 10, color: "#666" }}>
                    {e.start_date}
                    {e.start_date && " – "}
                    {e.end_date}
                  </div>
                </div>
                <div style={{ fontSize: 11, color: "#444", marginBottom: 6 }}>
                  {e.company} {e.location && `(${e.location})`}
                </div>
                <ul style={{ marginLeft: 16 }}>
                  {(e.achievements || [])
                    .filter(Boolean)
                    .map((a, ai) => (
                      <li key={ai} style={{ fontSize: 11 }}>
                        {a}
                      </li>
                    ))}
                </ul>
              </div>
            ))}

          {/* Projects */}
          {s.id === "projects" &&
            s.entries.map((p, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <strong>{p.title}</strong>
                {p.technologies && (
                  <div style={{ fontSize: 10, color: "#666" }}>
                    {p.technologies}
                  </div>
                )}
                <p style={{ marginTop: 4 }}>{p.description}</p>
                {p.link && (
                  <a
                    href={p.link}
                    target="_blank"
                    rel="noreferrer"
                    style={{ fontSize: 10, color: "#0073b1" }}
                  >
                    {p.link}
                  </a>
                )}
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}
