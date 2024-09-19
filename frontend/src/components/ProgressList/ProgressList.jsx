import { deleteProgress } from "../../services/progressService";

const ProgressList = ({
  progressEntries,
  setProgressEntries,
  setEditEntry,
}) => {
  const handleDelete = async (id) => {
    try {
      await deleteProgress(id);
      setProgressEntries((prevEntries) =>
        prevEntries.filter((entry) => entry._id !== id)
      );
    } catch (err) {
      console.error("Failed to delete progress entry:", err);
    }
  };
  return (
    <div>
      <h2>Progress Entries</h2>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Current Weight</th>
            <th>Target Weight</th>
            <th>Miles Run</th>
            <th>Weights Lifted</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {progressEntries.map((entry, index) => (
            <tr key={index}>
              <td>{new Date(entry.date).toLocaleDateString()}</td>
              <td>{entry.currentWeight}</td>
              <td>{entry.targetWeight}</td>
              <td>{entry.milesRun}</td>
              <td>{entry.weightsLifted}</td>
              <td>{entry.notes}</td>
              <td>
                <button onClick={() => setEditEntry(entry)}>Edit</button>
                <button onClick={() => handleDelete(entry._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProgressList;
