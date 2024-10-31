import React, { useState, useEffect } from "react";
import { Loader2, Trash2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useRouter } from "next/router";

import {
  summarizeDocument,
  shallowOutlineDocument,
} from "@/service/documentApi";
import { Button } from "@/components/ui/button";

const Analysis: React.FC = () => {
  const [summarizeOutput, setSummarizeOutput] = useState<string>("");
  const [outlineOutput, setOutlineOutput] = useState<string>("");
  const [savedSummarizeOutputs, setSavedSummarizeOutputs] = useState<string[]>(
    [],
  );
  const [savedOutlineOutputs, setSavedOutlineOutputs] = useState<string[]>([]);
  const [isLoadingSummarize, setIsLoadingSummarize] = useState<boolean>(false);
  const [isLoadingCreateOutlines, setIsLoadingCreateOutlines] =
    useState<boolean>(false);

  const router = useRouter();
  const { document_id } = router.query as { document_id?: string };

  useEffect(() => {
    // Load saved data from localStorage when component mounts
    const savedSummarize = localStorage.getItem("savedSummarizeOutputs");
    const savedOutline = localStorage.getItem("savedOutlineOutputs");

    if (savedSummarize) setSavedSummarizeOutputs(JSON.parse(savedSummarize));
    if (savedOutline) setSavedOutlineOutputs(JSON.parse(savedOutline));
  }, []);

  useEffect(() => {
    // Save data to localStorage whenever it changes
    localStorage.setItem(
      "savedSummarizeOutputs",
      JSON.stringify(savedSummarizeOutputs),
    );
    localStorage.setItem(
      "savedOutlineOutputs",
      JSON.stringify(savedOutlineOutputs),
    );
  }, [savedSummarizeOutputs, savedOutlineOutputs]);

  const handleSummarize = async () => {
    setIsLoadingSummarize(true);
    try {
      const data = await summarizeDocument(document_id as string);

      setSummarizeOutput(data.data);
    } catch (e) {
      console.log(e);
    }
    setIsLoadingSummarize(false);
  };

  const handleCreateOutline = async () => {
    setIsLoadingCreateOutlines(true);
    try {
      const data = await shallowOutlineDocument(document_id as string);

      setOutlineOutput(data.data);
    } catch (e) {
      console.log(e);
    }
    setIsLoadingCreateOutlines(false);
  };

  const handleSaveSummarize = () => {
    if (summarizeOutput) {
      setSavedSummarizeOutputs((prev) => [...prev, summarizeOutput]);
      setSummarizeOutput("");
    }
  };

  const handleSaveOutline = () => {
    if (outlineOutput) {
      setSavedOutlineOutputs((prev) => [...prev, outlineOutput]);
      setOutlineOutput("");
    }
  };

  const handleGenerateAgainSummarize = () => {
    setSummarizeOutput("");
    handleSummarize();
  };

  const handleGenerateAgainOutline = () => {
    setOutlineOutput("");
    handleCreateOutline();
  };

  const handleDeleteSummarize = (index: number) => {
    setSavedSummarizeOutputs((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDeleteOutline = (index: number) => {
    setSavedOutlineOutputs((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-w-[70%] flex flex-col justify-start items-center overflow-auto h-[calc(100vh-114px)] space-y-4">
      <p className="text-lg">Analysis Content Goes Here</p>

      <div className="space-x-4">
        <Button
          disabled={isLoadingCreateOutlines || isLoadingSummarize}
          variant="default"
          onClick={handleSummarize}
        >
          {isLoadingSummarize && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Summarize
        </Button>
        <Button
          disabled={isLoadingCreateOutlines || isLoadingSummarize}
          variant="default"
          onClick={handleCreateOutline}
        >
          {isLoadingCreateOutlines && (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          )}
          Create Outline
        </Button>
      </div>

      {summarizeOutput && (
        <div className="mt-4 p-4 border rounded-lg space-y-2">
          <ReactMarkdown className="text-sm whitespace-pre-line">
            {summarizeOutput}
          </ReactMarkdown>
          <div className="flex space-x-4">
            <Button variant="default" onClick={handleSaveSummarize}>
              Save Summarize
            </Button>
            <Button variant="outline" onClick={handleGenerateAgainSummarize}>
              Generate Again
            </Button>
          </div>
        </div>
      )}

      {outlineOutput && (
        <div className="flex flex-col mt-4 p-4 border rounded-lg space-y-2 max-h-96 overflow-auto">
          <ReactMarkdown className="text-sm whitespace-pre-line h-[90%] overflow-auto">
            {outlineOutput}
          </ReactMarkdown>
          <div className="flex space-x-4 w-full items-center">
            <Button variant="default" onClick={handleSaveOutline}>
              Save Outline
            </Button>
            <Button variant="outline" onClick={handleGenerateAgainOutline}>
              Generate Again
            </Button>
          </div>
        </div>
      )}

      {savedSummarizeOutputs.length > 0 && (
        <div className="mt-6 w-full">
          <h2 className="text-lg font-semibold mb-2">
            Saved Summarize Outputs
          </h2>
          <div className="space-y-4">
            {savedSummarizeOutputs.map((savedOutput, index) => (
              <div
                key={index}
                className="p-4 max-h-96 overflow-auto border rounded-lg whitespace-pre-line relative"
              >
                <ReactMarkdown>{savedOutput}</ReactMarkdown>
                <Button
                  className="absolute top-2 right-2"
                  size="icon"
                  variant="destructive"
                  onClick={() => handleDeleteSummarize(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {savedOutlineOutputs.length > 0 && (
        <div className="mt-6 w-full">
          <h2 className="text-lg font-semibold mb-2">Saved Outline Outputs</h2>
          <div className="space-y-4">
            {savedOutlineOutputs.map((savedOutput, index) => (
              <div
                key={index}
                className="p-4 border max-h-96 overflow-auto rounded-lg whitespace-pre-line relative"
              >
                <ReactMarkdown>{savedOutput}</ReactMarkdown>
                <Button
                  className="absolute top-2 right-2"
                  size="icon"
                  variant="destructive"
                  onClick={() => handleDeleteOutline(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Analysis;
