import React from "react";

export default function ModernTemplate({ personalInfo, sections }) {
  const accent = "#0b76ff";

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        color: "#111",
        fontSize: 11,
        lineHeight: 1.6,
        padding: 16,
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 22, fontWeight: 800, color: accent }}>
            {personalInfo.fullName}
          </div>
          {personalInfo.jobTitle && (
            <div style={{ fontSize: 13, color: "#444" }}>
              {personalInfo.jobTitle}
            </div>
          )}
          <div style={{ marginTop: 6, fontSize: 11, color: "#555" }}>
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
      </div>

      {/* Sections */}
      {sections.map((s) => (
        <div key={s.id} style={{ marginBottom: 24 }}>
          <h3
            style={{
              margin: "0 0 8px",
              color: accent,
              fontSize: 13,
              textTransform: "uppercase",
              letterSpacing: 0.5,
              borderBottom: "1px solid #ddd",
              paddingBottom: 4,
            }}
          >
            {s.title}
          </h3>

          {/* Professional Summary */}
          {s.id === "professionalSummary" &&
            s.entries.map((e, i) => (
              <p key={i} style={{ margin: 0 }}>
                {e.summary}
              </p>
            ))}

          {/* Skills */}
          {s.id === "skills" && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 8,
              }}
            >
              {s.entries.map((e, i) => (
                <div key={i} style={{ fontSize: 11 }}>
                  <strong>{e.category}:</strong> {e.skills}
                </div>
              ))}
            </div>
          )}

          {/* Experience */}
          {s.id === "experience" &&
            s.entries.map((e, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontWeight: 600,
                  }}
                >
                  <div>
                    {e.jobTitle}
                    <div
                      style={{ fontSize: 11, fontWeight: 400, color: "#666" }}
                    >
                      {e.company} • {e.location}
                    </div>
                  </div>
                  <div style={{ fontSize: 10, color: "#666" }}>
                    {e.start_date}
                    {e.start_date && " – "}
                    {e.end_date}
                  </div>
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
                    style={{ fontSize: 10, color: "#0b76ff" }}
                  >
                    {p.link}
                  </a>
                )}
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
        </div>
      ))}
    </div>
  );
}
