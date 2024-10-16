import React from "react";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import "prismjs/components/prism-solidity";
import "prismjs/themes/prism-tomorrow.css"; // Import a Prism theme for styling
import { IconChecklist, IconPaperclip } from "@tabler/icons-react";

interface CustomCodeEditorProps {
  contract: string;
  setContract: React.Dispatch<React.SetStateAction<string>>;
  analyze: () => Promise<void>;
}

const highlightWithPrism = (code: string) => {
  return Prism.highlight(code, Prism.languages.solidity, "solidity");
};

// Utility function to check if the contract contains the required SPDX license and pragma directive
const isValidSolidityContract = (code: string) => {
  const SPDXRegex = /\/\/\s*SPDX-License-Identifier:\s*[^\s]+/;
  const pragmaRegex = /pragma\s+solidity\s+[^;]+;/;
  return SPDXRegex.test(code) && pragmaRegex.test(code);
};

const CustomCodeEditor: React.FC<CustomCodeEditorProps> = ({
  contract,
  setContract,
  analyze,
}) => {
  const handleAnalyze = () => {
    if (!isValidSolidityContract(contract)) {
      alert(
        "The provided code does not appear to be a valid Solidity smart contract. Make sure it starts with the SPDX license identifier and the 'pragma' directive."
      );
      return;
    }
    analyze();
  };

  return (
    <div className="relative lg:w-4/6 w-full mx-auto">
      <div
        className="border outline-none border-r-2 border-gray-300 rounded-2xl p-6"
        style={{
          height: "450px",
          overflowY: "auto",
          backgroundColor: "#3B3C36", // Change this to black olive (#3B3C36)
        }}
      >
        <Editor
          value={contract}
          onValueChange={(code) => setContract(code)}
          highlight={(code) => highlightWithPrism(code)}
          padding={15}
          textareaId="code-editor"
          className="textarea-editor"
          textareaClassName="outline-none"
          style={{
            fontFamily: ' "Fira Mono", monospace',
            fontSize: 17,
            minHeight: "100%",
            background: "transparent",
            color: "inherit",
          }}
        />
      </div>
      <div className="absolute bottom-px inset-x-px p-2 rounded-b-md bg-neutral-900" >
          <div className="flex justify-between items-center pb-3">
            <div className="flex items-center">
              <button type="button" className="inline-flex flex-shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 focus:z-10 focus:outline-noe focus:ring-2 focus:ring-blue-500 text-neutral-500">
                <IconPaperclip />
              </button>
            </div>
            <div className="flex items-center cursor-pointer gap-x1">
              <button type="button"
               onClick={handleAnalyze}
               className=" px-6 py-1.5 flex rounded-full flex-row bg-blue-600 flex-shrink-0 justify-center items-center size-8 rounded-lg  text-white text-neutral-500">
                <span><IconChecklist size={20} /></span> 
              </button>
            </div>
          </div>
      </div>
    </div>
  );
};

export default CustomCodeEditor;
