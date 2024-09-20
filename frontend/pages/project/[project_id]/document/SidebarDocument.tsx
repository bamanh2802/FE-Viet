import React, { useState } from "react";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import {
  ChevronLeftIcon,
  Bars3BottomLeftIcon,
  PhotoIcon,
  TableCellsIcon,
} from "@heroicons/react/24/outline";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Define types for the data structure
interface Chunk {
  chunkId: string;
  content: string;
}

interface TableData {
  id: number;
  tableName: string;
  markdownContent: string;
}

interface SidebarDocumentProps {
  direction?: 'start' | 'end' | 'top' | 'bottom';
}

const SidebarDocument: React.FC<SidebarDocumentProps> = ({ direction }) => {
  const [isOpenDetail, setIsOpenDetail] = useState<boolean>(true);
  const [selectedTable, setSelectedTable] = useState<string[][] | null>(null);
  const [itemSelected, setItemSelected] = useState<TableData | null>(null);

  const dataChunks: Chunk[] = [
    { chunkId: "1", content: "đoạn văn thứ nhất" },
    { chunkId: "2", content: "đoạn văn thứ hai" },
    { chunkId: "3", content: "đoạn văn thứ ba" },
    { chunkId: "4", content: "đoạn văn thứ tư đoạn văn thứ tư đoạn văn thứ tư" },
  ];

  const dataTables: TableData[] = [
    {
      id: 1,
      tableName: "User Information",
      markdownContent: `
| Name          | Age  | Email                |
| ------------- | ---- | -------------------- |
| John Doe      | 28   | john.doe@example.com |
| Jane Smith    | 34   | jane.smith@example.com |
| Bob Johnson   | 45   | bob.johnson@example.com |
`,
    },
    {
      id: 2,
      tableName: "Product List",
      markdownContent: `
| Product Name  | Price | Quantity |
| ------------- | ----- | -------- |
| Laptop        | $999  | 20       |
| Smartphone    | $699  | 50       |
| Tablet        | $399  | 30       |
`,
    },
    {
      id: 3,
      tableName: "Project Deadlines",
      markdownContent: `
| Project Name      | Deadline   | Status  |
| ----------------- | ---------- | ------- |
| Website Redesign  | 2024-09-20 | Ongoing |
| Mobile App Launch | 2024-10-15 | Pending |
| Marketing Campaign| 2024-08-30 | Completed |
`,
    },
  ];

  const toggleDetail = () => {
    setIsOpenDetail((prev) => !prev);
  };

  const openDetail = () => {
    if (!isOpenDetail) {
      setIsOpenDetail(true);
    }
  };

  const handleSelectedObject = (table: TableData) => {
    setItemSelected(table);
    setSelectedTable(parseMarkdownTable(table.markdownContent));
  };

  const handleTabChange = (key: string | number) => {
    openDetail();
  };

  function parseMarkdownTable(markdown: string): string[][] {
    // Trim and remove unnecessary borders
    markdown = markdown.trim().replace(/^\|/, "").replace(/\|$/, "");

    // Split into lines and filter out empty lines
    const lines = markdown
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    if (lines.length < 2) return [];

    // Extract headers
    const headers = lines[0]
      .split("|")
      .map((cell) => cell.trim())
      .filter((cell) => cell.length > 0);

    // Process rows
    const table: string[][] = [headers];

    for (let i = 2; i < lines.length; i++) {
      const row = lines[i]
        .split("|")
        .map((cell) => cell.trim())
        .filter((cell) => cell.length > 0);
      if (row.length === headers.length) {
        table.push(row);
      }
    }

    return table;
  }

  return (
    <Dialog>
      <div className="flex flex-col">
        <div className="flex w-full flex-col h-screen relative group">
          <Tabs
            aria-label="Options"
            className="bg-zinc-800 h-screen py-6"
            onSelectionChange={handleTabChange}
            placement={direction}
          >
            <Tab
              key="chunks"
              title={isOpenDetail ? "Chunks" : <Bars3BottomLeftIcon className="h-5 w-5" />}
              className={`${isOpenDetail ? "py-6" : ""} bg-zinc-800 py-6 transition ease-in-out`}
            >
              {isOpenDetail && (
                <div className="grid grid-cols-1 gap-4" style={{ width: "240px" }}>
                  {dataChunks.map((data) => (
                    <Card key={data.chunkId} className="bg-zinc-800 transition ease-in-out w-60">
                      <CardBody>{data.content}</CardBody>
                    </Card>
                  ))}
                </div>
              )}
            </Tab>

            <Tab
              key="tables"
              title={isOpenDetail ? "Tables" : <TableCellsIcon className="h-5 w-5" />}
              className={`${isOpenDetail ? "py-6" : ""} bg-zinc-800 py-6 transition ease-in-out`}
            >
              {isOpenDetail && (
                <div className="grid grid-cols-1 gap-4" style={{ width: "240px" }}>
                  {dataTables.map((data) => (
                    <Card key={data.id} className="bg-zinc-800 transition ease-in-out w-60">
                      <DialogTrigger asChild>
                        <CardBody onClick={() => handleSelectedObject(data)}>{data.tableName}</CardBody>
                      </DialogTrigger>
                    </Card>
                  ))}
                </div>
              )}
            </Tab>

            <Tab
              key="images"
              title={isOpenDetail ? "Images" : <PhotoIcon className="h-5 w-5" />}
              className={`${isOpenDetail ? "py-6" : ""} bg-zinc-800 py-6 transition ease-in-out`}
            >
              {isOpenDetail && (
                <Card className={`${isOpenDetail ? "w-60" : "w-0"} bg-zinc-800 transition ease-in-out`}>
                  <CardBody>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua.
                  </CardBody>
                </Card>
              )}
            </Tab>
          </Tabs>

          <div className=
          {`${direction === 'start' ? ' right-[-10px]' : ' left-[-10px]'} absolute top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer`}>
            <ChevronLeftIcon
              className={`${isOpenDetail ? "" : "rotate-180"} h-5 w-5 bg-zinc-700 rounded-full transition ease-in-out opacity-85`}
              onClick={toggleDetail}
            />
          </div>
        </div>
      </div>

      <DialogContent className="bg-zinc-800">
        <DialogHeader>
          <DialogTitle>Edit Table</DialogTitle>
          <DialogDescription>{itemSelected?.tableName}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {selectedTable && (
            <Table aria-label="Static collection table" className="h-96 overflow-auto select-none">
              <TableHeader>
                {selectedTable[0]?.map((header, index) => (
                  <TableColumn key={index}>{header}</TableColumn>
                ))}
              </TableHeader>
              <TableBody>
                {selectedTable?.slice(1).map((row, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {row.map((cell, cellIndex) => (
                      <TableCell key={cellIndex}>{cell}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SidebarDocument;
