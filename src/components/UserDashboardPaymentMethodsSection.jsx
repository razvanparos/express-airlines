import ButtonComponent from './ButtonComponent';
import { removePaymentMethod } from './../services/paymentService';
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
            className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 shadow-sm"
          >
            <div className="flex flex-col gap-1">
              <p className="text-lg font-bold text-slate-800">{b.cardHolderName}</p>
              <p className="text-sm text-slate-600">
                **** **** **** {b.cardNumber.substr(b.cardNumber.length - 4)}
              </p>
              <p className="text-sm text-slate-500">{b.expiryDate}</p>
            </div>
            <div className="flex flex-col items-end gap-3 text-end">
              <p className="text-sm text-slate-500">CVV ••{b.cvv?.[2] ?? '*'}</p>
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
