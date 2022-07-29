import './button.css'

const Button = ({onClick, children}) => {
  return (
    <button className="button-component" onClick={onClick}>{children}</button>
  )
}

export default Button;