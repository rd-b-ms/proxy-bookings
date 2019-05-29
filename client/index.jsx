import React from 'react';
import ReactDOM from 'react-dom';
import BookingPortal from '../services/booking-portal-module/client/src/bookingPortal';
import PhotoDisplay from '../services//photodisplay-module/client/src/Components/App';
import ListingInfo from '../services/listinginfo-module/Module/client/src/components/app';
import Reviews from '../services/Review-module/client/src/component/App';


ReactDOM.render(<BookingPortal />, document.getElementById('bookingPortal'));
ReactDOM.render(<PhotoDisplay />, document.getElementById('photoDisplay'));
ReactDOM.render(<ListingInfo />, document.getElementById('listingInfo'));
ReactDOM.render(<Reviews />, document.getElementById('reviews'));