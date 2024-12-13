import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator'; 

export default function FormNavigation({sections}) {
  return (
    <nav className='w-[190px] p-4 bg-white h-fit'>
      <p>Przejdź do</p>
      <Separator className="my-[10px] text-[#D7D8DB]" />
      <ul className="flex flex-col ">
        {Object.keys(sections).map((fieldKey) => (
          <div key={fieldKey}>
            <Accordion type="single" collapsible>
              <AccordionItem key={fieldKey} value={fieldKey}>
                <AccordionTrigger className>{sections[fieldKey].label}</AccordionTrigger>
                <AccordionContent className="space-y-2">
                    {sections[fieldKey].links.map(({ id, label }) => ( 
                      <li key={id}>
                        <a
                          href={`#${id}`}
                          className="text-[#242628] text-[14px] font-medium cursor-pointer"
                        >
                          {label}
                        </a>
                      </li>
                    ))}
                  </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ))}

      </ul>
    </nav>
  );
}
