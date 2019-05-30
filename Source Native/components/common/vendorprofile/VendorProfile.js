import React from 'react';
import Vendor from '../../../containers/common/vendorprofile/vendor/Vendor'

const VendorProfile=(props)=> {
   const {itemId} = props.navigation.state.params;
   return <Vendor itemId={itemId}/>
}

export default VendorProfile;
