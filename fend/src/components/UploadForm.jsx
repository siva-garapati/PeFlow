import React, { useState, useCallback, useRef } from "react";
import axios from "axios";
import { Upload, FileText, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UploadForm = ({ setData }) => {
    const [dragActive, setDragActive] = useState(false);
    const [file, setFile] = useState(null);
    const navigate = useNavigate();
    const [status, setStatus] = useState({
        msg: "",
        loading: false,
    });
    const fileInputRef = useRef(null);

    // Drag events
    const handleDrag = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
        if (e.type === "dragleave") setDragActive(false);
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        const droppedFile = e.dataTransfer.files && e.dataTransfer.files[0];
        if (droppedFile) {
            if (droppedFile.type !== "application/pdf") {
                setStatus((s) => ({ ...s, msg: "Only PDF files are allowed." }));
            } else {
                setFile(droppedFile);
                setStatus((s) => ({ ...s, msg: "" }));
            }
        }
    }, []);

    // File selection
    const handleFile = (e) => {
        const selected = e.target.files && e.target.files[0];
        if (selected) {
            if (selected.type !== "application/pdf") {
                setStatus((s) => ({ ...s, msg: "Only PDF files are allowed." }));
            } else {
                setFile(selected);
                setStatus((s) => ({ ...s, msg: "" }));
            }
        }
    };

    const removeFile = (e) => {
        e.stopPropagation(); // 👈 prevent bubbling to file input
        e.preventDefault();
        setFile(null);
        setStatus((s) => ({ ...s, msg: "" }));

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSubmit = async () => {
        if (!file) {
            setStatus((s) => ({ ...s, msg: "Please select a file." }));
            return;
        }

        setStatus((s) => ({ ...s, loading: true, msg: "" }));
        setData("");

        try {
            const formData = new FormData();
            formData.append("file", file);

            const res = await axios.post(
                `${import.meta.env.VITE_API_URL}/parse`,
                formData
            );

            if (!res.data.success || res.data?.transactions?.length === 0) {
                setStatus((s) => ({ ...s, msg: "No data in the file" }));
            } else {
                setData(res.data);
                // ✅ Clear only on success
                
                setFile(null);
                if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                }
                navigate('/insights'); // Navigate to insights page
            }
        } catch {
            setStatus((s) => ({ ...s, msg: "Error in parsing file" }));
        } finally {
            setStatus((s) => ({ ...s, loading: false }));
            setFile(null)
        }
    };

    return (
        <div className="w-full max-w-lg sm:max-w-xl mt-8 sm:my-22 mx-auto overflow-hidden rounded-xl border border-gray-200 p-4 sm:p-5">
            {/* <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5 sm:p-8"> */}
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-5 text-center">
                    Upload your Transactions PDF
                </h2>

                {/* Drag/Drop and Browse zone */}
                <div
                    className={`relative border-2 border-dashed rounded-xl p-3 sm:p-8 mb-6 transition
          ${dragActive ? "bg-blue-50 border-blue-400" : "bg-gray-50 border-gray-200"}
          ${!file && "hover:bg-gray-100 hover:border-gray-400"}
          ${status.loading ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    <input
                        type="file"
                        onChange={handleFile}
                        accept="application/pdf"
                        className={`absolute inset-0 opacity-0 w-full h-full
                        ${status.loading ? "cursor-not-allowed" : "cursor-pointer"}`}
                        disabled={status.loading}
                        ref={fileInputRef}
                    />

                    {file ? (
                        <div className="flex items-center justify-between bg-gray-100 rounded-lg px-1 sm:px-4 py-3 overflow-hidden">
                            <div className="flex items-center gap-2 sm:gap-3">
                            <FileText className="text-purple-700 w-5 h-5 sm:w-7 sm:h-7 lg:w-8 lg:h-8" size={28} />
                                <div>
                                    <p className="font-medium text-gray-800 text-sm sm:text-base truncate max-w-[200px] sm:max-w-[280px]">
                                        {file.name}
                                    </p>
                                    <p className="text-xs sm:text-sm text-gray-500">
                                        {(file.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                </div>
                            </div>
                            <button
                                type="button"
                                className={`text-red-500 hover:text-red-600 z-10
                                    ${status.loading ? "cursor-not-allowed" : "cursor-pointer"}`}
                                onClick={removeFile}
                                disabled={status.loading}
                            >
                                <X size={20} />
                            </button>
                        </div>
                    ) : (
                        <div className="text-center">
                            <Upload size={40} className="mx-auto text-gray-400 mb-3" />
                            <p className="font-medium text-gray-700 text-sm sm:text-base">
                                Drop your PDF here or click to browse
                            </p>
                            <p className="text-xs text-gray-500">Only PDF files are supported</p>
                        </div>
                    )}
                </div>

                {file && (
                    <button
                        onClick={handleSubmit}
                        disabled={status.loading || !file}
                        className="w-full bg-purple-700 text-white py-2 sm:py-2.5 rounded-lg font-semibold hover:bg-purple-800 transition disabled:opacity-50 text-sm sm:text-base cursor-pointer"
                    >
                        {status.loading ? "Analyzing..." : "Analyze Statements"}
                    </button>
                )}

                {/* {status.loading && (
                    <p className="mt-3 text-xs sm:text-sm text-blue-600">
                        Uploading your file...
                    </p>
                )} */}
                {/* {status.msg && (
                    <p
                        className={`mt-3 text-xs sm:text-sm ${status.msg.toLowerCase().includes("error")
                                ? "text-red-600"
                                : "text-gray-700"
                            }`}
                    >
                        {status.msg}
                    </p>
                )} */}
        </div>
    );
};

export default UploadForm;