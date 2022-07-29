import "./toggle.css"

const Toggle = ({checked, onClick}) => {
  return (
    <label className="toggle-switch">
    <input 
      type="checkbox" 
      checked={checked}
      onChange={onClick}
    />
    <span className="toggle-slider"></span>
    </label>
  )
}

export default Toggle;