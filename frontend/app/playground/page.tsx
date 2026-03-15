"use client";

import { useMemo, useState } from "react";

type PreviewResponse = {
  rows: number;
  columns: string[];
  preview: (string | number | null)[][];
};

type ResultItem = {
  algorithm: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1: number;
};

type SingleRunResponse = {
  rows: number;
  columns: number;
  class_count: number;
  accuracy: number;
  precision: number;
  recall: number;
  f1: number;
  labels: string[];
  confusion_matrix: number[][];
};

type CompareResponse = {
  rows: number;
  columns: number;
  class_count: number;
  results: ResultItem[];
};

const BACKEND_URL = "http://127.0.0.1:8000";

const algorithms = [
  { label: "KNN", value: "knn-csv" },
  { label: "Random Forest", value: "random-forest-csv" },
  { label: "SVM", value: "svm-csv" },
  { label: "Decision Tree", value: "decision-tree-csv" },
  { label: "Logistic Regression", value: "logistic-regression-csv" },
  { label: "Naive Bayes", value: "naive-bayes-csv" },
];

export default function PlaygroundPage() {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState("knn-csv");

  const [preview, setPreview] = useState<PreviewResponse | null>(null);
  const [singleResult, setSingleResult] = useState<SingleRunResponse | null>(null);
  const [compareResult, setCompareResult] = useState<CompareResponse | null>(null);

  const [loadingPreview, setLoadingPreview] = useState(false);
  const [loadingSingle, setLoadingSingle] = useState(false);
  const [loadingCompare, setLoadingCompare] = useState(false);

  const [error, setError] = useState("");

  const sortedResults = useMemo(() => {
    if (!compareResult?.results) return [];
    return [...compareResult.results].sort((a, b) => b.accuracy - a.accuracy);
  }, [compareResult]);

  const bestModel = sortedResults.length > 0 ? sortedResults[0] : null;

  const resetOutputs = () => {
    setSingleResult(null);
    setCompareResult(null);
    setError("");
  };

  const handleFileSelect = async (selectedFile: File | null) => {
    resetOutputs();

    if (!selectedFile) {
      setFile(null);
      setPreview(null);
      return;
    }

    if (!selectedFile.name.toLowerCase().endsWith(".csv")) {
      setError("Lütfen yalnızca CSV dosyası yükle.");
      return;
    }

    setFile(selectedFile);
    await fetchPreview(selectedFile);
  };

  const fetchPreview = async (csvFile: File) => {
    setLoadingPreview(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", csvFile);

      const res = await fetch(`${BACKEND_URL}/preview-csv`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Dataset preview alınamadı.");
      }

      setPreview(data);
    } catch (err: any) {
      setPreview(null);
      setError(err.message || "Preview sırasında hata oluştu.");
    } finally {
      setLoadingPreview(false);
    }
  };

  const runExperiment = async () => {
    if (!file) {
      setError("Önce bir CSV dosyası yüklemelisin.");
      return;
    }

    setLoadingSingle(true);
    setError("");
    setCompareResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`${BACKEND_URL}/${selectedAlgorithm}`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Model çalıştırılırken hata oluştu.");
      }

      setSingleResult(data);
    } catch (err: any) {
      setSingleResult(null);
      setError(err.message || "Run Experiment sırasında hata oluştu.");
    } finally {
      setLoadingSingle(false);
    }
  };

  const compareModels = async () => {
    if (!file) {
      setError("Önce bir CSV dosyası yüklemelisin.");
      return;
    }

    setLoadingCompare(true);
    setError("");
    setSingleResult(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`${BACKEND_URL}/compare-csv`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.detail || "Model comparison sırasında hata oluştu.");
      }

      setCompareResult(data);
    } catch (err: any) {
      setCompareResult(null);
      setError(err.message || "Compare All Models sırasında hata oluştu.");
    } finally {
      setLoadingCompare(false);
    }
  };

  const downloadResults = () => {
    if (!compareResult?.results?.length) {
      setError("İndirilecek comparison sonucu bulunamadı.");
      return;
    }

    const header = "algorithm,accuracy,precision,recall,f1\n";
    const rows = compareResult.results
      .map(
        (item) =>
          `${item.algorithm},${(item.accuracy * 100).toFixed(2)},${(
            item.precision * 100
          ).toFixed(2)},${(item.recall * 100).toFixed(2)},${(item.f1 * 100).toFixed(2)}`
      )
      .join("\n");

    const csvContent = header + rows;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "mlp_results.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const formatPercent = (value: number) => `${(value * 100).toFixed(2)}%`;

  return (
    <main className="min-h-screen bg-[#07090f] text-white">
      <div className="mx-auto max-w-7xl px-6 py-10 md:px-8">
        <div className="mb-8">
          <div className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-1 text-sm text-cyan-300">
            Machine Learning Playground
          </div>

          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Train, compare and visualize ML models
          </h1>

          <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-400 md:text-base">
            CSV veri setini yükle, algoritmanı seç, modeli çalıştır veya tüm modelleri
            karşılaştır. Sonuçları tablo, chart ve confusion matrix ile incele.
          </p>
        </div>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_60px_rgba(0,0,0,0.25)] backdrop-blur">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Upload Dataset</h2>

            {file && (
              <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
                CSV Loaded
              </span>
            )}
          </div>

          <label
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragActive(false);
              const dropped = e.dataTransfer.files?.[0] || null;
              handleFileSelect(dropped);
            }}
            className={`flex min-h-[220px] cursor-pointer flex-col items-center justify-center rounded-3xl border border-dashed px-6 text-center transition ${
              dragActive
                ? "border-cyan-400 bg-cyan-400/10"
                : "border-zinc-700 bg-zinc-900/60 hover:border-cyan-400/50 hover:bg-zinc-900"
            }`}
          >
            <input
              type="file"
              accept=".csv"
              className="hidden"
              onChange={(e) => handleFileSelect(e.target.files?.[0] || null)}
            />

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-400/10 text-3xl">
              📊
            </div>

            <h3 className="mt-4 text-lg font-semibold text-white">Drag & drop your CSV file</h3>
            <p className="mt-2 text-sm text-zinc-400">veya tıklayıp bilgisayarından seç</p>

            {file && (
              <div className="mt-5 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-zinc-200">
                {file.name}
              </div>
            )}
          </label>

          <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_auto_auto]">
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Select Algorithm
              </label>

              <select
                value={selectedAlgorithm}
                onChange={(e) => setSelectedAlgorithm(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400"
              >
                {algorithms.map((algo) => (
                  <option key={algo.value} value={algo.value}>
                    {algo.label}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={runExperiment}
              disabled={loadingSingle || loadingPreview}
              className="rounded-2xl bg-cyan-400 px-5 py-3 text-sm font-semibold text-black transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loadingSingle ? "Running..." : "Run Experiment"}
            </button>

            <button
              onClick={compareModels}
              disabled={loadingCompare || loadingPreview}
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loadingCompare ? "Comparing..." : "Compare All Models"}
            </button>
          </div>

          {error && (
            <div className="mt-5 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}
        </section>

        {loadingPreview && (
          <section className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-zinc-300">Dataset preview hazırlanıyor...</p>
          </section>
        )}

        {preview && (
          <section className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_60px_rgba(0,0,0,0.25)]">
            <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-semibold">Dataset Preview</h2>
                <p className="mt-1 text-sm text-zinc-400">Yüklenen CSV dosyasının ilk 10 satırı</p>
              </div>

              <div className="flex flex-wrap gap-3">
                <span className="rounded-full border border-white/10 bg-zinc-900 px-3 py-1 text-sm text-zinc-300">
                  Rows: {preview.rows}
                </span>
                <span className="rounded-full border border-white/10 bg-zinc-900 px-3 py-1 text-sm text-zinc-300">
                  Columns: {preview.columns.length}
                </span>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-white/10">
              <table className="min-w-full border-collapse">
                <thead className="bg-zinc-950">
                  <tr>
                    {preview.columns.map((col) => (
                      <th
                        key={col}
                        className="border-b border-white/10 px-4 py-3 text-left text-sm font-semibold text-zinc-300"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {preview.preview.map((row, rowIndex) => (
                    <tr key={rowIndex} className="border-b border-white/5 bg-zinc-900/40">
                      {row.map((cell, cellIndex) => (
                        <td
                          key={`${rowIndex}-${cellIndex}`}
                          className="px-4 py-3 text-sm text-zinc-200"
                        >
                          {cell === null ? "null" : String(cell)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {singleResult && (
          <section className="mt-8 space-y-8">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_60px_rgba(0,0,0,0.25)]">
              <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">Experiment Result</h2>
                  <p className="mt-1 text-sm text-zinc-400">
                    Seçilen algoritma için performans özeti
                  </p>
                </div>

                <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
                  {algorithms.find((a) => a.value === selectedAlgorithm)?.label}
                </span>
              </div>

              <div className="grid gap-4 md:grid-cols-4">
                <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-5">
                  <p className="text-sm text-zinc-400">Accuracy</p>
                  <p className="mt-2 text-3xl font-bold text-cyan-300">
                    {formatPercent(singleResult.accuracy)}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-5">
                  <p className="text-sm text-zinc-400">Precision</p>
                  <p className="mt-2 text-3xl font-bold">{formatPercent(singleResult.precision)}</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-zinc-950/70 p-5">
                  <p className="text-sm text-zinc-400">Recall</p>
                  <p className="mt-2 text-3xl font-bold">{formatPercent(singleResult.recall)}</p>
                </div>

                <div className="rounded-2xl border border-emerald-400/20 bg-gradient-to-br from-emerald-400/15 to-emerald-300/5 p-5 shadow-[0_0_30px_rgba(16,185,129,0.12)]">
                  <p className="text-sm font-medium text-emerald-300">F1 Score</p>
                  <p className="mt-2 text-3xl font-bold text-emerald-300">
                    {formatPercent(singleResult.f1)}
                  </p>
                  <p className="mt-2 text-xs text-emerald-100/70">
                    Precision ve recall dengesini gösterir.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_60px_rgba(0,0,0,0.25)]">
              <div className="mb-6">
                <h3 className="text-xl font-semibold">Confusion Matrix</h3>
                <p className="mt-1 text-sm text-zinc-400">
                  Tek model çalıştırıldığında sınıf bazlı tahmin dağılımı burada görünür.
                </p>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-white/10">
                <table className="min-w-full border-collapse text-center">
                  <thead className="bg-zinc-950">
                    <tr>
                      <th className="border-b border-white/10 px-4 py-3 text-sm text-zinc-300">
                        Actual \ Pred
                      </th>
                      {singleResult.labels.map((label) => (
                        <th
                          key={label}
                          className="border-b border-white/10 px-4 py-3 text-sm text-zinc-300"
                        >
                          {label}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody>
                    {singleResult.confusion_matrix.map((row, rowIndex) => (
                      <tr key={rowIndex} className="border-b border-white/5">
                        <td className="bg-zinc-950/80 px-4 py-3 text-sm font-medium text-zinc-200">
                          {singleResult.labels[rowIndex]}
                        </td>

                        {row.map((value, colIndex) => (
                          <td
                            key={`${rowIndex}-${colIndex}`}
                            className={`px-6 py-4 text-sm font-semibold ${
                              rowIndex === colIndex
                                ? "bg-emerald-500/10 text-emerald-300"
                                : "bg-zinc-900/40 text-zinc-300"
                            }`}
                          >
                            {value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {compareResult && (
          <section className="mt-8 space-y-8">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_60px_rgba(0,0,0,0.25)]">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h2 className="text-2xl font-semibold">Model Comparison</h2>
                  <p className="mt-1 text-sm text-zinc-400">
                    Tüm algoritmalar aynı veri seti üzerinde karşılaştırıldı.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  <span className="rounded-full border border-white/10 bg-zinc-950 px-3 py-1 text-sm text-zinc-300">
                    Rows: {compareResult.rows}
                  </span>
                  <span className="rounded-full border border-white/10 bg-zinc-950 px-3 py-1 text-sm text-zinc-300">
                    Columns: {compareResult.columns}
                  </span>
                  <span className="rounded-full border border-white/10 bg-zinc-950 px-3 py-1 text-sm text-zinc-300">
                    Classes: {compareResult.class_count}
                  </span>
                </div>
              </div>

              {bestModel && (
                <div className="mt-6 rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-sm text-emerald-300">🏆 Best Model</p>
                      <p className="mt-1 text-base font-semibold text-emerald-200">
                        {bestModel.algorithm}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white">
                        Acc: {formatPercent(bestModel.accuracy)}
                      </span>
                      <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white">
                        Prec: {formatPercent(bestModel.precision)}
                      </span>
                      <span className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white">
                        Recall: {formatPercent(bestModel.recall)}
                      </span>
                      <span className="rounded-full border border-emerald-300/30 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-100">
                        F1: {formatPercent(bestModel.f1)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_60px_rgba(0,0,0,0.25)]">
              <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-xl font-semibold">Accuracy Chart</h3>
                  <p className="mt-1 text-sm text-zinc-400">
                    Accuracy skorlarını görsel olarak karşılaştır.
                  </p>
                </div>

                <button
                  onClick={downloadResults}
                  className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-400/20"
                >
                  Download Results CSV
                </button>
              </div>

              <div className="space-y-5">
                {sortedResults.map((item, index) => (
                  <div key={item.algorithm}>
                    <div className="mb-2 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-xs text-zinc-300">
                          #{index + 1}
                        </span>
                        <span
                          className={`text-sm font-medium ${
                            bestModel?.algorithm === item.algorithm
                              ? "text-emerald-300"
                              : "text-zinc-200"
                          }`}
                        >
                          {item.algorithm}
                        </span>
                      </div>

                      <span
                        className={`text-sm font-semibold ${
                          bestModel?.algorithm === item.algorithm
                            ? "text-emerald-300"
                            : "text-cyan-300"
                        }`}
                      >
                        {formatPercent(item.accuracy)}
                      </span>
                    </div>

                    <div className="h-4 w-full overflow-hidden rounded-full bg-zinc-900">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          bestModel?.algorithm === item.algorithm
                            ? "bg-gradient-to-r from-emerald-400 to-emerald-300"
                            : "bg-gradient-to-r from-cyan-500 to-blue-500"
                        }`}
                        style={{ width: `${item.accuracy * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_0_60px_rgba(0,0,0,0.25)]">
              <div className="mb-6">
                <h3 className="text-xl font-semibold">Model Ranking</h3>
                <p className="mt-1 text-sm text-zinc-400">
                  Tüm modeller accuracy değerine göre sıralanır.
                </p>
              </div>

              <div className="overflow-hidden rounded-2xl border border-white/10">
                <table className="w-full border-collapse text-left">
                  <thead className="bg-zinc-950">
                    <tr>
                      <th className="px-5 py-4 text-sm font-semibold text-zinc-300">Rank</th>
                      <th className="px-5 py-4 text-sm font-semibold text-zinc-300">Algorithm</th>
                      <th className="px-5 py-4 text-sm font-semibold text-zinc-300">Accuracy</th>
                      <th className="px-5 py-4 text-sm font-semibold text-zinc-300">Precision</th>
                      <th className="px-5 py-4 text-sm font-semibold text-zinc-300">Recall</th>
                      <th className="px-5 py-4 text-sm font-semibold text-zinc-300">F1</th>
                    </tr>
                  </thead>

                  <tbody>
                    {sortedResults.map((item, index) => {
                      const isBest = bestModel?.algorithm === item.algorithm;

                      return (
                        <tr
                          key={item.algorithm}
                          className={`border-t border-white/10 ${
                            isBest ? "bg-emerald-500/5" : "bg-zinc-900/30"
                          }`}
                        >
                          <td className="px-5 py-4 text-sm text-zinc-300">#{index + 1}</td>
                          <td
                            className={`px-5 py-4 text-sm font-medium ${
                              isBest ? "text-emerald-300" : "text-white"
                            }`}
                          >
                            {item.algorithm}
                          </td>
                          <td className="px-5 py-4 text-sm text-cyan-300">
                            {formatPercent(item.accuracy)}
                          </td>
                          <td className="px-5 py-4 text-sm text-zinc-300">
                            {formatPercent(item.precision)}
                          </td>
                          <td className="px-5 py-4 text-sm text-zinc-300">
                            {formatPercent(item.recall)}
                          </td>
                          <td className="px-5 py-4 text-sm text-zinc-300">
                            {formatPercent(item.f1)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}