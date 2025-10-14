import GroupDetailsPage from "@/app/(app)/group/group-details-page";

interface GroupPageProps {
  params: Promise<{ id: string }>; // 👈 Change to Promise
}

export default async function GroupPage({ params }: GroupPageProps) {
  const { id } = await params; // 👈 Await the params

  // You could fetch group data here later if needed
  return <GroupDetailsPage id={id} />;
}