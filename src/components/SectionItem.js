// src/components/EditableSection.js
import React from "react";

export default function EditableSection({ section, onChange }) {
  const handleInputChange = (entryIndex, field, value) => {
    const updatedEntries = [...section.entries];
    updatedEntries[entryIndex][field] = value;
    onChange(section.id, updatedEntries);
  };

  const addEntry = () => {
    const newEntry = {};
    const firstEntry = section.entries[0];
    if (firstEntry) {
      for (let key in firstEntry) {
        newEntry[key] = "";
      }
    } else {
      // Fallback if section.entries is empty
      newEntry["field1"] = "";
    }
    onChange(section.id, [...section.entries, newEntry]);
  };

  const removeEntry = (index) => {
    const updatedEntries = section.entries.filter((_, i) => i !== index);
    onChange(section.id, updatedEntries);
  };

  return (
    <div
      style={{
        padding: "1rem",
        background: "#fff",
        borderRadius: "8px",
        marginBottom: "2rem",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <h3 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>{section.title}</h3>

      {section.entries.map((entry, i) => (
        <div
          key={i}
          style={{
            marginBottom: "1.5rem",
            border: "1px solid #ddd",
            padding: "1rem",
            borderRadius: "6px",
            backgroundColor: "#f9fafb",
          }}
        >
          {Object.keys(entry).map((field) => (
            <input
              key={field}
              type="text"
              placeholder={field.replace(/_/g, " ")}
              value={entry[field]}
              onChange={(e) => handleInputChange(i, field, e.target.value)}
              style={{
                display: "block",
                marginBottom: "0.75rem",
                width: "100%",
                padding: "0.6rem 0.75rem",
                border: "1px solid #ccc",
                borderRadius: "4px",
                fontSize: "0.95rem",
              }}
            />
          ))}

          <button
            onClick={() => removeEntry(i)}
            style={{
              backgroundColor: "#ef4444",
              color: "#fff",
              padding: "0.4rem 0.75rem",
              fontSize: "0.875rem",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              marginTop: "0.5rem",
            }}
          >
            🗑 Remove
          </button>
        </div>
      ))}

      <button
        onClick={addEntry}
        style={{
          backgroundColor: "#10b981",
          color: "#fff",
          padding: "0.6rem 1rem",
          fontSize: "0.9rem",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        ➕ Add {section.title}
      </button>
    </div>
  );
}
