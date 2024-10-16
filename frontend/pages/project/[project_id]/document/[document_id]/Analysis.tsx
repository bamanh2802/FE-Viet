import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from "next/router";
import { Loader2 } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import { Textarea } from '@/components/ui/textarea';
import { summarizeDocument, shallowOutlineDocument } from '@/service/documentApi';

const Analysis: React.FC = () => {
  // State cho từng output riêng
  const [summarizeOutput, setSummarizeOutput] = useState<string>('');  // Output của Summarize
  const [outlineOutput, setOutlineOutput] = useState<string>('');  // Output của Create Outline
  const [savedSummarizeOutputs, setSavedSummarizeOutputs] = useState<string[]>([]);  // Lưu trữ kết quả Summarize đã lưu
  const [savedOutlineOutputs, setSavedOutlineOutputs] = useState<string[]>([]);  // Lưu trữ kết quả Outline đã lưu
  const [translationInput, setTranslationInput] = useState<string>('');  // Input cho dịch
  const [isLoadingSummarize, setIsLoadingSummarize] = useState<boolean>(false);
  const [isLoadingCreateOutlines, setIsLoadingCreateOutlines] = useState<boolean>(false);

  const router = useRouter();
  const { project_id, document_id } = router.query as { project_id?: string; document_id?: string };  // Destructure and type `project_id` and `document_id`

  // Xử lý Summarize
  const handleSummarize = async () => {
    setIsLoadingSummarize(true);
    try {
      const data = await summarizeDocument(document_id as string);
      setSummarizeOutput(data.data);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
    setIsLoadingSummarize(false);
  };

  // Xử lý Create Outline
  const handleCreateOutline = async () => {
    setIsLoadingCreateOutlines(true);
    try {
      const data = await shallowOutlineDocument(document_id as string);
      setOutlineOutput(data.data);
      console.log(data);
    } catch (e) {
      console.log(e);
    }
    setIsLoadingCreateOutlines(false);
  };

  // Xử lý Translate (chưa hoàn thiện)
  const handleTranslate = async () => {
    // Logic dịch nội dung
  };

  // Xử lý Save cho Summarize output
  const handleSaveSummarize = () => {
    if (summarizeOutput) {
      setSavedSummarizeOutputs((prev) => [...prev, summarizeOutput]);  // Lưu Summarize output vào danh sách
      setSummarizeOutput('');  // Xóa output hiện tại sau khi lưu
    }
  };

  // Xử lý Save cho Outline output
  const handleSaveOutline = () => {
    if (outlineOutput) {
      setSavedOutlineOutputs((prev) => [...prev, outlineOutput]);  // Lưu Outline output vào danh sách
      setOutlineOutput('');  // Xóa output hiện tại sau khi lưu
    }
  };

  // Xử lý Generate Again cho Summarize
  const handleGenerateAgainSummarize = () => {
    setSummarizeOutput('');  // Xóa Summarize output hiện tại
    handleSummarize()
  };

  // Xử lý Generate Again cho Outline
  const handleGenerateAgainOutline = () => {
    setOutlineOutput('');  // Xóa Outline output hiện tại
    handleCreateOutline()
  };

  return (
    <div className="min-w-[70%] flex flex-col justify-start items-center overflow-auto h-[calc(100vh-114px)] space-y-4">
      <p className="text-lg">Analysis Content Goes Here</p>

      <div className="space-x-4">
        <Button disabled={isLoadingCreateOutlines || isLoadingSummarize} onClick={handleSummarize} variant="default">
          {isLoadingSummarize && (<Loader2 className="mr-2 h-4 w-4 animate-spin" />)}
          Summarize
        </Button>
        <Button disabled={isLoadingCreateOutlines || isLoadingSummarize} onClick={handleCreateOutline} variant="default">
          {isLoadingCreateOutlines && (<Loader2 className="mr-2 h-4 w-4 animate-spin" />)}
          Create Outline
        </Button>
      </div>


      {/* Hiển thị output của Summarize nếu có */}
      {summarizeOutput && (
        <div className="mt-4 p-4 border rounded-lg space-y-2">
            <ReactMarkdown className="text-sm whitespace-pre-line">
                {summarizeOutput}
            </ReactMarkdown>
          <div className="flex space-x-4">
            <Button onClick={handleSaveSummarize} variant="default">
              Save Summarize
            </Button>
            <Button onClick={handleGenerateAgainSummarize} variant="outline">
              Generate Again
            </Button>
          </div>
        </div>
      )}

      {/* Hiển thị output của Outline nếu có */}
      {outlineOutput && (
        <div className="flex flex-col mt-4 p-4 border rounded-lg space-y-2 max-h-96 overflow-auto">
            <ReactMarkdown className='text-sm whitespace-pre-line h-[90%] overflow-auto'>
            {outlineOutput}
            </ReactMarkdown>
          <div className="flex space-x-4 w-full items-center">
            <Button onClick={handleSaveOutline} variant="default">
              Save Outline
            </Button>
            <Button onClick={handleGenerateAgainOutline} variant="outline">
              Generate Again
            </Button>
          </div>
        </div>
      )}

      {/* Hiển thị các Summarize Outputs đã lưu */}
      {savedSummarizeOutputs.length > 0 && (
        <div className="mt-6 w-full">
          <h2 className="text-lg font-semibold mb-2">Saved Summarize Outputs</h2>
          <div className="space-y-4">
            {savedSummarizeOutputs.map((savedOutput, index) => (
              <div
                key={index}
                className="p-4 max-h-96 overflow-auto  border rounded-lg  whitespace-pre-line"
              >
                <ReactMarkdown>
                    {savedOutput}
                </ReactMarkdown>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hiển thị các Outline Outputs đã lưu */}
      {savedOutlineOutputs.length > 0 && (
        <div className="mt-6 w-full">
          <h2 className="text-lg font-semibold mb-2">Saved Outline Outputs</h2>
          <div className="space-y-4">
            {savedOutlineOutputs.map((savedOutput, index) => (
              <div
                key={index}
                className="p-4 border  max-h-96 overflow-auto rounded-lg  whitespace-pre-line"
              >
                <ReactMarkdown>
                {savedOutput}
            </ReactMarkdown>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Analysis;
