import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Workspaces from "./components/workspaces";
import KeyRequests from "./components/key_requests";
import Keys from "./components/keys";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import SignatureRequests from "./components/signature_requests";
import Actions from "./components/actions";
import { useEffect } from "react";
import { enableKeplr } from "./keplr";

function App() {
  useEffect(() => {
    window.onload = async () => {
      await enableKeplr();
    }
  }, []);

  return (
      <Tabs className="mt-4">
        <TabList className="flex gap-4 p-4">
          <Tab
            className="cursor-pointer"
            selectedClassName="border-b-2 border-black font-bold"
          >
            Workspaces
          </Tab>
          <Tab
            className="cursor-pointer"
            selectedClassName="border-b-2 border-black font-bold"
          >
            Key Requests
          </Tab>
          <Tab
            className="cursor-pointer"
            selectedClassName="border-b-2 border-black font-bold"
          >
            Keys
          </Tab>
          <Tab
            className="cursor-pointer"
            selectedClassName="border-b-2 border-black font-bold"
          >
            Signature Requests
          </Tab>
          <Tab
            className="cursor-pointer"
            selectedClassName="border-b-2 border-black font-bold"
          >
            Actions
          </Tab>
        </TabList>
        <TabPanel>
          <Workspaces />
        </TabPanel>
        <TabPanel>
          <KeyRequests />
        </TabPanel>
        <TabPanel>
          <Keys />
        </TabPanel>
        <TabPanel>
          <SignatureRequests />
        </TabPanel>
        <TabPanel>
          <Actions />
        </TabPanel>
      </Tabs>
  );
}

export default App;
