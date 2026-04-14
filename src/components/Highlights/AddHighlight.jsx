import React, { useState } from "react";
import apiClient from "../../utils/apiclient";

const AddHighlight = ({ restaurantId }) => {

  const [file, setFile] = useState(null);
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!file || !type) {
      alert("Please select file and type");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", file);
      formData.append("type", type);

      const res = await apiClient.post(
        `/highlight/${restaurantId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(res.data);
      alert("Image uploaded successfully");

      // reset
      setFile(null);
      setType("");

    } catch (e) {
      console.error(e);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 border rounded w-96">

      <h2 className="font-bold mb-3">Add Highlight Image</h2>

      {/* 📂 FILE INPUT */}
      <input
        type="file"
        className="mb-3"
        onChange={(e) => setFile(e.target.files[0])}
      />

      {/* 🔽 DROPDOWN */}
      <select
        className="border p-2 w-full mb-3"
        value={type}
        onChange={(e) => setType(e.target.value)}
      >
        <option value="">Select Type</option>
        <option value="hygiene">Hygiene</option>
        <option value="packaging">Packaging</option>
        <option value="preparation">Preparation</option>
      </select>

      {/* 🚀 SUBMIT */}
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>

    </div>
  );
};

export default AddHighlight;