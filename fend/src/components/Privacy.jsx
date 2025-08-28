import React from "react";
import { Shield, Server } from "lucide-react";

const Privacy = () => {
    return (
        <section className="py-4 px-6 mb-4">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Data, Our Priority</h2>
                <p className="text-gray-600 mb-10">
                    We ensure complete privacy of your files. Your uploads are never stored and are processed securely.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* No File Storage */}
                    <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm">
                        <Shield className="h-10 w-10 text-blue-600 mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900">No File Storage</h3>
                        <p className="text-gray-600 text-sm mt-2">
                            Uploaded files are never stored, not even temporarily.
                        </p>
                    </div>

                    {/* Private Processing */}
                    <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm">
                        <Server className="h-10 w-10 text-green-600 mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900">Private Processing</h3>
                        <p className="text-gray-600 text-sm mt-2">
                            Data is processed instantly on the server and sent back safely.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Privacy;
