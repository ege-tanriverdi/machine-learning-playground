export default function Home() {
  const algorithmCards = [
    {
      title: "Linear Regression",
      subtitle: "Trend modeling",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <path
            d="M4 16L9 11L13 13L20 6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="4" cy="16" r="1.2" fill="currentColor" />
          <circle cx="9" cy="11" r="1.2" fill="currentColor" />
          <circle cx="13" cy="13" r="1.2" fill="currentColor" />
          <circle cx="20" cy="6" r="1.2" fill="currentColor" />
        </svg>
      ),
    },
    {
      title: "Classification",
      subtitle: "Prediction tasks",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <circle cx="7" cy="8" r="2" fill="currentColor" />
          <circle cx="16.5" cy="7" r="2" fill="currentColor" opacity="0.9" />
          <circle cx="10" cy="16.5" r="2" fill="currentColor" opacity="0.75" />
          <path
            d="M8.5 9.2L14.8 7.8M8.2 9.7L9.2 14.5M14.8 8.7L11.2 15.2"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      title: "Random Forest",
      subtitle: "Ensemble model",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <path
            d="M12 18V7M12 7C12 5.6 13.1 4.5 14.5 4.5C15.9 4.5 17 5.6 17 7C17 8.4 15.9 9.5 14.5 9.5C13.1 9.5 12 8.4 12 7ZM12 10C12 8.6 10.9 7.5 9.5 7.5C8.1 7.5 7 8.6 7 10C7 11.4 8.1 12.5 9.5 12.5C10.9 12.5 12 11.4 12 10Z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 13C12 11.6 13.1 10.5 14.5 10.5C15.9 10.5 17 11.6 17 13C17 14.4 15.9 15.5 14.5 15.5C13.1 15.5 12 14.4 12 13Z"
            stroke="currentColor"
            strokeWidth="1.6"
          />
        </svg>
      ),
    },
    {
      title: "SVM",
      subtitle: "Decision boundaries",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <path
            d="M5 17C8 13 11 11 19 8"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M5 13C8 9 11 7 19 4"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.45"
          />
          <path
            d="M5 21C8 17 11 15 19 12"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.45"
          />
          <circle cx="8" cy="16" r="1.2" fill="currentColor" />
          <circle cx="15.5" cy="9.5" r="1.2" fill="currentColor" />
        </svg>
      ),
    },
    {
      title: "Neural Networks",
      subtitle: "Deep learning",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <circle cx="7" cy="7" r="1.7" fill="currentColor" />
          <circle cx="17" cy="7" r="1.7" fill="currentColor" />
          <circle cx="7" cy="17" r="1.7" fill="currentColor" />
          <circle cx="17" cy="17" r="1.7" fill="currentColor" />
          <circle cx="12" cy="12" r="1.7" fill="currentColor" />
          <path
            d="M8.5 8.5L10.8 10.8M15.5 8.5L13.2 10.8M8.5 15.5L10.8 13.2M15.5 15.5L13.2 13.2"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      title: "Image Models",
      subtitle: "CNN",
      icon: (
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none">
          <rect
            x="4"
            y="5"
            width="16"
            height="14"
            rx="2.5"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <circle cx="9" cy="10" r="1.4" fill="currentColor" />
          <path
            d="M7 16L11 12L13.8 14.8L17 11.5L19 14"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#05070D] text-white">
      <div className="relative isolate">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_14%_18%,rgba(99,102,241,0.18),transparent_22%),radial-gradient(circle_at_80%_18%,rgba(34,211,238,0.10),transparent_18%),radial-gradient(circle_at_70%_72%,rgba(168,85,247,0.10),transparent_20%)]" />
        <div className="absolute inset-0 -z-10 opacity-[0.04] [background-image:linear-gradient(rgba(255,255,255,0.10)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.10)_1px,transparent_1px)] [background-size:64px_64px]" />
        <div className="absolute left-1/2 top-[28%] -z-10 h-[360px] w-[360px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-[130px]" />

        <div className="mx-auto max-w-7xl px-6 pb-6 pt-5 md:px-10">
          <nav className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-indigo-400/15 bg-white/[0.04] shadow-[0_0_28px_rgba(99,102,241,0.18)] backdrop-blur-xl">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-cyan-400/10" />
                <span className="relative text-lg font-bold text-indigo-200">M</span>
              </div>

              <div className="leading-tight">
                <h1 className="text-2xl font-semibold tracking-tight">MLP</h1>
                <p className="text-xs text-white/58">Machine Learning Playground</p>
              </div>
            </div>

            <div className="hidden items-center gap-8 text-sm text-white/68 md:flex">
              <a href="/playground" className="transition hover:text-white">
                Playground
              </a>
              <a href="#algorithms" className="transition hover:text-white">
                Algorithms
              </a>
              <a href="#" className="transition hover:text-white">
                Docs
              </a>
              <a href="#" className="transition hover:text-white">
                Examples
              </a>
            </div>

            <div className="flex items-center gap-3">
              <button className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/80 backdrop-blur md:flex">
                ○
              </button>
              <button className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/80 backdrop-blur md:flex">
                ◐
              </button>
              <a
                href="/playground"
                className="rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_10px_35px_rgba(99,102,241,0.28)] transition hover:scale-[1.02]"
              >
                Get Started →
              </a>
            </div>
          </nav>

          <section className="grid items-center gap-10 py-10 md:grid-cols-[0.9fr_1.1fr] md:py-10">
            <div className="max-w-xl">
              <h2 className="text-[42px] font-semibold leading-[1.02] tracking-tight md:text-[58px]">
                <span className="text-white">Explore.</span>{" "}
                <span className="bg-gradient-to-r from-sky-300 to-indigo-400 bg-clip-text text-transparent">
                  Train.
                </span>
                <br />
                <span className="bg-gradient-to-r from-indigo-300 to-fuchsia-400 bg-clip-text text-transparent">
                  Visualize.
                </span>
                <br />
                <span className="text-white/95">with Machine Learning</span>
              </h2>

              <p className="mt-5 max-w-lg text-[16px] leading-8 text-white/62 md:text-[17px]">
                Upload your dataset or image, choose an algorithm, and see the
                results instantly.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a
                  href="/playground"
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-sky-400 to-violet-500 px-6 py-3.5 text-base font-semibold text-white shadow-[0_16px_45px_rgba(99,102,241,0.30)] transition hover:scale-[1.02]"
                >
                  Start Playground <span>→</span>
                </a>

                <a
                  href="#workflow"
                  className="inline-flex items-center gap-3 text-base text-white/82 transition hover:text-white"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full border border-indigo-400/70 text-[9px] text-indigo-300">
                    ●
                  </span>
                  See How It Works
                </a>
              </div>
            </div>

            <div className="relative flex items-center justify-center">
              <div className="absolute left-10 top-14 h-28 w-28 rounded-full bg-indigo-500/16 blur-3xl" />
              <div className="absolute right-16 top-16 h-24 w-24 rounded-full bg-fuchsia-500/10 blur-3xl" />
              <div className="absolute bottom-6 left-1/2 h-28 w-36 -translate-x-1/2 rounded-full bg-cyan-400/10 blur-3xl" />

              <div className="relative w-full max-w-[700px]">
                <div className="absolute -left-1 top-12 z-20 hidden rounded-[24px] border border-white/10 bg-white/[0.06] p-4 backdrop-blur-xl lg:block">
                  <div className="h-[190px] w-[145px] overflow-hidden rounded-[18px] border border-white/10 bg-[#0E1220] p-3">
                    <div className="relative h-full w-full rounded-[14px] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.01))]">
                      <div className="absolute bottom-4 left-3 right-3 top-4">
                        <svg viewBox="0 0 220 180" className="h-full w-full" fill="none">
                          <path
                            d="M12 150 C45 138, 70 45, 112 72 C144 92, 160 150, 205 35"
                            stroke="rgba(34,211,238,0.95)"
                            strokeWidth="3"
                            strokeLinecap="round"
                          />
                          <path
                            d="M14 132 C46 120, 78 96, 118 104 C150 110, 176 122, 205 48"
                            stroke="rgba(168,85,247,0.95)"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                          />
                          {[22, 46, 75, 104, 136, 165, 194].map((x, i) => (
                            <circle
                              key={i}
                              cx={x}
                              cy={150 - i * 15}
                              r="3.5"
                              fill="rgba(99,102,241,1)"
                            />
                          ))}
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -right-2 top-4 z-20 hidden w-[205px] rounded-[24px] border border-white/10 bg-white/[0.06] p-4 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-xl lg:block">
                  <p className="text-base text-white/62">Accuracy</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-4xl font-semibold tracking-tight">94.7%</span>
                    <div className="relative h-16 w-16 rounded-full bg-[conic-gradient(from_180deg_at_50%_50%,#8b5cf6_0deg,#67e8f9_225deg,rgba(255,255,255,0.08)_225deg)] shadow-[0_0_28px_rgba(103,232,249,0.14)]">
                      <div className="absolute inset-2.5 rounded-full bg-[#111523]" />
                    </div>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <span className="h-1 w-5 rounded-full bg-violet-400/80" />
                    <span className="h-1 w-2 rounded-full bg-violet-400/50" />
                    <span className="h-1 w-2 rounded-full bg-violet-400/25" />
                  </div>
                </div>

                <div className="relative overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.04] p-4 shadow-[0_30px_100px_rgba(0,0,0,0.52)] backdrop-blur-2xl">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_26%,rgba(99,102,241,0.14),transparent_16%),radial-gradient(circle_at_30%_80%,rgba(34,211,238,0.10),transparent_14%)]" />

                  <div className="relative rounded-[28px] border border-white/10 bg-[#0C1019]/95 p-4">
                    <div className="relative flex min-h-[330px] items-center justify-center overflow-hidden rounded-[24px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.015))]">
                      <div className="absolute inset-x-10 bottom-12 h-[2px] bg-gradient-to-r from-transparent via-white/12 to-transparent" />
                      <div className="absolute left-12 top-10 bottom-12 w-[2px] bg-gradient-to-b from-transparent via-white/12 to-transparent" />

                      <div className="absolute bottom-8 h-10 w-[320px] rounded-full bg-cyan-400/10 blur-xl" />
                      <div className="absolute bottom-14 h-20 w-20 rounded-full bg-violet-400/16 blur-2xl" />

                      <div className="absolute left-[17%] top-[20%] h-[145px] w-[105px] rotate-[-2deg] rounded-[22px] border border-white/10 bg-[#121726]/88 shadow-[0_10px_35px_rgba(0,0,0,0.22)] backdrop-blur-xl">
                        <div className="absolute inset-3 rounded-[16px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))]">
                          <svg viewBox="0 0 220 180" className="h-full w-full p-4" fill="none">
                            <path
                              d="M18 148 C60 130, 72 62, 118 84 C145 98, 170 150, 202 30"
                              stroke="rgba(34,211,238,0.95)"
                              strokeWidth="3"
                              strokeLinecap="round"
                            />
                            {[
                              [38, 144],
                              [64, 126],
                              [92, 84],
                              [120, 90],
                              [148, 128],
                              [176, 98],
                            ].map(([cx, cy], i) => (
                              <circle key={i} cx={cx} cy={cy} r="3.5" fill="rgba(99,102,241,1)" />
                            ))}
                          </svg>
                        </div>
                      </div>

                      <div className="relative flex h-[225px] w-[225px] items-center justify-center">
                        <div className="absolute inset-0 rounded-full border border-cyan-400/18 bg-cyan-400/5 shadow-[0_0_30px_rgba(34,211,238,0.10)]" />
                        <div className="absolute inset-[20%] rounded-full bg-gradient-to-br from-violet-400/18 to-cyan-400/14 blur-2xl" />
                        <div className="absolute bottom-[-6px] h-14 w-40 rounded-full bg-cyan-400/10 blur-xl" />

                        {[
                          { x: 76, y: 24 },
                          { x: 128, y: 54 },
                          { x: 152, y: 104 },
                          { x: 128, y: 158 },
                          { x: 72, y: 176 },
                          { x: 28, y: 132 },
                          { x: 34, y: 72 },
                          { x: 84, y: 94 },
                          { x: 110, y: 94 },
                          { x: 78, y: 128 },
                          { x: 116, y: 130 },
                        ].map((node, i, arr) => (
                          <div key={i}>
                            {i < 7 &&
                              arr.slice(7).map((target, j) => (
                                <span
                                  key={`${i}-${j}`}
                                  className="absolute block origin-left bg-gradient-to-r from-cyan-300/55 to-violet-300/45"
                                  style={{
                                    left: node.x,
                                    top: node.y,
                                    width: Math.hypot(target.x - node.x, target.y - node.y),
                                    height: "1px",
                                    transform: `rotate(${Math.atan2(
                                      target.y - node.y,
                                      target.x - node.x
                                    )}rad)`,
                                  }}
                                />
                              ))}
                            <span
                              className="absolute h-2.5 w-2.5 rounded-full bg-gradient-to-br from-cyan-300 to-violet-400 shadow-[0_0_20px_rgba(103,232,249,0.62)]"
                              style={{ left: node.x, top: node.y }}
                            />
                          </div>
                        ))}
                      </div>

                      <div className="absolute inset-x-16 bottom-5 h-16 rounded-[999px] border border-cyan-400/16 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))] shadow-[inset_0_0_30px_rgba(34,211,238,0.05)]">
                        <div className="mx-auto mt-[-12px] h-20 w-20 rounded-full border border-white/10 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.25),rgba(255,255,255,0.06)_45%,rgba(0,0,0,0.0)_46%),linear-gradient(180deg,rgba(168,85,247,0.45),rgba(34,211,238,0.20))] shadow-[0_0_35px_rgba(99,102,241,0.20)]" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute -right-1 bottom-10 z-20 hidden rounded-[22px] border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur-xl lg:block">
                  <p className="text-xs text-white/55">Result</p>
                  <p className="mt-1 text-lg font-semibold">Visualized</p>
                </div>
              </div>
            </div>
          </section>

          <section id="workflow" className="mt-1">
            <div className="rounded-[30px] border border-white/10 bg-white/[0.045] px-6 py-7 shadow-[0_18px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl">
              <div className="grid items-center gap-6 md:grid-cols-3">
                <div className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-400/18 bg-sky-400/10 text-xl shadow-[0_0_22px_rgba(56,189,248,0.12)]">
                    ↑
                  </div>
                  <h3 className="mt-3 text-[20px] font-semibold">Upload Data</h3>
                  <p className="mt-1 text-base text-white/50">CSV, Excel or Image</p>
                </div>

                <div className="relative text-center">
                  <div className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-cyan-300/0 via-violet-300/70 to-cyan-300/0 md:block" />
                  <div className="relative mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-400/18 bg-violet-400/10 text-xl shadow-[0_0_22px_rgba(168,85,247,0.12)]">
                    ⚙
                  </div>
                  <h3 className="mt-3 text-[20px] font-semibold">Choose Algorithm</h3>
                  <p className="mt-1 text-base text-white/50">KNN, SVM, CNN & more</p>
                </div>

                <div className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/18 bg-cyan-400/10 text-xl shadow-[0_0_22px_rgba(34,211,238,0.12)]">
                    ↗
                  </div>
                  <h3 className="mt-3 text-[20px] font-semibold">Analyze Results</h3>
                  <p className="mt-1 text-base text-white/50">Graphs, Metrics, Insights</p>
                </div>
              </div>
            </div>
          </section>

          <section id="algorithms" className="pb-6 pt-8">
            <div className="mb-4 flex items-end justify-between">
              <div>
                <h3 className="text-3xl font-semibold">Popular Algorithms</h3>
                <p className="mt-1 text-lg text-white/42">Try them in the playground</p>
              </div>

              <a
                href="/playground"
                className="text-base text-violet-300 transition hover:text-violet-200"
              >
                View All →
              </a>
            </div>

            <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-6">
              {algorithmCards.map((card) => (
                <div
                  key={card.title}
                  className="group rounded-[22px] border border-white/10 bg-white/[0.04] p-4 shadow-[0_10px_30px_rgba(0,0,0,0.12)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-violet-400/18 hover:bg-white/[0.055]"
                >
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-indigo-500/10 to-cyan-400/10 text-indigo-200 shadow-[0_0_22px_rgba(99,102,241,0.10)] transition group-hover:text-cyan-200 group-hover:shadow-[0_0_26px_rgba(34,211,238,0.16)]">
                    {card.icon}
                  </div>
                  <h4 className="text-[16px] font-semibold leading-snug">{card.title}</h4>
                  <p className="mt-1.5 text-sm text-white/42">{card.subtitle}</p>
                </div>
              ))}
            </div>
          </section>

          <footer className="flex flex-col gap-3 border-t border-white/10 py-5 text-sm text-white/36 md:flex-row md:items-center md:justify-between">
            <p>© 2026 MLP — Built for curious minds</p>
            <div className="flex gap-6">
              <a href="https://github.com/egetanriverdi" className="hover:text-white/70">
                GitHub
              </a>
              <a href="#" className="hover:text-white/70">
                Docs
              </a>
              <a href="#" className="hover:text-white/70">
                Contact
              </a>
            </div>
          </footer>
        </div>
      </div>
    </main>
  );
}
