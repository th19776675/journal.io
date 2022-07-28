import './leader.css'

const Leader = (props) => {
return (
<div className="leader-outer-wrapper">
  <div className="leader-inner-wrapper">
    {props.children}
  </div>
</div>
)
}

export default Leader;