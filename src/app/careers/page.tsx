import PageHeader from "@/components/PageHeader";
import CareersBrowser from "@/components/CareersBrowser";
import { careers } from "@content/careers";
import { getJobs } from "@/lib/data";
import { pageMeta } from "@/lib/seo";

export const revalidate = 300;

export const metadata = pageMeta("/careers", "Specialist Jobs in the UK", "Browse live specialist vacancies from ProficientNow across engineering, construction, healthcare, finance and more, and apply online with your CV.");

export default async function CareersPage() {
  const jobs = await getJobs();
  return (
    <>
      <PageHeader eyebrow={careers.header.eyebrow} headline={careers.header.headline} subhead={careers.header.subhead} />
      <section className="pad" style={{ paddingTop: 40 }}>
        <div className="container-x">
          <CareersBrowser jobs={jobs ?? []} />
        </div>
      </section>
    </>
  );
}
