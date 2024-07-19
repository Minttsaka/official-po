import SeventhSec from "@/components/SeventhSec";
import UnpopularArticles from "@/components/UnpopularArticles";
import { Weather } from "@/components/Weather";
import { Editorials } from "@/components/editorials";
import { Finisher } from "@/components/finisher";
import { FirstSec } from "@/components/first-sec";
import Announcement from "@/components/firthSec";
import Videos from "@/components/fourthSec";
import { Gossip } from "@/components/gossip";
import { Innovations } from "@/components/innovation";
import { QuoteOfADay } from "@/components/quote-of-aday";
import { SecondSec } from "@/components/second-sec";
import SixthSec from "@/components/sixthSec";
import Featured from "@/components/thirdSec";

export default function Home() {
  return (
    <main >
      <FirstSec />
      <QuoteOfADay />
      <Weather />
      <SecondSec />
      <Featured />
      <Videos />
      <Announcement />
      <Editorials />
      {/* <Advert /> */}
      <Gossip />
      <Innovations />
      <SixthSec />
      <SeventhSec />
      <Finisher />
      <UnpopularArticles />
    </main>
  );
}
