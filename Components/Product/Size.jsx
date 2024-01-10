export default function Size({ item, setDropDown, selectSize, setSelectSize, setSelectColor }) {
  function handleSelectSize() {
    setSelectSize(item);
    // setSelectColor();
    setDropDown(0);
  }

  return (
    <div
      className={selectSize && selectSize.size_id == item.size_id ? "size selected" : "size"}
      onClick={() => handleSelectSize()}
    >
      <span>{item.size.size}</span>
    </div>
  );
}