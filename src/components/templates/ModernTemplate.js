// ModernTemplate.js
import React from "react";

export default function ModernTemplate({ personalInfo, sections }) {
  const accent = "#0b76ff";
  return (
    <div style={{ fontFamily: "Arial, sans-serif", color: "#111" }}>
      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: accent }}>{personalInfo.fullName}</div>
          <div style={{ color: "#444" }}>{personalInfo.jobTitle}</div>
          <div style={{ marginTop: 6, fontSize: 13 }}>{personalInfo.email} • {personalInfo.phone}</div>
        </div>
      </div>

      {sections.map((s) => (
        <div key={s.id} style={{ marginBottom: 12 }}>
          <h3 style={{ margin: "6px 0", color: accent }}>{s.title}</h3>

          {s.id === "professionalSummary" && s.entries.map((e,i)=> <p key={i}>{e.summary}</p>)}

          {s.id === "skills" && (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {s.entries.map((e,i)=> <div key={i}><strong>{e.category}:</strong> {e.skills}</div>)}
            </div>
          )}

          {s.id === "experience" && s.entries.map((e,i)=>(
            <div key={i} style={{ marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div><strong>{e.jobTitle}</strong><div style={{fontSize:12,color:"#666"}}>{e.company} • {e.location}</div></div>
                <div style={{fontSize:13,color:"#666"}}>{e.start_date} {e.start_date && "–"} {e.end_date}</div>
              </div>
              <ul>
                {(e.achievements||[]).filter(Boolean).map((a, ai)=> <li key={ai}>{a}</li>)}
              </ul>
            </div>
          ))}

          {s.id === "projects" && s.entries.map((p,i)=>(
            <div key={i}><strong>{p.title}</strong><div style={{fontSize:12,color:"#666"}}>{p.technologies}</div><p>{p.description}</p>{p.link && <a href={p.link}>{p.link}</a>}</div>
          ))}

          {s.id === "education" && s.entries.map((ed,i)=>(
            <div key={i}><strong>{ed.degree}</strong> — {ed.school} <div style={{fontSize:12,color:"#666"}}>{ed.start_date} {ed.start_date && "–"} {ed.end_date}</div></div>
          ))}

        </div>
      ))}
    </div>
  );
}
