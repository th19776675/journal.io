import "./aside-card.css";

const AsideCard = ({children, height, maxHeight}) => {
  return (
    <div style={{height: height, maxHeight: maxHeight}}className="aside-card">
      {children}
    </div>
  )
}

export default AsideCard;