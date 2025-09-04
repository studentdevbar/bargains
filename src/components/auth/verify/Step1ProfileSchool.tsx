"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { SearchableSelect } from "@/components/ui/searchable-select";

type Step1Props = {
  initial: {
    firstName?: string;
    lastName?: string;
    gender?: string;
    dob?: string;
    school?: string;
  };
  schools: { value: string; label: string }[];
  onNext: (data: {
    firstName: string;
    lastName: string;
    gender: string;
    dob: string;
    school: string;
  }) => void;
};

export default function Step1ProfileSchool({ initial, schools, onNext }: Step1Props) {
  const [firstName, setFirstName] = useState(initial.firstName ?? "");
  const [lastName, setLastName] = useState(initial.lastName ?? "");
  const [gender, setGender] = useState(initial.gender ?? "");
  const [dob, setDob] = useState(initial.dob ?? "");
  const [school, setSchool] = useState(initial.school ?? "");
  const [confirmSchool, setConfirmSchool] = useState(Boolean(initial.school));

  const isValid = useMemo(() => {
    return firstName && lastName && gender && dob && school;
  }, [firstName, lastName, gender, dob, school]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    onNext({ firstName, lastName, gender, dob, school });
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium" htmlFor="firstName">First name</label>
          <input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="h-11 mt-2 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/50" required />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium" htmlFor="lastName">Last name</label>
          <input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} className="h-11 mt-2 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/50" required />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium" htmlFor="gender">Gender</label>
          <select id="gender" value={gender} onChange={(e) => setGender(e.target.value)} className="h-11 mt-2 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/50" required>
            <option value="" disabled>Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer_not">Prefer not to say</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium" htmlFor="dob">Date of birth</label>
          <input id="dob" type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="h-11 mt-2 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring/50" required />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">School</label>
        {!confirmSchool ? (
          <SearchableSelect
            options={schools}
            value={school}
            onValueChange={(v) => {
              setSchool(v);
              setConfirmSchool(true);
            }}
            placeholder="Search your school..."
            label=""
          />
        ) : (
          <div className="flex items-center justify-between rounded-md border border-input bg-accent/50 px-3 py-3">
            <div className="text-sm">
              <p className="font-medium">{school}</p>
              <p className="text-muted-foreground">Selected school</p>
            </div>
            <Button type="button" variant="outline" className="rounded-full" onClick={() => setConfirmSchool(false)}>Change</Button>
          </div>
        )}
      </div>

      <Button type="submit" disabled={!isValid || !confirmSchool} className="w-full h-11 text-[15px] rounded-full bg-accent-main">Continue</Button>
    </form>
  );
}


