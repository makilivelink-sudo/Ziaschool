import { useEffect, useMemo, useState } from 'react';
import { fetchAdminSchoolData } from '../utils/schoolApi';

function TableView({ tableName, rows }) {
  const columns = useMemo(() => {
    if (!rows?.length) return [];
    return Object.keys(rows[0]);
  }, [rows]);

  return (
    <section className="rounded-[28px] border border-slate-200 bg-white p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-schoolRed">Table</p>
          <h3 className="mt-2 text-xl font-bold text-slate-900">{tableName}</h3>
        </div>
        <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">
          {rows.length} rows
        </span>
      </div>

      <div className="mt-5 overflow-x-auto rounded-2xl border border-slate-200">
        {rows.length ? (
          <table className="min-w-full divide-y divide-slate-200 text-left">
            <thead className="bg-slate-50">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column}
                    className="whitespace-nowrap px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] text-slate-600"
                  >
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {rows.map((row) => (
                <tr key={row.id} className="hover:bg-[#f8fbff]">
                  {columns.map((column) => (
                    <td key={`${row.id}-${column}`} className="whitespace-nowrap px-4 py-3 text-sm text-slate-700">
                      {String(row[column] ?? '')}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="px-4 py-8 text-sm text-slate-500">No records yet.</div>
        )}
      </div>
    </section>
  );
}

export default function AdminPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadData = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetchAdminSchoolData();
      setData(response.tables || {});
    } catch (err) {
      setError(err.message || 'Unable to load admin data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadData();
  }, []);

  const tableEntries = useMemo(() => Object.entries(data || {}), [data]);

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f5f7fb_0%,#edf2ff_100%)]">
      <section className="container-page py-10 sm:py-14">
        <div className="rounded-[32px] border border-white/70 bg-white/90 p-6 shadow-[0_24px_70px_rgba(20,58,123,0.12)] backdrop-blur sm:p-8">
          <div className="flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.4em] text-schoolBlue">Admin Panel</p>
              <h1 className="mt-3 text-3xl font-black text-schoolBlueDark sm:text-4xl">All form data and chat logs</h1>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
                This page shows every table that stores your form submissions and chatbot conversations.
              </p>
            </div>

            <button type="button" onClick={() => void loadData()} className="btn-red self-start sm:self-auto">
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="py-10 text-sm font-medium text-slate-600">Loading admin data...</div>
          ) : error ? (
            <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {error}
            </div>
          ) : (
            <div className="mt-8 grid gap-6">
              {tableEntries.map(([tableName, rows]) => (
                <TableView key={tableName} tableName={tableName} rows={rows} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
