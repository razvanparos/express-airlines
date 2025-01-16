import { useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';

function AccordionSection({ children, title }) {
  const [isSectionExpanded, setIsSectionExpanded] = useState(true);

  const onToggleSection = () => setIsSectionExpanded(!isSectionExpanded);

  return (
    <section className="bg-gray-200 p-3 w-full">
      <div
        onClick={onToggleSection}
        className="flex justify-between cursor-pointer"
      >
        <p className="font-semibold mb-4">{title}</p>
        <MdKeyboardArrowDown
          className={`font-bold text-3xl ${
            isSectionExpanded ? 'rotate-180' : ''
          }`}
        />
      </div>
      <div
        className={`${
          isSectionExpanded
            ? 'h-fit'
            : 'h-0 overflow-hidden pointer-events-none'
        } flex flex-col gap-y-2`}
      >
        {children}
      </div>
    </section>
  );
}
export default AccordionSection;
