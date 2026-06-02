function DeleteItem(
    { setHideDeleteModal }: {
        setHideDeleteModal: React.Dispatch<React.SetStateAction<boolean>>
    }
) {
    return (
        <div onClick={() => setHideDeleteModal(true)} className="dropdownItem">
            Delete
        </div>
    );
}

export default DeleteItem;