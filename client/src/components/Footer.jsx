import React from "react";
import { Link } from "react-router";

function Footer() {
  return (
    <footer className="bg-blue-100 text-gray-700 border-t shadow-inner border-none">

      <div className="max-w-4xl mx-auto px-3 py-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-10 text-center md:text-left">

        <div>
          <h2 className="text-xl press-start-2p-regular">
            TGPQuestionPaper
          </h2>

          <p className="mt-4 text-sm leading-relaxed text-gray-600">
             For any queries or to contribute question papers.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-4 text-gray-800 border-b pb-2">
            Quick Links
          </h3>

          <ul className="space-y-2 text-sm">
            <li><Link to="/" className=" transition">Home</Link></li>
            <li><Link to="/contact" className=" transition">Contact</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t text-center py-4 text-sm bg-blue-200 text-gray-700 font-medium border-none">
        © {new Date().getFullYear()} TGPQuestionPaper. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer