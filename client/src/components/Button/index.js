import './button.css'

const Button = ({onClick, children, width}) => {
  return (
    <button style={{ width: width }} className="button-component" onClick={onClick}>{children}</button>
  )
}

export default Button;