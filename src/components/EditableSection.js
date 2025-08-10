// src/components/EditableSection.js
import React from "react";

export default function EditableSection({ section, onChange }) {
  const handleEntryChange = (index, field, value) => {
    const updatedEntries = [...section.entries];
    updatedEntries[index] = { ...updatedEntries[index], [field]: value };
    onChange(section.id, updatedEntries);
  };

  const addEntry = () => {
    const emptyEntry =
      section.id === "skills"
        ? { category: "", value: "" }
        : section.id === "education"
        ? { school: "", degree: "", year: "" }
        : section.id === "experience"
        ? { company: "", position: "", duration: "" }
        : section.id === "projects"
        ? { title: "", description: "" }
        : section.id === "certifications"
        ? { value: "" }
        : {};

    onChange(section.id, [...section.entries, emptyEntry]);
  };

  const removeEntry = (index) => {
    const updatedEntries = section.entries.filter((_, i) => i !== index);
    onChange(section.id, updatedEntries);
  };

  const renderFields = (entry, index) => {
    return Object.entries(entry).map(([field, value]) => (
      <div key={field} style={{ marginBottom: "0.4rem" }}>
        <label style={{ display: "block", marginBottom: "0.2rem" }}>
          {field.charAt(0).toUpperCase() + field.slice(1)}:
        </label>
        <input
          type="text"
          value={value}
          onChange={(e) => handleEntryChange(index, field, e.target.value)}
          placeholder={`Enter ${field}`}
          style={{
            width: "100%",
            padding: "0.4rem",
            border: "1px solid #ccc",
            borderRadius: "4px"
          }}
        />
      </div>
    ));
  };

  return (
    <div style={{ padding: "0.5rem" }}>
      {section.entries.length === 0 ? (
        <p style={{ fontStyle: "italic", color: "#999" }}>No entries yet</p>
      ) : (
        section.entries.map((entry, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              padding: "0.5rem",
              borderRadius: "4px",
              marginBottom: "0.6rem",
              background: "#fafafa"
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
                padding: "0.3rem 0.6rem",
                cursor: "pointer",
                marginTop: "0.4rem"
              }}
            >
              Remove
            </button>
          </div>
        ))
      )}

      <button
        onClick={addEntry}
        style={{
          background: "#28a745",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          padding: "0.4rem 0.8rem",
          cursor: "pointer"
        }}
      >
        + Add Entry
      </button>
    </div>
  );
}
