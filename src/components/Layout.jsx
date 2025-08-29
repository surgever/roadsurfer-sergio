import { Outlet, useParams } from 'react-router-dom';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

import StationContext from "@/context/StationContext";

const Layout = () => {
  let { station, week, booking } = useParams()
  
  return (
    <>
    <div className={"layout " + (booking ? 'booking-open' : 'booking-closed') + (week ? " week-open":"")}>
      <Header/>
      <Outlet />
    </div>
    <Footer />
    </>
  );
};
export default Layout;
