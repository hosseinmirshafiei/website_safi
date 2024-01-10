
export default function MenuIcon({ handleOpenMenu }) {
    
  return (
    <>
      <div className="menu_icon" onClick={() => handleOpenMenu()}>
        <img src="/menu.svg" />
      </div>
    </>
  );
}
