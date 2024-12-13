'use client';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import SideBar from '@/components/SideBar';
import AppointmentForm from '@/components/AppointmentForm';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import FormNavigation from '@/components/FormNavigation';

export default function Home() {
  const [sections, setSections] = useState({
    visit: {
      label: 'Wizyta',
      links: [
        { id: 'notification', label: 'Numer zgłoszenia' },
        { id: 'visitType', label: 'Rodzaj wizyty' },
        { id: 'specialization', label: 'Specjalizacja' },
        { id: 'visitDate', label: 'Data wizyty' },
        { id: 'additionalInfo', label: 'Dodatkowe informacje' },
        { id: 'language', label: 'Język wizyty' },
      ],
    },
    patient_0: {
      label: 'Pacjent',
      links: [
        { id: 'age-0', label: 'Wiek pacjenta' },
        { id: 'patientData-0', label: 'Dane pacjenta' },
        { id: 'symptoms-0', label: 'Objawy' },
        { id: 'document-0', label: 'Dokument' },
        { id: 'address-0', label: 'Dane adresowe' },
      ],
    },
  });
  return (
    <div>
      <Navbar />
      <div className="py-[40px] max-w-[1240px] flex gap-[20px] mx-auto justify-center">
        <SideBar />
        <div>
          <Breadcrumb>
            <BreadcrumbList className="text-[14px]">
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Wizyty domowe</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Umawianie wizyty</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <p className="text-[#112950] text-[40px] font-light">
            Umawianie wizyty
          </p>
          <AppointmentForm setSections={setSections} />
        </div>
        <FormNavigation sections={sections} />
      </div>
    </div>
  );
}
