// src/components/EditableSection.js
import React from "react";

export default function EditableSection({ section, onChange }) {
  const handleEntryChange = (index, field, value) => {
    const updatedEntries = [...section.entries];
    updatedEntries[index] = { ...updatedEntries[index], [field]: value };
    onChange(section.id, updatedEntries);
  };

  const addEntry = () => {
    const templates = {
      skills: { category: "", value: "" },
      education: { school: "", degree: "", start_date: "", end_date: "" },
      experience: {
        company: "",
        jobTitle: "",
        location: "",
        start_date: "",
        end_date: "",
        achievements: "",
      },
      projects: { title: "", technologies: "", description: "", link: "" },
      certifications: { name: "", issuer: "", date: "" },
    };

    const emptyEntry = templates[section.id] || { value: "" };
    onChange(section.id, [...section.entries, emptyEntry]);
  };

  const removeEntry = (index) => {
    const updatedEntries = section.entries.filter((_, i) => i !== index);
    onChange(section.id, updatedEntries);
  };

  const renderFields = (entry, index) =>
    Object.entries(entry).map(([field, value]) => (
      <div key={field} style={{ marginBottom: "0.75rem" }}>
        <label
          htmlFor={`${section.id}-${index}-${field}`}
          style={{
            display: "block",
            marginBottom: "0.25rem",
            fontWeight: 500,
            color: "#333",
            fontSize: "0.9rem",
          }}
        >
          {field.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
        </label>
        <input
          id={`${section.id}-${index}-${field}`}
          type="text"
          value={value}
          onChange={(e) => handleEntryChange(index, field, e.target.value)}
          placeholder={`Enter ${field}`}
          style={{
            width: "100%",
            padding: "0.5rem",
            border: "1px solid #ccc",
            borderRadius: "6px",
            fontSize: "0.95rem",
          }}
        />
      </div>
    ));

  return (
    <div
      style={{
        padding: "1rem",
        backgroundColor: "#fff",
        border: "1px solid #eee",
        borderRadius: "8px",
        marginBottom: "1.5rem",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
      }}
    >
      <h3
        style={{
          fontSize: "1.2rem",
          fontWeight: 600,
          marginBottom: "1rem",
          color: "#0b76ff",
        }}
      >
        {section.title}
      </h3>

      {section.entries.length === 0 ? (
        <p style={{ fontStyle: "italic", color: "#999" }}>No entries yet.</p>
      ) : (
        section.entries.map((entry, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              borderRadius: "6px",
              padding: "1rem",
              marginBottom: "1rem",
              backgroundColor: "#f9fafb",
            }}
          >
            {renderFields(entry, index)}

            <button
              onClick={() => removeEntry(index)}
              style={{
                background: "#dc3545",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                padding: "0.4rem 0.8rem",
                fontSize: "0.85rem",
                cursor: "pointer",
              }}
            >
              🗑 Remove
            </button>
          </div>
        ))
      )}

      <div style={{ textAlign: "right", marginTop: "1rem" }}>
        <button
          onClick={addEntry}
          style={{
            background: "#0b76ff",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            padding: "0.5rem 1rem",
            fontSize: "0.9rem",
            cursor: "pointer",
          }}
        >
          ➕ Add {section.title}
        </button>
      </div>
    </div>
  );
}
