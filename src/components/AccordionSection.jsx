import { useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';

function AccordionSection({ children, title }) {
  const [isSectionExpanded, setIsSectionExpanded] = useState(true);

  const onToggleSection = () => setIsSectionExpanded(!isSectionExpanded);

  return (
    <section className="w-full overflow-hidden rounded-[24px] bg-white shadow-md shadow-slate-200/70 ring-1 ring-slate-200">
      <div
        onClick={onToggleSection}
        className="flex cursor-pointer items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-4"
      >
        <p className="text-lg font-semibold text-slate-800">{title}</p>
        <MdKeyboardArrowDown
          className={`text-3xl text-primaryBlue transition-transform duration-200 ${isSectionExpanded ? 'rotate-180' : ''
            }`}
        />
      </div>
      {isSectionExpanded && (
        <div
          className={`${isSectionExpanded
            ? 'opacity-100'
            : 'max-h-0 overflow-hidden opacity-0'
            } flex flex-col gap-y-3 p-4 transition-all duration-300`}
        >
          {children}
        </div>)}
    </section>
  );
}
export default AccordionSection;
