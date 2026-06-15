import { Link } from 'react-router-dom';

export default function TopBar() {
  return (
    <div className="bg-[#f3e4bf] text-white">
      <div className="container-page flex items-center justify-end gap-2 py-2 sm:py-3">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            to="/forms/staff-login"
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full items-center justify-center rounded-full bg-schoolBlueDark px-4 py-2 text-center text-sm font-bold text-white shadow-sm transition hover:bg-schoolBlue sm:w-auto sm:px-5 sm:py-3"
          >
            Staff Login
          </Link>

          <Link
            to="/login"
            className="inline-flex w-full items-center justify-center rounded-full bg-schoolBlueDark px-4 py-2 text-center text-sm font-bold text-white shadow-sm transition hover:bg-schoolBlue sm:w-auto sm:px-5 sm:py-3"
          >
            Login
          </Link>

          <Link
            to="/admin"
            className="inline-flex w-full items-center justify-center rounded-full bg-schoolRed px-4 py-2 text-center text-sm font-bold text-white shadow-sm transition hover:bg-red-700 sm:w-auto sm:px-5 sm:py-3"
          >
            Admin
          </Link>
        </div>
      </div>
    </div>
  );
}
