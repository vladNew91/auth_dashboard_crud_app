import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import CryptoCoin from "@/components/CryptoCoin";
import { BtcChart } from "@/components/btc-chart";

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/signin");

  return (
    <section className="w-full p-3 lg:w-3/4">
      <h1 className="my-3 text-2xl">Welcome, {user.email}</h1>

      <section className="mb-5 w-full">
        <BtcChart />
      </section>

      <CryptoCoin />
    </section>
  );
}
