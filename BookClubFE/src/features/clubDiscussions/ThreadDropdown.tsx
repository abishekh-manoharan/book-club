import React, { useEffect, useRef } from 'react';

function ThreadDropdown({ setOpen }: {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}) {
    const ref = useRef<HTMLDivElement>();
    console.log("open thread dropdown")

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            event.stopPropagation();
            if (
                ref.current &&
                !ref.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [setOpen]);

    return (
        <div ref={ref} className="thread dropdown">
            <div className="dropdownItem">
                Edit
            </div>
            <div className="dropdownItem">
                Delete
            </div>
            <div className="dropdownItem">
                Copy Link
            </div>
            <div className="dropdownItem">
                Unpin
            </div>
            <div className="dropdownItem">
                Pin
            </div>
        </div>
    );
}

export default ThreadDropdown;