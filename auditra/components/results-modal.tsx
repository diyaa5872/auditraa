import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import {
  IconChecklist,
  IconChevronDown,
  IconChevronUp,
  IconCircleCheck,
  IconGauge,
} from "@tabler/icons-react";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";

interface ResultsModalProps {
  isOpen: boolean;
  closeModal: () => void;
  loading: boolean;
  results: AuditReportSection[] | null; // Use more specific type
}

interface MetricScore {
  metric: string;
  score: number;
}

interface Suggestion {
  suggestion: string;
}

interface AuditReportSection {
  section: string;
  details: string | MetricScore[] | Suggestion[]; // Updated to include Suggestion[] type
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

  // Safely access results
  const auditReport = Array.isArray(results)
    ? results.find((r) => r.section === "Audit Report")
    : null;

  const metricScores = Array.isArray(results)
    ? results.find((r) => r.section === "Metric Scores")
    : null;

  const suggestions = Array.isArray(results)
    ? results.find((r) => r.section === "Suggestions for Improvement")
    : null;

  return (
    <Dialog
      open={isOpen}
      onClose={closeModal}
      className="fixed z-10 inset-0 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen px-4 text-center">
        <div
          className="fixed inset-0 bg-black opacity-50"
          aria-hidden="true"
        ></div>
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
                Analyzing Smart Contract...
              </p>
            </div>
          </div>
        ) : (
          results &&
          Array.isArray(results) && (
            <div className="bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden z-50 shadow-xl transform transition-all max-w-3xl w-full p-8 space-y-8">
              <div className="space-y-8">
                <div className="flex justify-between items-start">
                  <h2 className="text-3xl font-bold text-gray-100 dark:text-gray-100">
                    Audit Results
                  </h2>
                </div>
                {/* Audit Report Section */}
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
                  {expandedSection === "auditReport" && (
                    <div className="text-base text-gray-300">
                      {auditReport ? (
                        // Check if the details is a string
                        typeof auditReport.details === "string" ? (
                          <p>{auditReport.details}</p>
                        ) : (
                          // Check if the details is an array of MetricScore or Suggestion
                          <ul>
                            {Array.isArray(auditReport.details) &&
                              auditReport.details.map((detail) => {
                                if ("metric" in detail && "score" in detail) {
                                  // Handle MetricScore type
                                  const metricScore = detail as MetricScore;
                                  return (
                                    <li key={metricScore.metric}>
                                      <strong>{metricScore.metric}:</strong>{" "}
                                      {metricScore.score}
                                    </li>
                                  );
                                } else if ("suggestion" in detail) {
                                  // Handle Suggestion type
                                  const suggestion = detail as Suggestion;
                                  return (
                                    <li key={suggestion.suggestion}>
                                      <strong>Suggestion:</strong>{" "}
                                      {suggestion.suggestion}
                                    </li>
                                  );
                                } else {
                                  return null; // Handle any unexpected type
                                }
                              })}
                          </ul>
                        )
                      ) : (
                        <p>No details available.</p>
                      )}
                    </div>
                  )}
                </div>
                {/* Metric Scores Section */}
                <div className="text-left">
                  <h3
                    className="text-xl space-x-2 cursor-pointer flex items-center justify-between mb-4 dark:text-gray-200"
                    onClick={() => toggleSection("metricScores")}
                  >
                    <div className="flex items-center space-x-2">
                      <IconGauge size={24} />
                      <span>Metric Scores</span>
                    </div>
                    {expandedSection === "metricScores" ? (
                      <IconCircleCheck size={24} />
                    ) : (
                      <IconCircleCheck size={24} />
                    )}
                  </h3>
                  {expandedSection === "metricScores" && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {metricScores &&
                        Array.isArray(metricScores.details) &&
                        (metricScores.details as MetricScore[]).map(
                          (metric, metricIndex) => {
                            let color;
                            if (metric.score >= 8) color = "#4cef50";
                            else if (metric.score < 5) color = "#f44336";
                            else color = "#ffeb3b";

                            return (
                              <div
                                key={metricIndex}
                                className="flex flex-col items-center"
                              >
                                <span className="text-base text-gray-700 dark:text-gray-200 mb-2">
                                  {metric.metric}
                                </span>
                                <div className="w-24 h-24">
                                  <CircularProgressbar
                                    value={metric.score}
                                    text={`${metric.score}/100`}
                                    strokeWidth={10}
                                    styles={buildStyles({
                                      textSize: "13px",
                                      pathColor: color,
                                      textColor: color,
                                      trailColor: "#d6d6d6",
                                    })}
                                  />
                                </div>
                              </div>
                            );
                          }
                        )}
                    </div>
                  )}
                </div>
                {/* Suggestions for Improvement Section */}
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

                  {expandedSection === "suggestions" && (
                    <div className="text-base text-gray-300">
                      {suggestions && Array.isArray(suggestions.details) ? (
                        <ul>
                          {(suggestions.details as Suggestion[]).map(
                            (item: Suggestion | string, index: number) => (
                              <li key={index}>
                                {typeof item === "object" &&
                                "suggestion" in item
                                  ? item.suggestion
                                  : item}
                              </li>
                            )
                          )}
                        </ul>
                      ) : (
                        <p>No suggestions available.</p>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex justify-end">
                  <button onClick={closeModal} className="text-red-500">
                    Close
                  </button>
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

