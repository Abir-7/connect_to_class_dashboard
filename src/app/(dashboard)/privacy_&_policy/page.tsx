// app/page.tsx or pages/index.tsx
"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useGetPrivacyQuery } from "@/redux/api/privacyApi/privacyApi";
import AddPrivacy from "./_components/AddPrivacy";

import LoadingPage from "@/components/loadingScreen/LoadingPage";

export default function Home() {
  const { data, isLoading } = useGetPrivacyQuery("");
  console.log(data?.data);
  const privacyData = data?.data;

  return (
    <>
      {isLoading ? (
        <>
          <LoadingPage></LoadingPage>
        </>
      ) : (
        <Tabs defaultValue="privacy" className=" rounded-none ">
          <TabsList className="flex justify-center gap-2 w-full rounded-none mt-2  bg-transparent h-12 ">
            <TabsTrigger value="privacy">Privacy</TabsTrigger>
            <TabsTrigger value="update privacy">Update Privacy</TabsTrigger>
          </TabsList>
          <hr></hr>
          <TabsContent value="privacy" className="px-6 py-4">
            <div className="border h-[calc(100vh-180px)] rounded-md p-4  overflow-y-auto">
              {" "}
              <h2 className="text-xl font-semibold mb-4">
                {privacyData?.title}
              </h2>
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{
                  __html: privacyData?.editor_html || "",
                }}
              />
            </div>
          </TabsContent>
          <TabsContent value="update privacy" className="px-6 py-4">
            <AddPrivacy></AddPrivacy>
          </TabsContent>
        </Tabs>
      )}
    </>
  );
}
