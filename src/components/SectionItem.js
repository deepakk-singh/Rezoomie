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
    for (let key in section.entries[0]) {
      newEntry[key] = "";
    }
    onChange(section.id, [...section.entries, newEntry]);
  };

  const removeEntry = (index) => {
    const updatedEntries = section.entries.filter((_, i) => i !== index);
    onChange(section.id, updatedEntries);
  };

  return (
    <div style={{ padding: "1rem", background: "#fff", borderRadius: "6px" }}>
      <h3>{section.title}</h3>
      {section.entries.map((entry, i) => (
        <div key={i} style={{ marginBottom: "1rem", border: "1px solid #ddd", padding: "0.5rem" }}>
          {Object.keys(entry).map((field) => (
            <input
              key={field}
              type="text"
              placeholder={field}
              value={entry[field]}
              onChange={(e) => handleInputChange(i, field, e.target.value)}
              style={{
                display: "block",
                marginBottom: "0.5rem",
                width: "100%",
                padding: "0.5rem",
              }}
            />
          ))}
          <button onClick={() => removeEntry(i)} style={{ background: "red", color: "white", padding: "0.25rem 0.5rem" }}>
            Remove
          </button>
        </div>
      ))}
      <button onClick={addEntry} style={{ background: "green", color: "white", padding: "0.5rem 1rem" }}>
        + Add {section.title}
      </button>
    </div>
  );
}
