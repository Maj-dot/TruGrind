import { useState, useEffect } from "react";
import { addProgress, updateProgress } from "../../services/progressService";

export default function ProgressForm({ refreshProgress, initialData }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    currentWeight: "",
    targetWeight: "",
    milesRun: "",
    weightsLifted: "",
    notes: "",
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setIsEditMode(true);
    } else {
      setIsEditMode(false);
    }
    console.log("isEditMode:", isEditMode);
  }, [initialData, isEditMode]);

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      if (initialData) {
        await updateProgress(initialData._id, formData);
        setIsEditMode(false);
      } else {
        await addProgress(formData);
      }
      refreshProgress();
    } catch (err) {
      console.error("Error adding/updating progress:", err);
    }
  }

  return (
    <>
      {isEditMode && (
        <div
          style={{
            padding: "10px",
            marginBottom: "20px",
            backgroundColor: "#ffcc00",
            color: "#000",
            textAlign: "center",
            fontWeight: "bold",
            borderRadius: "5px",
            fontSize: "18px",
          }}
        >
          Edit Mode: Updating Progress Entry
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="currentWeight"
          value={formData.currentWeight}
          onChange={handleChange}
          placeholder="Current Weight"
          required
        />
        <input
          type="number"
          name="targetWeight"
          value={formData.targetWeight}
          onChange={handleChange}
          placeholder="Target Weight"
          required
        />
        <input
          type="text"
          name="milesRun"
          value={formData.milesRun}
          onChange={handleChange}
          placeholder="Miles Run"
          required
        />
        <input
          type="text"
          name="weightsLifted"
          value={formData.weightsLifted}
          onChange={handleChange}
          placeholder="Weights Lifted"
          required
        />
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Notes"
        />
        <button type="submit">
          {initialData ? "Update Progress" : "Add Progress"}
        </button>
      </form>
    </>
  );
}
