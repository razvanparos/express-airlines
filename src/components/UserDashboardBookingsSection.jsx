import AccordionSection from './AccordionSection';
import MyBookingCard from './MyBookingCard';

export default function UserDashboardBookingsSection({ userDetails }) {
  return (
    <AccordionSection title="My bookings">
      {userDetails[0]?.bookedFlights?.map((b, i) => (
        <MyBookingCard key={i} b={b} />
      ))}
    </AccordionSection>
  );
}
