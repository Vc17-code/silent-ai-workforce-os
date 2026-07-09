import { processSteps } from "@/lib/utils";

export default function ProcessTimeline() {
  return (
    <section className="section-padding bg-primary text-white">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-accent">
            How It Works
          </span>
          <h2 className="mt-2 text-3xl font-bold md:text-4xl">Our Process</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          {processSteps.map((step, index) => (
            <div key={step.step} className="relative text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-xl font-bold text-white">
                {step.step}
              </div>
              <h3 className="mb-2 font-semibold">{step.title}</h3>
              <p className="text-sm text-blue-100">{step.description}</p>
              {index < processSteps.length - 1 && (
                <div className="absolute right-0 top-7 hidden translate-x-1/2 text-2xl text-accent xl:block">
                  ↓
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
