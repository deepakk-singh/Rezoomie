// MinimalTemplate.js
import React from "react";

export default function MinimalTemplate({ personalInfo, sections }) {
  return (
    <div style={{ fontFamily: "Helvetica, Arial, sans-serif", color: "#111" }}>
      <div style={{ marginBottom: 10 }}>
        <div style={{ fontSize: 20, fontWeight: 700 }}>{personalInfo.fullName}</div>
        <div style={{ fontSize: 13, color: "#444" }}>{personalInfo.jobTitle}</div>
        <div style={{ fontSize: 13, color: "#666" }}>{personalInfo.email} • {personalInfo.phone}</div>
      </div>

      {sections.map((s) => (
        <div key={s.id} style={{ marginBottom: 12 }}>
          <h4 style={{ margin: "6px 0" }}>{s.title}</h4>

          {s.id === "professionalSummary" && s.entries.map((e, i) => <p key={i}>{e.summary}</p>)}

          {s.id === "skills" && s.entries.map((e,i)=> <div key={i}><strong>{e.category}:</strong> {e.skills}</div>)}

          {s.id === "education" && s.entries.map((ed,i)=> <div key={i}><strong>{ed.degree}</strong> — {ed.school} <div style={{fontSize:12,color:"#666"}}>{ed.start_date} {ed.start_date && "–"} {ed.end_date}</div></div>)}

          {s.id === "experience" && s.entries.map((e,i)=> <div key={i}><div style={{display:"flex",justifyContent:"space-between"}}><strong>{e.jobTitle}</strong><span style={{fontSize:12,color:"#666"}}>{e.start_date} {e.start_date && "–"} {e.end_date}</span></div><div style={{fontSize:12,color:"#444"}}>{e.company}</div><ul>{(e.achievements||[]).filter(Boolean).map((a,ai)=> <li key={ai}>{a}</li>)}</ul></div>)}

          {s.id === "projects" && s.entries.map((p,i)=> <div key={i}><strong>{p.title}</strong><div style={{fontSize:12,color:"#666"}}>{p.technologies}</div><p>{p.description}</p></div>)}
        </div>
      ))}
    </div>
  );
}
