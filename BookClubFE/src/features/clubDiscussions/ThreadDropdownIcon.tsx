import React, { useState } from 'react';
import ThreadDropdown from './ThreadDropdown';

function ThreadDropdownIcon() {
    const [open, setOpen] = useState(false);

    return (
        <div className='dropdownIcon'>
            <img onClick={()=> setOpen((prev) => !prev)} src="/src/assets/images/more-horizontal.svg"/>
            {open && <ThreadDropdown open={open} setOpen={setOpen}/>}
        </div>
    );
}

export default ThreadDropdownIcon;