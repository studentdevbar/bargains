'use client'

import { useEffect, useMemo, useState } from "react";
import { getAllSchools } from "@/actions/school/get-all";
import { joinWaitlist } from "@/actions/waitlist/create";
import { toast } from "sonner";

export default function WaitlistForm() {
  const [options, setOptions] = useState<{ value: string; label: string }[]>([]);
  const [loadingSchools, setLoadingSchools] = useState(false);
  const [name, setName] = useState("");
  const [university, setUniversity] = useState("");
  const [universityId, setUniversityId] = useState<number | null>(null);
  const [course, setCourse] = useState("");
  const [personalEmail, setPersonalEmail] = useState("");
  const [schoolEmail, setSchoolEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        setLoadingSchools(true);
        const res = await getAllSchools();
        if (!mounted) return;
        if (res.success && res.data && Array.isArray(res.data.data)) {
          const mapped = res.data.data.map((s: { id: number; name: string }) => ({
            value: String(s.id),
            label: s.name,
          }));
          setOptions(mapped);
        }
      } finally {
        if (mounted) setLoadingSchools(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const isValid = useMemo(() => {
    return (
      name.trim() &&
      universityId !== null &&
      personalEmail.trim() &&
      schoolEmail.trim()
    );
  }, [name, universityId, personalEmail, schoolEmail]);

  async function handleSubmit() {
    if (!isValid || loading || universityId === null) return;
    try {
      setLoading(true);
      const res = await joinWaitlist({
        email: personalEmail,
        name,
        school_id: universityId,
        study: course || undefined,
        student_email: schoolEmail || undefined,
      });
      if (res.success) {
        toast.success("You're on the waitlist! 🎉");
        // Reset relevant fields
        setName("");
        setUniversity("");
        setUniversityId(null);
        setCourse("");
        setPersonalEmail("");
        setSchoolEmail("");
      } else {
        toast.error(res.error || "Failed to join waitlist");
      }
    } catch (_) {
      toast.error("Failed to join waitlist");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-6" >
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="sr-only" htmlFor="wl_name">Name</label>
        <div className="rounded-xl border border-slate-200 bg-white p-1 shadow-sm shadow-slate-200">
          <input
            id="wl_name"
            type="text"
            required
            placeholder="Your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border-0 bg-transparent px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-0"
          />
        </div>

        <label className="sr-only" htmlFor="wl_university">University</label>
        <div className="rounded-xl border border-slate-200 bg-white p-1 shadow-sm shadow-slate-200">
          <input
            id="wl_university"
            type="text"
            list="schools-list"
            required
            placeholder={loadingSchools ? "Loading universities..." : "Search your university"}
            value={university}
            onChange={(e) => {
              const value = e.target.value;
              setUniversity(value);
              const matched = options.find(
                (o) => o.label.toLowerCase() === value.toLowerCase()
              );
              setUniversityId(matched ? Number(matched.value) : null);
            }}
            onBlur={(e) => {
              const value = e.target.value;
              const matched = options.find(
                (o) => o.label.toLowerCase() === value.toLowerCase()
              );
              setUniversityId(matched ? Number(matched.value) : null);
              setUniversity(matched ? matched.label : value);
            }}
            className="w-full rounded-lg border-0 bg-transparent px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-0"
          />
          <datalist id="schools-list">
            {options.map((o) => (
              <option key={o.value} value={o.label} />
            ))}
          </datalist>
        </div>

        <label className="sr-only" htmlFor="wl_course">Course of Study</label>
        <div className="rounded-xl border border-slate-200 bg-white p-1 shadow-sm shadow-slate-200">
          <input
            id="wl_course"
            type="text"
            placeholder="Course of study (optional)"
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="w-full rounded-lg border-0 bg-transparent px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-0"
          />
        </div>

        <label className="sr-only" htmlFor="wl_personalEmail">Personal Email</label>
        <div className="rounded-xl border border-slate-200 bg-white p-1 shadow-sm shadow-slate-200">
          <input
            id="wl_personalEmail"
            type="email"
            required
            placeholder="Personal email address"
            value={personalEmail}
            onChange={(e) => setPersonalEmail(e.target.value)}
            className="w-full rounded-lg border-0 bg-transparent px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-0"
          />
        </div>

        <label className="sr-only" htmlFor="wl_schoolEmail">School Email</label>
        <div className="rounded-xl border border-slate-200 bg-white p-1 shadow-sm shadow-slate-200">
          <input
            id="wl_schoolEmail"
            type="email"
            required
            placeholder="School email address"
            value={schoolEmail}
            onChange={(e) => setSchoolEmail(e.target.value)}
            className="w-full rounded-lg border-0 bg-transparent px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-0"
          />
        </div>
      </div>

      

      <div className="mt-4 flex justify-between items-center">
        <div className="mt-6 flex items-center justify-center gap-3 text-sm text-slate-600">
          <div className="-ml-2 flex">
            <span className="inline-block h-7 w-7 rounded-full bg-gradient-to-br from-violet-300 to-violet-500 ring-2 ring-white" />
            <span className="-ml-2 inline-block h-7 w-7 rounded-full bg-gradient-to-br from-fuchsia-300 to-fuchsia-500 ring-2 ring-white" />
            <span className="-ml-2 inline-block h-7 w-7 rounded-full bg-gradient-to-br from-blue-300 to-blue-500 ring-2 ring-white" />
            <span className="-ml-2 inline-block h-7 w-7 rounded-full bg-gradient-to-br from-emerald-300 to-emerald-500 ring-2 ring-white" />
          </div>
          <span>Join the 500+ others that have signed up</span>
        </div>
        <button
          onClick={handleSubmit}
          disabled={!isValid || loading}
          className="inline-flex items-center justify-center rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_6px_0_0_rgba(109,40,217,0.6)] transition active:translate-y-[2px] active:shadow-[0_4px_0_0_rgba(109,40,217,0.6)] disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Subscribe"}
        </button>
      </div>
    </div>
  );
}


