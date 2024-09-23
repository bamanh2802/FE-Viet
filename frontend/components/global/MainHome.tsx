// components/HomeMain.tsx
import { Card, CardHeader, CardBody } from '@nextui-org/card';
import { Tabs, Tab } from '@nextui-org/tabs';
import { useState } from 'react';
import { BriefcaseIcon, 
    FolderIcon, 
    ChatBubbleLeftRightIcon, 
    UserGroupIcon,
    DocumentTextIcon,
    ClockIcon
} from '@heroicons/react/24/outline';
import { Folder } from 'lucide-react';

const projects = [
  { title: "Natural Language Processing ", documents: 15, conversations: 24, people: 10 },
  { title: "Computer Vision", documents: 10, conversations: 18, people: 7 },
  { title: "Big Data Management", documents: 20, conversations: 30, people: 12 },
  { title: "Big Data Management", documents: 20, conversations: 30, people: 12 },
  { title: "Big Data Management", documents: 20, conversations: 30, people: 12 },
];

const documents = [
    {
      name: "NLP book",
      project: "Viet project",
      type: "pdf"
    },
    {
      name: "AI for Everyone",
      project: "AI Learning",
      type: "pdf"
    },
    {
      name: "Data Science Handbook",
      project: "Data Science Initiative",
      type: "pdf"
    },
    {
      name: "Deep Learning Notes",
      project: "Viet project",
      type: "doc"
    },
]

const HomeMain = () => {
  const [selectedTab, setSelectedTab] = useState("recent");

  return (
    <div className="p-10 h-full w-full flex flex-col items-center bg-zinc-800">
      <div className='w-full flex justify-center py-5'>
        <h2 className="text-2xl font-semibold mb-6">Good morning, MinhDen. 
        <br></br>
        How can I help you today?</h2>
      </div>

      <div className='w-full max-w-4xl '>
        <Tabs selectedKey={selectedTab} onSelectionChange={setSelectedTab} aria-label="Projects Tabs">
            <Tab key="recent" title="Recent">
            <div className="mt-5">
                <h3 className="flex items-center text-lg text-gray-300 font-medium mb-3">
                <ClockIcon className='mr-2 w-5 h-5'/>
                    Recent projects
                    </h3>
                <div className="flex flex-wrap gap-6">
                {projects.map((project, index) => (
                        <div key={index} className="flex-shrink-0 w-[268px]"> {/* Sử dụng kích thước cố định */}
                        <Card>
                            <CardHeader>
                            <BriefcaseIcon className="w-4 h-4 mx-2" />
                            <h4 className="truncate w-full">{project.title}</h4> {/* Thêm truncate để giới hạn văn bản */}
                            </CardHeader>
                            <CardBody>
                            <p className="text-xs ml-2 py-1">{project.documents} documents, {project.conversations} conversations</p>
                            <div className="flex items-center text-xs text-gray-300">
                                <UserGroupIcon className="w-3 h-3 mx-1 ml-2" />
                                {project.people} people
                            </div>
                            </CardBody>
                        </Card>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-5">
                <h3 className="flex items-center text-lg text-gray-300 font-medium mb-3">
                    <ClockIcon className='mr-2 w-5 h-5'/>
                    Recent documents</h3>
                <div className="flex flex-wrap gap-6">
                {documents.map((document, index) => (
                        <div key={index} className="flex-shrink-0 w-[268px]"> {/* Sử dụng kích thước cố định */}
                        <Card>
                            <CardHeader>
                            <FolderIcon className="w-4 h-4 mx-2" />
                            <h4 className="truncate w-full">{document.name}</h4> {/* Thêm truncate để giới hạn văn bản */}
                            </CardHeader>
                            <CardBody>
                            <p className="text-xs ml-2 py-1 italic">From {document.project} </p>
                            <div className="flex items-center text-xs text-gray-300">
                                <DocumentTextIcon className="w-3 h-3 mx-1 ml-2" />
                                {document.type} document
                            </div>
                            </CardBody>
                        </Card>
                        </div>
                    ))}
                </div>
            </div>
            </Tab>
            <Tab key="all-projects" title="All Projects">
            <div className="mt-5">
                <h3 className="text-lg text-gray-300 font-medium mb-3">All Projects</h3>
                <div className="flex flex-wrap gap-6">
                {projects.map((project, index) => (
                        <div key={index} className="flex-shrink-0 w-[268px]"> {/* Sử dụng kích thước cố định */}
                        <Card>
                            <CardHeader>
                            <BriefcaseIcon className="w-4 h-4 mx-2" />
                            <h4 className="truncate w-full">{project.title}</h4> {/* Thêm truncate để giới hạn văn bản */}
                            </CardHeader>
                            <CardBody>
                            <p className="text-xs ml-2 py-1">{project.documents} documents, {project.conversations} conversations</p>
                            <div className="flex items-center text-xs text-gray-300">
                                <UserGroupIcon className="w-3 h-3 mx-1 ml-2" />
                                {project.people} people
                            </div>
                            </CardBody>
                        </Card>
                        </div>
                    ))}
                </div>
            </div>
            </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default HomeMain;
