'use client';
import * as React from 'react';
import { Form, FormControl, FormField } from '@/components/ui/form';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Select from 'react-select';
import { CalendarDays } from 'lucide-react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SearchableSelect from './ui/searchable-select';
import { CustomDatePicker } from './ui/custom-datepicker';
import { Checkbox } from '@/components/ui/checkbox';
import TimePicker from './ui/time-picker';
import { Textarea } from '@/components/ui/textarea';
import { Controller } from 'react-hook-form';
import { format, subYears } from 'date-fns';

const validatePesel = (pesel) => {
  const peselRegex = /^\d{11}$/;
  return peselRegex.test(pesel);
};
const toRoman = (num) => {
  const romanNumerals = ['I', 'II', 'III', 'IV', 'V', 'VI'];
  return romanNumerals[num - 1] || num;
};

const calculateBirthDateFromPesel = (pesel) => {
  if (!validatePesel(pesel)) return null;
  let year = parseInt(pesel.substring(0, 2));
  let month = parseInt(pesel.substring(2, 4));
  let day = parseInt(pesel.substring(4, 6));

  let fullYear;
  if (month > 80) {
    fullYear = 1800 + year;
    month -= 80;
  } else if (month > 60) {
    fullYear = 2200 + year;
    month -= 60;
  } else if (month > 40) {
    fullYear = 2100 + year;
    month -= 40;
  } else if (month > 20) {
    fullYear = 2000 + year;
    month -= 20;
  } else {
    fullYear = 1900 + year;
  }

  return new Date(fullYear, month - 1, day);
};

const JAK_NAJSZYBCIEJ = 'Jak najszybciej';

const mockOptions = [
  { value: 'Opcja 1', label: 'Opcja 1' },
  { value: 'Opcja 2', label: 'Opcja 2' },
  { value: 'Opcja 3', label: 'Opcja 3' },
  { value: 'Opcja 4', label: 'Opcja 4' },
];

export default function AppointmentForm({ setSections }) {
  const form = useForm({
    defaultValues: {
      visitDate: JAK_NAJSZYBCIEJ,
      patients: [{}],
    },
  });
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form;
  const [concreteTime, setConcreteTime] = React.useState(false);
  const [otherAddress, setOtherAddress] = React.useState(false);
  const visitDate = watch('visitDate');
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'patients',
  });

  const onSubmit = (data) => console.log(data);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="bg-white p-[40px] mb-[24px]">
          <p className="text-[#112950] text-[24px] mb-[24px] font-light">
            Wizyta
          </p>
          <div className="w-full flex flex-col gap-[24px]">
            <div id="notification">
              <Label htmlFor="notification">Numer zgłoszenia</Label>
              <Input
                className="border-0 border-b-2 rounded-none p-0 text-[16px]"
                type="number"
                {...register('notification', { required: true })}
                id="notification"
                placeholder="Wpisz numer zgłoszenia"
              />
              {errors.notification && (
                <span className="text-red-500 mt-1">
                  Numer zgłoszenia jest wymagany
                </span>
              )}
            </div>

            <div id="visitType">
              <Label>Rodzaj wizyty</Label>
              <SearchableSelect
                name="visitType"
                control={control}
                options={mockOptions}
                placeholder="Wizyta domowa"
                rules={{
                  required: 'Rodzaj wizyty jest wymagany',
                }}
              />
              {errors.visitType && (
                <span className="text-red-500 mt-1">
                  {errors.visitType.message}
                </span>
              )}
            </div>

            <div id="specialization">
              <Label>Specjalizacja</Label>
              <SearchableSelect
                name="specialization"
                control={control}
                options={mockOptions}
                placeholder="Wybierz z listy"
                rules={{
                  required: 'Specjalizacja jest wymagana',
                }}
              />
              {errors.specialization && (
                <span className="text-red-500  mt-1">
                  {errors.specialization.message}
                </span>
              )}
            </div>

            <div id="visitDate">
              <Label className="text-[16px] mb-[8px] font-bold">
                Data wizyty
              </Label>
              <CustomDatePicker
                name="visitDate"
                control={control}
                defaultValue={JAK_NAJSZYBCIEJ}
              />
              <div className="flex items-center space-x-3 mt-[8px]">
                <Checkbox
                  id="time"
                  disabled={visitDate === JAK_NAJSZYBCIEJ}
                  checked={concreteTime}
                  onCheckedChange={setConcreteTime}
                />
                <label
                  htmlFor="time"
                  className="text-[14px] font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Wybierz konkretny przedział godzinowy
                </label>
              </div>
            </div>

            {concreteTime && visitDate !== JAK_NAJSZYBCIEJ && (
              <div>
                <Label>Godzina</Label>
                <TimePicker
                  control={control}
                  watch={watch}
                  setValue={setValue}
                />
              </div>
            )}

            <div id="topic">
              <Label>Temat</Label>
              <SearchableSelect
                name="topic"
                control={control}
                options={mockOptions}
                placeholder="Wybierz z listy"
                rules={{
                  required: 'Temat jest wymagany',
                }}
              />
              {errors.topic && (
                <span className="text-red-500  mt-1">
                  {errors.topic.message}
                </span>
              )}
            </div>

            <div id="additionalInfo">
              <Label>
                Dodatkowe informacje
                <span className="font-normal">(opcjonalnie)</span>
              </Label>
              <Controller
                name={'additionalInfo'}
                control={control}
                render={({ field }) => (
                  <Textarea
                    placeholder="Opisz problem"
                    className="resize-none bg-[#F7F7F8] text-[12px] border-0 rounded-sm"
                    {...field}
                  />
                )}
              />
            </div>

            <div id="language">
              <Label>Język wizyty</Label>
              <SearchableSelect
                name="language"
                control={control}
                options={mockOptions}
                placeholder="Wybierz z listy"
                rules={{
                  required: 'Język jest wymagany',
                }}
              />
              {errors.language && (
                <span className="text-red-500  mt-1">
                  {errors.language.message}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="bg-white p-[40px] mb-[24px]">
          {fields.map((patient, index) => (
            <div className="flex flex-col gap-[24px]" key={patient.id}>
              <p className="text-[#112950] text-[24px] my-[24px] font-light">
                Pacjent {toRoman(index + 1)}
              </p>
              <div id={`age-${index}`}>
                <Label>Wiek pacjenta</Label>
                <Tabs defaultValue="adult">
                  <TabsList className="flex items-center space-x-[16px] mt-[8px] p-0">
                    <TabsTrigger
                      className="text-[#09162A] h-[40px] rounded-lg data-[state=active]:bg-[#112950] data-[state=active]:text-neutral-50 border border-[#09162A] flex-1"
                      value="adult"
                    >
                      Dorosły
                    </TabsTrigger>
                    <TabsTrigger
                      className="text-[#09162A] h-[40px] rounded-lg data-[state=active]:bg-[#112950] data-[state=active]:text-neutral-50 border border-[#09162A] flex-1"
                      value="kid"
                    >
                      Dziecko
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <div id={`patientData-${index}`}>
                <Label className="mb-[8px]">Dane pacjenta</Label>
                <div className="flex space-x-[16px]">
                  <FormField
                    control={control}
                    name={`patients.${index}.name`}
                    className="flex-1"
                    rules={{
                      required: 'Imię pacjenta jest wymagane',
                    }}
                    render={({ field }) => (
                      <>
                        <Input
                          placeholder="Imię"
                          {...field}
                          className={`p-0 border-0 rounded-none border-b-2 text-[16px]`}
                        />
                        {errors.patients?.[index]?.name && (
                          <span className="text-red-500 text-sm mt-1">
                            {errors.patients?.[index]?.name.message}
                          </span>
                        )}
                      </>
                    )}
                  />
                  <FormField
                    control={control}
                    name={`patients.${index}.lastName`}
                    className="flex-1"
                    rules={{
                      required: 'Imię pacjenta jest wymagane',
                    }}
                    render={({ field }) => (
                      <>
                        <Input
                          placeholder="Nazwisko"
                          {...field}
                          className="p-0 border-0 rounded-none border-b-2 text-[16px]"
                        />
                        {errors.patients?.[index]?.lastName && (
                          <span className="text-red-500 text-sm mt-1">
                            {errors.patients?.[index]?.lastName.message}
                          </span>
                        )}
                      </>
                    )}
                  />
                </div>
              </div>
              <div id={`symptoms-${index}`}>
                <Label>
                  Objawy
                  <span className="font-normal"> (opcjonalnie)</span>
                </Label>
                <Select
                  isMulti
                  name="colors"
                  options={mockOptions}
                  placeholder="Wybierz z listy"
                  className="basic-multi-select "
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      border: 'none',
                      borderRadius: 0,
                      borderBottom: '1px solid #ccc',
                      boxShadow: 'none',
                    }),
                  }}
                  classNamePrefix="select"
                />
              </div>
              <div id={`document-${index}`} className="w-full">
                <Label>Dokument</Label>
                <Tabs defaultValue="pesel">
                  <TabsList className="w-full flex bg-[#E5F0FF]">
                    <TabsTrigger className="flex-1" value="pesel">
                      PESEL
                    </TabsTrigger>
                    <TabsTrigger className="flex-1" value="passport">
                      Paszport
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="pesel">
                    <FormField
                      control={control}
                      name={`patients.${index}.pesel`}
                      className="flex-1"
                      render={({ field }) => (
                        <Input
                          maxLength={11}
                          type="number"
                          placeholder="Wpisz numer PESEL"
                          className="p-0 border-0 rounded-none border-b-2 text-[16px]"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            const birthDate = calculateBirthDateFromPesel(
                              e.target.value
                            );
                            if (birthDate) {
                              form.setValue(
                                `patients.${index}.birthDate`,
                                birthDate
                              );
                            }
                          }}
                        />
                      )}
                    />
                  </TabsContent>
                  <TabsContent value="passport">
                    <div className="flex space-x-[8px]">
                      <FormField
                        control={control}
                        name={`patients.${index}.passport`}
                        className="flex-1"
                        render={({ field }) => (
                          <Input
                            placeholder="Wpisz numer paszportu"
                            className="p-0 border-0 rounded-none border-b-2 text-[16px] flex-1"
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                            }}
                          />
                        )}
                        rules={{
                          required: 'Numer paszportu jest wymagany.',
                          pattern: {
                            value: /^[a-zA-Z0-9]{5,10}$/,
                            message:
                              'Numer paszportu musi mieć od 5 do 10 znaków alfanumerycznych.',
                          },
                        }}
                      />

                      <FormField
                        control={control}
                        name={`patients.${index}.birthDate`}
                        render={({ field }) => (
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={'outline'}
                                  className="flex justify-between p-0 border-0 rounded-none border-b-2 text-[16px] text-[#6D7178] pl-3 font-normal flex-1"
                                >
                                  {field.value ? (
                                    format(field.value, 'PPP')
                                  ) : (
                                    <span>Data urodzenia</span>
                                  )}
                                  <CalendarDays
                                    style={{ width: '24px', height: '24px' }}
                                  />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={(date) => {
                                  field.onChange(date);
                                  form.setValue(
                                    `patients.${index}.isAdult`,
                                    calculateAge(date)
                                  );
                                }}
                                disabled={(date) =>
                                  date > new Date() ||
                                  date < subYears(new Date(), 100)
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        )}
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              {index === 0 && (
                <div id={`address-${index}`}>
                  <Label>Dane adresowe</Label>
                  <SearchableSelect
                    name={`patients.${index}.address.country`}
                    control={control}
                    options={mockOptions}
                    placeholder="Kraj"
                  />
                  <div className="flex space-x-3 mt-2">
                    <FormField
                      control={control}
                      name={`patients.${index}.address.street`}
                      className=""
                      render={({ field }) => (
                        <Input
                          placeholder="Ulica"
                          className="p-0 border-0 rounded-none w-2/3 border-b-2 text-[16px]"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                          }}
                        />
                      )}
                    />
                    <FormField
                      control={control}
                      name={`patients.${index}.address.houseNumber`}
                      className=""
                      render={({ field }) => (
                        <Input
                          placeholder="Nr lokalu"
                          className="p-0 border-0 w-1/3 rounded-none border-b-2 text-[16px]"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                          }}
                        />
                      )}
                    />
                  </div>
                  <div>
                    <div className="flex items-center space-x-3 mt-[8px] mb-[24px]">
                      <Checkbox
                        id="address"
                        checked={otherAddress}
                        onCheckedChange={setOtherAddress}
                      />
                      <label
                        htmlFor="address"
                        className="text-[14px] font-normal leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 "
                      >
                        Wizyta ma się odbyć na inny adres
                      </label>
                    </div>
                    {otherAddress && (
                      <div className="flex flex-col gap-2">
                        <Label>Dane adresowe do wizyty</Label>
                        <SearchableSelect
                          name={`patients.${index}.visitAddress.country`}
                          control={control}
                          options={mockOptions}
                          placeholder="Kraj"
                        />
                        <div className="flex space-x-3 mt-2">
                          <FormField
                            control={control}
                            name={`patients.${index}.visitAddress.street`}
                            className=""
                            render={({ field }) => (
                              <Input
                                placeholder="Ulica"
                                className="p-0 border-0 rounded-none w-2/3 border-b-2 text-[16px]"
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e);
                                }}
                              />
                            )}
                          />
                          <FormField
                            control={control}
                            name={`patients.${index}.visitAddress.houseNumber`}
                            className=""
                            render={({ field }) => (
                              <Input
                                placeholder="Nr lokalu"
                                className="p-0 border-0 w-1/3 rounded-none border-b-2 text-[16px]"
                                {...field}
                                onChange={(e) => {
                                  field.onChange(e);
                                }}
                              />
                            )}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {index > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full text-red-600 border border-red-600 "
                  size="sm"
                  onClick={() => {
                    remove(index);
                    setSections((prevSections) => {
                      const updatedSections = { ...prevSections };
                      delete updatedSections[`pacient_${index}`];
                      return updatedSections;
                    });
                  }}
                >
                  Usuń pacjenta
                </Button>
              )}
            </div>
          ))}

          {fields.length < 6 && (
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                append({});
                setSections((prev) => {
                  return {
                    ...prev,
                    [`patient_${fields.length}`]: {
                      label: `Pacjent ${toRoman(fields.length + 1)}`,
                      links: [
                        {
                          id: `age-${fields.length}`,
                          label: 'Wiek pacjenta',
                        },
                        {
                          id: `patientData-${fields.length}`,
                          label: 'Dane pacjenta',
                        },
                        {
                          id: `symptoms-${fields.length}`,
                          label: 'Objawy',
                        },
                        {
                          id: `document-${fields.length}`,
                          label: 'Dokument',
                        },
                      ],
                    },
                  };
                });
              }}
              className="w-full text-[#0068FA] border border-[#0068FA] my-[24px]"
            >
              Dodaj pacjenta
            </Button>
          )}
          <Button
            type="submit"
            className="w-full bg-[#0068FA] border border-[#0068FA] mb-[24px]"
          >
            Dalej
          </Button>
        </div>
      </form>
    </Form>
  );
}
