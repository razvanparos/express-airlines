import ButtonComponent from './ButtonComponent';
import {removePaymentMethod} from './../services/paymentService';
import { getUserDetails } from '../services/authService';
import authActions from "./../context/actions/auth-actions";
import AccordionSection from './AccordionSection';

export default function UserDashboardPaymentMethodsSection({ userDetails }) {
  const handleRemoveCard = async (id) => {
    await removePaymentMethod(id);
    let response = await getUserDetails('UsersDetails');
    authActions.setUserData({
      userDetails: response,
    });
  };

  return (
    <AccordionSection title="Payment methods">
      {userDetails[0]?.paymentMethods?.map((b, i) => {
        return (
          <section
            key={i}
            className="border-2 border-primaryBlue flex items-center justify-between p-2"
          >
            <div className="flex flex-col">
              <p className="font-bold">{b.cardHolderName}</p>
              <p>
                **** **** **** {b.cardNumber.substr(b.cardNumber.length - 4)}
              </p>
              <p>{b.expiryDate}</p>
            </div>
            <div className="text-end flex flex-col gap-y-4">
              <p>**{b.cvv[2]}</p>
              <ButtonComponent
                buttonFunction={() => {
                  handleRemoveCard(b.id);
                }}
                buttonText={'Remove'}
                buttonType={'danger'}
              />
            </div>
          </section>
        );
      })}
    </AccordionSection>
  );
}
