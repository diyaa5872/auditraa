import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import {
  IconChecklist,
  IconChevronDown,
  IconChevronUp,
} from "@tabler/icons-react";

interface ResultsModalProps {
  isOpen: boolean;
  closeModal: () => void;
  loading: boolean;
  results: any; // Consider typing this more specifically if possible
}

interface MetricScore {
  metric: string;
  score: number;
}

interface AuditReportSection {
  section: string;
  details: string | MetricScore[];
}

const ResultsModal: React.FC<ResultsModalProps> = ({
  isOpen,
  closeModal,
  loading,
  results,
}) => {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setExpandedSection((prevSection) =>
      prevSection === section ? null : section
    );
  };

  // Check if results is defined and is an array
  const auditReport = results && Array.isArray(results)
    ? results.find((r: any) => r.section === "Audit Report")
    : null;

  return (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      className="fixed z-10 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen px-4 text-center">
        <div className="fixed inset-0 bg-black opacity-50" aria-hidden="true"></div>
        {loading ? (
          <div className="bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden z-50 shadow-xl transform transition-all max-w-lg w-full p-8 space-y-8">
            <div className="flex py-14 flex-col items-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-14 w-14 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8V4a8 8 0 00-8 8z"
                ></path>
              </svg>
              <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
                Analyzing smart contract...
              </p>
            </div>
          </div>
        ) : (
          results && (
            <div className="bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden z-50 shadow-xl transform transition-all max-w-3xl w-full p-8 space-y-8">
              <div className="space-y-8">
                <div className="flex justify-between items-start">
                  <h2 className="text-3xl font-bold text-gray-100 dark:text-gray-100">
                    Audit Results
                  </h2>
                </div>
                <div className="text-left">
                  <h3
                    className="text-xl space-x-2 cursor-pointer flex items-center justify-between mb-4 dark:text-gray-200"
                    onClick={() => toggleSection("auditReport")}
                  >
                    <div className="flex items-center space-x-2">
                      <IconChecklist size={24} />
                      <span>Audit Report</span>
                    </div>
                    {expandedSection === "auditReport" ? (
                      <IconChevronUp size={24} />
                    ) : (
                      <IconChevronDown size={24} />
                    )}
                  </h3>
                  {expandedSection === "auditReport" && auditReport && (
                    <div>
                      {/* Assuming details can be a string or array of MetricScore */}
                      {typeof auditReport.details === "string" ? (
                        <p className="text-base text-gray-700 dark:text-gray-300">
                          {auditReport.details}
                        </p>
                      ) : (
                        <ul className="text-base text-gray-700 dark:text-gray-300">
                          {auditReport.details.map((metric: MetricScore, index: number) => (
                            <li key={index}>
                              {metric.metric}: {metric.score}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
                <div className="text-left">
                  <h3
                    className="text-xl space-x-2 cursor-pointer flex items-center justify-between mb-4 dark:text-gray-200"
                    onClick={() => toggleSection("suggestions")}
                  >
                    <div className="flex items-center space-x-2">
                      <IconChecklist size={24} />
                      <span>Suggestions for Improvement</span>
                    </div>
                    {expandedSection === "suggestions" ? (
                      <IconChevronUp size={24} />
                    ) : (
                      <IconChevronDown size={24} />
                    )}
                  </h3>
                  {expandedSection === "suggestions" && auditReport && (
                    <p className="text-base text-gray-700 dark:text-gray-300">
                      {auditReport.details}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </Dialog>
  );
};

export default ResultsModal;


// import React, { useState } from "react";
// import { Dialog } from "@headlessui/react";
// import {
//   IconChecklist,
//   IconChevronDown,
//   IconChevronUp,
// } from "@tabler/icons-react";

// interface ResultsModalProps {
//   isOpen: boolean;
//   closeModal: () => void;
//   loading: boolean;
//   results: any;
// }

// const ResultsModal: React.FC<ResultsModalProps> = ({
//   isOpen,
//   closeModal,
//   loading,
//   results,
// }) => {
//   const [expandedSection, setExpandedSection] = useState<string | null>(null);

//   const toggleSection = (section: string) => {
//     setExpandedSection((prevSection) =>
//       prevSection === section ? null : section
//     );
//   };

//   // Check if results is defined and is an array
//   const auditReport = results && Array.isArray(results)
//     ? results.find((r: any) => r.section === "Audit Report")
//     : null;

//   return (
//     <Dialog
//       open={isOpen}
//       onClose={closeModal}
//       className="fixed z-10 inset-0 overflow-y-auto"
//     >
//       <div className="flex items-center justify-center min-h-screen px-4 text-center">
//         <div className="fixed inset-0 bg-black opacity-50" aria-hidden="true"></div>
//         {loading ? (
//           <div className="bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden z-50 shadow-xl transform transition-all max-w-lg w-full p-8 space-y-8">
//             <div className="flex py-14 flex-col items-center">
//               <svg
//                 className="animate-spin -ml-1 mr-3 h-14 w-14 text-blue-600"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="none"
//                 viewBox="0 0 24 24"
//               >
//                 <circle
//                   className="opacity-25"
//                   cx="12"
//                   cy="12"
//                   r="10"
//                   stroke="currentColor"
//                   strokeWidth="4"
//                 ></circle>
//                 <path
//                   className="opacity-75"
//                   fill="currentColor"
//                   d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8V4a8 8 0 00-8 8z"
//                 ></path>
//               </svg>
//               <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
//                 Analyzing smart contract...
//               </p>
//             </div>
//           </div>
//         ) : (
//           results && (
//             <div className="bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden z-50 shadow-xl transform transition-all max-w-3xl w-full p-8 space-y-8">
//               <div className="space-y-8">
//                 <div className="flex justify-between items-start">
//                   <h2 className="text-3xl font-bold text-gray-100 dark:text-gray-100">
//                     Audit Results
//                   </h2>
//                 </div>
//                 <div className="text-left">
//                   <h3
//                     className="text-xl space-x-2 cursor-pointer flex items-center justify-between mb-4 dark:text-gray-200"
//                     onClick={() => toggleSection("auditReport")}
//                   >
//                     <div className="flex items-center space-x-2">
//                       <IconChecklist size={24} />
//                       <span>Audit Report</span>
//                     </div>
//                     {expandedSection === "auditReport" ? (
//                       <IconChevronUp size={24} />
//                     ) : (
//                       <IconChevronDown size={24} />
//                     )}
//                   </h3>
//                   {expandedSection === "auditReport" && auditReport && (
//                     <p className="text-base text-gray-700 dark:text-gray-300">
//                       {auditDetails}
//                     </p>
//                   )}
//                 </div>
//                 <div className="text-left">
//                   <h3
//                     className="text-xl space-x-2 cursor-pointer flex items-center justify-between mb-4 dark:text-gray-200"
//                     onClick={() => toggleSection("auditReport")}
//                   >
//                     <div className="flex items-center space-x-2">
//                       <IconChecklist size={24} />
//                       <span>Suggestions for Improvement</span>
//                     </div>
//                     {expandedSection === "suggestions" ? (
//                       <IconChevronUp size={24} />
//                     ) : (
//                       <IconChevronDown size={24} />
//                     )}
//                   </h3>
//                   {expandedSection === "suggestions" && auditReport && (
//                     <p className="text-base text-gray-700 dark:text-gray-300">
//                       {auditReport.details}
//                     </p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )
//         )}
//       </div>
//     </Dialog>
//   );
// };

// export default ResultsModal;
